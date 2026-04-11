'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDealCoach } from '@/hooks/use-deal-coach';
import type { Account, Competitor } from '@/lib/schemas';

interface DealCoachPanelProps {
  account: Account;
  competitors: Competitor[];
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_ACTIONS = [
  { label: 'Prep me for this call', emoji: '📋' },
  { label: "What's the competitive risk?", emoji: '⚠️' },
  { label: 'Help me handle objections', emoji: '🛡️' },
  { label: 'Build TCO talking points', emoji: '💰' },
  { label: "What's my renewal strategy?", emoji: '🔄' },
];

// Lightweight inline markdown renderer — handles **bold** and line breaks
function MessageContent({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-0.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line === '') return <div key={i} className="h-2" />;

        const parts = line.split(/(\*\*[^*\n]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        );
      })}
    </div>
  );
}

export function DealCoachPanel({ account, competitors, isOpen, onClose }: DealCoachPanelProps) {
  const [input, setInput] = useState('');
  const { messages, streamingText, isStreaming, sendMessage, clearMessages } = useDealCoach(account.slug);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasConversation = messages.length > 0 || isStreaming;

  // Scroll to bottom when new content arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, streamingText]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage(input.trim(), account, competitors);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border shrink-0 bg-card">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-none">Deal Coach</p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{account.name}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {hasConversation && (
              <button
                onClick={clearMessages}
                title="Clear conversation"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Account context bar */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border bg-secondary/30 shrink-0">
          <span className="text-base leading-none">{account.logo}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <span className={`font-semibold ${
              account.healthScore >= 80 ? 'text-green-500' :
              account.healthScore >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {account.healthScore}/100 health
            </span>
            <span className="text-border">·</span>
            <span className="capitalize">{account.stage}</span>
            <span className="text-border">·</span>
            <span>{competitors.length} competitor{competitors.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Empty state */}
          {!hasConversation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="text-center pt-4 pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">AI-powered deal coaching</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[260px] mx-auto">
                  I have full context on {account.name} — ask me anything about this deal.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-0.5">Quick actions</p>
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.label, account, competitors)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-border bg-secondary/40 text-left hover:bg-secondary hover:border-primary/30 transition-colors group"
                  >
                    <span className="text-base leading-none shrink-0">{action.emoji}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                    <svg className="ml-auto text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Conversation history */}
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-secondary border border-border rounded-tl-sm'
              }`}>
                {msg.role === 'user'
                  ? <p className="text-sm">{msg.content}</p>
                  : <MessageContent content={msg.content} />
                }
              </div>
            </div>
          ))}

          {/* Streaming response */}
          {isStreaming && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 bg-secondary border border-border">
                {streamingText ? (
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    <MessageContent content={streamingText} />
                    <span className="inline-block w-[5px] h-[1em] bg-primary/60 animate-pulse ml-0.5 translate-y-[2px]" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-border bg-card shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              disabled={isStreaming}
              placeholder="Ask about this deal..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 disabled:opacity-50 transition-colors min-h-[42px] max-h-32"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="w-[42px] h-[42px] rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none shrink-0"
            >
              {isStreaming ? (
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground/50 mt-2">Shift+Enter for new line · conversations persist per account</p>
        </div>
      </motion.div>
    </>
  );
}
