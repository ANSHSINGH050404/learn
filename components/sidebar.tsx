"use client"

import { useState } from "react"
import {
  MessageSquare,
  Plus,
  Search,
  Cpu,
  ChevronDown,
  Archive,
  Star,
  Zap,
  Settings,
  Terminal,
  GitBranch,
} from "lucide-react"
import { log } from "console"


const MOCK_SESSIONS = [
  { id: "1", title: "Refactor authentication module", time: "2m ago", agent: "build", active: true },
  { id: "2", title: "Fix TypeScript errors in API routes", time: "1h ago", agent: "build", active: false },
  { id: "3", title: "Plan database migration strategy", time: "3h ago", agent: "plan", active: false },
  { id: "4", title: "Explore codebase structure", time: "Yesterday", agent: "explore", active: false },
  { id: "5", title: "Write unit tests for user service", time: "2d ago", agent: "build", active: false },
]

const AGENTS = [
  { id: "build", label: "Build", color: "hsl(252 87% 67%)", icon: Zap },
  { id: "plan", label: "Plan", color: "hsl(142 71% 45%)", icon: Star },
  { id: "explore", label: "Explore", color: "hsl(38 92% 50%)", icon: Search },
]


export function Sidebar() {

  const [search, setSearch] = useState("")
  const [activeAgent, setActiveAgent] = useState("build")
  const [activeSession, setActiveSession] = useState("1")
  

  const filtered= MOCK_SESSIONS.filter((session) => session.title.toLowerCase().includes(search.toLowerCase()))
  console.log("Filtered sessions:", filtered)


  return (
    <div>
        <h1>Sidebar</h1>
    </div>
  )


}