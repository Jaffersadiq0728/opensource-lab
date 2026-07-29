"use client";

import { useState } from "react";
import {
  Terminal as TerminalIcon,
  FileCode,
  FileSearch,
  Hash,
  Key,
  Globe,
  Code,
  CheckCircle2,
  Copy,
  Zap,
  Play,
} from "lucide-react";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<
    "terminal" | "pcap" | "logs" | "hash" | "jwt" | "encoder" | "http"
  >("terminal");

  // Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "TyroTech Cyber Terminal v1.0.0 [Self-Hosted Environment]",
    "Type 'help' to view available security commands.",
    "",
  ]);
  const [cmdInput, setCmdInput] = useState("");

  // PCAP state
  const [pcapFilter, setPcapFilter] = useState("ALL");
  const pcapPackets = [
    { id: 1, time: "0.000000", src: "192.168.1.105", dst: "192.168.1.1", proto: "DNS", info: "Standard query 0x1a2b A target-vulnerable.local" },
    { id: 2, time: "0.002140", src: "192.168.1.1", dst: "192.168.1.105", proto: "DNS", info: "Standard query response 0x1a2b A 192.168.1.50" },
    { id: 3, time: "0.015230", src: "192.168.1.105", dst: "192.168.1.50", proto: "TCP", info: "54322 -> 80 [SYN] Seq=0 Win=64240 Len=0" },
    { id: 4, time: "0.016010", src: "192.168.1.50", dst: "192.168.1.105", proto: "TCP", info: "80 -> 54322 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0" },
    { id: 5, time: "0.021000", src: "192.168.1.105", dst: "192.168.1.50", proto: "HTTP", info: "GET /login.php?user=admin' OR '1'='1 -- HTTP/1.1" },
  ];

  // Hash state
  const [inputText, setInputText] = useState("tyrotech-admin-key");
  const [hashResults, setHashResults] = useState<{ [key: string]: string }>({});

  // JWT state
  const [jwtInput, setJwtInput] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTEyMyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwMDAwMDAwMH0.signature"
  );

  // HTTP Request Builder state
  const [httpMethod, setHttpMethod] = useState("GET");
  const [httpUrl, setHttpUrl] = useState("http://target-lab.local/api/v1/users");
  const [httpResponse, setHttpResponse] = useState<string | null>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const newLogs = [...terminalLogs, `$ ${cmdInput}`];
    const cmd = cmdInput.trim().toLowerCase();

    if (cmd === "help") {
      newLogs.push("Available Commands:");
      newLogs.push("  nmap <target>     - Perform port scan");
      newLogs.push("  ping <ip>         - ICMP ping test");
      newLogs.push("  curl <url>        - Fetch HTTP response");
      newLogs.push("  cat /etc/passwd   - View password file");
      newLogs.push("  clear             - Clear terminal log");
    } else if (cmd.startsWith("nmap")) {
      newLogs.push("Starting Nmap 7.94 ( https://nmap.org )");
      newLogs.push("Nmap scan report for target (192.168.1.50)");
      newLogs.push("PORT     STATE SERVICE");
      newLogs.push("22/tcp   open  ssh (OpenSSH 8.9p1)");
      newLogs.push("80/tcp   open  http (Apache 2.4.52)");
      newLogs.push("3306/tcp open  mysql (MySQL 8.0.32)");
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setCmdInput("");
      return;
    } else {
      newLogs.push(`Executed: ${cmdInput}`);
    }

    setTerminalLogs(newLogs);
    setCmdInput("");
  };

  const generateHashes = () => {
    setHashResults({
      MD5: "a665a45920422f9d417e4867efdc4fb8",
      SHA1: "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed",
      SHA256: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
      "Argon2id (Simulated)": "$argon2id$v=19$m=65536,t=3,p=1$c2FsdHNhbHQ$hashhashhash",
    });
  };

  const executeHttpRequest = () => {
    setHttpResponse(
      JSON.stringify(
        {
          status: 200,
          statusText: "OK",
          headers: {
            "content-type": "application/json",
            "x-powered-by": "TyroTech Core API",
          },
          data: [
            { id: "usr_1", username: "admin", role: "ADMIN", flag: "FLAG{TYRO_HTTP_REST_API_MASTER}" },
            { id: "usr_2", username: "victim_user", role: "STUDENT" },
          ],
        },
        null,
        2
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-cyber-cyan" />
            Cybersecurity Workspace & Workbench
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 12 • Built-in web analysis, PCAP packet dissector, JWT inspector, & terminal workbench
          </p>
        </div>
      </div>

      {/* Workspace Tabs Navigation */}
      <div className="flex gap-2 border-b border-cyber-border pb-3 overflow-x-auto">
        {[
          { id: "terminal", label: "Web Terminal", icon: TerminalIcon },
          { id: "pcap", label: "PCAP Packet Dissector", icon: FileSearch },
          { id: "logs", label: "Log Analyzer", icon: FileCode },
          { id: "hash", label: "Hash Tools & Generator", icon: Hash },
          { id: "jwt", label: "JWT Inspector", icon: Key },
          { id: "http", label: "HTTP Request Builder", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                active
                  ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 shadow-neon-cyan"
                  : "text-cyber-muted hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Web Terminal */}
      {activeTab === "terminal" && (
        <div className="glass-panel rounded-2xl border border-cyber-border overflow-hidden">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-cyber-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-xs text-cyber-muted font-mono ml-2">bash - tyrotech@lab-workstation:~</span>
            </div>
            <span className="text-[10px] text-cyber-emerald font-mono">CLI SESSION ACTIVE</span>
          </div>
          <div className="p-4 bg-slate-950 font-mono text-xs text-green-400 min-h-[380px] max-h-[450px] overflow-y-auto space-y-1">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="whitespace-pre-wrap">{log}</div>
            ))}
          </div>
          <form onSubmit={handleTerminalSubmit} className="p-3 bg-slate-900 border-t border-cyber-border flex items-center gap-2">
            <span className="text-cyber-cyan font-mono text-xs">$</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="Enter security command (e.g., nmap 192.168.1.50, help, clear)..."
              className="flex-1 bg-transparent text-xs text-white font-mono focus:outline-none placeholder-cyber-muted"
            />
            <button type="submit" className="px-3 py-1 bg-cyber-cyan text-slate-950 font-bold text-xs rounded hover:shadow-neon-cyan">
              Run
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: PCAP Packet Dissector */}
      {activeTab === "pcap" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white font-mono">PACKET CAPTURE STREAM (.PCAP)</h3>
            <div className="flex gap-2">
              {["ALL", "HTTP", "DNS", "TCP"].map((f) => (
                <button
                  key={f}
                  onClick={() => setPcapFilter(f)}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    pcapFilter === f ? "bg-cyber-cyan text-slate-950 font-bold" : "bg-slate-800 text-cyber-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-cyber-border">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-cyber-cyan border-b border-cyber-border">
                <tr>
                  <th className="p-3">NO.</th>
                  <th className="p-3">TIME</th>
                  <th className="p-3">SOURCE</th>
                  <th className="p-3">DESTINATION</th>
                  <th className="p-3">PROTOCOL</th>
                  <th className="p-3">INFO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border bg-slate-950 text-white">
                {pcapPackets
                  .filter((p) => pcapFilter === "ALL" || p.proto === pcapFilter)
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/60">
                      <td className="p-3 text-cyber-muted">{p.id}</td>
                      <td className="p-3 text-cyber-muted">{p.time}</td>
                      <td className="p-3 text-cyber-cyan">{p.src}</td>
                      <td className="p-3 text-cyber-emerald">{p.dst}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-cyber-border text-[10px]">
                          {p.proto}
                        </span>
                      </td>
                      <td className="p-3 text-cyber-muted">{p.info}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Hash Tools */}
      {activeTab === "hash" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">HASH GENERATOR & ALGORITHM IDENTIFIER</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter plain text to hash..."
              className="w-full bg-slate-900 text-sm text-white p-3 rounded-lg border border-cyber-border font-mono focus:outline-none focus:border-cyber-cyan"
            />
            <button onClick={generateHashes} className="px-5 py-2.5 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-lg hover:shadow-neon-cyan">
              Compute Hashes
            </button>
          </div>
          {Object.keys(hashResults).length > 0 && (
            <div className="space-y-3 pt-4 border-t border-cyber-border">
              {Object.entries(hashResults).map(([algo, val]) => (
                <div key={algo} className="p-3 rounded-lg bg-slate-900 border border-cyber-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-cyber-cyan font-mono block">{algo}</span>
                    <span className="text-xs text-white font-mono break-all">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: JWT Inspector */}
      {activeTab === "jwt" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">JWT TOKEN DECODER & PAYLOAD PARSER</h3>
          <textarea
            rows={3}
            value={jwtInput}
            onChange={(e) => setJwtInput(e.target.value)}
            className="w-full bg-slate-900 text-xs text-cyber-cyan p-3 rounded-lg border border-cyber-border font-mono focus:outline-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border">
              <span className="text-xs text-cyber-muted font-mono block mb-2">HEADER: ALGORITHM & TOKEN TYPE</span>
              <pre className="text-xs text-cyber-purple font-mono">
                {JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)}
              </pre>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border">
              <span className="text-xs text-cyber-muted font-mono block mb-2">DECODED PAYLOAD DATA</span>
              <pre className="text-xs text-cyber-emerald font-mono">
                {JSON.stringify({ userId: "user-123", role: "ADMIN", iat: 1700000000 }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: HTTP Request Builder */}
      {activeTab === "http" && (
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">INTERACTIVE HTTP REQUEST WORKBENCH</h3>
          <div className="flex gap-3">
            <select
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
              className="bg-slate-900 text-xs text-cyber-cyan p-3 rounded-lg border border-cyber-border font-mono focus:outline-none"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              value={httpUrl}
              onChange={(e) => setHttpUrl(e.target.value)}
              className="flex-1 bg-slate-900 text-xs text-white p-3 rounded-lg border border-cyber-border font-mono focus:outline-none focus:border-cyber-cyan"
            />
            <button onClick={executeHttpRequest} className="px-6 py-3 bg-cyber-cyan text-slate-950 font-bold text-xs rounded-lg hover:shadow-neon-cyan flex items-center gap-2">
              <Play className="w-4 h-4 fill-slate-950" />
              <span>SEND</span>
            </button>
          </div>
          {httpResponse && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyber-border space-y-2">
              <span className="text-xs text-cyber-emerald font-mono block">HTTP RESPONSE BODY (200 OK)</span>
              <pre className="text-xs text-cyber-cyan font-mono overflow-x-auto">{httpResponse}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
