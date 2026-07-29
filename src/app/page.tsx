import Link from "next/link";
import { Shield, Terminal, Cpu, Network, Bot, Lock, Server, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid text-white flex flex-col justify-between">
      {/* Top Hero Navigation */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-cyber-border/60 glass-panel">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-neon-cyan">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-widest flex items-center gap-1.5">
              TYRO<span className="text-cyber-cyan">TECH</span>
            </h1>
            <p className="text-[10px] text-cyber-muted font-mono tracking-widest uppercase">Self-Hosted Cybersecurity Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 text-xs text-cyber-muted hover:text-white font-mono transition-all"
          >
            LOGIN
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 text-xs bg-cyber-cyan text-slate-950 font-bold rounded-lg hover:shadow-neon-cyan transition-all flex items-center gap-2"
          >
            <span>LAUNCH PLATFORM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Cyber Hero Body */}
      <main className="max-w-7xl mx-auto px-8 py-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-8">
          <Zap className="w-4 h-4" />
          <span>PRODUCTION-GRADE • 100% OFFLINE CAPABLE • ZERO SAAS DEPENDENCY</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6">
          Master Modern <span className="glow-text-cyan">Cybersecurity</span> with Production-Ready Hands-On Labs
        </h2>

        <p className="text-cyber-muted text-lg max-w-2xl mb-10 font-normal">
          TyroTech is an open-source, self-hosted platform combining Docker container labs, VirtualBox VM management, drag-and-drop network topology building, interactive tool workbenches, and offline AI mentorship.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-cyber-cyan text-slate-950 font-bold text-sm rounded-xl hover:shadow-neon-cyan transition-all flex items-center gap-3"
          >
            <span>ENTER STUDENT DASHBOARD</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/workspace"
            className="px-8 py-4 bg-slate-900 border border-cyber-cyan/40 text-cyber-cyan font-mono text-sm rounded-xl hover:bg-cyber-cyan/10 transition-all flex items-center gap-3"
          >
            <Terminal className="w-5 h-5" />
            <span>OPEN CYBER WORKSPACE</span>
          </Link>
        </div>

        {/* Feature Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-left">
          <div className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-cyan/40 transition-all group">
            <div className="p-3 w-fit rounded-xl bg-cyber-cyan/10 text-cyber-cyan mb-4 group-hover:shadow-neon-cyan transition-all">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Multi-Engine Lab Architecture</h3>
            <p className="text-xs text-cyber-muted leading-relaxed">
              Launch Docker containers, VirtualBox/VMware virtual machines, and multi-node attack/defense scenarios instantly from your browser.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-purple/40 transition-all group">
            <div className="p-3 w-fit rounded-xl bg-cyber-purple/10 text-cyber-purple mb-4 group-hover:shadow-neon-purple transition-all">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Network Lab Builder</h3>
            <p className="text-xs text-cyber-muted leading-relaxed">
              Drag-and-drop topology designer to visually construct firewalls, virtual switches, routers, Kali attack boxes, and Active Directory domains.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-emerald/40 transition-all group">
            <div className="p-3 w-fit rounded-xl bg-cyber-emerald/10 text-cyber-emerald mb-4 group-hover:shadow-neon-emerald transition-all">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">AI Cyber Mentor</h3>
            <p className="text-xs text-cyber-muted leading-relaxed">
              Integrates with local Ollama LLMs or cloud providers to guide lab hints, generate YARA/Sigma rules, review CVEs, and simulate mock interviews.
            </p>
          </div>
        </div>
      </main>

      {/* Cyber Footer */}
      <footer className="px-8 py-6 border-t border-cyber-border/60 glass-panel flex flex-col md:flex-row items-center justify-between text-xs text-cyber-muted font-mono">
        <p>© 2026 TyroTech Platform. Open-Source & Self-Hosted.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyber-emerald" />
            19 Core Modules Active
          </span>
          <span className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyber-cyan" />
            Zero External Lock-In
          </span>
        </div>
      </footer>
    </div>
  );
}
