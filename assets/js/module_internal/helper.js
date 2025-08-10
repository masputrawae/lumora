// === DOM Utility Helpers ===

/**
 * Selects an element by ID safely, even if it starts with a number.
 *
 * @param {string} id - The ID of the element.
 * @param {Document|HTMLElement} [scope=document] - Optional scope to search in.
 * @returns {HTMLElement|null}
 */
export const byId = (id, scope = document) => scope.getElementById(id);

/**
 * Selects the first DOM element that matches a CSS selector.
 *
 * @param {string} selector - The CSS selector to match.
 * @param {Document|HTMLElement} [scope=document] - Optional scope element to search within.
 * @returns {Element|null} The first matching element or null if not found.
 */
export const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Selects all DOM elements that match a CSS selector.
 *
 * @param {string} selector - The CSS selector to match.
 * @param {Document|HTMLElement} [scope=document] - Optional scope element to search within.
 * @returns {NodeListOf<Element>} A NodeList of matching elements.
 */
export const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// === Event Handling ===

/**
 * Adds an event listener to all elements matching a selector.
 *
 * @param {string} event - The event type (e.g., 'click', 'input').
 * @param {string} selector - The CSS selector for target elements.
 * @param {Function} handler - The callback function to handle the event.
 * @param {Document|HTMLElement} [scope=document] - Optional scope to search within.
 */
export const on = (event, selector, handler, scope = document) => {
  const elements = $$(selector, scope);
  elements.forEach((el) => el.addEventListener(event, handler));
};

// === Element Creation ===

/**
 * Creates a new DOM element with attributes and children.
 *
 * @example
 * // Create a button with a click handler and text
 * const btn = create('button', { onClick: () => alert('Clicked!'), class: 'my-btn' }, 'Click Me');
 * document.body.appendChild(btn);
 *
 * @param {string} tag - The HTML tag name to create (e.g., 'div', 'span').
 * @param {Object} [attrs={}] - Attributes or event listeners (e.g., { class: 'btn', onClick: fn }).
 * @param {...(string|Node)} children - Child nodes or strings to append.
 * @returns {HTMLElement} The created DOM element.
 */
export const create = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }
  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });
  return el;
};

// === Class Manipulation ===

/**
 * Toggles a class on all elements that match a selector.
 *
 * @param {string} selector - The CSS selector to match elements.
 * @param {string} className - The class name to toggle.
 * @param {Document|HTMLElement} [scope=document] - Optional scope element to search within.
 */
export const toggleClass = (selector, className, scope = document) => {
  $$(selector, scope).forEach((el) => el.classList.toggle(className));
};

// === Content Manipulation ===

/**
 * Sets the innerHTML of the first element matching the selector.
 *
 * @param {string} selector - The CSS selector to find the element.
 * @param {string} content - The HTML content to set.
 * @param {Document|HTMLElement} [scope=document] - Optional scope to search within.
 */
export const html = (selector, content, scope = document) => {
  const el = $(selector, scope);
  if (el) el.innerHTML = content;
};
