"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Zap,
  Flame,
  CheckCircle2,
  BookOpen,
  Terminal,
  Cpu,
  Network,
  Bot,
  ArrowRight,
  Play,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-2xl border border-cyber-cyan/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>OPERATOR CONTROL MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Welcome Back, <span className="glow-text-cyan">{user?.username || "Cyber Operator"}</span>
          </h1>
          <p className="text-xs text-cyber-muted max-w-xl">
            Self-hosted offline environment active. Complete labs, earn XP, run Docker & VM topologies, and consult your offline AI mentor.
          </p>
        </div>

        <div className="flex items-center gap-4 z-10">
          <Link
            href="/paths"
            className="px-5 py-3 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-cyan transition-all flex items-center gap-2"
          >
            <span>RESUME LEARNING</span>
            <Play className="w-4 h-4 fill-slate-950" />
          </Link>
        </div>
      </div>

      {/* Stats Widget Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="glass-panel p-5 rounded-xl border border-cyber-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyber-muted font-mono uppercase">Level & Rank</span>
            <Zap className="w-5 h-5 text-cyber-cyan" />
          </div>
          <p className="text-2xl font-bold text-white">Level 4 Operator</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyber-cyan h-full w-3/4"></div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyber-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyber-muted font-mono uppercase">Total XP</span>
            <TrendingUp className="w-5 h-5 text-cyber-emerald" />
          </div>
          <p className="text-2xl font-bold text-white">1,450 XP</p>
          <p className="text-[11px] text-cyber-emerald mt-1 font-mono">+150 XP gained today</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyber-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyber-muted font-mono uppercase">Daily Streak</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white">7 Days Active</p>
          <p className="text-[11px] text-amber-400 mt-1 font-mono">Streak multiplier: 1.2x</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-cyber-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyber-muted font-mono uppercase">Completed Labs</span>
            <CheckCircle2 className="w-5 h-5 text-cyber-purple" />
          </div>
          <p className="text-2xl font-bold text-white">12 Labs Passed</p>
          <p className="text-[11px] text-cyber-purple mt-1 font-mono">0 Flags pending</p>
        </div>
      </div>

      {/* Platform Module Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>OPERATIONAL MODULES</span>
          <span className="text-xs font-mono text-cyber-cyan">(19 Ready)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/workspace"
            className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-cyan/50 transition-all group"
          >
            <div className="p-3 w-fit rounded-xl bg-cyber-cyan/10 text-cyber-cyan mb-4 group-hover:shadow-neon-cyan transition-all">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyber-cyan transition-all">
              Cybersecurity Workspace
            </h3>
            <p className="text-xs text-cyber-muted mb-4">
              Interactive Web Terminal, PCAP Packet Dissector, Log Analyzer, Hash Identifier, JWT Inspector & HTTP Builder.
            </p>
            <span className="text-xs text-cyber-cyan font-mono flex items-center gap-1">
              Launch Workspace <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/network-builder"
            className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-purple/50 transition-all group"
          >
            <div className="p-3 w-fit rounded-xl bg-cyber-purple/10 text-cyber-purple mb-4 group-hover:shadow-neon-purple transition-all">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyber-purple transition-all">
              Network Lab Builder
            </h3>
            <p className="text-xs text-cyber-muted mb-4">
              Drag-and-drop network topology canvas. Build routers, switches, firewalls, and victim DMZ nodes.
            </p>
            <span className="text-xs text-cyber-purple font-mono flex items-center gap-1">
              Open Canvas <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/ai-mentor"
            className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-emerald/50 transition-all group"
          >
            <div className="p-3 w-fit rounded-xl bg-cyber-emerald/10 text-cyber-emerald mb-4 group-hover:shadow-neon-emerald transition-all">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyber-emerald transition-all">
              AI Cyber Mentor
            </h3>
            <p className="text-xs text-cyber-muted mb-4">
              Ollama local LLM + multi-provider assistant. Generates YARA/Sigma rules, lab hints, & interview questions.
            </p>
            <span className="text-xs text-cyber-emerald font-mono flex items-center gap-1">
              Consult AI Mentor <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
