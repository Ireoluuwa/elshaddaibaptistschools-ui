"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

interface FitToWidthProps {
  children: React.ReactNode;
  // When false, show the content at full size and let it scroll sideways.
  fit?: boolean;
  onScaleChange?: (scale: number) => void;
}

// Shrinks fixed-width content (like an A4 sheet) to fit narrow screens without
// changing its layout. Printing and PDF capture always use the full-size content.
export default function FitToWidth({ children, fit = true, onScaleChange }: FitToWidthProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const contentWidth = inner.scrollWidth;
      const fitScale = contentWidth ? Math.min(1, outer.clientWidth / contentWidth) : 1;
      onScaleChange?.(fitScale);
      const next = fit ? fitScale : 1;
      setScale(next);
      setHeight(inner.offsetHeight * next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [fit, onScaleChange]);

  return (
    <div
      ref={outerRef}
      className={`w-full print:h-auto! print:overflow-visible ${fit ? "overflow-hidden" : "overflow-x-auto"}`}
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="w-max mx-auto origin-top-left print:transform-none!"
        style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}
      >
        {children}
      </div>
    </div>
  );
}
