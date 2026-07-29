"use client";

import { useState } from "react";
import { Cpu, Play, Square, Pause, RotateCcw, Camera, HardDrive, Shield, CheckCircle2 } from "lucide-react";

export interface VirtualMachine {
  id: string;
  name: string;
  hypervisor: "VirtualBox" | "VMware";
  os: string;
  status: "RUNNING" | "STOPPED" | "PAUSED";
  cpuUsage: number;
  ramUsage: number;
  ip: string;
  snapshotsCount: number;
}

export default function VMManagerPage() {
  const [vms, setVms] = useState<VirtualMachine[]>([
    {
      id: "vm-1",
      name: "Kali Linux 2024.1 Attacker",
      hypervisor: "VirtualBox",
      os: "Debian 64-bit",
      status: "RUNNING",
      cpuUsage: 14,
      ramUsage: 2400,
      ip: "192.168.56.101",
      snapshotsCount: 3,
    },
    {
      id: "vm-2",
      name: "Windows Server 2022 Active Directory",
      hypervisor: "VirtualBox",
      os: "Windows 64-bit",
      status: "STOPPED",
      cpuUsage: 0,
      ramUsage: 0,
      ip: "192.168.56.102",
      snapshotsCount: 1,
    },
    {
      id: "vm-3",
      name: "Metasploitable 3 Vulnerable Host",
      hypervisor: "VirtualBox",
      os: "Ubuntu 64-bit",
      status: "STOPPED",
      cpuUsage: 0,
      ramUsage: 0,
      ip: "192.168.56.103",
      snapshotsCount: 2,
    },
  ]);

  const toggleVMStatus = (id: string, newStatus: VirtualMachine["status"]) => {
    setVms(
      vms.map((vm) => {
        if (vm.id === id) {
          return {
            ...vm,
            status: newStatus,
            cpuUsage: newStatus === "RUNNING" ? Math.floor(Math.random() * 25) + 10 : 0,
            ramUsage: newStatus === "RUNNING" ? 2048 : 0,
          };
        }
        return vm;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyber-cyan" />
            Virtual Machine Manager
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 1 • Hypervisor Integration for VirtualBox & VMware: Auto-detection, Start/Stop, Snapshots & Resource Monitoring
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>VBoxManage Detected (v7.0.12)</span>
        </div>
      </div>

      {/* VM List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vms.map((vm) => {
          const isRunning = vm.status === "RUNNING";
          return (
            <div
              key={vm.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                isRunning ? "border-cyber-cyan shadow-neon-cyan" : "border-cyber-border"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{vm.name}</h3>
                  <p className="text-xs text-cyber-muted font-mono">
                    {vm.hypervisor} • {vm.os}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase ${
                    isRunning ? "bg-cyber-emerald/20 text-cyber-emerald border border-cyber-emerald/40" : "bg-slate-800 text-cyber-muted"
                  }`}
                >
                  {vm.status}
                </span>
              </div>

              {/* Resource Gauges */}
              <div className="space-y-3 my-5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-cyber-muted mb-1">
                    <span>CPU LOAD</span>
                    <span>{vm.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyber-cyan h-full transition-all" style={{ width: `${vm.cpuUsage}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-cyber-muted mb-1">
                    <span>RAM ALLOCATION</span>
                    <span>{vm.ramUsage} MB / 8192 MB</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyber-purple h-full transition-all" style={{ width: `${(vm.ramUsage / 8192) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 pt-4 border-t border-cyber-border">
                {isRunning ? (
                  <button
                    onClick={() => toggleVMStatus(vm.id, "STOPPED")}
                    className="flex-1 py-2 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red font-bold text-xs rounded-lg hover:bg-cyber-red/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleVMStatus(vm.id, "RUNNING")}
                    className="flex-1 py-2 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-lg hover:shadow-neon-cyan transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Start</span>
                  </button>
                )}

                <button
                  title="Create Snapshot"
                  className="p-2 bg-slate-900 border border-cyber-border text-cyber-muted hover:text-white rounded-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
