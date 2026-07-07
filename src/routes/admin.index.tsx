import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const { data: rows } = await supabase.from("inquiries").select("id,status,created_at,name,service");
      return rows ?? [];
    },
  });

  const total = data?.length ?? 0;
  const newCount = data?.filter(r => r.status === "new").length ?? 0;
  const done = data?.filter(r => r.status === "closed").length ?? 0;
  const last7 = data?.filter(r => new Date(r.created_at) > new Date(Date.now() - 7 * 864e5)).length ?? 0;

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-navy">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Overview of lead activity across the site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Stat icon={Inbox} label="Total inquiries" value={total} tone="navy" />
        <Stat icon={Clock} label="New / unread" value={newCount} tone="orange" />
        <Stat icon={TrendingUp} label="Last 7 days" value={last7} tone="navy" />
        <Stat icon={CheckCircle2} label="Closed" value={done} tone="navy" />
      </div>

      <div className="mt-10 bg-white rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Recent inquiries</h2>
        </div>
        {data && data.length > 0 ? (
          <ul className="divide-y divide-border">
            {data.slice(0, 8).map(r => (
              <li key={r.id} className="py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-brand text-white grid place-items-center text-sm font-bold shrink-0">
                  {r.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-navy truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.service || "—"}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{new Date(r.created_at).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground py-8 text-center">No inquiries yet. Submissions from the contact form will appear here.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Inbox; label: string; value: number; tone: "navy" | "orange" }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
      <div className={`w-10 h-10 rounded-lg grid place-items-center ${tone === "orange" ? "bg-orange-brand text-white" : "bg-navy text-white"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="mt-4 text-3xl font-extrabold text-navy tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">{label}</div>
    </div>
  );
}
