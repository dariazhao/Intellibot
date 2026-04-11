'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Account, Competitor } from '@/lib/schemas';

export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function useDealCoach(accountSlug: string) {
  const storageKey = `intellibot-deal-coach-${accountSlug}`;
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setMessages(JSON.parse(stored));
    } catch {}
  }, [storageKey]);

  // Persist to localStorage on change
  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem(storageKey, JSON.stringify(messages)); } catch {}
    }
  }, [messages, storageKey]);

  const sendMessage = useCallback(async (
    content: string,
    account: Account,
    competitors: Competitor[],
  ) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg: CoachMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => {
      const next = [...prev, userMsg];
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
    setStreamingText('');
    setIsStreaming(true);

    try {
      const res = await fetch('/api/deal-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          account,
          competitors,
        }),
      });

      if (!res.body) throw new Error('No body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreamingText(accumulated);
      }

      const assistantMsg: CoachMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: accumulated,
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const next = [...prev, assistantMsg];
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
        return next;
      });
      setStreamingText('');
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Deal coach error:', err);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [messages, storageKey]);

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setStreamingText('');
    setIsStreaming(false);
    try { localStorage.removeItem(storageKey); } catch {}
  }, [storageKey]);

  return { messages, streamingText, isStreaming, sendMessage, clearMessages };
}
