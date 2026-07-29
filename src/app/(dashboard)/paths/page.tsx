"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowRight, Shield, Globe, Terminal, Cpu } from "lucide-react";

export default function LearningPathsPage() {
  const paths = [
    {
      id: "web-sec",
      title: "Web Security & OWASP Pentesting",
      desc: "Master SQL injection, XSS, SSRF, CSRF, authentication bypasses, and API pentesting.",
      icon: Globe,
      level: "BEGINNER",
      coursesCount: 5,
      progress: 60,
    },
    {
      id: "soc-analyst",
      title: "SOC Analyst & Blue Team Defense",
      desc: "Learn SIEM log investigation, threat hunting, malware analysis, YARA & Sigma rules.",
      icon: Shield,
      level: "INTERMEDIATE",
      coursesCount: 6,
      progress: 25,
    },
    {
      id: "network-recon",
      title: "Network Security & Protocol Exploitation",
      desc: "Nmap port scanning, Wireshark packet analysis, VLAN routing, and firewall rules.",
      icon: Cpu,
      level: "INTERMEDIATE",
      coursesCount: 4,
      progress: 10,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyber-cyan" />
          Cybersecurity Learning Paths & Courses
        </h1>
        <p className="text-xs text-cyber-muted font-mono">
          Interactive structured curriculum with theory, terminal examples, flashcards, quizzes & hands-on labs
        </p>
      </div>

      {/* Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-cyan/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyber-cyan border border-cyber-border">
                    {p.level}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-cyber-muted mb-4">{p.desc}</p>
              </div>

              <div>
                <div className="space-y-1 mb-4 text-xs font-mono">
                  <div className="flex justify-between text-cyber-muted">
                    <span>PATH PROGRESS</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyber-cyan h-full" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </div>

                <Link
                  href={`/paths/${p.id}`}
                  className="w-full py-2.5 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  <span>START PATH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
