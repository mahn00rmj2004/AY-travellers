// lib/sanitize.ts
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip control chars / newlines that could be used for header injection
export function stripControlChars(input: string): string {
  return input.replace(/[\r\n\t\u0000-\u001F\u007F]/g, " ").trim();
}