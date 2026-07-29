"use client";

import { useState } from "react";
import { Database, Search, Tag, BookOpen, Shield, Code, ExternalLink } from "lucide-react";

export interface KnowledgeDoc {
  id: string;
  category: "MITRE" | "OWASP" | "CVE" | "NIST" | "MAN" | "CHEATSHEET";
  referenceId: string;
  title: string;
  summary: string;
  content: string;
}

const docsData: KnowledgeDoc[] = [
  {
    id: "kb-1",
    category: "MITRE",
    referenceId: "T1059",
    title: "Command and Scripting Interpreter",
    summary: "Adversaries abuse interpreters like PowerShell, bash, cmd.exe to execute commands.",
    content: "Detailed MITRE technique breakdown. Detection strategy: monitor process creation with command line arguments via Sysmon Event ID 1.",
  },
  {
    id: "kb-2",
    category: "OWASP",
    referenceId: "A03:2021",
    title: "Injection Vulnerabilities (SQLi & Command)",
    summary: "Untrusted input concatenated directly into database or shell interpreter queries.",
    content: "Sanitize and parameterize all input. Use Prisma ORM parameterized SQL query builders.",
  },
  {
    id: "kb-3",
    category: "CVE",
    referenceId: "CVE-2023-34048",
    title: "VMware vCenter Server Remote Code Execution",
    summary: "Out-of-bounds write vulnerability in vCenter Server vSphere client implementation.",
    content: "Affects vCenter Server versions 7.0 & 8.0 prior to security patch build deployment.",
  },
  {
    id: "kb-4",
    category: "CHEATSHEET",
    referenceId: "NMAP-01",
    title: "Nmap Reconnaissance Command Cheat Sheet",
    summary: "Essential port scanning switches: -sV, -sC, -p-, -A, -T4.",
    content: "nmap -sV -sC -T4 -p- 192.168.1.50\nnmap --script vuln 192.168.1.50",
  },
];

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeDoc, setActiveDoc] = useState<KnowledgeDoc | null>(docsData[0]);

  const filteredDocs = docsData.filter((doc) => {
    const matchesCat = selectedCategory === "ALL" || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-cyber-cyan" />
            Offline Knowledge Base & Cyber Encyclopedia
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 8 • Searchable offline index of MITRE ATT&CK, OWASP Top 10, CVE database, NIST SP 800-53 & Cheat Sheets
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-cyber-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search MITRE IDs (T1059), CVEs, OWASP, Linux commands..."
            className="w-full bg-slate-900 text-xs text-white pl-10 pr-4 py-3 rounded-xl border border-cyber-border font-mono focus:outline-none focus:border-cyber-cyan"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {["ALL", "MITRE", "OWASP", "CVE", "CHEATSHEET"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all ${
                selectedCategory === cat
                  ? "bg-cyber-cyan text-slate-950 font-bold"
                  : "bg-slate-900 text-cyber-muted hover:text-white border border-cyber-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Master / Detail View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => {
            const isSelected = activeDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc)}
                className={`glass-panel p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? "border-cyber-cyan shadow-neon-cyan bg-slate-900/90" : "border-cyber-border hover:border-cyber-muted"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-cyber-cyan font-mono px-2 py-0.5 rounded bg-slate-800 border border-cyber-border">
                    {doc.referenceId}
                  </span>
                  <span className="text-[10px] text-cyber-muted font-mono">{doc.category}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{doc.title}</h4>
                <p className="text-[11px] text-cyber-muted line-clamp-2">{doc.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Document Reader */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-cyber-border space-y-4 min-h-[400px]">
          {activeDoc ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 text-xs font-mono">
                  {activeDoc.referenceId}
                </span>
                <span className="text-xs text-cyber-muted font-mono">{activeDoc.category} DOCUMENT</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-4">{activeDoc.title}</h2>
              <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border text-xs font-mono text-cyber-muted leading-relaxed whitespace-pre-wrap">
                {activeDoc.content}
              </div>
            </div>
          ) : (
            <p className="text-xs text-cyber-muted font-mono">Select a knowledge document to read full technical breakdown.</p>
          )}
        </div>
      </div>
    </div>
  );
}
