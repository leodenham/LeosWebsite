import { OpenRouter } from "@openrouter/sdk";

interface Env {
  KV: KVNamespace;
}

function asyncIterableToReadableStream<T>(
  iterable: AsyncIterable<T>,
  transform: (value: T) => Uint8Array,
): ReadableStream<Uint8Array> {
  const iterator = iterable[Symbol.asyncIterator]();

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(transform(value));
    },
    async cancel(reason) {
      // If the iterator supports early cleanup, call it.
      await iterator.return?.(reason);
    },
  });
}

const openRouter = new OpenRouter({
  apiKey: process.env['OPENROUTER_API_KEY']
  httpReferer: "leodenham.com",
  xTitle: "Leodenham.com",
});

const encoder = new TextEncoder();

export const onRequest: PagesFunction<Env> = async (context) => {
  const body = await context.request.text();
  const { prompt, currentPage } = JSON.parse(body);

  console.log(prompt);

  const res = openRouter.callModel({
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    input: getModelInput(prompt, currentPage),
  });

  const textStream = res.getTextStream();

  return new Response(
    asyncIterableToReadableStream(textStream, (chunk) => encoder.encode(chunk)),
    {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache",
        connection: "keep-alive",
      },
    },
  );
};

const getModelInput = (prompt: string, currentState: string) => {
  const leoDenhamPrompt =
    "\n- The page should have at least 1 reference to Leo Denham.";

  const showLeoDenhamPrompt = Math.random() > 1;
  //
  console.log(prompt);

  return `
    You are the best website creator in the world.
    You will be given a prompt by the user and your task is to output a basic HTML page inspired by their prompt.
    Here are some other factors to consider:
    - Only ever respond in PURE HTML. Anything else will be invalid and break functionality.
    - The HTML page should be relatively simple, roughly the same size / complexity as the example I provide.${showLeoDenhamPrompt ? leoDenhamPrompt : ""}
    - You must encompass the ideas presented by the user
    - You should use similar HTML classNames as in the example - these have good styling.
    - Where you need other styling use inline styles. Note: the existing background is dark and the text is light. You should never make dark text on a light background.
    - Never change the image filenames. The filenames presently set are the only ones that work.
    - Add the 'data-star-color' attribute (with a colour as a hex code) to fun elements. Add this to a few elements (image, logos, etc)
    - Do not wrap it in markdown.

    Example:
    ${currentState}

    Users prompt:
    ${prompt}
    `;
};
