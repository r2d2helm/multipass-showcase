'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'fr' | 'en' | 'nl'

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  nl: 'NL',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  fr: '\u{1F1EB}\u{1F1F7}',
  en: '\u{1F1EC}\u{1F1E7}',
  nl: '\u{1F1F3}\u{1F1F1}',
}

// UI translations (shared across pages)
export const UI: Record<string, Record<Locale, string>> = {
  // Sidebar
  'nav.infra': { fr: 'Infrastructure', en: 'Infrastructure', nl: 'Infrastructuur' },
  'nav.infra.desc': { fr: 'VMs & Network', en: 'VMs & Network', nl: 'VMs & Netwerk' },
  'nav.stack': { fr: 'Stack', en: 'Stack', nl: 'Stack' },
  'nav.stack.desc': { fr: 'Services & Flows', en: 'Services & Flows', nl: 'Diensten & Flows' },
  'nav.brain': { fr: 'Brain', en: 'Brain', nl: 'Brein' },
  'nav.brain.desc': { fr: 'PAI & Agents', en: 'PAI & Agents', nl: 'PAI & Agenten' },
  'nav.flows': { fr: 'Flows', en: 'Flows', nl: 'Flows' },
  'nav.flows.desc': { fr: 'Interactions live', en: 'Live Interactions', nl: 'Live Interacties' },
  'nav.monitoring': { fr: 'Monitoring', en: 'Monitoring', nl: 'Monitoring' },
  'nav.monitoring.desc': { fr: 'Alerts & Backup', en: 'Alerts & Backup', nl: 'Alerts & Backup' },
  'nav.security': { fr: 'Security', en: 'Security', nl: 'Beveiliging' },
  'nav.security.desc': { fr: 'Defense & Threats', en: 'Defense & Threats', nl: 'Verdediging & Bedreigingen' },
  'nav.supervisor': { fr: 'MegaSupervisor', en: 'MegaSupervisor', nl: 'MegaSupervisor' },
  'nav.supervisor.desc': { fr: 'Recovery & Rebuild', en: 'Recovery & Rebuild', nl: 'Herstel & Rebuild' },
  'nav.warehouse': { fr: 'Warehouse', en: 'Warehouse', nl: 'Warehouse' },
  'nav.warehouse.desc': { fr: 'Knowledge Base', en: 'Knowledge Base', nl: 'Kennisbank' },
  'nav.team': { fr: 'Team', en: 'Team', nl: 'Team' },
  'nav.team.desc': { fr: "L'Equipe", en: 'The Team', nl: 'Het Team' },
  'nav.franchise': { fr: 'Franchise', en: 'Franchise', nl: 'Franchise' },
  'nav.franchise.desc': { fr: 'Pack Commercial', en: 'Commercial Pack', nl: 'Commercieel Pakket' },
  'nav.timeline': { fr: 'Timeline', en: 'Timeline', nl: 'Tijdlijn' },
  'nav.timeline.desc': { fr: 'How We Built This', en: 'How We Built This', nl: 'Hoe We Dit Bouwden' },
  'nav.roadmap': { fr: 'Roadmap', en: 'Roadmap', nl: 'Roadmap' },
  'nav.roadmap.desc': { fr: 'En Developpement', en: 'In Development', nl: 'In Ontwikkeling' },
  'nav.portfolio': { fr: 'Portfolio', en: 'Portfolio', nl: 'Portfolio' },
  'nav.portfolio.desc': { fr: 'Projets Clients', en: 'Client Projects', nl: 'Klantprojecten' },

  // Landing
  'landing.badge': { fr: 'Ecosystem Live — Production', en: 'Ecosystem Live — Production', nl: 'Ecosysteem Live — Productie' },
  'landing.subtitle': { fr: "L'ecosysteme complet d'une equipe IA autonome — infrastructure, agents, knowledge, securite — en un coup d'oeil.", en: 'The complete ecosystem of an autonomous AI team — infrastructure, agents, knowledge, security — at a glance.', nl: 'Het complete ecosysteem van een autonoom AI-team — infrastructuur, agenten, kennis, beveiliging — in een oogopslag.' },
  'landing.explore': { fr: "Explorer l'ecosysteme", en: 'Explore the ecosystem', nl: 'Verken het ecosysteem' },
  'landing.tagline': { fr: "Une equipe ou l'humain decide, l'IA orchestre, et les agents executent.", en: 'A team where humans decide, AI orchestrates, and agents execute.', nl: 'Een team waar mensen beslissen, AI orkestreert, en agenten uitvoeren.' },
  // Landing page descriptions
  'landing.desc.infra': { fr: '6 VMs Proxmox 9, Dell R740, 128 Go RAM, reseau segmente', en: '6 VMs Proxmox 9, Dell R740, 128 GB RAM, segmented network', nl: '6 VMs Proxmox 9, Dell R740, 128 GB RAM, gesegmenteerd netwerk' },
  'landing.desc.stack': { fr: '30 containers Docker, 7 stacks Compose, architecture interactive', en: '30 Docker containers, 7 Compose stacks, interactive architecture', nl: '30 Docker containers, 7 Compose stacks, interactieve architectuur' },
  'landing.desc.brain': { fr: 'PAI Algorithm v1.8.0, 13 agents, 28 subagents, 15 skills', en: 'PAI Algorithm v1.8.0, 13 agents, 28 subagents, 15 skills', nl: 'PAI Algorithm v1.8.0, 13 agenten, 28 subagenten, 15 skills' },
  'landing.desc.flows': { fr: 'Workflows interactifs: dev cycle, warehouse, incident recovery', en: 'Interactive workflows: dev cycle, warehouse, incident recovery', nl: 'Interactieve workflows: dev cyclus, warehouse, incident recovery' },
  'landing.desc.monitoring': { fr: '22 monitors Uptime Kuma, alertes ntfy, backups quotidiens', en: '22 Uptime Kuma monitors, ntfy alerts, daily backups', nl: '22 Uptime Kuma monitors, ntfy alerts, dagelijkse backups' },
  'landing.desc.security': { fr: '6 couches defense, 31 controles, zero ports ouverts', en: '6 defense layers, 31 controls, zero open ports', nl: '6 verdedigingslagen, 31 controles, nul open poorten' },
  'landing.desc.supervisor': { fr: 'Recovery L1-L5, reconstruction ecosysteme, incident playbooks', en: 'Recovery L1-L5, ecosystem rebuild, incident playbooks', nl: 'Recovery L1-L5, ecosysteem herbouw, incident playbooks' },
  'supervisor.usb.title': { fr: 'Tout tient sur une clé USB', en: 'Everything fits on a USB stick', nl: 'Alles past op een USB-stick' },
  'supervisor.usb.desc': { fr: 'L\'intégralité du système de sauvegarde et de restauration — configs, données, secrets, playbooks — tient sur une clé USB de', en: 'The entire backup and restoration system — configs, data, secrets, playbooks — fits on a', nl: 'Het volledige backup- en herstelsysteem — configs, data, secrets, playbooks — past op een' },
  'supervisor.usb.cost': { fr: 'Coût total de la résilience :', en: 'Total cost of resilience:', nl: 'Totale kosten van veerkracht:' },
  'landing.desc.warehouse': { fr: '23 fiches knowledge, pipeline 5 agents, indexation Mem0', en: '23 knowledge sheets, 5-agent pipeline, Mem0 indexing', nl: '23 kennisfiches, 5-agent pipeline, Mem0 indexering' },
  'landing.desc.team': { fr: '1 human + 1 AI + 13 agents + 3 services core', en: '1 human + 1 AI + 13 agents + 3 core services', nl: '1 mens + 1 AI + 13 agenten + 3 kernservices' },
  'landing.desc.franchise': { fr: 'Pack commercial, 3 tiers, comparatif features, FAQ', en: 'Commercial pack, 3 tiers, feature comparison, FAQ', nl: 'Commercieel pakket, 3 tiers, feature vergelijking, FAQ' },
  'landing.desc.timeline': { fr: 'How We Built This: serveur nu → ecosysteme complet en 3 mois', en: 'How We Built This: bare server → complete ecosystem in 3 months', nl: 'Hoe We Dit Bouwden: kale server → compleet ecosysteem in 3 maanden' },
  'landing.desc.roadmap': { fr: 'FarmSysteme, Agency v2.0, PAI v4.0 — projets en developpement', en: 'FarmSysteme, Agency v2.0, PAI v4.0 — projects in development', nl: 'FarmSysteme, Agency v2.0, PAI v4.0 — projecten in ontwikkeling' },
  'landing.desc.portfolio': { fr: '7 projets types web et mobile avec impact mesurable pour vos clients', en: '7 web and mobile project templates with measurable client impact', nl: '7 web- en mobiele projectsjablonen met meetbare klantimpact' },

  // Team
  'team.title': { fr: "L'Equipe MultiPass", en: 'The MultiPass Team', nl: 'Het MultiPass Team' },
  'team.members': { fr: 'membres', en: 'members', nl: 'leden' },
  'team.all': { fr: 'Tous', en: 'All', nl: 'Alle' },
  'team.projects': { fr: "Projets de l'Ecosysteme", en: 'Ecosystem Projects', nl: 'Ecosysteem Projecten' },
  'team.mission': { fr: "Une equipe ou l'humain decide, l'IA orchestre, et les agents executent. Chaque membre a un role precis dans l'ecosysteme MultiPass.", en: 'A team where humans decide, AI orchestrates, and agents execute. Each member has a precise role in the MultiPass ecosystem.', nl: 'Een team waar mensen beslissen, AI orkestreert, en agenten uitvoeren. Elk lid heeft een precieze rol in het MultiPass ecosysteem.' },

  // Franchise
  'franchise.title': { fr: 'Pack Commercial Franchise', en: 'Franchise Commercial Pack', nl: 'Franchise Commercieel Pakket' },
  'franchise.hero.title': { fr: 'Devenez Franchiseur MultiPass', en: 'Become a MultiPass Franchisee', nl: 'Word MultiPass Franchisenemer' },
  'franchise.hero.desc': { fr: "Deployez votre propre ecosysteme IA complet — infrastructure, agents intelligents, knowledge base, securite enterprise. Une stack prouvee en production, prete a scale.", en: 'Deploy your own complete AI ecosystem — infrastructure, intelligent agents, knowledge base, enterprise security. A production-proven stack, ready to scale.', nl: 'Implementeer uw eigen complete AI-ecosysteem — infrastructuur, intelligente agenten, kennisbank, enterprise beveiliging. Een productie-bewezen stack, klaar om te schalen.' },
  'franchise.cta': { fr: 'Pret a lancer votre franchise ?', en: 'Ready to launch your franchise?', nl: 'Klaar om uw franchise te lanceren?' },
  'franchise.cta.desc': { fr: "Contactez-nous pour une demo personnalisee de l'ecosysteme complet.", en: 'Contact us for a personalized demo of the complete ecosystem.', nl: 'Neem contact op voor een gepersonaliseerde demo van het complete ecosysteem.' },
  'franchise.recommended': { fr: 'Recommande', en: 'Recommended', nl: 'Aanbevolen' },
  'franchise.included': { fr: 'Inclus :', en: 'Included:', nl: 'Inbegrepen:' },
  'franchise.features': { fr: 'Comparatif', en: 'Comparison', nl: 'Vergelijking' },
  'franchise.faq': { fr: 'FAQ', en: 'FAQ', nl: 'FAQ' },
  'franchise.offers': { fr: 'Offres Franchise', en: 'Franchise Offers', nl: 'Franchise Aanbiedingen' },
  'franchise.features.desc': { fr: "Comparatif complet des fonctionnalites par tier. Chaque franchise inclut l'ecosysteme de base et scale selon vos besoins.", en: 'Complete feature comparison by tier. Each franchise includes the base ecosystem and scales to your needs.', nl: 'Volledige functievergelijking per tier. Elke franchise bevat het basisecosysteem en schaalt naar uw behoeften.' },
  'franchise.faq.title': { fr: 'Questions Frequentes', en: 'Frequently Asked Questions', nl: 'Veelgestelde Vragen' },
  'franchise.faq.desc': { fr: 'Tout ce que vous devez savoir avant de rejoindre le reseau de franchise MultiPass.', en: 'Everything you need to know before joining the MultiPass franchise network.', nl: 'Alles wat u moet weten voordat u zich aansluit bij het MultiPass franchise netwerk.' },
  'franchise.faq.contact': { fr: 'Une question non listee ?', en: 'Question not listed?', nl: 'Vraag niet vermeld?' },
  'franchise.faq.contact.desc': { fr: 'contact@multipass.agency — reponse sous 24h', en: 'contact@multipass.agency — response within 24h', nl: 'contact@multipass.agency — antwoord binnen 24u' },

  // Timeline
  'timeline.title': { fr: 'How We Built This', en: 'How We Built This', nl: 'Hoe We Dit Bouwden' },
  'timeline.hero.title': { fr: 'De Zero a Ecosysteme Complet', en: 'From Zero to Complete Ecosystem', nl: 'Van Nul tot Compleet Ecosysteem' },
  'timeline.hero.desc': { fr: "En ~3 mois, 1 humain et 1 IA ont construit un ecosysteme de production complet: infrastructure, agents autonomes, knowledge base, securite enterprise, monitoring 24/7. Voici chaque etape.", en: 'In ~3 months, 1 human and 1 AI built a complete production ecosystem: infrastructure, autonomous agents, knowledge base, enterprise security, 24/7 monitoring. Here is every step.', nl: 'In ~3 maanden hebben 1 mens en 1 AI een compleet productie-ecosysteem gebouwd: infrastructuur, autonome agenten, kennisbank, enterprise beveiliging, 24/7 monitoring. Hier is elke stap.' },
  'timeline.milestones': { fr: 'milestones', en: 'milestones', nl: 'mijlpalen' },

  // Roadmap
  'roadmap.title': { fr: 'Developpement en Cours', en: 'In Development', nl: 'In Ontwikkeling' },
  'roadmap.projects': { fr: 'projets', en: 'projects', nl: 'projecten' },
  'roadmap.active': { fr: 'actifs', en: 'active', nl: 'actief' },
  'roadmap.planned.features': { fr: 'Features planifiees', en: 'Planned features', nl: 'Geplande features' },
  'roadmap.pipeline': { fr: 'Pipeline', en: 'Pipeline', nl: 'Pipeline' },
  'roadmap.progress': { fr: 'Progression', en: 'Progress', nl: 'Voortgang' },
  'roadmap.avg.progress': { fr: 'Progression moy.', en: 'Avg. progress', nl: 'Gem. voortgang' },
  'roadmap.horizon': { fr: 'Horizon', en: 'Horizon', nl: 'Horizon' },
  'roadmap.dependencies': { fr: 'Dependances', en: 'Dependencies', nl: 'Afhankelijkheden' },

  // Portfolio
  'portfolio.title': { fr: 'Portfolio & Realisations', en: 'Portfolio & Achievements', nl: 'Portfolio & Realisaties' },
  'portfolio.hero.title': { fr: 'Ce Que Nous Construisons Pour Vous', en: 'What We Build For You', nl: 'Wat Wij Voor U Bouwen' },
  'portfolio.hero.desc': { fr: "Applications web et mobiles cle en main, propulsees par notre ecosysteme IA. Stack partagee a 85% entre projets = rapidite d'execution, cout reduit, qualite constante. Chaque projet beneficie de nos 13 agents IA, 663 tests automatises, et monitoring 24/7.", en: 'Turnkey web and mobile applications, powered by our AI ecosystem. 85% shared stack between projects = fast execution, reduced cost, consistent quality. Each project benefits from our 13 AI agents, 663 automated tests, and 24/7 monitoring.', nl: 'Kant-en-klare web- en mobiele applicaties, aangedreven door ons AI-ecosysteem. 85% gedeelde stack tussen projecten = snelle uitvoering, lagere kosten, consistente kwaliteit. Elk project profiteert van onze 13 AI-agenten, 663 geautomatiseerde tests, en 24/7 monitoring.' },
  'portfolio.not.listed': { fr: "Votre projet n'est pas liste ?", en: 'Your project not listed?', nl: 'Uw project niet vermeld?' },
  'portfolio.not.listed.desc': { fr: "Notre ecosysteme s'adapte a tous les secteurs. Stack partagee a 85% = demarrage rapide, quel que soit le domaine.", en: 'Our ecosystem adapts to all sectors. 85% shared stack = quick start, regardless of the domain.', nl: 'Ons ecosysteem past zich aan alle sectoren aan. 85% gedeelde stack = snelle start, ongeacht het domein.' },
  'portfolio.problem': { fr: 'Probleme', en: 'Problem', nl: 'Probleem' },
  'portfolio.solution': { fr: 'Solution', en: 'Solution', nl: 'Oplossing' },
  'portfolio.impact': { fr: 'Impact mesure', en: 'Measured impact', nl: 'Gemeten impact' },
  'portfolio.features': { fr: 'Fonctionnalites', en: 'Features', nl: 'Functionaliteiten' },
  'portfolio.types': { fr: 'projets types', en: 'project templates', nl: 'projectsjablonen' },
  'portfolio.shared.stack': { fr: 'Stack partagee', en: 'Shared stack', nl: 'Gedeelde stack' },
  'portfolio.delivery': { fr: 'Semaines livraison', en: 'Weeks delivery', nl: 'Weken levering' },
  'portfolio.inside': { fr: 'Inside chaque app', en: 'Inside every app', nl: 'In elke app' },
  'portfolio.avg': { fr: 'moyenne', en: 'average', nl: 'gemiddelde' },

  // Common
  'common.all': { fr: 'Tous', en: 'All', nl: 'Alle' },
  'common.controls': { fr: 'controles', en: 'controls', nl: 'controles' },
  'common.components': { fr: 'composants', en: 'components', nl: 'componenten' },
  'common.agents': { fr: 'agents', en: 'agents', nl: 'agenten' },
  'common.industries': { fr: 'industries', en: 'industries', nl: 'industrieen' },
  'common.copyright': { fr: 'Ecosystem Protege Par Brevet', en: 'Patent Protected Ecosystem', nl: 'Door Patent Beschermd Ecosysteem' },

  // Voice page
  'nav.voice': { fr: 'Voice', en: 'Voice', nl: 'Spraak' },
  'nav.voice.desc': { fr: 'Interaction vocale', en: 'Voice interaction', nl: 'Spraakinteractie' },
  'landing.desc.voice': { fr: 'Commande vocale, agents parlants, notifications sonores', en: 'Voice commands, speaking agents, audio notifications', nl: 'Spraakcommando\'s, sprekende agenten, geluidsnotificaties' },
  'voice.hero.title': { fr: 'Parlez, on s\'occupe du reste', en: 'Speak, we handle the rest', nl: 'Spreek, wij regelen de rest' },
  'voice.hero.subtitle': { fr: 'Pilotez votre infrastructure par la voix', en: 'Control your infrastructure by voice', nl: 'Bestuur uw infrastructuur met spraak' },
  'voice.hero.pill1': { fr: 'Chaque agent parle', en: 'Every agent speaks', nl: 'Elke agent spreekt' },
  'voice.hero.pill2': { fr: 'Chaque phase s\'annonce', en: 'Every phase announces', nl: 'Elke fase kondigt aan' },
  'voice.hero.pill3': { fr: 'Chaque alerte se fait entendre', en: 'Every alert is heard', nl: 'Elke waarschuwing klinkt' },
  'voice.tab.features': { fr: 'Capacites', en: 'Capabilities', nl: 'Mogelijkheden' },
  'voice.tab.commands': { fr: 'Commandes', en: 'Commands', nl: 'Commando\'s' },
  'voice.tab.usecases': { fr: 'Cas d\'usage', en: 'Use Cases', nl: 'Gebruiksscenario\'s' },
  'voice.feat.natural': { fr: 'Conversation naturelle', en: 'Natural conversation', nl: 'Natuurlijk gesprek' },
  'voice.feat.natural.desc': { fr: 'Parlez a R2D2 comme a un collegue. Pas de syntaxe speciale, pas de mots-cles obligatoires. Le langage naturel est le seul requis.', en: 'Talk to R2D2 like a colleague. No special syntax, no required keywords. Natural language is all you need.', nl: 'Praat met R2D2 als een collega. Geen speciale syntax, geen verplichte trefwoorden. Natuurlijke taal is alles wat je nodig hebt.' },
  'voice.feat.agents': { fr: 'Agents vocaux', en: 'Voice agents', nl: 'Spraakagenten' },
  'voice.feat.agents.desc': { fr: 'Chaque agent a sa propre voix et personnalite. L\'Ingenieur, l\'Architecte, le Chercheur — chacun repond avec son timbre unique.', en: 'Each agent has its own voice and personality. The Engineer, Architect, Researcher — each responds with a unique tone.', nl: 'Elke agent heeft een eigen stem en persoonlijkheid. De Ingenieur, Architect, Onderzoeker — elk antwoordt met een uniek timbre.' },
  'voice.feat.notify': { fr: 'Notifications sonores', en: 'Audio notifications', nl: 'Geluidsnotificaties' },
  'voice.feat.notify.desc': { fr: 'Chaque phase de l\'Algorithme s\'annonce vocalement. Vous savez exactement ou en est le travail sans regarder l\'ecran.', en: 'Every Algorithm phase announces itself vocally. You know exactly where things stand without looking at the screen.', nl: 'Elke Algoritme-fase kondigt zich vocaal aan. U weet precies waar het werk staat zonder naar het scherm te kijken.' },
  'voice.feat.multilang': { fr: 'Multilingue', en: 'Multilingual', nl: 'Meertalig' },
  'voice.feat.multilang.desc': { fr: 'Parlez en francais, anglais ou neerlandais. R2D2 comprend et repond dans votre langue. Changez de langue en cours de conversation.', en: 'Speak in French, English or Dutch. R2D2 understands and responds in your language. Switch languages mid-conversation.', nl: 'Spreek in het Frans, Engels of Nederlands. R2D2 begrijpt en antwoordt in uw taal. Wissel van taal tijdens het gesprek.' },
  'voice.feat.handsfree': { fr: 'Mains libres', en: 'Hands-free', nl: 'Handsfree' },
  'voice.feat.handsfree.desc': { fr: 'Gerez vos serveurs depuis le canape. Lancez des deploiements, verifiez les backups, declenchez des tests — tout par la voix.', en: 'Manage your servers from the couch. Launch deployments, check backups, trigger tests — all by voice.', nl: 'Beheer uw servers vanaf de bank. Start deployments, controleer backups, activeer tests — alles met spraak.' },
  'voice.feat.phases': { fr: 'Annonces de phases', en: 'Phase announcements', nl: 'Fase-aankondigingen' },
  'voice.feat.phases.desc': { fr: 'L\'Algorithme PAI annonce chaque phase : Observe, Think, Plan, Build, Execute, Verify, Learn. Suivi en temps reel par la voix.', en: 'The PAI Algorithm announces each phase: Observe, Think, Plan, Build, Execute, Verify, Learn. Real-time voice tracking.', nl: 'Het PAI Algoritme kondigt elke fase aan: Observe, Think, Plan, Build, Execute, Verify, Learn. Realtime spraaktracking.' },
  'voice.cmd.deploy': { fr: 'Deployer les containers Docker', en: 'Deploy Docker containers', nl: 'Docker containers deployen' },
  'voice.cmd.disk': { fr: 'Verifier l\'espace disque', en: 'Check disk usage', nl: 'Schijfgebruik controleren' },
  'voice.cmd.restart': { fr: 'Redemarrer un service', en: 'Restart a service', nl: 'Een service herstarten' },
  'voice.cmd.status': { fr: 'Etat de toutes les VMs', en: 'Status of all VMs', nl: 'Status van alle VM\'s' },
  'voice.cmd.backup': { fr: 'Fraicheur des sauvegardes', en: 'Backup freshness check', nl: 'Versheid van back-ups controleren' },
  'voice.cmd.e2e': { fr: 'Lancer les tests E2E', en: 'Run E2E tests', nl: 'E2E-tests uitvoeren' },
  'voice.cmd.research': { fr: 'Rechercher les derniers CVE', en: 'Research latest CVEs', nl: 'Laatste CVE\'s onderzoeken' },
  'voice.cmd.team': { fr: 'Creer une equipe d\'agents', en: 'Create an agent team', nl: 'Een agentteam aanmaken' },
  'voice.cmd.redteam': { fr: 'Red team sur mon API', en: 'Red team my API', nl: 'Red team mijn API' },
  'voice.cmd.index': { fr: 'Indexer les notes du vault', en: 'Index vault notes', nl: 'Vault-notities indexeren' },
  'voice.cmd.search': { fr: 'Chercher dans le warehouse', en: 'Search warehouse fiches', nl: 'Zoek in warehouse-fiches' },
  'voice.cmd.extract': { fr: 'Extraire la sagesse d\'une URL', en: 'Extract wisdom from URL', nl: 'Wijsheid uit URL extraheren' },
  'voice.cat.infra': { fr: 'Infrastructure', en: 'Infrastructure', nl: 'Infrastructuur' },
  'voice.cat.monitor': { fr: 'Monitoring', en: 'Monitoring', nl: 'Monitoring' },
  'voice.cat.agent': { fr: 'Agents', en: 'Agents', nl: 'Agenten' },
  'voice.cat.knowledge': { fr: 'Knowledge', en: 'Knowledge', nl: 'Kennis' },
  'voice.uc.morning.title': { fr: 'Routine du matin', en: 'Morning routine', nl: 'Ochtendroutine' },
  'voice.uc.morning.desc': { fr: 'Prenez votre cafe pendant que R2D2 fait le point', en: 'Have your coffee while R2D2 briefs you', nl: 'Neem uw koffie terwijl R2D2 u bijpraat' },
  'voice.uc.morning.s1': { fr: '"R2D2, etat des lieux"', en: '"R2D2, status report"', nl: '"R2D2, statusrapport"' },
  'voice.uc.morning.s2': { fr: 'R2D2 verifie les 5 VMs, backups, tests E2E, espace disque', en: 'R2D2 checks 5 VMs, backups, E2E tests, disk space', nl: 'R2D2 controleert 5 VM\'s, back-ups, E2E-tests, schijfruimte' },
  'voice.uc.morning.s3': { fr: 'Rapport vocal complet en 30 secondes', en: 'Complete voice report in 30 seconds', nl: 'Volledig spraakrapport in 30 seconden' },
  'voice.uc.morning.result': { fr: 'Infrastructure validee avant le premier commit', en: 'Infrastructure validated before the first commit', nl: 'Infrastructuur gevalideerd voor de eerste commit' },
  'voice.uc.incident.title': { fr: 'Reponse a incident', en: 'Incident response', nl: 'Incidentrespons' },
  'voice.uc.incident.desc': { fr: 'Quand une alerte sonne, R2D2 reagit deja', en: 'When an alert sounds, R2D2 is already responding', nl: 'Wanneer een alarm klinkt, reageert R2D2 al' },
  'voice.uc.incident.s1': { fr: 'Notification vocale : "Alerte disk 85% sur r2d2-main"', en: 'Voice notification: "Alert disk 85% on r2d2-main"', nl: 'Spraaknotificatie: "Alarm schijf 85% op r2d2-main"' },
  'voice.uc.incident.s2': { fr: '"R2D2, nettoie les build caches et verifie"', en: '"R2D2, clean build caches and verify"', nl: '"R2D2, maak build caches schoon en verifieer"' },
  'voice.uc.incident.s3': { fr: 'Nettoyage automatique + confirmation vocale du resultat', en: 'Automatic cleanup + voice confirmation of result', nl: 'Automatische opruiming + spraakbevestiging van resultaat' },
  'voice.uc.incident.result': { fr: 'Incident resolu en moins de 2 minutes, mains libres', en: 'Incident resolved in under 2 minutes, hands-free', nl: 'Incident opgelost in minder dan 2 minuten, handsfree' },
  'voice.uc.research.title': { fr: 'Recherche approfondie', en: 'Deep research', nl: 'Diepgaand onderzoek' },
  'voice.uc.research.desc': { fr: 'Lancez une recherche multi-modele par la voix', en: 'Launch multi-model research by voice', nl: 'Start multi-model onderzoek met spraak' },
  'voice.uc.research.s1': { fr: '"R2D2, recherche extensive sur les nouveaux patterns RAG"', en: '"R2D2, extensive research on new RAG patterns"', nl: '"R2D2, uitgebreid onderzoek naar nieuwe RAG-patronen"' },
  'voice.uc.research.s2': { fr: '4 agents chercheurs en parallele (Claude, Gemini, Grok, Perplexity)', en: '4 research agents in parallel (Claude, Gemini, Grok, Perplexity)', nl: '4 onderzoeksagenten parallel (Claude, Gemini, Grok, Perplexity)' },
  'voice.uc.research.s3': { fr: 'Synthese vocale des resultats avec sources', en: 'Voice synthesis of results with sources', nl: 'Spraaksynthese van resultaten met bronnen' },
  'voice.uc.research.result': { fr: 'Veille technologique complete sans toucher le clavier', en: 'Complete tech watch without touching the keyboard', nl: 'Complete tech watch zonder het toetsenbord aan te raken' },
  'voice.stat.agents': { fr: 'Agents vocaux', en: 'Voice agents', nl: 'Spraakagenten' },
  'voice.stat.langs': { fr: 'Langues', en: 'Languages', nl: 'Talen' },
  'voice.stat.latency': { fr: 'Latence reponse', en: 'Response latency', nl: 'Responslatentie' },
  'voice.stat.phases': { fr: 'Phases annoncees', en: 'Announced phases', nl: 'Aangekondigde fasen' },
  'voice.stat.skills': { fr: 'Skills vocaux', en: 'Voice skills', nl: 'Spraakvaardigheden' },
  'voice.stat.available': { fr: 'Disponibilite', en: 'Availability', nl: 'Beschikbaarheid' },
  'voice.section.howit': { fr: 'Comment ca marche', en: 'How it works', nl: 'Hoe het werkt' },
  'voice.section.examples': { fr: 'Exemples de commandes', en: 'Command examples', nl: 'Voorbeelden van commando\'s' },
  'voice.section.usecases': { fr: 'Scenarios concrets', en: 'Real-world scenarios', nl: 'Praktijkscenario\'s' },
  'voice.result': { fr: 'Resultat', en: 'Result', nl: 'Resultaat' },

  // Team manifesto
  // Hardware page
  'nav.hardware': { fr: 'Hardware', en: 'Hardware', nl: 'Hardware' },
  'nav.hardware.desc': { fr: 'Partenaires & Configs', en: 'Partners & Configs', nl: 'Partners & Configs' },
  'landing.desc.hardware': { fr: 'Serveurs certifies, configurations cles en main, partenaires hardware', en: 'Certified servers, turnkey configurations, hardware partners', nl: 'Gecertificeerde servers, kant-en-klare configuraties, hardware partners' },
  'hw.hero.title': { fr: 'Un serveur. Un ecosysteme. Une livraison.', en: 'One server. One ecosystem. One delivery.', nl: 'Een server. Een ecosysteem. Een levering.' },
  'hw.hero.subtitle': { fr: 'Recevez votre serveur avec l\'ecosysteme MultiPass preinstalle, configure et teste. Branchez, demarrez, produisez.', en: 'Receive your server with the MultiPass ecosystem preinstalled, configured and tested. Plug in, start up, produce.', nl: 'Ontvang uw server met het MultiPass ecosysteem voorgeinstalleerd, geconfigureerd en getest. Aansluiten, opstarten, produceren.' },
  'hw.hero.pill1': { fr: 'Materiel certifie', en: 'Certified hardware', nl: 'Gecertificeerde hardware' },
  'hw.hero.pill2': { fr: 'Software preinstalle', en: 'Preinstalled software', nl: 'Voorgeinstalleerde software' },
  'hw.hero.pill3': { fr: 'Support unifie', en: 'Unified support', nl: 'Uniforme support' },
  'hw.tab.partners': { fr: 'Partenaires', en: 'Partners', nl: 'Partners' },
  'hw.tab.configs': { fr: 'Configurations', en: 'Configurations', nl: 'Configuraties' },
  'hw.tab.included': { fr: 'Inclus', en: 'Included', nl: 'Inbegrepen' },
  'hw.partner.dell': { fr: 'Notre infrastructure de production tourne sur Dell R740. Partenaire de reference, valide en conditions reelles 24/7 depuis 3 mois.', en: 'Our production infrastructure runs on Dell R740. Reference partner, validated in real conditions 24/7 for 3 months.', nl: 'Onze productie-infrastructuur draait op Dell R740. Referentiepartner, gevalideerd in reele omstandigheden 24/7 gedurende 3 maanden.' },
  'hw.partner.hp': { fr: 'Gamme ProLiant Gen11 certifiee compatible. Architecture x86-64 validee, drivers Proxmox integres, iLO pour gestion a distance.', en: 'ProLiant Gen11 range certified compatible. Validated x86-64 architecture, integrated Proxmox drivers, iLO for remote management.', nl: 'ProLiant Gen11-reeks gecertificeerd compatibel. Gevalideerde x86-64 architectuur, geintegreerde Proxmox-drivers, iLO voor beheer op afstand.' },
  'hw.partner.lenovo': { fr: 'Gamme ThinkSystem V3 certifiee. Excellente qualite de fabrication, XClarity pour administration, support entreprise global.', en: 'ThinkSystem V3 range certified. Excellent build quality, XClarity for administration, global enterprise support.', nl: 'ThinkSystem V3-reeks gecertificeerd. Uitstekende bouwkwaliteit, XClarity voor beheer, wereldwijde enterprise support.' },
  'hw.partner.supermicro': { fr: 'Large gamme de facteurs de forme. Ideal pour les configurations sur mesure, excellent rapport performance/prix.', en: 'Wide range of form factors. Ideal for custom configurations, excellent performance/price ratio.', nl: 'Breed scala aan vormfactoren. Ideaal voor maatwerkconfiguaties, uitstekende prijs/prestatie verhouding.' },
  'hw.partner.asus': { fr: 'Serveurs rack EPYC compatibles. Bonne alternative pour les budgets intermediaires, fiabilite prouvee.', en: 'EPYC rack servers compatible. Good alternative for mid-range budgets, proven reliability.', nl: 'EPYC-rackservers compatibel. Goed alternatief voor middenbudgetten, bewezen betrouwbaarheid.' },
  'hw.partner.custom': { fr: 'Votre propre materiel ? Si il supporte Proxmox VE 9+ et Ubuntu 24.04, on peut deployer l\'ecosysteme dessus. Evaluation au cas par cas.', en: 'Your own hardware? If it supports Proxmox VE 9+ and Ubuntu 24.04, we can deploy the ecosystem on it. Case-by-case evaluation.', nl: 'Uw eigen hardware? Als het Proxmox VE 9+ en Ubuntu 24.04 ondersteunt, kunnen we het ecosysteem erop deployen. Evaluatie per geval.' },
  'hw.cert.production': { fr: 'En Production', en: 'In Production', nl: 'In Productie' },
  'hw.cert.certified': { fr: 'Certifie', en: 'Certified', nl: 'Gecertificeerd' },
  'hw.cert.compatible': { fr: 'Compatible', en: 'Compatible', nl: 'Compatibel' },
  'hw.cert.evaluation': { fr: 'Sur evaluation', en: 'On evaluation', nl: 'Op evaluatie' },
  'hw.config.entry.name': { fr: 'Entry — Solo / PME', en: 'Entry — Solo / SMB', nl: 'Entry — Solo / MKB' },
  'hw.config.entry.desc': { fr: 'Ideal pour un developpeur solo ou une petite equipe. Toute la stack sur un seul noeud.', en: 'Ideal for a solo developer or small team. The entire stack on a single node.', nl: 'Ideaal voor een solo-ontwikkelaar of klein team. De hele stack op een enkel knooppunt.' },
  'hw.config.entry.capacity': { fr: '3-4 VMs, ~15 containers, 1-3 utilisateurs', en: '3-4 VMs, ~15 containers, 1-3 users', nl: '3-4 VM\'s, ~15 containers, 1-3 gebruikers' },
  'hw.config.pro.name': { fr: 'Pro — Equipe / Agence', en: 'Pro — Team / Agency', nl: 'Pro — Team / Bureau' },
  'hw.config.pro.desc': { fr: 'Notre configuration de reference. Celle qui fait tourner MultiPass Agency en production. Prouvee, optimisee, resiliente.', en: 'Our reference configuration. The one running MultiPass Agency in production. Proven, optimized, resilient.', nl: 'Onze referentieconfiguratie. Degene die MultiPass Agency in productie draait. Bewezen, geoptimaliseerd, veerkrachtig.' },
  'hw.config.pro.capacity': { fr: '5-8 VMs, 30+ containers, 5-15 utilisateurs, GPU optionnel', en: '5-8 VMs, 30+ containers, 5-15 users, optional GPU', nl: '5-8 VM\'s, 30+ containers, 5-15 gebruikers, optionele GPU' },
  'hw.config.enterprise.name': { fr: 'Enterprise — Multi-equipe', en: 'Enterprise — Multi-team', nl: 'Enterprise — Multi-team' },
  'hw.config.enterprise.desc': { fr: 'Pour les organisations avec plusieurs equipes, multi-tenant, HA, et besoins GPU pour l\'inference IA locale.', en: 'For organizations with multiple teams, multi-tenant, HA, and GPU needs for local AI inference.', nl: 'Voor organisaties met meerdere teams, multi-tenant, HA, en GPU-behoeften voor lokale AI-inferentie.' },
  'hw.config.enterprise.capacity': { fr: '10-20 VMs, 100+ containers, 50+ utilisateurs, multi-GPU', en: '10-20 VMs, 100+ containers, 50+ users, multi-GPU', nl: '10-20 VM\'s, 100+ containers, 50+ gebruikers, multi-GPU' },
  'hw.incl.proxmox': { fr: 'Proxmox VE 9+', en: 'Proxmox VE 9+', nl: 'Proxmox VE 9+' },
  'hw.incl.proxmox.desc': { fr: 'Hyperviseur installe, VMs pre-configurees, reseau interne', en: 'Hypervisor installed, pre-configured VMs, internal network', nl: 'Hypervisor geinstalleerd, vooraf geconfigureerde VM\'s, intern netwerk' },
  'hw.incl.vms': { fr: 'VMs Ubuntu 24.04', en: 'Ubuntu 24.04 VMs', nl: 'Ubuntu 24.04 VM\'s' },
  'hw.incl.vms.desc': { fr: '4-5 VMs specalisees : compute, test, stockage, monitoring, sandbox', en: '4-5 specialized VMs: compute, test, storage, monitoring, sandbox', nl: '4-5 gespecialiseerde VM\'s: compute, test, opslag, monitoring, sandbox' },
  'hw.incl.docker': { fr: '30+ Containers', en: '30+ Containers', nl: '30+ Containers' },
  'hw.incl.docker.desc': { fr: 'Docker Compose stacks pre-deployes, healthchecks, log rotation', en: 'Pre-deployed Docker Compose stacks, healthchecks, log rotation', nl: 'Vooraf gedeployde Docker Compose stacks, healthchecks, log rotatie' },
  'hw.incl.ai': { fr: 'Stack IA complete', en: 'Complete AI stack', nl: 'Complete AI-stack' },
  'hw.incl.ai.desc': { fr: 'LiteLLM, Langfuse, Mem0, 13 agents IA, 70+ skills PAI', en: 'LiteLLM, Langfuse, Mem0, 13 AI agents, 70+ PAI skills', nl: 'LiteLLM, Langfuse, Mem0, 13 AI-agenten, 70+ PAI-vaardigheden' },
  'hw.incl.monitoring': { fr: 'Monitoring 360', en: '360 Monitoring', nl: '360 Monitoring' },
  'hw.incl.monitoring.desc': { fr: 'Beszel, Uptime Kuma, 44 checks cron, alertes ntfy, logs centralises', en: 'Beszel, Uptime Kuma, 44 cron checks, ntfy alerts, centralized logs', nl: 'Beszel, Uptime Kuma, 44 cron-checks, ntfy-waarschuwingen, gecentraliseerde logs' },
  'hw.incl.backup': { fr: 'Backup & Recovery', en: 'Backup & Recovery', nl: 'Backup & Recovery' },
  'hw.incl.backup.desc': { fr: 'Sauvegardes quotidiennes, offsite GDrive, 5 niveaux de recovery, test mensuel automatise', en: 'Daily backups, offsite GDrive, 5 recovery levels, automated monthly testing', nl: 'Dagelijkse back-ups, offsite GDrive, 5 herstelniveaus, geautomatiseerde maandelijkse tests' },
  'hw.incl.security': { fr: 'Securite hardened', en: 'Hardened security', nl: 'Geharde beveiliging' },
  'hw.incl.security.desc': { fr: 'SSH hardened, UFW, unattended-upgrades, credentials chiffres, Cloudflare Tunnel', en: 'Hardened SSH, UFW, unattended-upgrades, encrypted credentials, Cloudflare Tunnel', nl: 'Geharde SSH, UFW, unattended-upgrades, versleutelde credentials, Cloudflare Tunnel' },
  'hw.incl.voice': { fr: 'Interface vocale', en: 'Voice interface', nl: 'Spraakinterface' },
  'hw.incl.voice.desc': { fr: 'ElevenLabs MCP, 13 agents vocaux, annonces de phases, commande naturelle', en: 'ElevenLabs MCP, 13 voice agents, phase announcements, natural commands', nl: 'ElevenLabs MCP, 13 spraakagenten, fase-aankondigingen, natuurlijke commando\'s' },
  'hw.adv.time.title': { fr: 'Operationnel en 1 heure', en: 'Operational in 1 hour', nl: 'Operationeel in 1 uur' },
  'hw.adv.time.desc': { fr: 'Branchez le serveur, connectez le reseau, demarrez. Tout est deja configure.', en: 'Plug in the server, connect the network, start. Everything is already configured.', nl: 'Sluit de server aan, verbind het netwerk, start. Alles is al geconfigureerd.' },
  'hw.adv.tested.title': { fr: 'Teste avant livraison', en: 'Tested before delivery', nl: 'Getest voor levering' },
  'hw.adv.tested.desc': { fr: '115 tests unitaires, 55 tests E2E, 44 checks monitoring — tout valide avant expedition.', en: '115 unit tests, 55 E2E tests, 44 monitoring checks — all validated before shipping.', nl: '115 unit tests, 55 E2E-tests, 44 monitoring checks — alles gevalideerd voor verzending.' },
  'hw.adv.support.title': { fr: 'Support hardware + software', en: 'Hardware + software support', nl: 'Hardware + software support' },
  'hw.adv.support.desc': { fr: 'Un seul interlocuteur pour le materiel et le logiciel. Pas de ping-pong entre fournisseurs.', en: 'One contact for hardware and software. No ping-pong between vendors.', nl: 'Een contactpersoon voor hardware en software. Geen pingpong tussen leveranciers.' },
  'hw.adv.optimized.title': { fr: 'Optimise pour la stack', en: 'Optimized for the stack', nl: 'Geoptimaliseerd voor de stack' },
  'hw.adv.optimized.desc': { fr: 'BIOS, kernel, Docker, Proxmox — chaque couche tuned pour les workloads IA et containers.', en: 'BIOS, kernel, Docker, Proxmox — every layer tuned for AI and container workloads.', nl: 'BIOS, kernel, Docker, Proxmox — elke laag afgestemd op AI- en container-workloads.' },
  'hw.models': { fr: 'Modeles valides', en: 'Validated models', nl: 'Gevalideerde modellen' },
  'hw.price': { fr: 'Prix indicatif', en: 'Indicative price', nl: 'Indicatieve prijs' },
  'hw.capacity': { fr: 'Capacite', en: 'Capacity', nl: 'Capaciteit' },
  'hw.recommended': { fr: 'Recommande', en: 'Recommended', nl: 'Aanbevolen' },
  'hw.our.config': { fr: 'Notre config', en: 'Our config', nl: 'Onze config' },
  'hw.section.advantages': { fr: 'Pourquoi le cle en main', en: 'Why turnkey', nl: 'Waarom kant-en-klaar' },
  'hw.section.whats.included': { fr: 'Ce qui est preinstalle', en: 'What\'s preinstalled', nl: 'Wat voorgeinstalleerd is' },

  // Charts page
  'nav.charts': { fr: 'Graphiques', en: 'Charts', nl: 'Grafieken' },
  'nav.charts.desc': { fr: 'Visualisations live', en: 'Live visualizations', nl: 'Live visualisaties' },
  'landing.desc.charts': { fr: 'Graphiques interactifs : VMs, containers, tests, uptime, agents', en: 'Interactive charts: VMs, containers, tests, uptime, agents', nl: 'Interactieve grafieken: VM\'s, containers, tests, uptime, agenten' },
  'charts.title': { fr: 'Graphiques Ecosysteme', en: 'Ecosystem Charts', nl: 'Ecosysteem Grafieken' },
  'charts.vm.title': { fr: 'Resources par VM', en: 'Resources per VM', nl: 'Resources per VM' },
  'charts.vm.subtitle': { fr: 'CPU (cores), RAM (Go), Disk utilise (%)', en: 'CPU (cores), RAM (GB), Disk used (%)', nl: 'CPU (cores), RAM (GB), Schijf gebruikt (%)' },
  'charts.containers.title': { fr: 'Distribution des Containers', en: 'Container Distribution', nl: 'Container Distributie' },
  'charts.containers.subtitle': { fr: '30 containers repartis sur 7 stacks Docker Compose', en: '30 containers across 7 Docker Compose stacks', nl: '30 containers over 7 Docker Compose stacks' },
  'charts.tests.title': { fr: 'Couverture de Tests', en: 'Test Coverage', nl: 'Testdekking' },
  'charts.tests.subtitle': { fr: '115 tests unitaires + 55 tests E2E = 170 total', en: '115 unit tests + 55 E2E tests = 170 total', nl: '115 unit tests + 55 E2E-tests = 170 totaal' },
  'charts.uptime.title': { fr: 'Uptime 30 Jours', en: '30-Day Uptime', nl: '30-Dagen Uptime' },
  'charts.uptime.subtitle': { fr: 'Disponibilite et alertes sur les 30 derniers jours', en: 'Availability and alerts over the last 30 days', nl: 'Beschikbaarheid en waarschuwingen over de laatste 30 dagen' },
  'charts.agents.title': { fr: 'Capacites des Agents', en: 'Agent Capabilities', nl: 'Agent Capaciteiten' },
  'charts.agents.subtitle': { fr: 'Profils de competences des 4 agents principaux', en: 'Skill profiles of the 4 main agents', nl: 'Vaardigheidsprofielen van de 4 hoofdagenten' },
  'charts.backup.title': { fr: 'Sante des Backups', en: 'Backup Health', nl: 'Backup Gezondheid' },
  'charts.backup.subtitle': { fr: 'Taille et fraicheur des 6 sources de sauvegarde', en: 'Size and freshness of the 6 backup sources', nl: 'Grootte en versheid van de 6 back-upbronnen' },

  // Remote Control
  'nav.remote': { fr: 'Remote', en: 'Remote', nl: 'Remote' },
  'nav.remote.desc': { fr: 'Controle a Distance', en: 'Remote Control', nl: 'Afstandsbediening' },
  'landing.desc.remote': { fr: 'Controle a distance de toute l\'infrastructure via SSH, tunnels et agents', en: 'Remote control of all infrastructure via SSH, tunnels and agents', nl: 'Afstandsbediening van de hele infrastructuur via SSH, tunnels en agenten' },
  'remote.title': { fr: 'Centre de Controle a Distance', en: 'Remote Control Center', nl: 'Afstandsbedieningscentrum' },
  'remote.tab.channels': { fr: 'Canaux', en: 'Channels', nl: 'Kanalen' },
  'remote.tab.commands': { fr: 'Commandes', en: 'Commands', nl: 'Commando\'s' },
  'remote.tab.workflows': { fr: 'Workflows', en: 'Workflows', nl: 'Workflows' },
  'remote.hero.subtitle': { fr: 'Gerez toute votre infrastructure depuis n\'importe ou. SSH, tunnels, notifications push et agents IA — tout est accessible a distance.', en: 'Manage your entire infrastructure from anywhere. SSH, tunnels, push notifications and AI agents — everything is remotely accessible.', nl: 'Beheer uw volledige infrastructuur vanaf elke locatie. SSH, tunnels, push-notificaties en AI-agenten — alles is op afstand bereikbaar.' },
  'remote.hero.pill.ssh': { fr: 'SSH Direct', en: 'Direct SSH', nl: 'Direct SSH' },
  'remote.hero.pill.tunnel': { fr: 'Tunnels Securises', en: 'Secure Tunnels', nl: 'Beveiligde Tunnels' },
  'remote.hero.pill.agents': { fr: 'Agents Autonomes', en: 'Autonomous Agents', nl: 'Autonome Agenten' },
  // Remote Channels
  'remote.ch.ssh': { fr: 'Acces SSH', en: 'SSH Access', nl: 'SSH-Toegang' },
  'remote.ch.ssh.desc': { fr: 'Connexion directe aux VMs via cles SSH. Commandes systeme, maintenance, deploiement.', en: 'Direct connection to VMs via SSH keys. System commands, maintenance, deployment.', nl: 'Directe verbinding met VMs via SSH-sleutels. Systeemcommando\'s, onderhoud, deployment.' },
  'remote.ch.tunnel': { fr: 'Tunnels Cloudflare', en: 'Cloudflare Tunnels', nl: 'Cloudflare Tunnels' },
  'remote.ch.tunnel.desc': { fr: 'Exposition securisee des services internes via tunnels HTTPS chiffres.', en: 'Secure exposure of internal services via encrypted HTTPS tunnels.', nl: 'Veilige blootstelling van interne diensten via versleutelde HTTPS-tunnels.' },
  'remote.ch.ntfy': { fr: 'Notifications Push', en: 'Push Notifications', nl: 'Push-Meldingen' },
  'remote.ch.ntfy.desc': { fr: 'Alertes temps reel via ntfy sur mobile, desktop et CLI.', en: 'Real-time alerts via ntfy on mobile, desktop and CLI.', nl: 'Realtime-waarschuwingen via ntfy op mobiel, desktop en CLI.' },
  'remote.ch.proxmox': { fr: 'API Proxmox', en: 'Proxmox API', nl: 'Proxmox API' },
  'remote.ch.proxmox.desc': { fr: 'Controle des VMs via l\'API REST Proxmox. Start, stop, snapshots.', en: 'VM control via Proxmox REST API. Start, stop, snapshots.', nl: 'VM-besturing via Proxmox REST API. Start, stop, snapshots.' },
  'remote.ch.claude': { fr: 'Claude Code Agent', en: 'Claude Code Agent', nl: 'Claude Code Agent' },
  'remote.ch.claude.desc': { fr: 'Agents IA autonomes via Claude Code sur les VMs. Dev, tests, sandbox.', en: 'Autonomous AI agents via Claude Code on VMs. Dev, tests, sandbox.', nl: 'Autonome AI-agenten via Claude Code op VMs. Dev, tests, sandbox.' },
  'remote.ch.voice': { fr: 'Commandes Vocales', en: 'Voice Commands', nl: 'Spraakcommando\'s' },
  'remote.ch.voice.desc': { fr: 'Interface vocale via ElevenLabs MCP. Commandes, annonces de phase, alertes.', en: 'Voice interface via ElevenLabs MCP. Commands, phase announcements, alerts.', nl: 'Spraakinterface via ElevenLabs MCP. Commando\'s, fase-aankondigingen, waarschuwingen.' },
  // Remote Commands
  'remote.cmd.deploy': { fr: 'Lancer Tests E2E', en: 'Run E2E Tests', nl: 'E2E-Tests Uitvoeren' },
  'remote.cmd.deploy.desc': { fr: 'Execute la suite Playwright sur r2d2-stage', en: 'Run Playwright test suite on r2d2-stage', nl: 'Voer Playwright-testsuite uit op r2d2-stage' },
  'remote.cmd.rebuild': { fr: 'Rebuild Production', en: 'Rebuild Production', nl: 'Productie Herbouwen' },
  'remote.cmd.rebuild.desc': { fr: 'Reconstruit les containers Docker sur r2d2-main', en: 'Rebuild Docker containers on r2d2-main', nl: 'Herbouw Docker-containers op r2d2-main' },
  'remote.cmd.health': { fr: 'Health Check VMs', en: 'VM Health Check', nl: 'VM Gezondheidscontrole' },
  'remote.cmd.health.desc': { fr: 'Verifie uptime et espace disque de toutes les VMs', en: 'Check uptime and disk space of all VMs', nl: 'Controleer uptime en schijfruimte van alle VMs' },
  'remote.cmd.docker': { fr: 'Status Docker', en: 'Docker Status', nl: 'Docker Status' },
  'remote.cmd.docker.desc': { fr: 'Liste les containers et leur etat sur r2d2-main', en: 'List containers and their status on r2d2-main', nl: 'Lijst containers en hun status op r2d2-main' },
  'remote.cmd.logs': { fr: 'Logs Centralises', en: 'Centralized Logs', nl: 'Gecentraliseerde Logs' },
  'remote.cmd.logs.desc': { fr: 'Consulte les logs centralises sur r2d2-store', en: 'View centralized logs on r2d2-store', nl: 'Bekijk gecentraliseerde logs op r2d2-store' },
  'remote.cmd.backup.check': { fr: 'Verifier Backups', en: 'Check Backups', nl: 'Backups Controleren' },
  'remote.cmd.backup.desc': { fr: 'Liste les derniers fichiers de sauvegarde', en: 'List latest backup files', nl: 'Lijst laatste back-upbestanden' },
  'remote.cmd.gdrive': { fr: 'Taille GDrive', en: 'GDrive Size', nl: 'GDrive Grootte' },
  'remote.cmd.gdrive.desc': { fr: 'Verifie la taille du stockage offsite Google Drive', en: 'Check offsite Google Drive storage size', nl: 'Controleer offsite Google Drive-opslaggrootte' },
  'remote.cmd.agent.team': { fr: 'Equipe d\'Agents', en: 'Agent Team', nl: 'Agentteam' },
  'remote.cmd.agent.desc': { fr: 'Cree une equipe d\'agents specialises via Claude', en: 'Create a specialized agent team via Claude', nl: 'Maak een gespecialiseerd agentteam via Claude' },
  'remote.cmd.research': { fr: 'Recherche IA', en: 'AI Research', nl: 'AI-Onderzoek' },
  'remote.cmd.research.desc': { fr: 'Lance une recherche approfondie via Claude Code', en: 'Launch deep research via Claude Code', nl: 'Start diepgaand onderzoek via Claude Code' },
  'remote.cmd.vm.start': { fr: 'Demarrer VM', en: 'Start VM', nl: 'VM Starten' },
  'remote.cmd.vm.desc': { fr: 'Demarre une VM via l\'API REST Proxmox', en: 'Start a VM via Proxmox REST API', nl: 'Start een VM via Proxmox REST API' },
  'remote.cmd.tunnel': { fr: 'Status Tunnel', en: 'Tunnel Status', nl: 'Tunnel Status' },
  'remote.cmd.tunnel.desc': { fr: 'Verifie l\'etat du tunnel Cloudflare', en: 'Check Cloudflare tunnel status', nl: 'Controleer Cloudflare-tunnelstatus' },
  'remote.cmd.ntfy': { fr: 'Envoyer Alerte', en: 'Send Alert', nl: 'Waarschuwing Verzenden' },
  'remote.cmd.ntfy.desc': { fr: 'Envoie une notification push via ntfy', en: 'Send a push notification via ntfy', nl: 'Stuur een push-notificatie via ntfy' },
  // Remote Categories
  'remote.cat.deploy': { fr: 'Deploiement', en: 'Deployment', nl: 'Deployment' },
  'remote.cat.monitor': { fr: 'Monitoring', en: 'Monitoring', nl: 'Monitoring' },
  'remote.cat.backup': { fr: 'Sauvegarde', en: 'Backup', nl: 'Back-up' },
  'remote.cat.agent': { fr: 'Agents IA', en: 'AI Agents', nl: 'AI-Agenten' },
  'remote.cat.infra': { fr: 'Infrastructure', en: 'Infrastructure', nl: 'Infrastructuur' },
  // Remote Workflows
  'remote.wf.deploy.title': { fr: 'Deploy Complet', en: 'Full Deploy', nl: 'Volledige Deploy' },
  'remote.wf.deploy.desc': { fr: 'Pipeline de deploiement automatise de bout en bout', en: 'End-to-end automated deployment pipeline', nl: 'End-to-end geautomatiseerde deployment-pipeline' },
  'remote.wf.deploy.s1': { fr: 'Push code sur GitHub (CI lance)', en: 'Push code to GitHub (CI triggers)', nl: 'Push code naar GitHub (CI start)' },
  'remote.wf.deploy.s2': { fr: 'Tests unitaires + lint sur runner', en: 'Unit tests + lint on runner', nl: 'Unit tests + lint op runner' },
  'remote.wf.deploy.s3': { fr: 'Build & deploy sur r2d2-main', en: 'Build & deploy on r2d2-main', nl: 'Build & deploy op r2d2-main' },
  'remote.wf.deploy.s4': { fr: 'E2E Playwright sur r2d2-stage', en: 'E2E Playwright on r2d2-stage', nl: 'E2E Playwright op r2d2-stage' },
  'remote.wf.deploy.result': { fr: 'App live + 55 tests passes', en: 'App live + 55 tests passed', nl: 'App live + 55 tests geslaagd' },
  'remote.wf.incident.title': { fr: 'Reponse Incident', en: 'Incident Response', nl: 'Incident Response' },
  'remote.wf.incident.desc': { fr: 'Detection et resolution automatique d\'incidents', en: 'Automatic incident detection and resolution', nl: 'Automatische incidentdetectie en -oplossing' },
  'remote.wf.incident.s1': { fr: 'Alerte ntfy (monitoring cron */5)', en: 'ntfy alert (monitoring cron */5)', nl: 'ntfy-waarschuwing (monitoring cron */5)' },
  'remote.wf.incident.s2': { fr: 'Diagnostic SSH automatique', en: 'Automatic SSH diagnostic', nl: 'Automatische SSH-diagnose' },
  'remote.wf.incident.s3': { fr: 'Restart service ou rollback', en: 'Service restart or rollback', nl: 'Service herstart of rollback' },
  'remote.wf.incident.s4': { fr: 'Verification sante + notification OK', en: 'Health check + OK notification', nl: 'Gezondheidscontrole + OK-melding' },
  'remote.wf.incident.result': { fr: 'MTTR < 2 min, zero intervention humaine', en: 'MTTR < 2 min, zero human intervention', nl: 'MTTR < 2 min, geen menselijke interventie' },
  'remote.wf.sandbox.title': { fr: 'Sandbox Lab', en: 'Sandbox Lab', nl: 'Sandbox Lab' },
  'remote.wf.sandbox.desc': { fr: 'Environnement isole pour experimentation IA', en: 'Isolated environment for AI experimentation', nl: 'Geisoleerde omgeving voor AI-experimenten' },
  'remote.wf.sandbox.s1': { fr: 'Demarrer r2d2-lab via API Proxmox', en: 'Start r2d2-lab via Proxmox API', nl: 'Start r2d2-lab via Proxmox API' },
  'remote.wf.sandbox.s2': { fr: 'Deploy agent Claude Code sandbox', en: 'Deploy Claude Code sandbox agent', nl: 'Deploy Claude Code sandbox-agent' },
  'remote.wf.sandbox.s3': { fr: 'Execution experimentation isolee', en: 'Run isolated experimentation', nl: 'Voer geisoleerd experiment uit' },
  'remote.wf.sandbox.s4': { fr: 'Collecter resultats + arreter VM', en: 'Collect results + stop VM', nl: 'Resultaten verzamelen + VM stoppen' },
  'remote.wf.sandbox.result': { fr: 'Resultats collectes, VM eteinte, zero impact prod', en: 'Results collected, VM stopped, zero prod impact', nl: 'Resultaten verzameld, VM gestopt, geen productie-impact' },

  'manifesto.pre': { fr: 'Une equipe ou', en: 'A Team where', nl: 'Een team waar' },
  'manifesto.human': { fr: 'l\'Humain decide', en: 'The Human decides', nl: 'de Mens beslist' },
  'manifesto.ai': { fr: 'l\'IA orchestre', en: 'AI orchestrates', nl: 'AI orkestreert' },
  'manifesto.agents': { fr: 'les Agents executent', en: 'Agents execute', nl: 'Agenten uitvoeren' },
  'common.composants': { fr: 'composants', en: 'components', nl: 'componenten' },
  'common.controles.securite': { fr: 'controles securite', en: 'security controls', nl: 'beveiligingscontroles' },
  'common.satisfaction': { fr: 'satisfaction', en: 'satisfaction', nl: 'tevredenheid' },
}

const LocaleContext = createContext<{
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}>({
  locale: 'fr',
  setLocale: () => {},
  t: (key: string) => key,
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('mp-locale') as Locale | null
    if (saved && ['fr', 'en', 'nl'].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('mp-locale', l)
  }

  const t = (key: string): string => {
    return UI[key]?.[locale] ?? UI[key]?.['fr'] ?? key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
