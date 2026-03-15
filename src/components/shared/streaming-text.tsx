'use client';

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  className?: string;
}

export function StreamingText({ text, isStreaming, className = '' }: StreamingTextProps) {
  return (
    <span className={className}>
      {text}
      {isStreaming && <span className="cursor-blink" />}
    </span>
  );
}
