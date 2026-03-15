// Creates a ReadableStream that emits text token-by-token
export function createMockStream(
  text: string,
  delayMs: number = 25
): ReadableStream<string> {
  const words = text.split(/(\s+)/); // Split keeping whitespace
  let index = 0;

  return new ReadableStream({
    async pull(controller) {
      if (index < words.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(words[index]);
        index++;
      } else {
        controller.close();
      }
    },
  });
}

// Creates a streaming Response from text (for API routes)
export function createMockStreamResponse(
  text: string,
  delayMs: number = 25
): Response {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  let index = 0;

  const stream = new ReadableStream({
    async pull(controller) {
      if (index < words.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        controller.enqueue(encoder.encode(words[index]));
        index++;
      } else {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
