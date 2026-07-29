"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, User as UserIcon, LogOut, Activity, Flame, Zap } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="h-16 bg-cyber-card/80 backdrop-blur-md border-b border-cyber-border px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Global Search Bar */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-cyber-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search CVEs, MITRE techniques, tools, courses, labs..."
          className="w-full bg-slate-900/90 text-xs text-white placeholder-cyber-muted pl-9 pr-4 py-2 rounded-lg border border-cyber-border focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
        />
      </div>

      {/* Right Stats & User Menu */}
      <div className="flex items-center gap-5">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>7 Day Streak</span>
        </div>

        {/* XP Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Zap className="w-4 h-4" />
          <span>1,450 XP</span>
        </div>

        {/* Doctor Status Indicator */}
        <Link
          href="/admin/system"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 text-[11px] font-mono hover:bg-cyber-emerald/20 transition-all"
        >
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>System Ready</span>
        </Link>

        <button className="p-2 text-cyber-muted hover:text-white rounded-lg hover:bg-slate-800 transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyber-cyan"></span>
        </button>

        {/* User Account Pill */}
        {user ? (
          <div className="flex items-center gap-3 pl-3 border-l border-cyber-border">
            <div className="text-right">
              <p className="text-xs font-semibold text-white">{user.username}</p>
              <p className="text-[10px] text-cyber-cyan font-mono uppercase">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-cyber-muted hover:text-cyber-red rounded-lg hover:bg-cyber-red/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs text-cyber-muted hover:text-white transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 text-xs bg-cyber-cyan text-slate-950 font-semibold rounded-lg hover:shadow-neon-cyan transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
