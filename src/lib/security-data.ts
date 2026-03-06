export interface SecurityLayer {
  id: string
  name: string
  icon: string
  description: string
  controls: SecurityControl[]
}

export interface SecurityControl {
  id: string
  name: string
  scope: string
  status: 'enforced' | 'active' | 'scheduled'
  detail: string
}

export interface NetworkZone {
  id: string
  name: string
  vlan: string
  hosts: string[]
  ingress: string[]
  egress: string[]
  firewall: string
}

export interface CredentialPolicy {
  id: string
  asset: string
  storage: string
  rotation: string
  access: string
  chmod: string
}

export interface HardeningCheck {
  id: string
  vm: string
  category: string
  check: string
  status: 'pass' | 'warn' | 'fail'
  detail: string
}

export interface ThreatMitigation {
  id: string
  threat: string
  vector: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  mitigation: string[]
  coverage: string
}

export const SECURITY_LAYERS: SecurityLayer[] = [
  {
    id: 'perimeter',
    name: 'Perimetre & Reseau',
    icon: '🌐',
    description: 'Isolation reseau, firewall, tunnel chiffre, zero ports exposes',
    controls: [
      { id: 'ufw', name: 'UFW Firewall', scope: '5/5 VMs', status: 'enforced', detail: 'Regles strictes par VM, deny par defaut, allow LAN only sur services internes' },
      { id: 'tunnel', name: 'Cloudflare Tunnel', scope: 'r2d2-main', status: 'enforced', detail: 'Zero ports ouverts sur Internet — tout passe par tunnel chiffre (27b961f5)' },
      { id: 'traefik', name: 'Traefik Reverse Proxy', scope: 'Tous services web', status: 'enforced', detail: 'TLS termination, security headers, basic auth sur services internes' },
      { id: 'ssl', name: 'SSL Full Strict', scope: 'Cloudflare → Origin', status: 'enforced', detail: 'Origin CA certs (expire 2041), HSTS preload, no mixed content' },
      { id: 'lan-ssh', name: 'SSH LAN-only', scope: 'r2d2-main', status: 'enforced', detail: 'SSH accessible uniquement depuis 192.168.1.0/24, pas depuis Internet' },
    ],
  },
  {
    id: 'access',
    name: 'Acces & Authentification',
    icon: '🔑',
    description: 'SSH hardened, OAuth, JWT, basic auth, zero password login',
    controls: [
      { id: 'ssh-hard', name: 'SSH Hardening', scope: '4/4 VMs', status: 'enforced', detail: 'PasswordAuthentication no, PermitRootLogin no, MaxAuthTries 3, key-only' },
      { id: 'oauth', name: 'OAuth 2.0 (Google + GitHub)', scope: 'MultiPass App', status: 'active', detail: 'PKCE flow via Supabase Auth, client-side createBrowserClient' },
      { id: 'jwt', name: 'JWT Validation', scope: 'API + Middleware', status: 'enforced', detail: 'Secret 64 chars crypto-random, getSession() local validation sans appel reseau' },
      { id: 'basic-auth', name: 'Basic Auth (Traefik)', scope: 'Services internes', status: 'enforced', detail: 'Langfuse, Taskyn, NetBox, Dozzle proteges par bcrypt auth' },
      { id: 'email-confirm', name: 'Email Confirmation', scope: 'Inscription', status: 'active', detail: 'autoconfirm desactive — users doivent confirmer via email (Resend SMTP)' },
    ],
  },
  {
    id: 'runtime',
    name: 'Runtime & Application',
    icon: '🛡️',
    description: 'Hooks securite, path guard, validation pre-execution, tests',
    controls: [
      { id: 'security-hook', name: 'security_validator Hook', scope: 'Chaque commande Bash', status: 'enforced', detail: 'PreToolUse:Bash — valide chaque commande (blocked/confirm/alert) avant execution' },
      { id: 'path-guard', name: 'path_guard Hook', scope: 'Read/Write operations', status: 'enforced', detail: 'PreToolUse:Read/Write — protege .env, .ssh, secrets, fichiers systeme' },
      { id: 'tests-493', name: '493+ Tests Pytest', scope: 'Hooks Python', status: 'active', detail: 'Suite de tests complete couvrant security_validator, path_guard, memory system' },
      { id: 'e2e-55', name: '55 Tests E2E Playwright', scope: 'MultiPass App', status: 'active', detail: '15 public + 39 authenticated, cron */30, execution sur stage isolee' },
      { id: 'vitest-115', name: '115 Tests Vitest', scope: 'MultiPass App', status: 'active', detail: 'Sanitize (17), permissions (8), rate-limit (5), guard (4), + 81 existants' },
      { id: 'sec-headers', name: 'Security Headers', scope: 'Tous endpoints', status: 'enforced', detail: 'X-Frame-Options, HSTS 2 ans, CSP, no-sniff, referrer-policy strict' },
    ],
  },
  {
    id: 'data',
    name: 'Donnees & Secrets',
    icon: '🔐',
    description: 'Credentials chiffres, chmod 600, rotation, backup securise',
    controls: [
      { id: 'chmod', name: 'Permissions Fichiers', scope: 'Tous secrets', status: 'enforced', detail: '.env, .claude.json, mem0/config.py — chmod 600, owner-only read' },
      { id: 'no-secrets', name: 'Zero Secrets en Clair', scope: 'Logs + repos', status: 'enforced', detail: 'Jamais de passwords/tokens dans logs, git history, ou fichiers non proteges' },
      { id: 'backup-encrypt', name: 'Backup Offsite Chiffre', scope: 'Google Drive', status: 'active', detail: 'rclone sync avec crypt remote, credentials GDrive chiffrees' },
      { id: 'neo4j-auth', name: 'Neo4j Authentication', scope: 'Graph DB', status: 'enforced', detail: 'Password 32 chars rote, bolt protocol authentifie, pas d\'acces anonyme' },
      { id: 'postgres-auth', name: 'PostgreSQL Auth', scope: 'Databases', status: 'enforced', detail: 'Password unique par DB, connexion locale ou LAN only, pas de trust auth' },
    ],
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain & Updates',
    icon: '📦',
    description: 'Mises a jour automatiques, sources verifiees, scan repos',
    controls: [
      { id: 'unattended', name: 'Unattended Upgrades', scope: '4/4 VMs Ubuntu', status: 'enforced', detail: 'Security patches automatiques, reboot si necessaire, logs dans /var/log/unattended-upgrades/' },
      { id: 'docker-official', name: 'Images Docker Officielles', scope: '30 containers', status: 'enforced', detail: 'Uniquement images officielles ou verifiees, pas de builds from scratch non audites' },
      { id: 'upstream-scan', name: 'Scan Upstream Hebdomadaire', scope: 'Repos Miessler + Dynamous', status: 'active', detail: 'Cron lundi 7h — git fetch 40+ repos, filtre trivial, ntfy si nouveautes' },
      { id: 'gh-pat', name: 'GitHub PAT Scoped', scope: 'CI/CD', status: 'enforced', detail: 'Fine-grained PAT, repo+workflow scope only, pas d\'admin access' },
    ],
  },
  {
    id: 'observability',
    name: 'Observabilite & Audit',
    icon: '👁️',
    description: 'Logs centralises, rotation, monitoring multi-couche, audit trail',
    controls: [
      { id: 'rsyslog', name: 'Logs Centralises rsyslog', scope: '3 VMs → store', status: 'enforced', detail: 'TCP 514 vers r2d2-store, stockage /var/log/remote/{hostname}/, rotation 7j maxsize 500M' },
      { id: 'docker-logs', name: 'Docker Log Rotation', scope: '30 containers', status: 'enforced', detail: 'journald driver, max-size 10m, max-file 3, pas d\'accumulation disque' },
      { id: 'journald', name: 'Journald Limits', scope: '5 VMs', status: 'enforced', detail: 'SystemMaxUse=200M, rotation automatique, pas de remplissage disque' },
      { id: 'memory-hook', name: 'Memory Extractor Hook', scope: 'Sessions Claude', status: 'active', detail: 'Extraction heuristique + embeddings SQLite a chaque fin de session' },
      { id: 'subagent-log', name: 'Subagent Capture Hook', scope: 'Agents delegues', status: 'active', detail: 'Log resultats de tous les subagents pour audit trail' },
      { id: 'error-capture', name: 'Error Capture Hook', scope: 'Commandes echouees', status: 'active', detail: 'PostToolUse:Bash — capture et log toutes les commandes en echec' },
    ],
  },
]

export const NETWORK_ZONES: NetworkZone[] = [
  {
    id: 'dmz', name: 'DMZ (Internet-facing)', vlan: 'Cloudflare Tunnel',
    hosts: ['multipass.agency', 'octopus.watch', 'showcase.multipass.agency'],
    ingress: ['HTTPS via Cloudflare (zero direct ports)'],
    egress: ['Tunnel → Traefik :443 → services internes'],
    firewall: 'Cloudflare WAF + Origin CA + HSTS',
  },
  {
    id: 'compute', name: 'Compute (LAN)', vlan: '192.168.1.0/24',
    hosts: ['r2d2-main (.163)', 'r2d2-stage (.162)', 'r2d2-lab (.161)'],
    ingress: ['SSH key-only depuis LAN', 'NFS depuis store'],
    egress: ['Internet via NAT', 'NFS vers store', 'SSH entre VMs'],
    firewall: 'UFW deny default + allow LAN specific',
  },
  {
    id: 'storage', name: 'Storage', vlan: '192.168.1.164',
    hosts: ['r2d2-store (.164)'],
    ingress: ['NFS :2049 depuis compute', 'PostgreSQL :5432 depuis main', 'rsyslog :514 depuis all'],
    egress: ['Aucun acces Internet sortant necessaire'],
    firewall: 'UFW allow NFS/PG/syslog from LAN only',
  },
  {
    id: 'sentinel', name: 'Sentinelle', vlan: '192.168.1.101',
    hosts: ['r2d2-monitor (.101)'],
    ingress: ['Aucun (VM isolee)'],
    egress: ['ICMP + SSH vers main', 'HTTPS vers Proxmox API :8006'],
    firewall: 'UFW deny all incoming, allow outbound to LAN',
  },
]

export const HARDENING_CHECKS: HardeningCheck[] = [
  // SSH
  { id: 'h1', vm: 'all (4)', category: 'SSH', check: 'PasswordAuthentication no', status: 'pass', detail: 'Key-only authentication on all VMs' },
  { id: 'h2', vm: 'all (4)', category: 'SSH', check: 'PermitRootLogin no', status: 'pass', detail: 'Root SSH disabled, sudo required' },
  { id: 'h3', vm: 'all (4)', category: 'SSH', check: 'MaxAuthTries 3', status: 'pass', detail: 'Brute-force mitigation' },
  { id: 'h4', vm: 'r2d2-main', category: 'SSH', check: 'LAN-only binding', status: 'pass', detail: 'ListenAddress 192.168.1.163 only' },
  // Firewall
  { id: 'h5', vm: 'all (5)', category: 'Firewall', check: 'UFW enabled + deny default', status: 'pass', detail: 'Default deny incoming on all VMs' },
  { id: 'h6', vm: 'r2d2-main', category: 'Firewall', check: 'Zero public ports', status: 'pass', detail: 'All traffic via Cloudflare Tunnel, no direct exposure' },
  // Updates
  { id: 'h7', vm: 'all (4)', category: 'Updates', check: 'Unattended upgrades active', status: 'pass', detail: 'Automatic security patches' },
  // Logs
  { id: 'h8', vm: 'all (5)', category: 'Logs', check: 'Journald 200M max', status: 'pass', detail: 'SystemMaxUse=200M prevents log bloat' },
  { id: 'h9', vm: 'r2d2-main', category: 'Logs', check: 'Docker log rotation 10m/3', status: 'pass', detail: '30 containers with rotation limits' },
  { id: 'h10', vm: 'r2d2-store', category: 'Logs', check: 'Remote logs rotation 500M', status: 'pass', detail: 'Logrotate maxsize 500M daily rotate 7' },
  // Secrets
  { id: 'h11', vm: 'r2d2-main', category: 'Secrets', check: '.env files chmod 600', status: 'pass', detail: 'All credential files owner-only read' },
  { id: 'h12', vm: 'r2d2-main', category: 'Secrets', check: '.claude.json chmod 600', status: 'pass', detail: 'MCP config with tokens protected' },
  { id: 'h13', vm: 'r2d2-main', category: 'Secrets', check: 'No secrets in git history', status: 'pass', detail: 'Verified clean repo history' },
  // Services
  { id: 'h14', vm: 'r2d2-main', category: 'Services', check: '0 failed systemd units', status: 'pass', detail: 'All services healthy' },
  { id: 'h15', vm: 'r2d2-main', category: 'Services', check: '28/30 Docker healthchecks', status: 'pass', detail: '2 scratch images sans shell (upstream limitation)' },
]

export const THREAT_MODEL: ThreatMitigation[] = [
  {
    id: 't1', threat: 'Acces SSH non autorise', vector: 'Brute-force / credential stuffing',
    severity: 'critical',
    mitigation: ['Key-only auth (no passwords)', 'MaxAuthTries 3', 'LAN-only binding sur main', 'UFW deny default'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't2', threat: 'Exposition service sur Internet', vector: 'Port scan / exploit direct',
    severity: 'critical',
    mitigation: ['Zero ports ouverts (Cloudflare Tunnel)', 'Traefik reverse proxy', 'Basic auth services internes', 'Security headers complets'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't3', threat: 'Commande destructrice (rm -rf, dd)', vector: 'Erreur humaine / injection',
    severity: 'critical',
    mitigation: ['security_validator hook (PreToolUse:Bash)', 'path_guard hook (Read/Write)', '493+ tests couvrant les patterns dangereux', 'AskUserQuestion avant actions destructrices'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't4', threat: 'Fuite de credentials', vector: 'Git commit / logs / affichage',
    severity: 'high',
    mitigation: ['chmod 600 sur tous les fichiers secrets', 'path_guard bloque lecture .env/.ssh', 'Docker log rotation (pas d\'accumulation)', 'Scan securite hebdomadaire'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't5', threat: 'Supply chain (image Docker malveillante)', vector: 'Dependency confusion / typosquatting',
    severity: 'high',
    mitigation: ['Images officielles uniquement', 'Unattended upgrades', 'Scan upstream hebdomadaire', 'GitHub PAT scoped (minimal privileges)'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't6', threat: 'Perte de donnees', vector: 'Corruption disk / erreur humaine',
    severity: 'high',
    mitigation: ['Backup quotidien local (NFS store)', 'Backup offsite Google Drive', 'Test restore mensuel automatise (4/4 OK)', 'NFS vault survit a crash main'],
    coverage: '4/4 mitigations actives',
  },
  {
    id: 't7', threat: 'DDoS / abus API', vector: 'Flood HTTP',
    severity: 'medium',
    mitigation: ['Cloudflare WAF + rate limiting', 'Tunnel masque IP origine', 'Kong Gateway rate limiting'],
    coverage: '3/3 mitigations actives',
  },
  {
    id: 't8', threat: 'Lateral movement (VM compromise)', vector: 'Pivot depuis VM compromise',
    severity: 'medium',
    mitigation: ['UFW inter-VM (allow specific ports only)', 'SSH key per-VM (pas de cle partagee)', 'Sentinelle isolee (monitor)', 'Logs centralises pour detection'],
    coverage: '4/4 mitigations actives',
  },
]

export const SEVERITY_COLORS: Record<string, string> = {
  critical: '#FF6B6B',
  high: '#FBBF24',
  medium: '#00D4FF',
  low: '#4ADE80',
}
