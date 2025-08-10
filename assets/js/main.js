import { handlerCopyCode } from "./module_internal/copy_code.js";
import { linkPreviewHandler } from "./module_internal/link_preview.js";
import { dialogSearchToggle, searchHandler } from "./module_internal/search.js";
import { sidebarHandler } from "./module_internal/sidebar.js";
import { langHandler } from "./module_internal/switch_lang.js";
import { themeHandler } from "./module_internal/switch_themes.js";
import { tocHandler } from "./module_internal/table_of_contents.js";
import { treeHandler } from "./module_internal/tree_collapsible.js";

document.addEventListener("DOMContentLoaded", () => {
  handlerCopyCode();
  themeHandler();
  langHandler();
  treeHandler();
  sidebarHandler();
  tocHandler();
  searchHandler();
  dialogSearchToggle();
  linkPreviewHandler();
});
