export interface HardwarePartner {
  id: string
  name: string
  logo: string
  certLevel: 'production' | 'certified' | 'compatible' | 'evaluation'
  descKey: string
  models: string[]
  highlight?: string
}

export interface HardwareConfig {
  id: string
  tier: 'entry' | 'pro' | 'enterprise'
  nameKey: string
  descKey: string
  specs: { cpu: string; ram: string; storage: string; network: string }
  capacityKey: string
  priceRange: string
  recommended?: boolean
}

export interface IncludedItem {
  id: string
  icon: string
  titleKey: string
  descKey: string
}

export const HARDWARE_PARTNERS: HardwarePartner[] = [
  {
    id: 'dell',
    name: 'Dell Technologies',
    logo: 'DELL',
    certLevel: 'production',
    descKey: 'hw.partner.dell',
    models: ['PowerEdge R740', 'PowerEdge R750', 'PowerEdge R660', 'PowerEdge T560'],
    highlight: 'R740',
  },
  {
    id: 'hp',
    name: 'HPE (Hewlett Packard Enterprise)',
    logo: 'HPE',
    certLevel: 'certified',
    descKey: 'hw.partner.hp',
    models: ['ProLiant DL380 Gen11', 'ProLiant DL360 Gen11', 'ProLiant ML350 Gen11'],
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    logo: 'LENOVO',
    certLevel: 'certified',
    descKey: 'hw.partner.lenovo',
    models: ['ThinkSystem SR650 V3', 'ThinkSystem ST650 V3', 'ThinkSystem SR630 V3'],
  },
  {
    id: 'supermicro',
    name: 'Supermicro',
    logo: 'SMC',
    certLevel: 'compatible',
    descKey: 'hw.partner.supermicro',
    models: ['SuperServer 1U/2U', 'MicroCloud', 'GPU SuperServer'],
  },
  {
    id: 'asus',
    name: 'ASUS',
    logo: 'ASUS',
    certLevel: 'compatible',
    descKey: 'hw.partner.asus',
    models: ['RS720A', 'RS520A', 'ESC4000A'],
  },
  {
    id: 'custom',
    name: 'Custom Build',
    logo: 'DIY',
    certLevel: 'evaluation',
    descKey: 'hw.partner.custom',
    models: ['Proxmox VE 9+', 'Ubuntu 24.04 LTS', 'Bare Metal'],
  },
]

export const HARDWARE_CONFIGS: HardwareConfig[] = [
  {
    id: 'entry',
    tier: 'entry',
    nameKey: 'hw.config.entry.name',
    descKey: 'hw.config.entry.desc',
    specs: { cpu: '8-16 cores (Xeon E-2300 / EPYC 7002)', ram: '32-64 Go ECC', storage: '2x 1 To NVMe RAID1', network: '2x 1 GbE' },
    capacityKey: 'hw.config.entry.capacity',
    priceRange: '2 500 - 4 000',
  },
  {
    id: 'pro',
    tier: 'pro',
    nameKey: 'hw.config.pro.name',
    descKey: 'hw.config.pro.desc',
    specs: { cpu: '24-32 cores (Xeon Gold / EPYC 7003)', ram: '64-128 Go ECC', storage: '4x 2 To NVMe RAID10', network: '2x 10 GbE' },
    capacityKey: 'hw.config.pro.capacity',
    priceRange: '6 000 - 12 000',
    recommended: true,
  },
  {
    id: 'enterprise',
    tier: 'enterprise',
    nameKey: 'hw.config.enterprise.name',
    descKey: 'hw.config.enterprise.desc',
    specs: { cpu: '48-96 cores (Xeon Platinum / EPYC 9004)', ram: '256-512 Go ECC', storage: '8x 4 To NVMe RAID10 + SSD cache', network: '2x 25 GbE + IPMI' },
    capacityKey: 'hw.config.enterprise.capacity',
    priceRange: '18 000 - 45 000',
  },
]

export const INCLUDED_ITEMS: IncludedItem[] = [
  { id: 'proxmox', icon: 'Server', titleKey: 'hw.incl.proxmox', descKey: 'hw.incl.proxmox.desc' },
  { id: 'vms', icon: 'Layers', titleKey: 'hw.incl.vms', descKey: 'hw.incl.vms.desc' },
  { id: 'docker', icon: 'Box', titleKey: 'hw.incl.docker', descKey: 'hw.incl.docker.desc' },
  { id: 'ai', icon: 'Brain', titleKey: 'hw.incl.ai', descKey: 'hw.incl.ai.desc' },
  { id: 'monitoring', icon: 'ShieldCheck', titleKey: 'hw.incl.monitoring', descKey: 'hw.incl.monitoring.desc' },
  { id: 'backup', icon: 'HardDrive', titleKey: 'hw.incl.backup', descKey: 'hw.incl.backup.desc' },
  { id: 'security', icon: 'Lock', titleKey: 'hw.incl.security', descKey: 'hw.incl.security.desc' },
  { id: 'voice', icon: 'Mic', titleKey: 'hw.incl.voice', descKey: 'hw.incl.voice.desc' },
]

export const CERT_LEVEL_CONFIG: Record<string, { labelKey: string; colorClass: string; bgClass: string }> = {
  production: { labelKey: 'hw.cert.production', colorClass: 'text-success-green', bgClass: 'bg-[var(--green-tint)]' },
  certified: { labelKey: 'hw.cert.certified', colorClass: 'text-electric-cyan', bgClass: 'bg-[var(--cyan-tint)]' },
  compatible: { labelKey: 'hw.cert.compatible', colorClass: 'text-amber-warm', bgClass: 'bg-[var(--amber-tint)]' },
  evaluation: { labelKey: 'hw.cert.evaluation', colorClass: 'text-steel-gray', bgClass: 'bg-[var(--subtle-bg-2)]' },
}

export const TURNKEY_ADVANTAGES = [
  { id: 'a1', iconKey: 'Clock', titleKey: 'hw.adv.time.title', descKey: 'hw.adv.time.desc' },
  { id: 'a2', iconKey: 'ShieldCheck', titleKey: 'hw.adv.tested.title', descKey: 'hw.adv.tested.desc' },
  { id: 'a3', iconKey: 'Wrench', titleKey: 'hw.adv.support.title', descKey: 'hw.adv.support.desc' },
  { id: 'a4', iconKey: 'Zap', titleKey: 'hw.adv.optimized.title', descKey: 'hw.adv.optimized.desc' },
]
