import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={ref}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-elegant select-none cursor-ew-resize bg-muted"
    >
      <img src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeAlt} className="absolute inset-0 h-full object-cover" style={{ width: `${ref.current?.clientWidth ?? 0}px`, maxWidth: "none" }} loading="lazy" />
      </div>
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 text-white text-xs font-bold tracking-wide">BEFORE</div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-orange-brand text-white text-xs font-bold tracking-wide">AFTER</div>
      <div className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none" style={{ left: `calc(${pos}% - 2px)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-elegant grid place-items-center">
          <MoveHorizontal className="w-5 h-5 text-navy" />
        </div>
      </div>
    </div>
  );
}
