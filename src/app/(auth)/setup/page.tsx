"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User as UserIcon, Mail, ArrowRight, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function SetupWizardPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetch("/api/system/setup")
      .then((res) => res.json())
      .then((data) => {
        if (!data.setupRequired) {
          setForbidden(true);
        }
      })
      .catch(() => {})
      .finally(() => setCheckingSetup(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/system/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Setup failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSetup) {
    return (
      <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center p-6 text-cyber-cyan font-mono text-xs">
        Detecting TyroTech Installation State...
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-cyber-red/40 text-center space-y-4">
          <div className="inline-flex p-3 rounded-xl bg-cyber-red/10 border border-cyber-red/30 text-cyber-red">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wider">403 FORBIDDEN</h2>
          <p className="text-xs text-cyber-muted font-mono leading-relaxed">
            Initial setup has already been completed for this TyroTech installation. The setup wizard is permanently locked.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full py-2.5 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-cyan transition-all"
          >
            GO TO LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center p-6">
      <div className="w-full max-w-lg glass-panel p-8 rounded-2xl border border-cyber-cyan/40 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan mb-3 shadow-neon-cyan">
            <Shield className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wider">Welcome to TyroTech</h1>
          <p className="text-xs text-cyber-cyan font-mono mt-1">
            Create your Administrator account to initialize this installation.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-cyber-muted mb-1">FULL NAME / DISPLAY NAME</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. System Owner"
              className="w-full bg-slate-900 text-white p-3 rounded-xl border border-cyber-border focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-cyber-muted mb-1">ADMINISTRATOR USERNAME</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-900 text-white pl-9 pr-4 py-3 rounded-xl border border-cyber-border focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-cyber-muted mb-1">EMAIL ADDRESS (OPTIONAL IN OFFLINE MODE)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@local.domain (optional)"
                className="w-full bg-slate-900 text-white pl-9 pr-4 py-3 rounded-xl border border-cyber-border focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cyber-muted mb-1">ARGON2ID PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 text-white pl-9 pr-4 py-3 rounded-xl border border-cyber-border focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-cyber-muted mb-1">CONFIRM PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 text-white pl-9 pr-4 py-3 rounded-xl border border-cyber-border focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/20 text-[11px] text-cyber-muted flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
            <span>
              This account will automatically receive <strong>Administrator</strong> privileges. Setup wizard will be permanently disabled after submission.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>{loading ? "INITIALIZING SYSTEM..." : "INITIALIZE SYSTEM & CREATE ADMIN"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
