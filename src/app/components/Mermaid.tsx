"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "var(--font-geist-sans)",
});

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Remove any existing rendered elements before re-rendering
      ref.current.removeAttribute("data-processed");
      mermaid.render(`mermaid-${Math.floor(Math.random() * 10000)}`, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className="flex justify-center my-8 p-4 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
      <div ref={ref} className="mermaid w-full flex justify-center" />
    </div>
  );
};

export default Mermaid;
