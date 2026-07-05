import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Numbered section header in the style of an annotated spec document. */
export function SectionHeading({ index, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      <p className="font-mono text-sm text-accent" aria-hidden>
        <span className="text-muted">{"//"}</span> {index}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-muted">{subtitle}</p> : null}
    </div>
  );
}
