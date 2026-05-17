import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Bot, Loader2 } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "Can I safely sign this?",
  "What is the biggest risk?",
  "Can the company terminate me anytime?",
  "Are there hidden fees?",
  "What should I negotiate?",
  "Explain this in simple words."
];

export default function ChatPanel({ documentText, analysis }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm LexGuard Chat. I can answer questions about the document you just uploaded. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const question = text || input;
    if (!question.trim()) return;

    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, documentText, analysis })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, there was a network error connecting to Gemini." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!analysis) return null;

  return (
    <div className="glass-card flex flex-col h-[600px] border border-white/10 overflow-hidden mt-12 relative">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-surface/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-bold">Dynamic Chat With Document</h2>
          <p className="text-xs text-white/50">Ask questions based on your actual document text.</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-white/10 text-white rounded-tr-none' 
                : 'bg-primary/10 border border-primary/20 text-white/90 rounded-tl-none'
            }`}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-surface/30">
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-white/10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about the document..."
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-full bg-primary text-white disabled:opacity-50 hover:bg-primary/80 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
