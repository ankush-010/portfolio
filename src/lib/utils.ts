// Utility: combine class names (lightweight cx/cn without clsx dependency)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Utility: open external link safely
export function externalLink(url: string) {
  return {
    href: url,
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
  }
}

// Utility: check if a URL is a placeholder
export function isPlaceholder(url: string): boolean {
  return url.includes('PLACEHOLDER') || url.includes('your-domain')
}
