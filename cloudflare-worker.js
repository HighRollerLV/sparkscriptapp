
// File: cloudflare-worker.js
// This code runs on Cloudflare's edge network, not on your server.
// It acts as a secure proxy to the Gemini API.

export default {
  /**
   * Handles incoming requests.
   * @param {Request} request The incoming request.
   * @param {{API_KEY: string}} env Environment variables, including secrets.
   * @param {ExecutionContext} ctx The execution context.
   * @returns {Promise<Response>} The response to send back.
   */
  async fetch(request, env, ctx) {
    // Standard CORS preflight handling
    if (request.method === 'OPTIONS') {
      return this.handleOptions();
    }

    // We only accept POST requests for this endpoint
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const { metaPrompt } = await request.json();
      if (!metaPrompt) {
        return this.jsonError('metaPrompt is required in the request body.', 400);
      }

      // Use Server-Sent Events (SSE) for a more robust streaming connection.
      const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${env.API_KEY}&alt=sse`;

      // Call the Gemini API directly
      const geminiResponse = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: metaPrompt
            }]
          }]
        }),
      });

      if (!geminiResponse.ok) {
        const errorBody = await geminiResponse.text();
        console.error(`Gemini API Error (Status ${geminiResponse.status}): ${errorBody}`);
        return this.jsonError(`Gemini API returned an error. Status: ${geminiResponse.status}`, 502); // 502 Bad Gateway
      }

      // Gemini's streaming response is now SSE. We will parse these events
      // and forward only the text content to the client.
      const { readable, writable } = new TransformStream();
      this.streamGeminiSseResponse(geminiResponse.body, writable);

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*', // Adjust for production if needed
        },
      });

    } catch (error) {
      console.error('Cloudflare Worker Error:', error);
      return this.jsonError('An internal server error occurred in the worker.', 500);
    }
  },

  /**
   * Handles CORS preflight OPTIONS requests.
   * @returns {Response}
   */
  handleOptions() {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Restrict to your domain in production
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  },

  /**
   * Creates a JSON error response.
   * @param {string} message The error message.
   * @param {number} status The HTTP status code.
   * @returns {Response}
   */
  jsonError(message, status) {
    return new Response(JSON.stringify({ error: message }), {
      status: status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },

  /**
   * Pipes the Gemini SSE stream to the client, transforming the data.
   * @param {ReadableStream} geminiStream The raw SSE stream from the Gemini API.
   * @param {WritableStream} writable The writable side of the transform stream for the client.
   */
  async streamGeminiSseResponse(geminiStream, writable) {
    const reader = geminiStream.getReader();
    const writer = writable.getWriter();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let eolIndex;
        // Process buffer line by line
        while ((eolIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, eolIndex).trim();
          buffer = buffer.slice(eolIndex + 1);

          if (line.startsWith('data: ')) {
            const jsonString = line.substring(6); // Remove 'data: ' prefix
            try {
              const chunk = JSON.parse(jsonString);
              const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                writer.write(encoder.encode(text));
              }
            } catch (e) {
              // Ignore lines that are not valid JSON or other SSE events
              console.warn("Skipping non-JSON data line in SSE stream:", jsonString);
            }
          }
        }
      }
    } catch (e) {
      console.error('Error while streaming SSE response:', e);
      writer.write(encoder.encode('Error processing stream.'));
    } finally {
      writer.close();
    }
  }
};
