import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../css/background.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const measureAndResizeCanvas = () => {
      const prevDisplay = canvas.style.display;
      canvas.style.display = "none";

      const docEl = document.documentElement;
      const body = document.body;

      const contentWidth = Math.max(
        docEl.scrollWidth,
        docEl.clientWidth,
        body?.scrollWidth || 0
      );

      const contentHeight = Math.max(
        docEl.scrollHeight,
        docEl.clientHeight,
        body?.scrollHeight || 0,
        window.innerHeight
      );

      canvas.style.display = prevDisplay || "";

      canvas.style.width = `${contentWidth}px`;
      canvas.style.height = `${contentHeight}px`;

      canvas.width = Math.floor(contentWidth * dpr);
      canvas.height = Math.floor(contentHeight * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    measureAndResizeCanvas();

    const onWindowResize = () => measureAndResizeCanvas();
    window.addEventListener("resize", onWindowResize);

    const ro = new ResizeObserver(() => measureAndResizeCanvas());
    ro.observe(document.body);

    const rafMeasure = requestAnimationFrame(measureAndResizeCanvas);

    const particles: Particle[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * (canvas.width / dpr),
      y: Math.random() * (canvas.height / dpr),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.7 + 1,
    }));

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let rafId = 0;
    let running = true;

    const draw = () => {
      if (!running) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;

        if (Math.abs(dx) < 200 && Math.abs(dy) < 200) {
          p.x += dx * 0.0009;
          p.y += dy * 0.0009;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width / dpr) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height / dpr) p.vy *= -1;

        for (let i of particles) {
          if (Math.abs(p.x - i.x) < 100 && Math.abs(p.y - i.y) < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(i.x, i.y);
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = "rgba(26, 26, 26, 0.53)";
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(7, 49, 117, 1)";
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafMeasure);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
    };
  }, [location]); 

  return <canvas ref={canvasRef} className="background-canvas" />;
}
