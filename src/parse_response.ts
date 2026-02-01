import { createAllStarElements } from "./script";

const decoder = new TextDecoder();

async function readAllChunks(
  readableStream: ReadableStream | null,
  onChunk: (total: string) => void,
  onEnd: () => void,
) {
  if (!readableStream) {
    return [];
  }
  const reader = readableStream.getReader();
  let total = "";

  let done, value;
  while (!done) {
    ({ value, done } = await reader.read());
    if (done) {
      onEnd();
      return total;
    }
    const text = decoder.decode(value);
    total += text;
    onChunk(total);
  }
}

const runLoop = async (prompt: string) => {
  const main: HTMLElement | null = document.querySelector(".main");

  if (!main) {
    return;
  }

  const body = JSON.stringify({ prompt, currentPage: main.innerHTML });

  const res = await fetch("/prompt", { method: "PUT", body });

  readAllChunks(
    res.body,
    (chunk) => {
      main.innerHTML = chunk;
    },
    createAllStarElements,
  );
};

const randomPrompts = [
  "Make the page about rabbits",
  "Make the page about fishing",
  "Make it way more cool",
];

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("aiButton");
  const input = document.getElementById("aiInput");

  if (!button || !input) {
    return;
  }

  button.onclick = () => {
    let prompt = (input as HTMLInputElement).value;
    console.log(prompt);
    if (!prompt) {
      const randomInd = Math.floor(Math.random() * randomPrompts.length);
      prompt = randomPrompts[randomInd]!;
    }

    runLoop(prompt);
  };
});

// const buildEl = (parentEl: HTMLElement, el: HTMLEl | string) => {
//   if (typeof el === "string") {
//     parentEl.append(el);
//     return;
//   }

//   const newEl = document.createElement(el.tag);

//   Object.keys(el.attributes).forEach((attrKey) => {
//     newEl.setAttribute(attrKey, el.attributes[attrKey]!);
//   });

//   el.contents.forEach((child) => {
//     buildEl(newEl, child);
//   });

//   parentEl.appendChild(newEl);
// };

// type HTMLEl = {
//   tag: string;
//   attributes: Record<string, string>;
//   contents: Array<HTMLEl | string>;
// };
