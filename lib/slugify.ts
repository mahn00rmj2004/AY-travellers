export function slugify(title: string, subtitle?: string | null): string {
  return `${title} ${subtitle ?? ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
