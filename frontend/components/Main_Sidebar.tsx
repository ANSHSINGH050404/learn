'use client'

import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

type Message = {
  from: string
  text: string
  createdAt: number
}

const MainSidebar = () => {

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {

    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off("newMessage")
    }

  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!input.trim()) return

    const message: Message = {
      from: "User",
      text: input,
      createdAt: Date.now(),
    }

    // SEND TO SERVER
    socket.emit("createMessage", message)

    setInput("")

  }

  return (

    <div className="flex-1 flex flex-col items-center justify-center">

      <div className="text-center space-y-4">

        <h1 className="text-xl font-semibold">Build anything</h1>

        {/* MESSAGES */}

        <div className="space-y-2">

          {messages.map((msg, index) => (

            <div key={index} className="text-white">

              <p className="text-xs text-gray-400">
                {msg.from}
              </p>

              <p>{msg.text}</p>

            </div>

          ))}

        </div>

      </div>

      {/* INPUT */}

      <div className="fixed bottom-8 w-[600px]">

        <div className="flex border border-gray-700 rounded-lg p-3 bg-gray-900">

          <input
            placeholder="Ask anything..."
            className="w-full bg-transparent outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}

            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick(e as any)
            }}
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleClick}
          >
            <Send size={18} />
          </button>

        </div>

      </div>

    </div>

  )
}

export default MainSidebar