import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success, the auth state change will re-render the parent and show Admin
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #89AACC 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="relative w-12 h-12 rounded-full">
            <span className="absolute inset-0 rounded-full accent-gradient" />
            <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-lg text-text-primary leading-none">JA</span>
            </span>
          </div>
        </div>

        <div className="bg-surface border border-stroke rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-text-primary mb-1">Admin login</h1>
          <p className="text-sm text-muted mb-8">Sign in to access the portfolio CMS.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-muted uppercase tracking-[0.2em] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted uppercase tracking-[0.2em] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-900/20 border border-red-900/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full rounded-xl py-2.5 text-sm font-medium text-bg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              <span className="absolute inset-0 accent-gradient" />
              <span className="relative z-10">
                {loading ? "Signing in..." : "Sign in"}
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted/40 mt-6">
          Portfolio CMS · Authorised access only
        </p>
      </div>
    </div>
  );
}
