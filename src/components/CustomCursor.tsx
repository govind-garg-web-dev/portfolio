import { useEffect, useRef, useState } from "react";

interface CursorState {
  label: string;
  expanded: boolean;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [state, setState] = useState<CursorState>({ label: "", expanded: false });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Detect what's under cursor
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor], input, textarea, select, label");
      if (interactive) {
        const label = (interactive as HTMLElement).dataset.cursor ?? "";
        setState({ label, expanded: true });
      } else {
        setState({ label: "", expanded: false });
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // RAF loop — lerp the ring toward the dot
    const tick = () => {
      const lerp = 0.1;
      ring.current.x += (pos.current.x - ring.current.x) * lerp;
      ring.current.y += (pos.current.y - ring.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const ringSize = state.expanded ? 56 : 36;
  const dotSize = state.expanded ? 4 : 5;
  const dotOpacity = state.expanded ? 0.4 : 1;

  return (
    <>
      {/* Precise dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 99999,
          marginLeft: `-${dotSize / 2}px`,
          marginTop: `-${dotSize / 2}px`,
          opacity: clicking ? 0.5 : (visible ? dotOpacity : 0),
          transition: "width 0.2s, height 0.2s, opacity 0.3s, margin 0.2s",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Lagging gradient ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: "width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), margin 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s",
          willChange: "transform",
          // Gradient border via background + padding trick
          background: "linear-gradient(135deg, #89AACC, #4E85BF, #89AACC)",
          backgroundSize: "200% 200%",
          animation: "cursor-gradient-spin 3s linear infinite",
          padding: "1.5px",
          boxSizing: "border-box",
          boxShadow: state.expanded
            ? "0 0 18px 4px rgba(137,170,204,0.45), 0 0 40px 8px rgba(78,133,191,0.2)"
            : "0 0 10px 2px rgba(137,170,204,0.25), 0 0 24px 4px rgba(78,133,191,0.12)",
          transform: clicking ? "scale(0.85)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner dark fill */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: state.expanded
              ? "rgba(137,170,204,0.08)"
              : "rgba(10,10,10,0.85)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.25s",
          }}
        >
          {state.label && (
            <span
              style={{
                fontSize: "9px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {state.label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
