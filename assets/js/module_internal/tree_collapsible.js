import { $, $$, on } from "./helper.js";

const treeToggle = (e) => {
  const btn = e.currentTarget;
  const targetId = btn.getAttribute("data-folder-target");
  const targetEl = $(`#${targetId}`);
  const toggleIcon = $('.tree__icon-toggle', btn);

  if (targetEl && toggleIcon) {
    targetEl.classList.toggle("tree__list--isOpen");
    toggleIcon.classList.toggle("tree__icon-toggle--isOpen");

    let treeState = {};
    try {
      treeState = JSON.parse(sessionStorage.getItem("TREE")) || {};
    } catch (err) {
      console.warn("Failed to parse TREE state:", err);
    }

    treeState[targetId] = targetEl.classList.contains("tree__list--isOpen");
    sessionStorage.setItem("TREE", JSON.stringify(treeState));
  }
};

const restoreTreeState = () => {
  let treeState = {};
  try {
    treeState = JSON.parse(sessionStorage.getItem("TREE")) || {};
  } catch (err) {
    console.warn("Failed to parse TREE state:", err);
  }

  $$("[data-folder-target]").forEach((btn) => {
    const targetId = btn.getAttribute("data-folder-target");
    const targetEl = $(`#${targetId}`);
    const toggleIcon = $('.tree__icon-toggle', btn);

    if (targetEl && toggleIcon && treeState[targetId]) {
      targetEl.classList.add("tree__list--isOpen");
      toggleIcon.classList.add("tree__icon-toggle--isOpen");
    }
  });
};

export const treeHandler = () => {
  on("click", "[data-folder-target]", treeToggle);
  restoreTreeState();
};
