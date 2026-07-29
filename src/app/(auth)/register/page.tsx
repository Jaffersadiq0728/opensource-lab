"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, User as UserIcon, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
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
          <h2 className="text-2xl font-bold text-white tracking-wider">CREATE PROFILE</h2>
          <p className="text-xs text-cyber-muted font-mono">Initialize your self-hosted TyroTech identity</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cybersec@tyrotech.local"
                className="w-full bg-slate-900 text-sm text-white pl-9 pr-4 py-2.5 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">HANDLE / USERNAME</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cyberofficial"
                className="w-full bg-slate-900 text-sm text-white pl-9 pr-4 py-2.5 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">ARGON2ID PASSWORD</label>
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

          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1.5">ROLE ASSIGNMENT</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 text-sm text-white px-3 py-2.5 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan font-mono"
            >
              <option value="STUDENT">STUDENT OPERATOR</option>
              <option value="ADMIN">SYSTEM ADMINISTRATOR</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyber-cyan text-slate-950 font-bold text-sm rounded-lg hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>{loading ? "INITIALIZING..." : "REGISTER IDENTITY"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-cyber-muted">
          Already registered?{" "}
          <Link href="/login" className="text-cyber-cyan hover:underline font-mono">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
