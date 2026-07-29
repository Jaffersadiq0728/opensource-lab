"use client";

import { useState } from "react";
import {
  Network,
  Plus,
  Save,
  Download,
  Upload,
  Play,
  Trash2,
  Server,
  Shield,
  Monitor,
  Radio,
  Cpu,
  Layers,
} from "lucide-react";

export interface NetworkNode {
  id: string;
  name: string;
  type: "ROUTER" | "SWITCH" | "FIREWALL" | "KALI" | "VICTIM" | "WINDOWS_AD";
  ip: string;
  subnet: string;
  vlan?: number;
  x: number;
  y: number;
}

export default function NetworkBuilderPage() {
  const [nodes, setNodes] = useState<NetworkNode[]>([
    { id: "node-1", name: "pfSense Firewall", type: "FIREWALL", ip: "192.168.1.1", subnet: "255.255.255.0", x: 100, y: 150 },
    { id: "node-2", name: "Core Switch", type: "SWITCH", ip: "192.168.1.2", subnet: "255.255.255.0", vlan: 10, x: 320, y: 150 },
    { id: "node-3", name: "Kali Attacker", type: "KALI", ip: "192.168.1.105", subnet: "255.255.255.0", x: 550, y: 80 },
    { id: "node-4", name: "DMZ Web Server", type: "VICTIM", ip: "192.168.1.50", subnet: "255.255.255.0", vlan: 20, x: 550, y: 220 },
  ]);

  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(nodes[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const addNode = (type: NetworkNode["type"]) => {
    const newNode: NetworkNode = {
      id: `node-${Date.now()}`,
      name: `New ${type}`,
      type,
      ip: `192.168.1.${nodes.length + 10}`,
      subnet: "255.255.255.0",
      x: 200 + Math.random() * 200,
      y: 100 + Math.random() * 150,
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const getNodeIcon = (type: NetworkNode["type"]) => {
    switch (type) {
      case "FIREWALL":
        return <Shield className="w-6 h-6 text-cyber-red" />;
      case "ROUTER":
        return <Radio className="w-6 h-6 text-cyber-cyan" />;
      case "SWITCH":
        return <Layers className="w-6 h-6 text-cyber-purple" />;
      case "KALI":
        return <Cpu className="w-6 h-6 text-cyber-emerald" />;
      case "WINDOWS_AD":
        return <Server className="w-6 h-6 text-amber-400" />;
      default:
        return <Monitor className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-cyber-purple" />
            Drag-and-Drop Network Lab Builder
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 2 • Visual canvas topology designer for virtual routers, switches, firewalls, VLANs & DMZ subnets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all flex items-center gap-2 ${
              isSimulating
                ? "bg-cyber-emerald text-slate-950 shadow-neon-emerald"
                : "bg-slate-800 text-cyber-muted hover:text-white"
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulating ? "SIMULATION RUNNING" : "START SIMULATION"}</span>
          </button>
          <button className="px-3 py-2 bg-slate-900 border border-cyber-border text-xs text-cyber-cyan font-mono rounded-lg flex items-center gap-2 hover:bg-slate-800">
            <Save className="w-4 h-4" />
            <span>Save Topology</span>
          </button>
        </div>
      </div>

      {/* Main Canvas + Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
        {/* Node Palette */}
        <div className="glass-panel p-4 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-xs font-bold text-cyber-cyan font-mono tracking-wider uppercase">VIRTUAL DEVICE PALETTE</h3>
          <div className="space-y-2">
            {[
              { type: "FIREWALL", label: "pfSense Firewall", icon: Shield },
              { type: "ROUTER", label: "Virtual Router", icon: Radio },
              { type: "SWITCH", label: "Managed Switch", icon: Layers },
              { type: "KALI", label: "Kali Attacker", icon: Cpu },
              { type: "WINDOWS_AD", label: "Windows Active Directory", icon: Server },
              { type: "VICTIM", label: "Linux Victim Endpoint", icon: Monitor },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => addNode(item.type as any)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border hover:border-cyber-cyan/50 text-left text-xs font-mono text-white flex items-center gap-3 transition-all"
              >
                <Plus className="w-4 h-4 text-cyber-cyan" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Canvas Viewport */}
        <div className="md:col-span-2 glass-panel rounded-2xl border border-cyber-border relative bg-slate-950 cyber-grid overflow-hidden p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-cyber-muted mb-4 z-10">
            <span>CANVAS VIEWPORT (4 ACTIVE NODES)</span>
            {isSimulating && (
              <span className="flex items-center gap-1.5 text-cyber-emerald">
                <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping"></span>
                PACKET ROUTING SIMULATED
              </span>
            )}
          </div>

          {/* Rendered Nodes on Canvas */}
          <div className="relative flex-1 min-h-[360px]">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute p-3 rounded-2xl glass-panel border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? "border-cyber-cyan shadow-neon-cyan scale-105 bg-slate-900/90"
                      : "border-cyber-border hover:border-cyber-muted"
                  }`}
                >
                  {getNodeIcon(node.type)}
                  <div>
                    <p className="text-xs font-bold text-white font-mono">{node.name}</p>
                    <p className="text-[10px] text-cyber-cyan font-mono">{node.ip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Properties */}
        <div className="glass-panel p-4 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-xs font-bold text-cyber-cyan font-mono tracking-wider uppercase">NODE CONFIGURATION</h3>
          {selectedNode ? (
            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-cyber-muted block mb-1">NODE NAME</label>
                <input
                  type="text"
                  value={selectedNode.name}
                  onChange={(e) => {
                    const updated = { ...selectedNode, name: e.target.value };
                    setSelectedNode(updated);
                    setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)));
                  }}
                  className="w-full bg-slate-900 text-white p-2 rounded border border-cyber-border"
                />
              </div>

              <div>
                <label className="text-cyber-muted block mb-1">IP ADDRESS</label>
                <input
                  type="text"
                  value={selectedNode.ip}
                  onChange={(e) => {
                    const updated = { ...selectedNode, ip: e.target.value };
                    setSelectedNode(updated);
                    setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)));
                  }}
                  className="w-full bg-slate-900 text-white p-2 rounded border border-cyber-border"
                />
              </div>

              <div>
                <label className="text-cyber-muted block mb-1">SUBNET MASK</label>
                <input
                  type="text"
                  value={selectedNode.subnet}
                  onChange={(e) => {
                    const updated = { ...selectedNode, subnet: e.target.value };
                    setSelectedNode(updated);
                    setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)));
                  }}
                  className="w-full bg-slate-900 text-white p-2 rounded border border-cyber-border"
                />
              </div>

              <button
                onClick={() => removeNode(selectedNode.id)}
                className="w-full py-2 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red font-bold rounded-lg hover:bg-cyber-red/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Node</span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-cyber-muted font-mono">Click a canvas node to inspect properties.</p>
          )}
        </div>
      </div>
    </div>
  );
}
