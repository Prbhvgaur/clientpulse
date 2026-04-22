import { DashboardNav } from "@/components/shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav />
      {children}
    </div>
  );
}
