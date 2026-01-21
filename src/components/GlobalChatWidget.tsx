import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  X,
  Send,
  Code,
  BookOpen,
  PenLine,
  Minimize2,
  Maximize2,
  MessageSquare,
} from 'lucide-react';

// Chat action presets
const chatPresets = [
  { icon: PenLine, label: 'Write', prompt: 'Help me write ' },
  { icon: BookOpen, label: 'Learn', prompt: 'Explain how MIGA ' },
  { icon: Code, label: 'Code', prompt: 'Help me integrate MIGA ' },
];

// Page context mapping
const getPageContext = (pathname: string): string => {
  const contexts: Record<string, string> = {
    '/': 'MIGA Protocol homepage - diaspora-led civic operating system',
    '/token': 'MIGA Token page - tokenomics and contract information',
    '/docs': 'MIGA Documentation - technical guides and resources',
  };
  return contexts[pathname] || `MIGA Protocol page: ${pathname}`;
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function GlobalChatWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pageContext = getPageContext(location.pathname);

  // Listen for events from footer chat widget
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);

      if (event.detail?.message) {
        setInput(event.detail.message);
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      if (event.detail?.action) {
        const preset = chatPresets.find(p => p.label === event.detail.action);
        if (preset) {
          setInput(preset.prompt);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }
    };

    window.addEventListener('openGlobalChat', handleOpenChat as EventListener);
    return () => window.removeEventListener('openGlobalChat', handleOpenChat as EventListener);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Welcome! I'm here to help you learn about MIGA Protocol - the token powering a diaspora-led civic operating system. You're viewing ${pageContext}. How can I assist you?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, pageContext]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Hanzo AI API
      const response = await fetch('https://api.hanzo.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hz_widget_public',
        },
        body: JSON.stringify({
          model: 'zen-eco-4b',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for MIGA Protocol - a token powering a diaspora-led civic operating system for the Persian community. Current page: ${pageContext}. 
              
Key facts about MIGA:
- Total supply: 7 billion tokens across 7 chains
- 1 billion tokens live on Solana first
- Distribution: 50% DAO Treasury, 40% Fair Sale, 10% Liquidity
- No VCs, no presales, no team allocation
- Powers 10 specialized DAOs for humanitarian programs
- Part of the Pars ecosystem (pars.network, pars.vote, pars.markets, pars.fund)

Be concise, helpful, and knowledgeable about MIGA's mission to support the Persian diaspora.`,
            },
            ...messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: input.trim() },
          ],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I'm having trouble connecting right now. You can learn more at [miga.us.org](https://miga.us.org) or join our [Discord](https://discord.gg/miga).`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Connection issue. Visit [miga.us.org](https://miga.us.org) for more information.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, pageContext, messages]);

  const handlePreset = (preset: typeof chatPresets[0]) => {
    setInput(preset.prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#0f0f1a] border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all hover:scale-105"
        >
          <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#D4AF37]" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-[#0a0a12] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
            isExpanded
              ? 'inset-4 md:inset-8'
              : 'bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/10 bg-[#0f0f1a]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1a1a2e] border border-[#D4AF37]/20">
                <img src="/images/migacoin.png" alt="MIGA" className="w-5 h-5 rounded-full object-cover" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">MIGA Assistant</div>
                <div className="text-white/40 text-xs">Powered by Hanzo AI</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-[#D4AF37] text-[#0a0a12] rounded-br-md'
                      : 'bg-[#1a1a2e] text-white/80 rounded-bl-md'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a2e] px-4 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#D4AF37]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#D4AF37]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#D4AF37]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset buttons */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {chatPresets.map((preset) => {
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handlePreset(preset)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1a2e] border border-[#D4AF37]/10 text-white/50 text-xs font-medium hover:bg-[#252541] hover:text-white hover:border-[#D4AF37]/20 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-[#D4AF37]/10 bg-[#0f0f1a]">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about MIGA..."
                className="w-full bg-[#1a1a2e] border border-[#D4AF37]/20 rounded-full px-4 py-2.5 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  input.trim() ? 'bg-[#D4AF37] hover:bg-[#F4D03F]' : 'bg-transparent'
                } disabled:opacity-50`}
              >
                <Send className={`w-4 h-4 ${input.trim() ? 'text-[#0a0a12]' : 'text-white/40'}`} />
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-white/30 text-[10px]">
                Press Enter to send
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
