"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  Terminal,
  Cpu,
  Network,
  Bot,
  Database,
  Crosshair,
  ShieldCheck,
  Building2,
  ShoppingBag,
  MessageSquare,
  Activity,
  Settings,
  Package,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learning Paths", href: "/paths", icon: BookOpen },
  { name: "Cyber Workspace", href: "/workspace", icon: Terminal },
  { name: "VM Manager", href: "/vm-manager", icon: Cpu },
  { name: "Network Builder", href: "/network-builder", icon: Network },
  { name: "Docker Lab Engine", href: "/docker-labs", icon: Package },
  { name: "AI Cyber Mentor", href: "/ai-mentor", icon: Bot },
  { name: "Knowledge Base", href: "/knowledge", icon: Database },
  { name: "Red Team Workspace", href: "/red-team", icon: Crosshair },
  { name: "Blue Team Workspace", href: "/blue-team", icon: ShieldCheck },
  { name: "Enterprise Edition", href: "/enterprise", icon: Building2 },
  { name: "Lab Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "Community Platform", href: "/community", icon: MessageSquare },
  { name: "System Management", href: "/admin/system", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-cyber-card/90 backdrop-blur-md border-r border-cyber-border min-h-screen flex flex-col justify-between p-4">
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-6 group">
          <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan group-hover:shadow-neon-cyan transition-all">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-white flex items-center gap-1">
              TYRO<span className="text-cyber-cyan">TECH</span>
            </h1>
            <p className="text-[10px] text-cyber-muted font-mono tracking-widest uppercase">Self-Hosted Cyber Lab</p>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 shadow-neon-cyan"
                    : "text-cyber-muted hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-cyber-cyan" : "text-cyber-muted"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Status Footer */}
      <div className="pt-4 border-t border-cyber-border px-2">
        <div className="flex items-center justify-between text-[11px] text-cyber-muted font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
            Offline Mode
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
