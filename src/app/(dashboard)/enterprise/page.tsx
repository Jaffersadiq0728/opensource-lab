"use client";

import { Building2, Users, GraduationCap, Calendar, BarChart3 } from "lucide-react";

export default function EnterprisePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-cyber-purple" />
          Enterprise & Classroom Management
        </h1>
        <p className="text-xs text-cyber-muted font-mono">
          Module 7 • Institutional Controls: Multi-tenant organization support, Instructor dashboard, cohorts & bulk student assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-2">
          <Users className="w-6 h-6 text-cyber-purple mb-2" />
          <h3 className="text-sm font-bold text-white font-mono">CLASSROOM COHORTS</h3>
          <p className="text-xs text-cyber-muted">Manage active student cohorts, group assignments, and gradebook progress.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-2">
          <GraduationCap className="w-6 h-6 text-cyber-cyan mb-2" />
          <h3 className="text-sm font-bold text-white font-mono">INSTRUCTOR PORTAL</h3>
          <p className="text-xs text-cyber-muted">Schedule lab exams, track live container usage, and monitor attendance.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-2">
          <BarChart3 className="w-6 h-6 text-cyber-emerald mb-2" />
          <h3 className="text-sm font-bold text-white font-mono">COHORT ANALYTICS</h3>
          <p className="text-xs text-cyber-muted">Export PDF grade reports and analyze class skill distribution heatmaps.</p>
        </div>
      </div>
    </div>
  );
}
