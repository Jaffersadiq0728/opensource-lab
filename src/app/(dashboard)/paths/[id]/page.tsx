"use client";

import { use } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowLeft, Play, Shield, Terminal, Zap, Code } from "lucide-react";

export default function SinglePathPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link href="/paths" className="inline-flex items-center gap-2 text-xs font-mono text-cyber-cyan hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Paths
      </Link>

      {/* Path Header */}
      <div className="glass-panel p-8 rounded-2xl border border-cyber-cyan/30 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            PATH DETAILS: {resolvedParams.id.toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Interactive Security Curriculum</h1>
        <p className="text-xs text-cyber-muted max-w-2xl font-mono">
          Structured learning path containing theory, code snippets, cheat sheets, terminal examples, quizzes, and flag labs.
        </p>
      </div>

      {/* Course List & Lessons */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyber-cyan" />
          <span>COURSE MODULES</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border flex justify-between items-center text-xs font-mono">
            <div>
              <p className="font-bold text-white mb-1">Module 1: Injection Attack Fundamentals</p>
              <p className="text-[11px] text-cyber-muted">SQL Injection, Command Injection & Parameterization</p>
            </div>
            <Link
              href="/workspace"
              className="px-4 py-2 bg-cyber-cyan text-slate-950 font-bold rounded-lg hover:shadow-neon-cyan transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>START LESSON</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
