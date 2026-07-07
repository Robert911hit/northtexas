import { createFileRoute, redirect, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Inbox, LogOut, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — North Texas Roofing" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/auth" });
  },
  component: AdminShell,
});

function AdminShell() {
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { navigate({ to: "/auth", replace: true }); return; }
      setEmail(u.user.email ?? null);
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      setIsAdmin(!!roles?.some(r => r.role === "admin"));
      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (!ready) {
    return <div className="min-h-dvh grid place-items-center bg-secondary text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-dvh grid place-items-center bg-secondary px-4">
        <div className="max-w-md text-center bg-white rounded-2xl p-8 shadow-elegant">
          <ShieldAlert className="w-12 h-12 text-orange-brand mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-navy">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're signed in as <span className="font-semibold">{email}</span>, but this account doesn't have the <code>admin</code> role yet.
            An existing admin needs to grant it in Cloud → user_roles.
          </p>
          <div className="mt-6 flex gap-2 justify-center">
            <button onClick={signOut} className="px-4 py-2 rounded-md border border-input font-semibold">Sign out</button>
            <Link to="/" className="px-4 py-2 rounded-md bg-orange-brand text-white font-semibold">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-secondary">
      <aside className="fixed inset-y-0 left-0 w-60 bg-navy-deep text-white hidden md:flex flex-col p-5">
        <div className="bg-white rounded-md p-1.5 inline-block w-fit">
          <img src="/ntr-logo.svg" alt="NTR" className="h-8 w-auto" />
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          <AdminLink to="/admin" icon={LayoutDashboard} label="Overview" />
          <AdminLink to="/admin/inquiries" icon={Inbox} label="Inquiries" />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10 text-sm">
          <div className="text-white/60 text-xs">Signed in as</div>
          <div className="truncate font-semibold">{email}</div>
          <button onClick={signOut} className="mt-3 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="md:ml-60">
        <header className="md:hidden bg-navy-deep text-white p-4 flex items-center justify-between">
          <img src="/ntr-logo.svg" alt="NTR" className="h-8 bg-white p-1 rounded" />
          <button onClick={signOut} className="text-sm inline-flex items-center gap-1"><LogOut className="w-4 h-4" /> Sign out</button>
        </header>
        <main className="p-6 md:p-10 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLink({ to, icon: Icon, label }: { to: string; icon: typeof Inbox; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition"
      activeProps={{ className: "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold bg-orange-brand text-white" }}
    >
      <Icon className="w-4 h-4" /> {label}
    </Link>
  );
}
