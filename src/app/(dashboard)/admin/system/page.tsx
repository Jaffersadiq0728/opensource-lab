"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldAlert, Database, Download, Upload, CheckCircle2, Server } from "lucide-react";

export default function SystemAdminPage() {
  const [doctorResults, setDoctorResults] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/system/doctor")
      .then((res) => res.json())
      .then((data) => {
        if (data.checks) setDoctorResults(data.checks);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyber-emerald" />
          System Management & Encrypted Backup Center
        </h1>
        <p className="text-xs text-cyber-muted font-mono">
          Modules 9, 10, 11, 17 • Health monitoring, Smart Installer diagnostics, AES-256 backup export & audit logging
        </p>
      </div>

      {/* System Doctor Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Server className="w-4 h-4 text-cyber-cyan" />
          <span>SMART INSTALLER DIAGNOSTIC STATUS</span>
        </h3>

        <div className="space-y-3">
          {doctorResults.map((check, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-cyber-border flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    check.status === "OK" ? "bg-cyber-emerald shadow-neon-emerald" : "bg-amber-400"
                  }`}
                ></span>
                <div>
                  <p className="font-bold text-white">{check.service}</p>
                  <p className="text-[11px] text-cyber-muted">{check.details}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] ${check.status === "OK" ? "bg-cyber-emerald/20 text-cyber-emerald" : "bg-amber-500/20 text-amber-400"}`}>
                {check.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Encrypted Backup & Restore Box */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Database className="w-4 h-4 text-cyber-purple" />
          <span>AES-256-GCM ENCRYPTED BACKUP MANAGER</span>
        </h3>
        <p className="text-xs text-cyber-muted">
          Export all local student progress, lab completion logs, custom topologies, and achievements into a single encrypted file (.tyrobeast).
        </p>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 bg-cyber-purple text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-purple transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>EXPORT BACKUP FILE</span>
          </button>
          <button className="px-5 py-2.5 bg-slate-900 border border-cyber-border text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>RESTORE FROM BACKUP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
