import React, { useEffect, useRef } from 'react';

interface DollarNotesBackgroundProps {
  className?: string;
}

interface NoteParticle {
  x: number;
  y: number;
  z: number; // 0.35 (distant/small/dim) to 1.1 (closer/crisper)
  vx: number;
  vy: number;
  yaw: number; // horizontal 3D tumble
  dYaw: number;
  pitch: number; // vertical 3D tilt
  dPitch: number;
  roll: number; // 2D rotation
  dRoll: number;
  textureIndex: number;
  baseAlpha: number;
  flutterPhase: number;
}

export const DollarNotesBackground: React.FC<DollarNotesBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // =========================================================================
    // 1. PRE-RENDER HIGH-FIDELITY SUBDUED DOLLAR BANKNOTE TEXTURES (OFFSCREEN)
    // Low brightness: dark olive/emerald/charcoal palette with crisp currency details
    // =========================================================================
    const NOTE_WIDTH = 210;
    const NOTE_HEIGHT = 90;

    const textures: HTMLCanvasElement[] = [];

    const createNoteTexture = (
      denomination: string,
      isBack = false,
      accentColor = '#22c55e'
    ): HTMLCanvasElement => {
      const off = document.createElement('canvas');
      off.width = NOTE_WIDTH * 2; // 2x for retina crispness
      off.height = NOTE_HEIGHT * 2;
      const oCtx = off.getContext('2d');
      if (!oCtx) return off;

      oCtx.scale(2, 2);

      const w = NOTE_WIDTH;
      const h = NOTE_HEIGHT;

      // Dark, subdued banknote paper base
      const paperGrad = oCtx.createLinearGradient(0, 0, w, h);
      paperGrad.addColorStop(0, '#0a140f');
      paperGrad.addColorStop(0.5, '#0d1b14');
      paperGrad.addColorStop(1, '#09130e');
      oCtx.fillStyle = paperGrad;
      oCtx.beginPath();
      oCtx.roundRect(0, 0, w, h, 6);
      oCtx.fill();

      // Outer intaglio engraved border (dark muted sage/emerald)
      oCtx.strokeStyle = 'rgba(74, 222, 128, 0.28)';
      oCtx.lineWidth = 1.5;
      oCtx.beginPath();
      oCtx.roundRect(2, 2, w - 4, h - 4, 5);
      oCtx.stroke();

      // Inner security micro-pattern guilloche border
      oCtx.strokeStyle = 'rgba(34, 197, 94, 0.18)';
      oCtx.lineWidth = 1;
      oCtx.strokeRect(5, 5, w - 10, h - 10);
      oCtx.strokeRect(7, 7, w - 14, h - 14);

      // Fine geometric corner rosettes
      const corners = [
        [12, 12],
        [w - 12, 12],
        [12, h - 12],
        [w - 12, h - 12],
      ];
      oCtx.fillStyle = 'rgba(74, 222, 128, 0.45)';
      oCtx.font = 'bold 9px "JetBrains Mono", monospace';
      oCtx.textAlign = 'center';
      oCtx.textBaseline = 'middle';

      corners.forEach(([cx, cy]) => {
        oCtx.beginPath();
        oCtx.arc(cx, cy, 6, 0, Math.PI * 2);
        oCtx.strokeStyle = 'rgba(74, 222, 128, 0.35)';
        oCtx.stroke();
        oCtx.fillText(denomination, cx, cy);
      });

      if (!isBack) {
        // -------------------------------------------------------------
        // OBVERSE (FRONT OF BILL)
        // -------------------------------------------------------------
        // Blue 3D security ribbon for $100 bills
        if (denomination === '100') {
          const ribbonX = w * 0.38;
          oCtx.fillStyle = 'rgba(14, 116, 144, 0.35)';
          oCtx.fillRect(ribbonX, 7, 12, h - 14);
          oCtx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
          oCtx.lineWidth = 0.8;
          oCtx.strokeRect(ribbonX, 7, 12, h - 14);

          // Micro bells & 100 inside ribbon
          oCtx.fillStyle = 'rgba(103, 232, 249, 0.6)';
          oCtx.font = 'bold 6px monospace';
          oCtx.fillText('100', ribbonX + 6, 20);
          oCtx.fillText('★', ribbonX + 6, 45);
          oCtx.fillText('100', ribbonX + 6, 70);
        }

        // Header: "FEDERAL RESERVE NOTE"
        oCtx.fillStyle = 'rgba(167, 243, 208, 0.55)';
        oCtx.font = 'bold 6.5px "Space Grotesk", sans-serif';
        oCtx.textAlign = 'center';
        oCtx.fillText('THE UNITED STATES OF AMERICA', w / 2, 14);

        oCtx.font = '5px "JetBrains Mono", monospace';
        oCtx.fillStyle = 'rgba(110, 231, 183, 0.4)';
        oCtx.fillText('FEDERAL RESERVE NOTE', w / 2, 21);

        // Federal Reserve seal (Left circle)
        oCtx.beginPath();
        oCtx.arc(w * 0.22, h / 2, 12, 0, Math.PI * 2);
        oCtx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
        oCtx.lineWidth = 1;
        oCtx.stroke();
        oCtx.font = 'bold 9px serif';
        oCtx.fillStyle = 'rgba(74, 222, 128, 0.5)';
        oCtx.fillText('USA', w * 0.22, h / 2 + 1);

        // Portrait Oval Vignette (Center)
        oCtx.beginPath();
        oCtx.ellipse(w * 0.58, h / 2, 15, 20, 0, 0, Math.PI * 2);
        oCtx.strokeStyle = 'rgba(74, 222, 128, 0.35)';
        oCtx.lineWidth = 1.2;
        oCtx.stroke();

        // Portrait silhouette with intaglio hatch lines
        oCtx.fillStyle = 'rgba(6, 78, 59, 0.4)';
        oCtx.fill();
        oCtx.fillStyle = 'rgba(167, 243, 208, 0.45)';
        oCtx.font = 'bold 8px serif';
        oCtx.fillText('$' + denomination, w * 0.58, h / 2);

        // Department of the Treasury Seal (Right)
        oCtx.beginPath();
        oCtx.arc(w * 0.82, h / 2, 10, 0, Math.PI * 2);
        oCtx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
        oCtx.stroke();
        oCtx.font = 'bold 7px serif';
        oCtx.fillStyle = 'rgba(52, 211, 153, 0.45)';
        oCtx.fillText('TREASURY', w * 0.82, h / 2);

        // Bottom denomination banner
        oCtx.fillStyle = 'rgba(167, 243, 208, 0.6)';
        oCtx.font = 'bold 6.5px "Space Grotesk", sans-serif';
        const denText =
          denomination === '100'
            ? 'ONE HUNDRED DOLLARS'
            : denomination === '50'
            ? 'FIFTY DOLLARS'
            : 'TWENTY DOLLARS';
        oCtx.fillText(denText, w / 2, h - 12);

        // Serial number in dark mint green monospace
        oCtx.font = 'bold 5.5px monospace';
        oCtx.fillStyle = 'rgba(74, 222, 128, 0.5)';
        oCtx.textAlign = 'left';
        oCtx.fillText('B 84729104 K', 22, h - 11);
        oCtx.textAlign = 'right';
        oCtx.fillText('B 84729104 K', w - 22, 22);
      } else {
        // -------------------------------------------------------------
        // REVERSE (CLASSIC GREENBACK BACK OF BILL)
        // -------------------------------------------------------------
        oCtx.fillStyle = 'rgba(167, 243, 208, 0.5)';
        oCtx.font = 'bold 7px "Space Grotesk", sans-serif';
        oCtx.textAlign = 'center';
        oCtx.fillText('THE UNITED STATES OF AMERICA', w / 2, 15);

        oCtx.font = 'italic 5px serif';
        oCtx.fillStyle = 'rgba(110, 231, 183, 0.4)';
        oCtx.fillText('IN GOD WE TRUST', w / 2, 23);

        // Central architectural monument frame
        oCtx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
        oCtx.strokeRect(w * 0.28, 28, w * 0.44, 34);

        // Engraving hatching
        oCtx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        oCtx.fillRect(w * 0.28, 28, w * 0.44, 34);

        oCtx.fillStyle = 'rgba(167, 243, 208, 0.55)';
        oCtx.font = 'bold 11px "Space Grotesk", sans-serif';
        oCtx.fillText('$' + denomination, w / 2, 48);

        // Bottom text
        oCtx.font = 'bold 7px "Space Grotesk", sans-serif';
        oCtx.fillText('ONE HUNDRED DOLLARS', w / 2, h - 13);
      }

      // Micro-texture security thread line across the bill
      oCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      oCtx.lineWidth = 0.5;
      oCtx.beginPath();
      oCtx.moveTo(0, h * 0.45);
      oCtx.lineTo(w, h * 0.45);
      oCtx.stroke();

      return off;
    };

    // Pre-create standard bill types
    textures.push(createNoteTexture('100', false)); // $100 Front
    textures.push(createNoteTexture('100', true)); // $100 Reverse Greenback
    textures.push(createNoteTexture('50', false)); // $50 Front
    textures.push(createNoteTexture('20', false)); // $20 Front

    // =========================================================================
    // 2. PARTICLE SYSTEM: FLOATING 3D TUMBLING BANKNOTES
    // =========================================================================
    const TOTAL_NOTES = 26; // balanced density without clutter
    const notes: NoteParticle[] = [];

    const initNote = (initialY?: number): NoteParticle => {
      const z = 0.35 + Math.random() * 0.75; // 0.35 (small/far) to 1.1 (large/front)
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.35 + z * 0.55 + Math.random() * 0.3, // slow, gentle downward drift
        yaw: Math.random() * Math.PI * 2,
        dYaw: (Math.random() - 0.5) * 0.025,
        pitch: Math.random() * Math.PI * 2,
        dPitch: (Math.random() - 0.5) * 0.02,
        roll: (Math.random() - 0.5) * 0.8,
        dRoll: (Math.random() - 0.5) * 0.012,
        textureIndex: Math.floor(Math.random() * textures.length),
        // Subdued low brightness: 0.18 to 0.42 alpha max
        baseAlpha: 0.16 + z * 0.22,
        flutterPhase: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < TOTAL_NOTES; i++) {
      notes.push(initNote());
    }

    // Pointer air-drag tracking
    let mouse = { x: width / 2, y: height / 2 };
    let prevMouse = { x: width / 2, y: height / 2 };
    let mouseVel = { x: 0, y: 0 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let cx = 0;
      let cy = 0;
      if ('touches' in e && e.touches.length > 0) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ('clientX' in e) {
        cx = e.clientX;
        cy = e.clientY;
      }
      mouse.x = cx;
      mouse.y = cy;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // Gentle air wave impulse on click/tap
      let cx = 0;
      let cy = 0;
      if ('touches' in e && e.touches.length > 0) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ('clientX' in e) {
        cx = e.clientX;
        cy = e.clientY;
      }

      notes.forEach((note) => {
        const dx = note.x - cx;
        const dy = note.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 260 && dist > 1) {
          const force = (1 - dist / 260) * 2.2;
          note.vx += (dx / dist) * force;
          note.vy += (dy / dist) * force * 0.8;
          note.dYaw += (Math.random() - 0.5) * 0.08;
          note.dPitch += (Math.random() - 0.5) * 0.08;
        }
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Measure mouse velocity
      mouseVel.x = (mouse.x - prevMouse.x) * 0.3;
      mouseVel.y = (mouse.y - prevMouse.y) * 0.3;
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      // Update and draw notes
      for (let i = 0; i < notes.length; i++) {
        const n = notes[i];

        // Flutter oscillation (air resistance swaying side-to-side)
        n.flutterPhase += 0.025;
        const flutter = Math.sin(n.flutterPhase) * 0.45;

        // Pointer turbulence interaction
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 180 && mDist > 1) {
          const repel = (1 - mDist / 180) * 0.7;
          n.vx += (mdx / mDist) * repel + mouseVel.x * 0.15;
          n.vy += (mdy / mDist) * repel * 0.5 + mouseVel.y * 0.15;
          n.dYaw += 0.005;
        }

        // Apply friction
        n.vx *= 0.98;
        n.vy = n.vy * 0.98 + (0.35 + n.z * 0.45) * 0.02;

        n.x += n.vx + flutter;
        n.y += n.vy;

        // 3D rotations
        n.yaw += n.dYaw;
        n.pitch += n.dPitch;
        n.roll += n.dRoll;

        // Off-screen wraparound
        const margin = 140;
        if (n.y > height + margin) {
          n.y = -margin;
          n.x = Math.random() * width;
        } else if (n.y < -margin * 1.5) {
          n.y = height + margin;
        }

        if (n.x > width + margin) {
          n.x = -margin;
        } else if (n.x < -margin) {
          n.x = width + margin;
        }

        // -------------------------------------------------------------
        // 3D PERSPECTIVE TUMBLE DRAWING
        // -------------------------------------------------------------
        ctx.save();
        ctx.translate(n.x, n.y);

        // 3D tumbling scale projection using trigonometry
        const scaleX = Math.cos(n.yaw);
        const scaleY = Math.cos(n.pitch);

        ctx.rotate(n.roll);
        ctx.scale(n.z * scaleX, n.z * scaleY);

        // Low, decreased brightness opacity (darkened aesthetic)
        const facing = Math.abs(scaleX * scaleY);
        const finalAlpha = Math.max(0.04, n.baseAlpha * (0.45 + facing * 0.55));
        ctx.globalAlpha = finalAlpha;

        const img = textures[n.textureIndex];
        const halfW = NOTE_WIDTH / 2;
        const halfH = NOTE_HEIGHT / 2;

        // Subtle soft shadow behind bill for realistic depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = 12 * n.z;
        ctx.shadowOffsetX = 3 * n.z;
        ctx.shadowOffsetY = 6 * n.z;

        ctx.drawImage(img, -halfW, -halfH, NOTE_WIDTH, NOTE_HEIGHT);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* Background canvas of drifting 3D dollar bills with decreased brightness */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Atmospheric dark gradient overlay ensuring decreased brightness & high text legibility */}
      <div className="absolute inset-0 bg-[#07080d]/65 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07080d]/40 to-[#07080d]/90 pointer-events-none" />
    </div>
  );
};
