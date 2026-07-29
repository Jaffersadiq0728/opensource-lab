"use client";

import { useState } from "react";
import { ShieldCheck, Activity, Search, AlertTriangle, CheckCircle2, Filter } from "lucide-react";

export default function BlueTeamPage() {
  const logs = [
    { id: 1, time: "12:04:12", source: "AuthLog", level: "WARN", event: "Failed SSH login for root from 192.168.1.105 (Attempt 5/5)" },
    { id: 2, time: "12:04:30", source: "Sysmon", level: "CRITICAL", event: "Process Creation: powershell.exe -enc aW52b2tl..." },
    { id: 3, time: "12:05:01", source: "Wazuh", level: "INFO", event: "Rule ID 5710: Attempt to login using non-existent user" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyber-emerald" />
            Blue Team Operations & SIEM Simulator
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 14 • Defensive SOC Dashboard: SIEM Log Stream (Wazuh/Elastic), Threat Hunting & IOC Management
          </p>
        </div>
      </div>

      {/* SIEM Log Viewer */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-emerald" />
            <span>LIVE SOC SIEM EVENT STREAM</span>
          </h3>
          <span className="text-[11px] text-cyber-emerald font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
            STREAMING LOGS
          </span>
        </div>

        <div className="rounded-xl border border-cyber-border overflow-hidden bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-cyber-emerald border-b border-cyber-border">
              <tr>
                <th className="p-3">TIME</th>
                <th className="p-3">SOURCE</th>
                <th className="p-3">LEVEL</th>
                <th className="p-3">EVENT DESCRIPTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border text-white">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/60">
                  <td className="p-3 text-cyber-muted">{l.time}</td>
                  <td className="p-3 text-cyber-cyan">{l.source}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        l.level === "CRITICAL"
                          ? "bg-cyber-red/20 text-cyber-red border border-cyber-red/40"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {l.level}
                    </span>
                  </td>
                  <td className="p-3 text-cyber-muted">{l.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
