import { $$, $ } from "./helper";

export const handlerCopyCode = () => {
  const highlightBlocks = $$(".highlight");
  if (highlightBlocks.length === 0) return;

  highlightBlocks.forEach((pre) => {
    pre.addEventListener("click", () => {
      const code = $("code", pre);
      if (!code) return;

      navigator.clipboard
        .writeText(code.innerText)
        .then(() => {
          pre.classList.add("copied");
          setTimeout(() => {
            pre.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => console.error("Copy failed", err));
    });
  });
};
