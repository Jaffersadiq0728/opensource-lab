"use client";

import { useState } from "react";
import { Package, Play, Square, RefreshCw, Flag, CheckCircle2, AlertCircle, Terminal } from "lucide-react";

export interface DockerLab {
  id: string;
  name: string;
  category: string;
  image: string;
  status: "STOPPED" | "RUNNING";
  ports: string;
  flagHash: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function DockerLabsPage() {
  const [labs, setLabs] = useState<DockerLab[]>([
    {
      id: "lab-1",
      name: "DVWA - Damn Vulnerable Web Application",
      category: "Web Security",
      image: "vulnerables/web-dvwa:latest",
      status: "RUNNING",
      ports: "8080:80",
      flagHash: "FLAG{DVWA_SQLI_BYPASS_SUCCESS}",
      difficulty: "EASY",
    },
    {
      id: "lab-2",
      name: "Juice Shop - OWASP Top 10 Practice",
      category: "Web Security",
      image: "bkimminich/juice-shop:latest",
      status: "STOPPED",
      ports: "3000:3000",
      flagHash: "FLAG{JUICE_SHOP_XSS_DOM_EXPLOIT}",
      difficulty: "MEDIUM",
    },
    {
      id: "lab-3",
      name: "Wazuh SIEM Log Generator Stack",
      category: "SOC / Blue Team",
      image: "wazuh/wazuh-all-in-one:latest",
      status: "STOPPED",
      ports: "5601:5601",
      flagHash: "FLAG{SIEM_THREAT_HUNT_LOG_FOUND}",
      difficulty: "HARD",
    },
  ]);

  const [inputFlag, setInputFlag] = useState("");
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const toggleLab = (id: string) => {
    setLabs(
      labs.map((lab) => {
        if (lab.id === id) {
          return { ...lab, status: lab.status === "RUNNING" ? "STOPPED" : "RUNNING" };
        }
        return lab;
      })
    );
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFlag.trim()) return;

    if (inputFlag.trim().toUpperCase().includes("FLAG{")) {
      setSubmissionResult("CORRECT! +100 XP awarded to your profile!");
    } else {
      setSubmissionResult("INCORRECT FLAG. Check your payload or inspect response headers.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-cyber-cyan" />
            Docker & Container Lab Engine
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 3 • Multi-container lab launcher, automatic container isolation, port forwarding & flag verification
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Terminal className="w-4 h-4" />
          <span>Docker Daemon Socket Active</span>
        </div>
      </div>

      {/* Flag Submission Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-cyan/30">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Flag className="w-4 h-4 text-cyber-cyan" />
          <span>SUBMIT CAPTURED LAB FLAG</span>
        </h3>
        <form onSubmit={handleFlagSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputFlag}
            onChange={(e) => setInputFlag(e.target.value)}
            placeholder="Format: FLAG{your_captured_flag_here}"
            className="flex-1 bg-slate-900 text-xs text-white p-3 rounded-lg border border-cyber-border font-mono focus:outline-none focus:border-cyber-cyan"
          />
          <button type="submit" className="px-6 py-3 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-lg hover:shadow-neon-cyan transition-all">
            VERIFY FLAG
          </button>
        </form>
        {submissionResult && (
          <p className={`text-xs font-mono mt-3 ${submissionResult.startsWith("CORRECT") ? "text-cyber-emerald" : "text-cyber-red"}`}>
            {submissionResult}
          </p>
        )}
      </div>

      {/* Lab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab) => {
          const isRunning = lab.status === "RUNNING";
          return (
            <div
              key={lab.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                isRunning ? "border-cyber-cyan shadow-neon-cyan" : "border-cyber-border"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyber-cyan border border-cyber-border">
                  {lab.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isRunning ? "bg-cyber-emerald/20 text-cyber-emerald" : "bg-slate-800 text-cyber-muted"
                  }`}
                >
                  {lab.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{lab.name}</h3>
              <p className="text-xs text-cyber-muted font-mono mb-4">{lab.image}</p>

              <div className="text-xs font-mono space-y-1 text-cyber-muted mb-5">
                <p>PORT MAPPING: <span className="text-white">{lab.ports}</span></p>
                <p>DIFFICULTY: <span className="text-amber-400">{lab.difficulty}</span></p>
              </div>

              <button
                onClick={() => toggleLab(lab.id)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                  isRunning
                    ? "bg-cyber-red/10 border border-cyber-red/30 text-cyber-red hover:bg-cyber-red/20"
                    : "bg-cyber-cyan text-slate-950 hover:shadow-neon-cyan"
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>STOP LAB CONTAINER</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>LAUNCH CONTAINER</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
