import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_BASE_URL

  async function startSession() {
    try {
      const { data } = await axios.post(`${API}/session`)
      localStorage.setItem('sessionId', data.sessionId)
      navigate('/chat')
    } catch {
      alert('Cannot start session. Check backend.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <img src="/chatbot.svg" alt="bot" className="mx-auto mb-4 w-28 h-20" />
        <h1 className="text-2xl font-semibold mb-4">News Chatbot</h1>
        <button
          onClick={startSession}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Chat
        </button>
      </div>
    </div>
  )
}
