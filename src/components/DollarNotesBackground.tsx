import React, { useEffect, useRef } from 'react';

interface NoteParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  vRot: number;
  scale: number;
  alpha: number;
  targetAlpha: number;
  denomination: string;
  serial: string;
  glowColor: string;
  tiltSpeed: number;
  tiltPhase: number;
}

export const DollarNotesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive note count
    const isMobile = width < 768;
    const noteCount = isMobile ? 8 : 16;
    const denominations = ['100', '1K', '500', '10K', '₿/$', '$$'];
    const glowColors = [
      'rgba(34, 211, 238, 0.25)',  // Cyan neon
      'rgba(16, 185, 129, 0.28)',  // Emerald digital cash
      'rgba(52, 211, 153, 0.22)',  // Mint matrix
      'rgba(6, 182, 212, 0.20)',   // Deep cyan
    ];

    const generateSerial = () => {
      const chars = 'ABCDEF0123456789';
      let res = '';
      for (let i = 0; i < 6; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      return `CYBER-${res}`;
    };

    // Initialize floating futuristic holographic banknotes
    const notes: NoteParticle[] = Array.from({ length: noteCount }, () => {
      const w = Math.random() * 50 + 90; // 90 to 140px width
      const h = w * 0.48; // Standard currency aspect ratio
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.4 + 0.15), // Gently drift upwards
        width: w,
        height: h,
        rotation: (Math.random() - 0.5) * 0.6,
        vRot: (Math.random() - 0.5) * 0.003,
        scale: Math.random() * 0.4 + 0.8,
        alpha: Math.random() * 0.12 + 0.08,
        targetAlpha: Math.random() * 0.12 + 0.08,
        denomination: denominations[Math.floor(Math.random() * denominations.length)],
        serial: generateSerial(),
        glowColor: glowColors[Math.floor(Math.random() * glowColors.length)],
        tiltSpeed: Math.random() * 0.015 + 0.008,
        tiltPhase: Math.random() * Math.PI * 2,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Draw single futuristic cyber note
    const drawNote = (note: NoteParticle) => {
      ctx.save();
      ctx.translate(note.x, note.y);
      ctx.rotate(note.rotation);

      // 3D tilt effect via scale transform on Y axis
      const tiltScaleY = Math.cos(note.tiltPhase) * 0.3 + 0.7;
      ctx.scale(note.scale, note.scale * tiltScaleY);

      const w = note.width;
      const h = note.height;
      const hw = w / 2;
      const hh = h / 2;

      // Note background - dark translucent glass with subtle gradient
      ctx.fillStyle = 'rgba(7, 16, 25, 0.45)';
      ctx.strokeStyle = note.glowColor;
      ctx.lineWidth = 1.2;

      // Outer border with chamfered or rounded rect
      ctx.beginPath();
      ctx.roundRect(-hw, -hh, w, h, 6);
      ctx.fill();
      ctx.stroke();

      // Inner ornamental guilloche security border
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(-hw + 5, -hh + 5, w - 10, h - 10);

      // Corner currency symbols
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(52, 211, 153, 0.65)';
      ctx.fillText(`$${note.denomination}`, -hw + 8, -hh + 15);
      ctx.fillText(`$${note.denomination}`, hw - 32, hh - 8);

      // Central holographic watermark / emblem
      ctx.beginPath();
      ctx.arc(0, 0, h * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center Big Dollar Symbol
      ctx.font = 'bold 16px "JetBrains Mono", sans-serif';
      ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 0);

      // Micro digital serial code
      ctx.font = '6px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.textAlign = 'center';
      ctx.fillText(note.serial, 0, hh - 8);

      // Subtle cybernetic circuit track line
      ctx.beginPath();
      ctx.moveTo(-hw + 8, 0);
      ctx.lineTo(-hw * 0.45, 0);
      ctx.moveTo(hw * 0.45, 0);
      ctx.lineTo(hw - 8, 0);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw each banknote
      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];

        note.x += note.vx;
        note.y += note.vy;
        note.rotation += note.vRot;
        note.tiltPhase += note.tiltSpeed;

        // Wrap around vertically and horizontally with natural distribution
        if (note.y < -note.height * 2) {
          note.y = height + note.height;
          note.x = Math.random() * width;
        }
        if (note.x < -note.width * 2) {
          note.x = width + note.width;
        } else if (note.x > width + note.width * 2) {
          note.x = -note.width;
        }

        drawNote(note);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
