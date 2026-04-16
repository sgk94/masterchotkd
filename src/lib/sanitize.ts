import sanitizeHtml from "sanitize-html";

export function sanitize(dirty: string): string {
  return sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} });
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
}
