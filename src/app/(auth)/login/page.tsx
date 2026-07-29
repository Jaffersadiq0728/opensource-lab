"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, User as UserIcon, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-cyber-border shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan mb-3 shadow-neon-cyan">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wider">TYROTECH AUTH</h2>
          <p className="text-xs text-cyber-muted font-mono">Sign in to access your offline cybersecurity workbench</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">USERNAME OR EMAIL</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="admin or student@tyrotech.local"
                className="w-full bg-slate-900 text-sm text-white pl-9 pr-4 py-2.5 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">ARGON2ID ENCRYPTED PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 text-sm text-white pl-9 pr-4 py-2.5 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyber-cyan text-slate-950 font-bold text-sm rounded-lg hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>{loading ? "AUTHENTICATING..." : "SIGN IN"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-cyber-muted">
          Don't have an account?{" "}
          <Link href="/register" className="text-cyber-cyan hover:underline font-mono">
            Register Student Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
