"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, Code2, ShieldAlert, BookOpen, User, RefreshCcw } from "lucide-react";
import { askAiMentor, MentorMessage } from "@/lib/ai/mentor";

export default function AiMentorPage() {
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      sender: "mentor",
      content:
        "Greetings Operator! I am your AI Cyber Mentor. I run 100% locally via Ollama or rules matrix. Ask me to explain CVEs, generate YARA or Sigma rules, give lab hints, or review study topics.",
      timestamp: "12:00 PM",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: MentorMessage = {
      sender: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAiMentor(input);
      const mentorMsg: MentorMessage = {
        sender: "mentor",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, mentorMsg]);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyber-emerald" />
            AI Cyber Mentor & Rule Generator
          </h1>
          <p className="text-xs text-cyber-muted font-mono">
            Module 13 • Offline Ollama & multi-provider instructor for YARA/Sigma generation, CVE breakdown & lab guidance
          </p>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Quick Prompt Starters */}
        <div className="glass-panel p-4 rounded-2xl border border-cyber-border space-y-3">
          <h3 className="text-xs font-bold text-cyber-emerald font-mono tracking-wider uppercase">AI WORKBENCH TOOLS</h3>
          <div className="space-y-2">
            {[
              { label: "Generate YARA Rule", prompt: "Generate a YARA rule for detecting suspicious command line execution." },
              { label: "Generate Sigma Rule", prompt: "Generate a Sigma rule for obfuscated PowerShell execution." },
              { label: "Web SQLi Lab Hint", prompt: "Give me a hint for bypassing SQL injection login." },
              { label: "Explain CVE-2023-34048", prompt: "Explain CVE-2023-34048 and its impact." },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => setInput(btn.prompt)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border hover:border-cyber-emerald/50 text-left text-xs font-mono text-white transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyber-emerald shrink-0" />
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Thread */}
        <div className="md:col-span-3 glass-panel rounded-2xl border border-cyber-border flex flex-col min-h-[500px] justify-between overflow-hidden">
          {/* Thread messages */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 max-h-[550px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "mentor" && (
                  <div className="p-2 rounded-xl bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald h-fit shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl text-xs max-w-2xl font-mono leading-relaxed ${
                    m.sender === "user"
                      ? "bg-cyber-cyan/15 text-white border border-cyber-cyan/30"
                      : "bg-slate-900/90 text-white border border-cyber-border"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono">{m.content}</pre>
                  <span className="text-[10px] text-cyber-muted block mt-2 text-right">{m.timestamp}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-cyber-emerald font-mono flex items-center gap-2 animate-pulse">
                <Bot className="w-4 h-4" />
                <span>AI Mentor is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-cyber-border flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI mentor about CVEs, YARA rules, lab hints, or security concepts..."
              className="flex-1 bg-slate-950 text-xs text-white p-3 rounded-xl border border-cyber-border font-mono focus:outline-none focus:border-cyber-emerald"
            />
            <button type="submit" disabled={loading} className="px-5 py-3 bg-cyber-emerald text-slate-950 font-bold text-xs rounded-xl hover:shadow-neon-emerald transition-all flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>SEND</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
