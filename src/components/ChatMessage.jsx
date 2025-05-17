export default function ChatMessage({ role, content }) {
  const isBot = role === 'bot'
  return (
    <div className={`mb-2 flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`p-2 rounded-lg max-w-xs ${isBot ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
        {content}
      </div>
    </div>
  )
}
