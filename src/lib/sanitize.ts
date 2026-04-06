import sanitizeHtml from "sanitize-html";

export function sanitize(dirty: string): string {
  return sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} });
}
