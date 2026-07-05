"use client";

import { useState } from "react";
import { archNodes, archEdges, type ArchNode } from "@/data/architecture";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const COLS = 5;
const ROWS = 3;
const CELL_W = 220;
const CELL_H = 130;
const NODE_W = 168;
const NODE_H = 76;
const WIDTH = COLS * CELL_W;
const HEIGHT = ROWS * CELL_H;

function center(node: ArchNode): { cx: number; cy: number } {
  return {
    cx: node.x * CELL_W + CELL_W / 2,
    cy: node.y * CELL_H + CELL_H / 2,
  };
}

export function Architecture() {
  const [active, setActive] = useState<ArchNode | null>(null);

  const connected = new Set(
    active
      ? archEdges
          .filter((e) => e.from === active.id || e.to === active.id)
          .flatMap((e) => [e.from, e.to])
      : [],
  );

  return (
    <section id="architecture" className="scroll-mt-20 bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="05"
          title="How I Think About Systems"
          subtitle="A production architecture drawn from stacks I've shipped on. Hover any component to see where I've used it."
        />

        <Reveal>
          <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="mx-auto block min-w-[820px] max-w-[1080px]"
              role="img"
              aria-label="Interactive system architecture diagram: clients, gateway, services, data stores, and cloud infrastructure"
            >
              {/* Edges with animated data flow */}
              {archEdges.map((edge) => {
                const from = archNodes.find((n) => n.id === edge.from)!;
                const to = archNodes.find((n) => n.id === edge.to)!;
                const a = center(from);
                const b = center(to);
                const highlighted =
                  active && (edge.from === active.id || edge.to === active.id);
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={a.cx}
                      y1={a.cy}
                      x2={b.cx}
                      y2={b.cy}
                      stroke={highlighted ? "var(--accent)" : "var(--border-bright)"}
                      strokeWidth={highlighted ? 1.8 : 1}
                      strokeDasharray="5 6"
                      opacity={active && !highlighted ? 0.25 : 0.8}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="22"
                        to="0"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                    </line>
                  </g>
                );
              })}

              {/* Nodes */}
              {archNodes.map((node) => {
                const { cx, cy } = center(node);
                const isActive = active?.id === node.id;
                const isConnected = connected.has(node.id);
                const dimmed = active && !isActive && !isConnected;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${cx - NODE_W / 2}, ${cy - NODE_H / 2})`}
                    onMouseEnter={() => setActive(node)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(node)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}: ${node.description}`}
                    className="cursor-pointer outline-none"
                    opacity={dimmed ? 0.35 : 1}
                  >
                    <rect
                      width={NODE_W}
                      height={NODE_H}
                      rx={10}
                      fill="var(--surface-raised)"
                      stroke={isActive ? "var(--accent)" : "var(--border)"}
                      strokeWidth={isActive ? 1.5 : 1}
                    />
                    <text
                      x={NODE_W / 2}
                      y={30}
                      textAnchor="middle"
                      fill="var(--foreground)"
                      fontSize={14}
                      fontWeight={600}
                      fontFamily="var(--font-sans)"
                    >
                      {node.label}
                    </text>
                    <text
                      x={NODE_W / 2}
                      y={52}
                      textAnchor="middle"
                      fill="var(--accent)"
                      fontSize={10.5}
                      fontFamily="var(--font-mono)"
                    >
                      {node.technologies[0]}
                      {node.technologies.length > 1 ? ` +${node.technologies.length - 1}` : ""}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel */}
          <div
            className={cn(
              "mt-4 min-h-20 rounded-xl border border-line bg-surface p-5 transition-opacity",
              active ? "opacity-100" : "opacity-70",
            )}
            aria-live="polite"
          >
            {active ? (
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-accent">{active.label}</p>
                  <p className="mt-1 max-w-xl text-sm text-muted">{active.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">$</span> hover a component to inspect it
                <span className="caret-blink">_</span>
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
