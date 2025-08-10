import { $ } from "./helper";
export function renderGiscus(theme) {
  const container = $(".discussion");
  if (!container) return;
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";

  const config = container.dataset;
  script.setAttribute("data-repo", config.repo);
  script.setAttribute("data-repo-id", config.repoId);
  script.setAttribute("data-category", config.category);
  script.setAttribute("data-category-id", config.categoryId);
  script.setAttribute("data-mapping", config.mapping);
  script.setAttribute("data-strict", config.strict);
  script.setAttribute("data-reactions-enabled", config.reactionsEnabled);
  script.setAttribute("data-emit-metadata", config.emitMetadata);
  script.setAttribute("data-input-position", config.inputPosition);
  script.setAttribute("data-theme", theme);
  script.setAttribute("data-lang", document.documentElement.lang || config.lang);
  script.crossOrigin = "anonymous";
  script.async = true;

  container.appendChild(script);
}
