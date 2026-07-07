import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/inquiries")({
  component: InquiriesPage,
});

const STATUSES = ["new", "contacted", "scheduled", "closed"] as const;
type Status = typeof STATUSES[number];

function InquiriesPage() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const list = (data ?? []).filter(r => filter === "all" || r.status === filter);
  const current = list.find(r => r.id === selected) ?? list[0];

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) toast.error("Update failed", { description: error.message });
    else { toast.success("Status updated"); qc.invalidateQueries({ queryKey: ["inquiries"] }); qc.invalidateQueries({ queryKey: ["admin-overview"] }); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) toast.error("Delete failed", { description: error.message });
    else { toast.success("Deleted"); setSelected(null); qc.invalidateQueries({ queryKey: ["inquiries"] }); qc.invalidateQueries({ queryKey: ["admin-overview"] }); }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-navy">Inquiries</h1>
      <p className="text-muted-foreground mt-1">Leads submitted through the website contact form.</p>

      <div className="flex flex-wrap gap-2 mt-6">
        {(["all", ...STATUSES] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
              filter === s ? "bg-navy text-white" : "bg-white text-navy border border-border hover:border-orange"
            }`}
          >
            {s} {s !== "all" && `(${data?.filter(r => r.status === s).length ?? 0})`}
          </button>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
          ) : list.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No inquiries in this filter.</div>
          ) : (
            <ul className="divide-y divide-border max-h-[70vh] overflow-y-auto">
              {list.map(r => (
                <li key={r.id}>
                  <button
                    onClick={() => setSelected(r.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-secondary transition ${current?.id === r.id ? "bg-secondary" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-navy truncate">{r.name}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{r.service || "—"}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{new Date(r.created_at).toLocaleString()}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {current ? (
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-navy">{current.name}</h2>
                <div className="text-xs text-muted-foreground mt-0.5">{new Date(current.created_at).toLocaleString()}</div>
              </div>
              <button onClick={() => remove(current.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-md" aria-label="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`tel:${current.phone}`} className="flex items-center gap-2 hover:text-orange-brand"><Phone className="w-4 h-4 text-orange-brand" /> {current.phone}</a>
              <a href={`mailto:${current.email}`} className="flex items-center gap-2 hover:text-orange-brand"><Mail className="w-4 h-4 text-orange-brand" /> {current.email}</a>
              {current.address && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-brand" /> {current.address}</div>}
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-muted-foreground uppercase">Service</dt><dd className="font-semibold">{current.service || "—"}</dd></div>
              <div><dt className="text-xs text-muted-foreground uppercase">Contact</dt><dd className="font-semibold">{current.contact_method || "—"}</dd></div>
            </dl>

            {current.message && (
              <div className="mt-5">
                <div className="text-xs text-muted-foreground uppercase mb-1">Message</div>
                <p className="bg-secondary rounded-md p-3 text-sm leading-relaxed">{current.message}</p>
              </div>
            )}

            <div className="mt-6">
              <div className="text-xs text-muted-foreground uppercase font-semibold mb-2">Status</div>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(current.id, s)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition ${
                      current.status === s ? "bg-orange-brand text-white" : "bg-secondary text-navy hover:bg-secondary/70"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
            Select an inquiry to view details.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone: Record<string, string> = {
    new: "bg-orange-brand text-white",
    contacted: "bg-navy text-white",
    scheduled: "bg-blue-100 text-blue-800",
    closed: "bg-gray-200 text-gray-700",
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${tone[status] ?? "bg-gray-200"}`}>{status}</span>;
}
