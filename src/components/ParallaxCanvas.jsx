import { useEffect, useRef } from "react";

// Layer order and depths match the original index.html
const LAYERS = [
  { src: "/assets/parallax/1.png", depth: 0.35 },
  { src: "/assets/parallax/6.png", depth: 0.2 },
  { src: "/assets/parallax/3.png", depth: 0.65 },
  { src: "/assets/parallax/2.png", depth: 0.8 },
  { src: "/assets/parallax/4.png", depth: 1 },
];

const PARALLAX_MAX = 110;
const PARALLAX_LERP = 0.1;
const HOVER_BLEND_LERP = 0.07;
const FLOAT_AMP_Y = 18;
const FLOAT_AMP_X = 6;
const FLOAT_SPEED = 0.0009;

export default function ParallaxCanvas({ className = "" }) {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const stateRef = useRef({
    parallax: { x: 0, y: 0 },
    parallaxTarget: { x: 0, y: 0 },
    hovering: false,
    hoverBlend: 0,
    rafId: null,
  });

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const layers = layerRefs.current;
    const s = stateRef.current;

    function setParallaxTarget(clientX, clientY) {
      const rect = container.getBoundingClientRect();
      s.parallaxTarget.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      s.parallaxTarget.y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function getFloatOffset(time, depth, index) {
      const phase = index * 0.65;
      const t = time * FLOAT_SPEED;
      return {
        x: Math.sin(t + phase) * FLOAT_AMP_X * depth,
        y: Math.sin(t * 1.15 + phase + 0.5) * -FLOAT_AMP_Y * depth,
      };
    }

    function tick(time) {
      s.hoverBlend += ((s.hovering ? 1 : 0) - s.hoverBlend) * HOVER_BLEND_LERP;
      s.parallax.x += (s.parallaxTarget.x - s.parallax.x) * PARALLAX_LERP;
      s.parallax.y += (s.parallaxTarget.y - s.parallax.y) * PARALLAX_LERP;

      layers.forEach((layer, index) => {
        if (!layer) return;
        const depth = LAYERS[index].depth;
        const float = getFloatOffset(time, depth, index);

        const px = s.parallax.x * PARALLAX_MAX * depth;
        const py = s.parallax.y * PARALLAX_MAX * depth;

        const x = float.x * (1 - s.hoverBlend) + px * s.hoverBlend;
        const y = float.y * (1 - s.hoverBlend) + py * s.hoverBlend;

        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      s.rafId = requestAnimationFrame(tick);
    }

    const onMouseEnter = () => { s.hovering = true; };
    const onMouseMove = (e) => setParallaxTarget(e.clientX, e.clientY);
    const onMouseLeave = () => {
      s.hovering = false;
      s.parallaxTarget.x = 0;
      s.parallaxTarget.y = 0;
    };
    const onTouchStart = (e) => {
      s.hovering = true;
      if (e.touches.length) setParallaxTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => {
      if (e.touches.length) setParallaxTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      s.hovering = false;
      s.parallaxTarget.x = 0;
      s.parallaxTarget.y = 0;
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    s.rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.rafId);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive parallax illustration"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1024 / 1536",
        overflow: "hidden",
        cursor: "crosshair",
        userSelect: "none",
        WebkitUserDrag: "none",
        borderRadius: "32px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
      }}
    >
      {LAYERS.map(({ src }, i) => (
        <img
          key={src}
          ref={(el) => (layerRefs.current[i] = el)}
          src={src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            pointerEvents: "none",
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        />
      ))}
    </div>
  );
}
