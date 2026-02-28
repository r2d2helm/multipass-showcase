// Sanitize data before sending to client
// Strips internal IPs, hostnames, file paths, and ports

const PATTERNS = {
  ipv4Private: /\b(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/g,
  hostname: /\b(r2d2-?(main|stage|store|lab|monitor)|proxmox|localhost)\b/gi,
  filePath: /\/(home|var|etc|srv|opt|mnt|tmp)\/[\w\-/.]+/g,
  dockerSocket: /\/var\/run\/docker\.sock/g,
  internalUrl: /https?:\/\/(localhost|127\.0\.0\.\d+|192\.168\.\d+\.\d+)(:\d+)?/g,
}

export function sanitize(input: string): string {
  let result = input
  result = result.replace(PATTERNS.ipv4Private, '[REDACTED_IP]')
  result = result.replace(PATTERNS.internalUrl, '[REDACTED_URL]')
  result = result.replace(PATTERNS.hostname, '[REDACTED_HOST]')
  result = result.replace(PATTERNS.filePath, '[REDACTED_PATH]')
  result = result.replace(PATTERNS.dockerSocket, '[REDACTED_PATH]')
  return result
}

export function sanitizeObject<T>(obj: T): T {
  const json = JSON.stringify(obj)
  const sanitized = sanitize(json)
  return JSON.parse(sanitized)
}
