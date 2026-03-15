'use client';

import { useState, useCallback, useRef } from 'react';

export function useStreamingText() {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const startStreaming = useCallback(
    async (url: string, body: Record<string, unknown>) => {
      // Abort any existing stream
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setText('');
      setIsStreaming(true);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setText((prev) => prev + chunk);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Streaming error:', err);
        }
      } finally {
        setIsStreaming(false);
      }
    },
    []
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setText('');
    setIsStreaming(false);
  }, []);

  return { text, isStreaming, startStreaming, stopStreaming, reset };
}
