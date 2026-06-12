import { TriangleAlert } from 'lucide-react';

export default function Warning() {
  return (
    <div className="w-full flex items-center justify-center gap-2 border-b border-destructive/20 bg-destructive/10 px-4 py-2.5 text-center text-xs font-medium text-destructive sm:text-sm transition-colors">
      <TriangleAlert className="h-4 w-4 shrink-0 text-destructive" />
      <span>
        Це не реальний проект, а лише чорнетка, створена в межах проекту "Екошкола 2026"
      </span>
    </div>
  );
}