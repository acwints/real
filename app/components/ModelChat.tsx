'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ModelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsExpanded(true);

    try {
      // Check if we're in static export mode (API routes don't work)
      const useStaticExport = process.env.NEXT_PUBLIC_USE_STATIC_EXPORT === 'true';
      const isProd = process.env.NODE_ENV === 'production';
      
      if (isProd && useStaticExport) {
        throw new Error('API routes not available in static export mode');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'I apologize, but I encountered an error processing your request.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'The chat feature requires a server environment to work. API routes are not available in static export mode (GitHub Pages). To use the chat feature, please deploy to a platform that supports API routes like Vercel or Netlify, or run the development server locally.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
      {/* Compact Search Box */}
      {!isExpanded && (
        <form onSubmit={handleSubmit} className="p-3">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the financial model..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-neutral-900 placeholder-neutral-500"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2.5 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? '...' : 'Ask'}
            </button>
          </div>
        </form>
      )}

      {/* Expanded Chat View */}
      {isExpanded && (
        <>
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 border-b border-white/20 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">AI Assistant</h3>
              <p className="text-xs text-neutral-300">Powered by OpenAI</p>
            </div>
            <button
              onClick={() => {
                setIsExpanded(false);
                setMessages([]);
              }}
              className="text-neutral-300 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-3 bg-white/95 backdrop-blur-sm">
            {messages.length === 0 && (
              <div className="text-center text-sm text-neutral-500 py-4">
                Ask a question to get started
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-neutral-900 border border-neutral-200'
                  }`}
                >
                  <div className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <div className="animate-pulse">Thinking...</div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/20 p-3 bg-white/10 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-neutral-900 placeholder-neutral-500 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
