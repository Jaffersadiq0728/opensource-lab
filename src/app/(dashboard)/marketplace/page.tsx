"use client";

import { ShoppingBag, Download, ShieldCheck, Star } from "lucide-react";

export default function MarketplacePage() {
  const labPacks = [
    { id: "pack-1", name: "Cloud Pentesting Pack (AWS/Azure)", rating: 4.9, downloads: 1240, verified: true },
    { id: "pack-2", name: "Active Directory Exploitation Bundle", rating: 4.8, downloads: 2150, verified: true },
    { id: "pack-3", name: "Malware Reverse Engineering Sandbox", rating: 4.9, downloads: 980, verified: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyber-cyan" />
          Lab Marketplace & Community Packs
        </h1>
        <p className="text-xs text-cyber-muted font-mono">
          Module 4 • Download community & official lab packs with RSA digital signature verification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labPacks.map((p) => (
          <div key={p.id} className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-cyber-muted">
              <span className="flex items-center gap-1 text-cyber-emerald">
                <ShieldCheck className="w-4 h-4" />
                VERIFIED SIGNATURE
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {p.rating}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{p.name}</h3>
            <p className="text-xs text-cyber-muted font-mono">{p.downloads} total downloads</p>
            <button className="w-full py-2 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>INSTALL PACK</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
