import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — North Texas Roofing" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error("Sign in failed", { description: error.message });
      navigate({ to: "/admin", replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      setBusy(false);
      if (error) return toast.error("Sign up failed", { description: error.message });
      toast.success("Account created", { description: "Check your email to confirm, then sign in." });
      setMode("signin");
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin" });
    if (result.error) { setBusy(false); toast.error("Google sign-in failed", { description: String(result.error) }); return; }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="min-h-dvh bg-navy-deep grid place-items-center px-4 py-24">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-white rounded-md p-2"><img src="/ntr-logo.svg" alt="North Texas Roofing" className="h-12 w-auto" /></div>
        </div>
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <div className="flex rounded-lg bg-secondary p-1 mb-6">
            {(["signin", "signup"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${mode === m ? "bg-white shadow text-navy" : "text-muted-foreground"}`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-navy">
            {mode === "signin" ? "Admin sign in" : "Create admin account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Access the North Texas Roofing dashboard." : "Sign up, then request admin access."}
          </p>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-navy">Email</span>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-md border border-input" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-navy">Password</span>
              <input required type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-md border border-input" />
            </label>
            <button disabled={busy} className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-md bg-orange-brand text-white font-bold shadow-glow hover:opacity-90 disabled:opacity-60">
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <button onClick={google} disabled={busy} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md border border-input bg-white hover:bg-secondary font-semibold text-navy disabled:opacity-60">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <a href="/" className="hover:text-orange-brand">← Back to website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
