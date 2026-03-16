"use cleint";



import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Zap, ChevronDown, Square } from "lucide-react"



const MODELS = [
  { id: "claude-sonnet-4-5", label: "Claude Sonnet 4.5", provider: "Anthropic" },
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", provider: "Google" },
  { id: "deepseek-r1", label: "DeepSeek R1", provider: "DeepSeek" },
]




export function ChatInput({
  onSend,
  isStreaming = false,
  onAbort,
}: {
  onSend: (text: string) => void
  isStreaming?: boolean
  onAbort?: () => void
}) {
    const [text, setText] = useState("")
  const [model, setModel] = useState(MODELS[0])
  const [showModels, setShowModels] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 200) + "px"
  }, [text])

  const submit = () => {
    if (!text.trim() || isStreaming) return
    onSend(text.trim())
    setText("")
  }
}





