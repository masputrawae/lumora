import { $$ } from "./helper";

export function langHandler() {
  $$('select[name="lang-select"]').forEach((el) => {
    el.addEventListener("change", (event) => {
      window.location.href = event.target.value;
    });
  });
}
