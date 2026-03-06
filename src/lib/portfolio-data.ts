export interface PortfolioProject {
  id: string
  name: string
  tagline: string
  type: 'web' | 'mobile' | 'both'
  industry: string
  description: string
  icon: string
  color: string
  problem: string
  solution: string
  impact: { metric: string; value: string; description: string }[]
  features: string[]
  techStack: string[]
  timeline: string
  screenshots: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'restaurant',
    name: 'RestoFlow',
    tagline: 'Gestion de restaurant tout-en-un',
    type: 'both',
    industry: 'Restauration',
    icon: '🍽️',
    color: '#FF6B6B',
    problem: 'Les restaurateurs jonglent entre 5-6 outils differents : caisse, reservations, commandes fournisseurs, planning equipe, comptabilite. Ca coute cher et c\'est inefficace.',
    solution: 'Application unifiee avec caisse tactile, reservations en ligne, gestion stocks avec alertes de reapprovisionnement IA, planning equipe intelligent, et tableau de bord financier temps reel.',
    description: 'Plateforme complete pour la gestion de restaurants. De la prise de commande sur tablette a la comptabilite, en passant par la gestion des stocks avec predictions IA et le planning du personnel.',
    impact: [
      { metric: 'Temps de gestion', value: '-60%', description: 'Reduction du temps admin quotidien' },
      { metric: 'Perte stock', value: '-35%', description: 'Grace aux alertes IA de peremption' },
      { metric: 'Chiffre d\'affaires', value: '+15%', description: 'Optimisation du taux de remplissage' },
      { metric: 'Outils remplaces', value: '5→1', description: 'Une seule plateforme unifiee' },
    ],
    features: [
      'Caisse tactile iPad/tablette avec mode offline',
      'Reservations en ligne avec confirmation automatique',
      'Gestion stocks avec alertes peremption et reapprovisionnement IA',
      'Planning equipe intelligent (contraintes legales incluses)',
      'Menu digital avec QR code et commande en ligne',
      'Dashboard financier temps reel (CA, marges, previsions)',
      'Integration livraison (Uber Eats, Deliveroo)',
      'Programme fidelite client integre',
    ],
    techStack: ['Next.js', 'React Native', 'Supabase', 'Stripe Terminal', 'LiteLLM', 'PWA'],
    timeline: '8-12 semaines',
    screenshots: [],
  },
  {
    id: 'immobilier',
    name: 'ImmoVision',
    tagline: 'Plateforme immobiliere intelligente',
    type: 'web',
    industry: 'Immobilier',
    icon: '🏠',
    color: '#00D4FF',
    problem: 'Les agences immobilieres perdent des heures a publier manuellement les annonces sur chaque portail, a gerer les visites par telephone, et a suivre les mandats sur des tableurs.',
    solution: 'Portail web avec diffusion multi-plateforme automatique, prise de RDV en ligne, visite virtuelle 360, estimation IA basee sur les donnees DVF, et CRM integre avec suivi pipeline.',
    description: 'Solution complete pour agences immobilieres : de la prise de mandat a la signature, avec diffusion automatique des annonces, estimation IA, visites virtuelles, et CRM integre.',
    impact: [
      { metric: 'Temps publication', value: '-80%', description: 'Diffusion auto sur 15+ portails' },
      { metric: 'Leads qualifies', value: '+45%', description: 'Scoring IA des acheteurs potentiels' },
      { metric: 'Delai de vente', value: '-25%', description: 'Matching acheteur/bien intelligent' },
      { metric: 'Satisfaction client', value: '4.8/5', description: 'Experience digitale moderne' },
    ],
    features: [
      'Diffusion automatique multi-portails (SeLoger, LeBonCoin, etc.)',
      'Estimation IA basee sur donnees DVF et marche local',
      'Visite virtuelle 360 integree (Matterport)',
      'CRM pipeline avec scoring leads IA',
      'Prise de RDV en ligne avec creneau automatique',
      'Signature electronique integree (Yousign)',
      'Tableau de bord performance par agent',
      'Portail proprietaire avec suivi mandat temps reel',
    ],
    techStack: ['Next.js', 'Supabase', 'Mapbox', 'Matterport SDK', 'LiteLLM', 'Yousign API', 'Stripe'],
    timeline: '10-14 semaines',
    screenshots: [],
  },
  {
    id: 'medical',
    name: 'MediConnect',
    tagline: 'Cabinet medical digitalise',
    type: 'both',
    industry: 'Sante',
    icon: '🏥',
    color: '#4ADE80',
    problem: 'Les cabinets medicaux et paramedics galerent avec la prise de RDV telephonique, les dossiers papier, la facturation manuelle, et les rappels de RDV oublies qui causent des creneaux vides.',
    solution: 'Plateforme de gestion de cabinet avec agenda en ligne, dossier patient numerique securise (HDS), teleconsultation video, facturation SESAM-Vitale, et rappels SMS automatiques.',
    description: 'Solution de gestion pour cabinets medicaux et paramedics. Agenda en ligne, dossiers patients securises, teleconsultation, facturation automatisee, et communication patient intelligente.',
    impact: [
      { metric: 'RDV non-honores', value: '-70%', description: 'Grace aux rappels SMS/email automatiques' },
      { metric: 'Temps administratif', value: '-50%', description: 'Facturation et dossiers automatises' },
      { metric: 'Teleconsultations', value: '+200%', description: 'Nouveau canal de consultation' },
      { metric: 'Conformite RGPD', value: '100%', description: 'Hebergement HDS certifie' },
    ],
    features: [
      'Agenda en ligne avec prise de RDV patient 24/7',
      'Dossier patient numerique securise (norme HDS)',
      'Teleconsultation video HD integree',
      'Facturation SESAM-Vitale automatisee',
      'Rappels SMS/email automatiques (J-2, J-1, H-2)',
      'Ordonnance electronique et partage securise',
      'Statistiques activite et reporting',
      'App mobile patient (suivi, documents, messagerie)',
    ],
    techStack: ['Next.js', 'React Native', 'Supabase', 'WebRTC', 'Stripe', 'Twilio SMS', 'HDS Cloud'],
    timeline: '12-16 semaines',
    screenshots: [],
  },
  {
    id: 'ecommerce',
    name: 'ShopForge',
    tagline: 'E-commerce IA nouvelle generation',
    type: 'web',
    industry: 'Commerce',
    icon: '🛒',
    color: '#8B5CF6',
    problem: 'Les e-commerants paient des commissions elevees sur les marketplaces (15-25%), n\'ont pas de controle sur leurs donnees clients, et manquent d\'outils de personnalisation avances.',
    solution: 'Boutique en ligne independante avec recommandations IA, chatbot support intelligent, gestion multi-entrepot, SEO automatise, et analytics avances. Zero commission sur les ventes.',
    description: 'Plateforme e-commerce complete avec IA integree : recommandations produits personnalisees, chatbot support, gestion logistique multi-entrepot, et marketing automation.',
    impact: [
      { metric: 'Commissions', value: '0%', description: 'vs 15-25% sur les marketplaces' },
      { metric: 'Panier moyen', value: '+30%', description: 'Recommandations IA personnalisees' },
      { metric: 'Support tickets', value: '-55%', description: 'Chatbot IA resout 55% des demandes' },
      { metric: 'Taux conversion', value: '+22%', description: 'UX optimisee et A/B testing IA' },
    ],
    features: [
      'Storefront responsive avec themes personnalisables',
      'Recommandations produits IA (collaborative filtering)',
      'Chatbot support client intelligent (FAQ + commandes)',
      'Gestion multi-entrepot avec calcul frais de port',
      'SEO automatise (meta, sitemap, structured data)',
      'Marketing automation (emails abandonned cart, newsletters)',
      'Dashboard analytics avance (cohortes, LTV, acquisition)',
      'Integration multi-paiement (CB, PayPal, Apple Pay, Klarna)',
    ],
    techStack: ['Next.js', 'Supabase', 'Stripe', 'LiteLLM', 'Algolia', 'Resend', 'Vercel Analytics'],
    timeline: '8-12 semaines',
    screenshots: [],
  },
  {
    id: 'fitness',
    name: 'FitTrack Pro',
    tagline: 'App fitness coaching IA',
    type: 'mobile',
    industry: 'Sport & Fitness',
    icon: '💪',
    color: '#FBBF24',
    problem: 'Les coachs sportifs gerent leurs clients par WhatsApp et tableurs. Les programmes sont generiques, le suivi est manuel, et les clients se demotivent sans feedback regulier.',
    solution: 'App mobile avec programmes d\'entrainement IA personnalises, suivi nutritionnel, video des exercices, messagerie coach-client, et dashboard coach pour gerer tous ses clients.',
    description: 'Application mobile de coaching sportif avec IA. Programmes personnalises, suivi nutritionnel, videos exercices, communication coach-client, et analytics de progression.',
    impact: [
      { metric: 'Retention clients', value: '+40%', description: 'Programmes adaptatifs et suivi continu' },
      { metric: 'Clients par coach', value: 'x3', description: 'Automatisation du suivi et des programmes' },
      { metric: 'Satisfaction', value: '4.9/5', description: 'Experience personnalisee' },
      { metric: 'Revenus coach', value: '+65%', description: 'Plus de clients, moins d\'admin' },
    ],
    features: [
      'Programmes d\'entrainement IA adaptatifs (progression auto)',
      'Bibliotheque 500+ exercices avec video HD',
      'Suivi nutritionnel avec scan aliments (OCR)',
      'Dashboard coach multi-clients',
      'Messagerie in-app coach-client',
      'Tracking progression (poids, mensurations, performances)',
      'Notifications intelligentes (rappels, motivation, records)',
      'Integration Apple Health / Google Fit / Garmin',
    ],
    techStack: ['React Native', 'Supabase', 'LiteLLM', 'Stripe', 'Apple HealthKit', 'Google Fit API', 'FFmpeg'],
    timeline: '10-14 semaines',
    screenshots: [],
  },
  {
    id: 'logistics',
    name: 'FleetMaster',
    tagline: 'Gestion de flotte et logistique',
    type: 'both',
    industry: 'Transport & Logistique',
    icon: '🚛',
    color: '#00D4FF',
    problem: 'Les entreprises de transport gerent leurs tournees manuellement, perdent du temps en kilometres inutiles, n\'ont pas de visibilite temps reel sur leur flotte, et subissent des retards non communiques aux clients.',
    solution: 'Plateforme de gestion de flotte avec optimisation de tournees IA, tracking GPS temps reel, app chauffeur mobile, portail client avec suivi livraison, et maintenance predictive vehicules.',
    description: 'Solution complete pour entreprises de transport et logistique : optimisation IA des tournees, tracking temps reel, gestion maintenance vehicules, et portail client.',
    impact: [
      { metric: 'Kilometres', value: '-25%', description: 'Optimisation IA des tournees' },
      { metric: 'Carburant', value: '-20%', description: 'Routes optimisees + eco-driving' },
      { metric: 'Livraisons a l\'heure', value: '97%', description: 'Tracking + alertes proactives' },
      { metric: 'Pannes imprevues', value: '-60%', description: 'Maintenance predictive IA' },
    ],
    features: [
      'Optimisation tournees IA multi-contraintes (temps, poids, volume)',
      'Tracking GPS flotte temps reel sur carte',
      'App chauffeur mobile (navigation, POD, signature)',
      'Portail client avec suivi livraison en direct',
      'Maintenance predictive vehicules (alertes IA)',
      'Gestion documents (permis, assurances, controles techniques)',
      'Rapports eco-driving et consommation carburant',
      'API integration ERP/WMS',
    ],
    techStack: ['Next.js', 'React Native', 'Supabase', 'Mapbox', 'LiteLLM', 'MQTT', 'Stripe'],
    timeline: '12-16 semaines',
    screenshots: [],
  },
  {
    id: 'education',
    name: 'LearnSphere',
    tagline: 'Plateforme e-learning adaptative',
    type: 'both',
    industry: 'Education & Formation',
    icon: '🎓',
    color: '#F472B6',
    problem: 'Les organismes de formation proposent des parcours lineaires identiques pour tous. Les apprenants avances s\'ennuient, les debutants decrochent. Le taux de completion des formations en ligne est souvent inferieur a 15%.',
    solution: 'Plateforme e-learning avec parcours adaptatifs IA qui s\'ajustent au niveau et au rythme de chaque apprenant. Quiz intelligents, video interactive, certificats blockchain, et analytics de progression detailles.',
    description: 'LMS nouvelle generation avec IA adaptative. Parcours personnalises, contenu interactif, certification, et analytics avances pour organismes de formation et entreprises.',
    impact: [
      { metric: 'Taux completion', value: '72%', description: 'vs 15% moyenne industrie' },
      { metric: 'Temps formation', value: '-40%', description: 'Parcours adaptatif = pas de repetition' },
      { metric: 'Score examen', value: '+35%', description: 'Repetition espacee + quiz adaptatifs' },
      { metric: 'NPS apprenants', value: '78', description: 'Experience personnalisee et engageante' },
    ],
    features: [
      'Parcours adaptatifs IA (niveau, rythme, style d\'apprentissage)',
      'Contenu multimedia interactif (video, quiz, simulations)',
      'Repetition espacee intelligente (algorithme SM-2+)',
      'Certificats verifiables (PDF signe + blockchain optionnel)',
      'Dashboard formateur avec analytics par cohorte',
      'Gamification (badges, classements, streaks)',
      'Forum et messagerie entre apprenants et formateurs',
      'Portail entreprise avec gestion des plans de formation',
      'SCORM/xAPI compatible pour import contenu existant',
      'App mobile avec mode offline (download cours)',
    ],
    techStack: ['Next.js', 'React Native', 'Supabase', 'LiteLLM', 'Mux Video', 'Stripe', 'Resend'],
    timeline: '12-16 semaines',
    screenshots: [],
  },
]

export const PORTFOLIO_STATS = {
  industries: 7,
  avgTimeline: '10-14 sem.',
  techShared: '85%',
  satisfaction: '4.8/5',
}

export const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  web: { label: 'Web App', color: '#00D4FF' },
  mobile: { label: 'Mobile App', color: '#4ADE80' },
  both: { label: 'Web + Mobile', color: '#8B5CF6' },
}

// --- i18n data ---
type Locale = 'fr' | 'en' | 'nl'

const PORTFOLIO_I18N: Record<string, Record<Locale, { tagline: string; description: string; problem: string; solution: string; industry: string; timeline: string }>> = {
  restaurant: {
    fr: { tagline: 'Gestion de restaurant tout-en-un', industry: 'Restauration', timeline: '8-12 semaines', description: "Plateforme complete pour la gestion de restaurants. De la prise de commande sur tablette a la comptabilite, en passant par la gestion des stocks avec predictions IA et le planning du personnel.", problem: "Les restaurateurs jonglent entre 5-6 outils differents : caisse, reservations, commandes fournisseurs, planning equipe, comptabilite. Ca coute cher et c'est inefficace.", solution: "Application unifiee avec caisse tactile, reservations en ligne, gestion stocks avec alertes de reapprovisionnement IA, planning equipe intelligent, et tableau de bord financier temps reel." },
    en: { tagline: 'All-in-one restaurant management', industry: 'Restaurants', timeline: '8-12 weeks', description: 'Complete restaurant management platform. From tablet ordering to accounting, including AI-powered inventory management and staff scheduling.', problem: 'Restaurant owners juggle 5-6 different tools: POS, reservations, supplier orders, staff scheduling, accounting. Expensive and inefficient.', solution: 'Unified app with touch POS, online reservations, AI-powered stock alerts, smart staff scheduling, and real-time financial dashboard.' },
    nl: { tagline: 'Alles-in-een restaurantbeheer', industry: 'Restaurants', timeline: '8-12 weken', description: 'Compleet restaurantbeheerplatform. Van tabletbestellingen tot boekhouding, inclusief AI-gestuurde voorraadbeheer en personeelsplanning.', problem: 'Restauranteigenaren jongleren met 5-6 tools: kassa, reserveringen, leveranciersbestellingen, personeelsplanning, boekhouding. Duur en inefficient.', solution: 'Uniforme app met touchscreen kassa, online reserveringen, AI-voorraadmeldingen, slimme personeelsplanning en realtime financieel dashboard.' },
  },
  immobilier: {
    fr: { tagline: 'Plateforme immobiliere intelligente', industry: 'Immobilier', timeline: '10-14 semaines', description: "Solution complete pour agences immobilieres : de la prise de mandat a la signature, avec diffusion automatique des annonces, estimation IA, visites virtuelles, et CRM integre.", problem: "Les agences immobilieres perdent des heures a publier manuellement les annonces sur chaque portail, a gerer les visites par telephone, et a suivre les mandats sur des tableurs.", solution: "Portail web avec diffusion multi-plateforme automatique, prise de RDV en ligne, visite virtuelle 360, estimation IA basee sur les donnees DVF, et CRM integre avec suivi pipeline." },
    en: { tagline: 'Intelligent real estate platform', industry: 'Real Estate', timeline: '10-14 weeks', description: 'Complete solution for real estate agencies: from listing to signing, with auto-syndication, AI valuation, virtual tours, and integrated CRM.', problem: 'Real estate agencies waste hours manually publishing listings on each portal, managing viewings by phone, and tracking mandates on spreadsheets.', solution: 'Web portal with automatic multi-platform syndication, online booking, 360 virtual tours, AI valuation based on market data, and integrated CRM with pipeline tracking.' },
    nl: { tagline: 'Intelligent vastgoedplatform', industry: 'Vastgoed', timeline: '10-14 weken', description: 'Complete oplossing voor makelaars: van listing tot ondertekening, met automatische syndicatie, AI-taxatie, virtuele rondleidingen en geintegreerd CRM.', problem: 'Makelaars verspillen uren aan het handmatig publiceren van advertenties op elk portaal, het beheren van bezichtigingen per telefoon en het bijhouden van mandaten in spreadsheets.', solution: 'Webportaal met automatische multi-platform syndicatie, online boekingen, 360 virtuele rondleidingen, AI-taxatie op basis van marktgegevens en geintegreerd CRM met pipeline tracking.' },
  },
  medical: {
    fr: { tagline: 'Cabinet medical digitalise', industry: 'Sante', timeline: '12-16 semaines', description: "Solution de gestion pour cabinets medicaux et paramedics. Agenda en ligne, dossiers patients securises, teleconsultation, facturation automatisee, et communication patient intelligente.", problem: "Les cabinets medicaux et paramedics galerent avec la prise de RDV telephonique, les dossiers papier, la facturation manuelle, et les rappels de RDV oublies qui causent des creneaux vides.", solution: "Plateforme de gestion de cabinet avec agenda en ligne, dossier patient numerique securise (HDS), teleconsultation video, facturation SESAM-Vitale, et rappels SMS automatiques." },
    en: { tagline: 'Digitized medical practice', industry: 'Healthcare', timeline: '12-16 weeks', description: 'Practice management solution for medical offices. Online scheduling, secure patient records, teleconsultation, automated billing, and smart patient communication.', problem: 'Medical practices struggle with phone scheduling, paper records, manual billing, and missed appointment reminders causing empty slots.', solution: 'Practice management platform with online scheduling, secure digital patient records, video teleconsultation, automated billing, and automatic SMS reminders.' },
    nl: { tagline: 'Gedigitaliseerde medische praktijk', industry: 'Gezondheidszorg', timeline: '12-16 weken', description: 'Praktijkbeheeroplossing voor medische praktijken. Online planning, beveiligde patientendossiers, teleconsultatie, geautomatiseerde facturering en slimme patientcommunicatie.', problem: 'Medische praktijken worstelen met telefonische planning, papieren dossiers, handmatige facturering en gemiste afspraakherinneringen die lege slots veroorzaken.', solution: 'Praktijkbeheerplatform met online planning, beveiligde digitale patientendossiers, videoteleconultatie, geautomatiseerde facturering en automatische SMS-herinneringen.' },
  },
  ecommerce: {
    fr: { tagline: 'E-commerce IA nouvelle generation', industry: 'Commerce', timeline: '8-12 semaines', description: "Plateforme e-commerce complete avec IA integree : recommandations produits personnalisees, chatbot support, gestion logistique multi-entrepot, et marketing automation.", problem: "Les e-commerants paient des commissions elevees sur les marketplaces (15-25%), n'ont pas de controle sur leurs donnees clients, et manquent d'outils de personnalisation avances.", solution: "Boutique en ligne independante avec recommandations IA, chatbot support intelligent, gestion multi-entrepot, SEO automatise, et analytics avances. Zero commission sur les ventes." },
    en: { tagline: 'Next-gen AI e-commerce', industry: 'Commerce', timeline: '8-12 weeks', description: 'Complete e-commerce platform with integrated AI: personalized product recommendations, support chatbot, multi-warehouse logistics, and marketing automation.', problem: 'E-commerce merchants pay high marketplace commissions (15-25%), lack control over customer data, and miss advanced personalization tools.', solution: 'Independent online store with AI recommendations, smart support chatbot, multi-warehouse management, automated SEO, and advanced analytics. Zero sales commission.' },
    nl: { tagline: 'Next-gen AI e-commerce', industry: 'Handel', timeline: '8-12 weken', description: 'Compleet e-commerceplatform met geintegreerde AI: gepersonaliseerde productaanbevelingen, support chatbot, multi-magazijn logistiek en marketing automatisering.', problem: 'E-commerce handelaren betalen hoge marketplace commissies (15-25%), hebben geen controle over klantgegevens en missen geavanceerde personalisatietools.', solution: 'Onafhankelijke webshop met AI-aanbevelingen, slimme support chatbot, multi-magazijnbeheer, geautomatiseerde SEO en geavanceerde analytics. Nul verkoopcommissie.' },
  },
  fitness: {
    fr: { tagline: 'App fitness coaching IA', industry: 'Sport & Fitness', timeline: '10-14 semaines', description: "Application mobile de coaching sportif avec IA. Programmes personnalises, suivi nutritionnel, videos exercices, communication coach-client, et analytics de progression.", problem: "Les coachs sportifs gerent leurs clients par WhatsApp et tableurs. Les programmes sont generiques, le suivi est manuel, et les clients se demotivent sans feedback regulier.", solution: "App mobile avec programmes d'entrainement IA personnalises, suivi nutritionnel, video des exercices, messagerie coach-client, et dashboard coach pour gerer tous ses clients." },
    en: { tagline: 'AI fitness coaching app', industry: 'Sport & Fitness', timeline: '10-14 weeks', description: 'Mobile fitness coaching app with AI. Personalized programs, nutritional tracking, exercise videos, coach-client communication, and progress analytics.', problem: 'Fitness coaches manage clients via WhatsApp and spreadsheets. Programs are generic, tracking is manual, and clients lose motivation without regular feedback.', solution: 'Mobile app with AI-personalized training programs, nutritional tracking, exercise videos, coach-client messaging, and coach dashboard to manage all clients.' },
    nl: { tagline: 'AI fitness coaching app', industry: 'Sport & Fitness', timeline: '10-14 weken', description: 'Mobiele fitness coaching app met AI. Gepersonaliseerde programma\'s, voedingstracking, oefeningsvideo\'s, coach-client communicatie en voortgangsanalyses.', problem: 'Fitnesscoaches beheren klanten via WhatsApp en spreadsheets. Programma\'s zijn generiek, tracking is handmatig en klanten raken gedemotiveerd zonder regelmatige feedback.', solution: 'Mobiele app met AI-gepersonaliseerde trainingsprogramma\'s, voedingstracking, oefeningsvideo\'s, coach-client berichten en coach dashboard om alle klanten te beheren.' },
  },
  logistics: {
    fr: { tagline: 'Gestion de flotte et logistique', industry: 'Transport & Logistique', timeline: '12-16 semaines', description: "Solution complete pour entreprises de transport et logistique : optimisation IA des tournees, tracking temps reel, gestion maintenance vehicules, et portail client.", problem: "Les entreprises de transport gerent leurs tournees manuellement, perdent du temps en kilometres inutiles, n'ont pas de visibilite temps reel sur leur flotte, et subissent des retards non communiques aux clients.", solution: "Plateforme de gestion de flotte avec optimisation de tournees IA, tracking GPS temps reel, app chauffeur mobile, portail client avec suivi livraison, et maintenance predictive vehicules." },
    en: { tagline: 'Fleet and logistics management', industry: 'Transport & Logistics', timeline: '12-16 weeks', description: 'Complete solution for transport and logistics companies: AI route optimization, real-time tracking, vehicle maintenance management, and client portal.', problem: 'Transport companies manage routes manually, waste kilometers, lack real-time fleet visibility, and suffer from uncommunicated delays to clients.', solution: 'Fleet management platform with AI route optimization, real-time GPS tracking, mobile driver app, client portal with delivery tracking, and predictive vehicle maintenance.' },
    nl: { tagline: 'Vloot- en logistiekbeheer', industry: 'Transport & Logistiek', timeline: '12-16 weken', description: 'Complete oplossing voor transport- en logistiekbedrijven: AI-routeoptimalisatie, realtime tracking, voertuigonderhoudsbeheer en klantenportaal.', problem: 'Transportbedrijven beheren routes handmatig, verspillen kilometers, missen realtime vlootzichtbaarheid en kampen met niet-gecommuniceerde vertragingen aan klanten.', solution: 'Vlootbeheerplatform met AI-routeoptimalisatie, realtime GPS-tracking, mobiele chauffeurs-app, klantenportaal met leveringstracking en voorspellend voertuigonderhoud.' },
  },
  education: {
    fr: { tagline: 'Plateforme e-learning adaptative', industry: 'Education & Formation', timeline: '12-16 semaines', description: "LMS nouvelle generation avec IA adaptative. Parcours personnalises, contenu interactif, certification, et analytics avances pour organismes de formation et entreprises.", problem: "Les organismes de formation proposent des parcours lineaires identiques pour tous. Les apprenants avances s'ennuient, les debutants decrochent. Le taux de completion des formations en ligne est souvent inferieur a 15%.", solution: "Plateforme e-learning avec parcours adaptatifs IA qui s'ajustent au niveau et au rythme de chaque apprenant. Quiz intelligents, video interactive, certificats blockchain, et analytics de progression detailles." },
    en: { tagline: 'Adaptive e-learning platform', industry: 'Education & Training', timeline: '12-16 weeks', description: 'Next-gen LMS with adaptive AI. Personalized learning paths, interactive content, certification, and advanced analytics for training organizations and businesses.', problem: 'Training organizations offer identical linear paths for everyone. Advanced learners get bored, beginners drop out. Online course completion rates are often below 15%.', solution: 'E-learning platform with AI adaptive paths that adjust to each learner\'s level and pace. Smart quizzes, interactive video, blockchain certificates, and detailed progress analytics.' },
    nl: { tagline: 'Adaptief e-learning platform', industry: 'Onderwijs & Training', timeline: '12-16 weken', description: 'Volgende generatie LMS met adaptieve AI. Gepersonaliseerde leerpaden, interactieve content, certificering en geavanceerde analytics voor opleidingsorganisaties en bedrijven.', problem: 'Opleidingsorganisaties bieden identieke lineaire paden voor iedereen. Gevorderde leerlingen vervelen zich, beginners haken af. Voltooiingspercentages van online cursussen liggen vaak onder de 15%.', solution: 'E-learning platform met AI-adaptieve paden die zich aanpassen aan het niveau en tempo van elke leerling. Slimme quizzen, interactieve video, blockchain certificaten en gedetailleerde voortgangsanalyses.' },
  },
}

export function getPortfolioProjects(locale: Locale): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.map(p => {
    const i18n = PORTFOLIO_I18N[p.id]?.[locale]
    if (!i18n || locale === 'fr') return p
    return { ...p, tagline: i18n.tagline, description: i18n.description, problem: i18n.problem, solution: i18n.solution, industry: i18n.industry, timeline: i18n.timeline }
  })
}
