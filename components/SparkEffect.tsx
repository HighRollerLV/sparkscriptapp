import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  flicker?: number;
}

interface BoltPathSegment {
  x: number;
  y: number;
}

interface Bolt {
  path: BoltPathSegment[];
  branches: BoltPathSegment[][];
  life: number;
  maxLife: number;
  opacity: number;
  width: number;
  growth: number;
  seed: number;
}

export const SparkEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const bolts = useRef<Bolt[]>([]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const colors = ['#FFBE00', '#FFFFFF', '#00E5FF', '#FFAA00'];
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const life = 0.6 + Math.random() * 0.5;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: life,
          maxLife: life,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2.5,
          flicker: Math.random()
        });
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const createBolt = (startX: number, startY: number, length: number, angle: number, isBranch = false): BoltPathSegment[] => {
      const path: BoltPathSegment[] = [{ x: startX, y: startY }];
      let currX = startX;
      let currY = startY;
      const segments = isBranch ? 5 + Math.random() * 5 : 12 + Math.random() * 8;
      
      for (let i = 0; i < segments; i++) {
        const jaggedness = isBranch ? 40 : 80;
        currX += Math.sin(angle) * (length / segments) + (Math.random() - 0.5) * jaggedness;
        currY += Math.cos(angle) * (length / segments) + (Math.random() - 0.5) * jaggedness;
        path.push({ x: currX, y: currY });
      }
      return path;
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Random bolt generation
      if (Math.random() < 0.008) {
        const startX = Math.random() * canvas.width;
        const mainPath = createBolt(startX, -20, canvas.height + 40, 0);
        const branches: BoltPathSegment[][] = [];
        
        // Add potential branches
        if (Math.random() > 0.4) {
          const branchIdx = Math.floor(Math.random() * (mainPath.length - 2)) + 1;
          const start = mainPath[branchIdx];
          branches.push(createBolt(start.x, start.y, 150 + Math.random() * 200, (Math.random() - 0.5) * Math.PI, true));
        }

        bolts.current.push({ 
          path: mainPath, 
          branches,
          life: 1.0, 
          maxLife: 1.0, 
          opacity: 0.15 + Math.random() * 0.15,
          width: 2 + Math.random() * 3,
          growth: 0,
          seed: Math.random()
        });
      }

      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // Gravity
        p.vx *= 0.98; // Air resistance
        p.life -= 0.012;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const opacity = p.life / p.maxLife;
        const flicker = Math.sin(Date.now() * 0.02 * (p.flicker || 1)) * 0.2 + 0.8;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * flicker;
        
        // Outer glow for each particle
        ctx.shadowBlur = 8 * opacity;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and draw bolts
      for (let i = bolts.current.length - 1; i >= 0; i--) {
        const b = bolts.current[i];
        
        if (b.growth < 1) {
          b.growth += 0.15; // Rapid growth
          if (b.growth > 1) b.growth = 1;
        } else {
          b.life -= 0.04; // Rapid fade
        }

        if (b.life <= 0) {
          bolts.current.splice(i, 1);
          continue;
        }

        const progress = b.life / b.maxLife;
        // Flicker effect during life
        const flicker = Math.random() > 0.8 ? 0.2 : 1.0;
        
        const drawPath = (path: BoltPathSegment[]) => {
          const pathCount = Math.floor(path.length * b.growth);
          if (pathCount < 2) return;

          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
          for (let j = 1; j < pathCount; j++) {
            ctx.lineTo(path[j].x, path[j].y);
          }
          
          ctx.shadowBlur = 25 * progress;
          ctx.shadowColor = '#FFBE00';
          ctx.strokeStyle = '#FFBE00';
          ctx.lineWidth = b.width * progress;
          ctx.globalAlpha = progress * b.opacity * flicker;
          ctx.stroke();
          
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = (b.width / 4) * progress;
          ctx.globalAlpha = progress * b.opacity * 2 * flicker;
          ctx.stroke();
        };

        drawPath(b.path);
        b.branches.forEach(branch => drawPath(branch));
      }

      animationFrame = requestAnimationFrame(update);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    update();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[-1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};