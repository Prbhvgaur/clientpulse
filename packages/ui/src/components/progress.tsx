import { cn } from "../lib/utils";

export function Progress({ className, value }: { className?: string; value: number }) {
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-slate-950 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
