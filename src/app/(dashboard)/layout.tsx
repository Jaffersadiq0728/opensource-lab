"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/system/setup")
      .then((res) => res.json())
      .then((data) => {
        if (data.setupRequired) {
          router.push("/setup");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center text-xs font-mono text-cyber-cyan">
        Initializing TyroTech Environment...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cyber-bg cyber-grid">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
