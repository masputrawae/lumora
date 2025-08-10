import { $, $$ } from "./helper";
import { renderGiscus } from "./render_giscus";
function updateGiscusTheme(theme) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) return;

  iframe.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: theme,
        },
      },
    },
    "https://giscus.app",
  );
}

export function themeHandler() {
  const elHtml = document.documentElement;
  const themeOrder = ["auto", "dark", "light"];
  const themeIcons = $$("svg.icon--theme use");
  const KEY_THEME = "APP_THEME";

  if (!themeIcons.length) {
    console.warn("⚠️ No theme icons found.");
    return;
  }

  const iconUseEl = themeIcons[0];
  const href = iconUseEl.getAttribute("href") || "";
  const [path] = href.includes("#") ? href.split("#") : [""];

  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const ICONS = {
    auto: "icon-pc-display",
    dark: "icon-moon-stars-fill",
    light: "icon-sun",
  };

  const getIconId = (theme) => ICONS[theme] || ICONS.auto;

  const resolveTheme = (theme) => {
    if (!themeOrder.includes(theme)) return "auto";
    return theme === "auto" ? systemTheme : theme;
  };

  const applyTheme = (theme) => {
    const resolved = resolveTheme(theme);
    elHtml.dataset.theme = resolved;
    sessionStorage.setItem(KEY_THEME, theme);

    const iconId = getIconId(theme);
    themeIcons.forEach((el) => el.setAttribute("href", `${path}#${iconId}`));

    const themeContainer = $(".theme");
    const themeSelect = $('select[name="select-theme"]', themeContainer);
    if (themeSelect) themeSelect.value = theme;
    // 👉 Update tema Giscus juga
    updateGiscusTheme(resolved);
  };

  const init = () => {
    const saved = sessionStorage.getItem(KEY_THEME) || "auto";
    applyTheme(saved);
    renderGiscus(resolveTheme(saved))
  };

  // === Event bindings ===
  const themeContainer = $(".theme");
  const themeSelect = $('select[name="select-theme"]', themeContainer);
  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
  }

  const toggleButton = $("#toggleTheme");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const current = sessionStorage.getItem(KEY_THEME) || "auto";
      const currentIndex = themeOrder.indexOf(current);
      const next = themeOrder[(currentIndex + 1) % themeOrder.length];
      applyTheme(next);
    });
  }

  init();
}
