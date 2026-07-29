"use client";

import { MessageSquare, ThumbsUp, MessageCircle, User } from "lucide-react";

export default function CommunityPage() {
  const posts = [
    { id: 1, title: "How I bypassed the SQLi lab filter using UNION SELECT", author: "sec_student_99", upvotes: 42, comments: 12 },
    { id: 2, title: "Setting up Ollama local AI model for TyroTech mentor offline", author: "cyber_guru", upvotes: 89, comments: 24 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-cyber-cyan" />
          Community Platform & Forum
        </h1>
        <p className="text-xs text-cyber-muted font-mono">
          Module 16 • Offline discussion boards, student mentorship & peer lab sharing
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="glass-panel p-5 rounded-2xl border border-cyber-border space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-cyber-muted">
              <span>Posted by @{post.author}</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-cyber-cyan">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {post.upvotes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {post.comments}
                </span>
              </div>
            </div>
            <h3 className="text-base font-bold text-white hover:text-cyber-cyan cursor-pointer transition-all">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
