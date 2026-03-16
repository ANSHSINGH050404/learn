"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Star,
  Zap,
  Settings,
  Terminal,
  History,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const MOCK_SESSIONS = [
  {
    id: "1",
    title: "Refactor authentication module",
    time: "2m ago",
    agent: "build",
  },
  {
    id: "2",
    title: "Fix TypeScript errors in API routes",
    time: "1h ago",
    agent: "build",
  },
  {
    id: "3",
    title: "Plan database migration strategy",
    time: "3h ago",
    agent: "plan",
  },
  {
    id: "4",
    title: "Explore codebase structure",
    time: "Yesterday",
    agent: "explore",
  },
  {
    id: "5",
    title: "Write unit tests for user service",
    time: "2d ago",
    agent: "build",
  },
];

const AGENTS = [
  { id: "build", label: "Build", color: "hsl(252 87% 67%)", icon: Zap },
  { id: "plan", label: "Plan", color: "hsl(142 71% 45%)", icon: Star },
  { id: "explore", label: "Explore", color: "hsl(38 92% 50%)", icon: Search },
];



export function Sidebar() {
  const [search, setSearch] = useState("");
  const [activeAgent, setActiveAgent] = useState("all");
  const [activeSession, setActiveSession] = useState("1");

  const filteredSessions = MOCK_SESSIONS.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesAgent = activeAgent === "all" || s.agent === activeAgent;
    return matchesSearch && matchesAgent;
  });

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Terminal size={16} className="text-white" />
          </div>
          <span className="font-bold text-foreground text-base tracking-tight">
            Forge
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Plus size={18} />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Search */}
        <div className="px-3 pt-4 pb-2">
          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
            <input
              className="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-lg py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Agent Filter Chips */}
        <div className="px-3 py-2">
          <div className="flex flex-wrap gap-1.5 p-1 bg-sidebar-accent/30 rounded-xl">
            <button
              onClick={() => setActiveAgent("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeAgent === "all"
                  ? "bg-sidebar text-foreground shadow-sm ring-1 ring-sidebar-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              )}
            >
              All
            </button>
            {AGENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveAgent(a.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  activeAgent === a.id
                    ? "bg-sidebar text-foreground shadow-sm ring-1 ring-sidebar-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <a.icon size={12} style={{ color: a.color }} />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="px-2 py-4 space-y-4">
          <div className="px-2 flex items-center justify-between text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            <span>Recent Sessions</span>
            <History size={12} />
          </div>
          
          <div className="space-y-0.5">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => {
                const agent = AGENTS.find((a) => a.id === session.agent);
                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSession(session.id)}
                    className={cn(
                      "group relative flex flex-col gap-1 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200",
                      activeSession === session.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-sidebar-border shadow-sm"
                        : "hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold line-clamp-1 flex-1 leading-tight">
                        {session.title}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-border rounded-md transition-all">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1 text-[10px] font-medium bg-sidebar-border/40 px-1.5 py-0.5 rounded-full border border-sidebar-border/30">
                        {agent && <agent.icon size={10} style={{ color: agent.color }} />}
                        <span className="capitalize">{session.agent}</span>
                      </div>
                      <span className="text-[10px] opacity-60 font-medium">{session.time}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-2 opacity-50">
                <Search size={24} strokeWidth={1.5} />
                <p className="text-xs font-medium">No sessions found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border shrink-0 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-xl px-3 hover:bg-sidebar-accent transition-all text-sm font-medium">
          <Settings size={18} className="text-muted-foreground" />
          Settings
        </Button>
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/30 border border-sidebar-border/50">
          <div className="size-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">John Doe</p>
            <p className="text-[10px] text-muted-foreground truncate">Premium Plan</p>
          </div>
          <Button variant="ghost" size="icon" className="size-8 hover:bg-sidebar-border transition-all">
            <ChevronDown size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
