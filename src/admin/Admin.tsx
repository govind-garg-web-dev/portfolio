import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadData, resetData, type SiteData } from "../store";
import { loadFromSupabase, saveToSupabase } from "../lib/db";
import { supabase, type AuthUser } from "../lib/supabase";
import AdminLogin from "./AdminLogin";
import HeroAdmin from "./sections/HeroAdmin";
import NavAdmin from "./sections/NavAdmin";
import ProjectsAdmin from "./sections/ProjectsAdmin";
import ExplorationsAdmin from "./sections/ExplorationsAdmin";
import StatsAdmin from "./sections/StatsAdmin";
import FooterAdmin from "./sections/FooterAdmin";
import BlogAdmin from "./sections/BlogAdmin";

type Section = "hero" | "nav" | "projects" | "blog" | "explorations" | "stats" | "footer";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "hero", label: "Hero", icon: "◈" },
  { id: "nav", label: "Navigation", icon: "≡" },
  { id: "projects", label: "Projects", icon: "⊞" },
  { id: "blog", label: "Blog / Journal", icon: "✍" },
  { id: "explorations", label: "Explorations", icon: "◎" },
  { id: "stats", label: "Stats", icon: "#" },
  { id: "footer", label: "Footer", icon: "↓" },
];

export default function Admin() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [data, setData] = useState<SiteData>(loadData);
  const [dataLoading, setDataLoading] = useState(false);
  const [active, setActive] = useState<Section>("hero");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Auth listener ────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Load data from Supabase once authenticated ───────────────────────────
  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    loadFromSupabase()
      .then((d) => setData(d))
      .finally(() => setDataLoading(false));
  }, [user]);

  // ── Mutations ────────────────────────────────────────────────────────────
  const update = useCallback((patch: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setSaved(false);
    setSaveError("");
  }, []);

  const handleSave = async () => {
    setSaveError("");
    try {
      await saveToSupabase(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    const defaults = resetData();
    setData(defaults);
    setSaved(false);
    try {
      await saveToSupabase(defaults);
    } catch {}
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const renderSection = () => {
    switch (active) {
      case "hero":   return <HeroAdmin data={data.hero} onChange={(hero) => update({ hero })} />;
      case "nav":    return <NavAdmin data={data.nav} onChange={(nav) => update({ nav })} />;
      case "projects": return <ProjectsAdmin data={data.projects} onChange={(projects) => update({ projects })} />;
      case "blog":   return <BlogAdmin data={data.blog} onChange={(blog) => update({ blog })} />;
      case "explorations": return <ExplorationsAdmin data={data.explorations} onChange={(explorations) => update({ explorations })} />;
      case "stats":  return <StatsAdmin data={data.stats} onChange={(stats) => update({ stats })} />;
      case "footer": return (
        <FooterAdmin
          footer={data.footer}
          socials={data.socials}
          onFooterChange={(footer) => update({ footer })}
          onSocialsChange={(socials) => update({ socials })}
        />
      );
    }
  };

  // ── Auth loading ─────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-stroke border-t-[#89AACC] animate-spin" />
      </div>
    );
  }

  // ── Not logged in → show login page ─────────────────────────────────────
  if (!user) return <AdminLogin />;

  // ── Data loading spinner ─────────────────────────────────────────────────
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-stroke border-t-[#89AACC] animate-spin" />
        <p className="text-xs text-muted">Loading content from Supabase…</p>
      </div>
    );
  }

  // ── Admin UI ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg text-text-primary font-body flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-surface/90 backdrop-blur-md border-b border-stroke flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-muted hover:text-text-primary"
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full flex-shrink-0">
              <span className="absolute inset-0 rounded-full accent-gradient" />
              <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
                <span className="font-display italic text-[11px] text-text-primary leading-none">JA</span>
              </span>
            </div>
            <span className="text-sm font-semibold text-text-primary hidden sm:block">Admin</span>
            <span className="text-xs text-muted hidden sm:block">/ Portfolio CMS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Logged-in user */}
          <span className="hidden md:flex items-center gap-1.5 text-xs text-muted px-3 py-1.5 bg-stroke/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            {user.email}
          </span>

          <Link to="/" className="text-xs text-muted hover:text-text-primary px-3 py-1.5 rounded-lg hover:bg-stroke/40 transition-all">
            ← View site
          </Link>
          <button
            onClick={handleReset}
            className="text-xs text-muted hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-900/20 transition-all hidden sm:block"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className={`text-xs font-medium px-4 py-1.5 rounded-lg transition-all ${
              saved
                ? "bg-green-900/40 text-green-400 border border-green-900/60"
                : "accent-gradient text-bg hover:opacity-90"
            }`}
          >
            {saved ? "✓ Saved" : "Save changes"}
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-muted hover:text-text-primary px-3 py-1.5 rounded-lg hover:bg-stroke/40 transition-all"
            title="Sign out"
          >
            Sign out
          </button>
        </div>
      </header>

      {saveError && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-red-900/40 border-b border-red-900/60 px-6 py-2 text-xs text-red-400 text-center">
          Save failed: {saveError}
        </div>
      )}

      <div className="flex flex-1 pt-14">
        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed md:sticky top-14 h-[calc(100vh-3.5rem)] w-56 bg-surface border-r border-stroke flex-shrink-0 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                  active === item.id
                    ? "text-text-primary bg-stroke/60 border-r-2 border-[#89AACC]"
                    : "text-muted hover:text-text-primary hover:bg-stroke/30"
                }`}
              >
                <span className="w-5 text-center opacity-60 font-mono text-xs">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-stroke space-y-3">
            <p className="text-xs text-muted">Saved to Supabase · reflected live.</p>
            <button
              onClick={handleLogout}
              className="w-full text-xs text-muted hover:text-red-400 text-left transition-colors"
            >
              Sign out ↗
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
            {renderSection()}

            <div className="mt-10 pt-6 border-t border-stroke flex items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs text-muted hover:text-red-400 transition-colors sm:hidden"
              >
                Reset to defaults
              </button>
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={handleSave}
                  className={`text-sm font-medium px-6 py-2.5 rounded-xl transition-all ${
                    saved
                      ? "bg-green-900/40 text-green-400 border border-green-900/60"
                      : "accent-gradient text-bg hover:opacity-90"
                  }`}
                >
                  {saved ? "✓ Saved!" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
