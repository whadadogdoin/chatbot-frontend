import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ChatMessage from '../components/ChatMessage'

export default function Chat() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const containerRef = useRef()
  const API = import.meta.env.VITE_API_BASE_URL
  const sessionId = localStorage.getItem('sessionId')

  // load history
  useEffect(() => {
    if (!sessionId) return
    axios.get(`${API}/session/${sessionId}/history`)
      .then(res => setHistory(res.data.history))
  }, [sessionId])

  // auto-scroll
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [history])

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setHistory(h => [...h, userMsg])
    setInput('')

    try {
      const { data } = await axios.post(`${API}/query`, { sessionId, query: input })
      setHistory(h => [...h, { role: 'bot', content: data.response }])
    } catch (e) {
      console.error(e)
    }
  }

  function clearSession() {
    axios.delete(`${API}/session/${sessionId}`)
      .then(() => setHistory([]))
  }

  if (!sessionId) {
    return <div className="p-4">No session. <a href="/">Go Home</a></div>
  }

  return (
    <div className="flex flex-col h-screen">
      <div ref={containerRef} className="flex-1 overflow-auto p-4 bg-gray-100">
        {history.map((m, i) =>
          <ChatMessage key={i} {...m} />
        )}
      </div>
      <div className="flex p-4 border-t space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Ask about news..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
        <button onClick={clearSession} className="px-4 py-2 bg-red-600 text-white rounded">Clear</button>
      </div>
    </div>
  )
}
