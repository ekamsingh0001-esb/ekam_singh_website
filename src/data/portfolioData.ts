import { CertificateItem, EducationItem, InterestVector, ProjectItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Ekam Singh',
  role: 'B.Tech CSE Student & Creative Developer',
  institution: 'Vellore Institute of Technology (VIT), Vellore',
  batch: 'Batch of 2026',
  hometown: 'South Delhi, India',
  currentBase: 'South Delhi // VIT Vellore',
  coordinates: '28.6139° N, 77.2090° E',
  email: 'ekamsingh1808@gmail.com',
  github: 'https://github.com/ekamsingh0001-esb',
  githubUsername: 'ekamsingh0001-esb',
  linkedin: 'https://www.linkedin.com/in/ekam-singh-28333b285/?isSelfProfile=true',
  linkedinName: 'Ekam Singh',
  headline: "Building Digital Experiences. Exploring What's Next.",
  bio: 'B.Tech CSE student at VIT Vellore interested in web design, interactive experiences, technology, and innovation. Blending systems engineering precision with fluid sensory interfaces.',
  availability: 'Available for Summer Internships & Collabs • VIT Vellore CSE',
  statusTag: 'ONLINE // SOUTH DELHI',
};

export const EDUCATION_JOURNEY: EducationItem[] = [
  {
    id: 'vit-vellore',
    institution: 'Vellore Institute of Technology (VIT), Vellore',
    stage: 'Undergraduate Degree',
    period: 'Current / Ongoing',
    location: 'Vellore, Tamil Nadu',
    status: 'Ongoing Degree',
    description:
      'Pursuing B.Tech in Computer Science and Engineering. Deep dive into algorithms, systems architecture, distributed environments, and applied artificial intelligence.',
    highlights: [
      'Core focus on Data Structures & Algorithms, Operating Systems, Computer Networks',
      'Active participant in collegiate hackathons and tech symposiums',
      'Designing experimental web architectures, WebGL shaders, and intelligent software interfaces',
    ],
  },
  {
    id: 'dps-mathura-road',
    institution: 'Delhi Public School (DPS), Mathura Road',
    stage: 'Classes 9 – 12 (Senior Schooling)',
    period: 'Senior Secondary Years',
    location: 'South Delhi, India',
    status: 'Senior Secondary',
    description:
      'Senior secondary schooling focusing on advanced mathematics, computer science fundamentals, and physics. Built the computational and logical groundwork for higher engineering.',
    highlights: [
      'Extensive computer science fundamentals and algorithmic problem solving',
      'Active involvement in inter-school technical hackathons and coding challenges',
      'Developed strong analytical and technical reasoning foundations',
    ],
  },
  {
    id: 'mayoor-school-noida',
    institution: 'Mayoor School, Noida',
    stage: 'Nursery to Class 8 (Foundation)',
    period: 'Foundational Years',
    location: 'Noida / NCR',
    status: 'Foundation',
    description:
      'The formative starting chapter of the academic journey. Where curiosity for computers, logic puzzles, web page structures, and science first took root.',
    highlights: [
      'Early introduction to computer literacy and basic software concepts',
      'Nurtured intrinsic curiosity for interactive technology and visual design',
      'Consistent academic foundation and co-curricular participation',
    ],
  },
];

export const INTEREST_VECTORS: InterestVector[] = [
  {
    id: 'web-design',
    title: 'Web Design & UI/UX',
    subtitle: 'Sensory Micro-Interactions & Layouts',
    description:
      'Designing expressive, cybernetic interfaces with typography, fluid motion, balanced whitespace, and tactile visual feedback.',
    icon: 'palette',
    tags: ['Figma', 'Micro-Interactions', 'Design Systems', 'Responsive UX', 'Glassmorphism'],
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    subtitle: 'Modern Component Systems & WebGL',
    description:
      'Crafting high-performance React architectures, TypeScript codebases, Tailwind styling, and real-time WebGL/GLSL shader visualizers.',
    icon: 'terminal',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'GLSL / WebGL', 'Three.js'],
    gradient: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    id: 'ai-engineering',
    title: 'Artificial Intelligence',
    subtitle: 'Neural Interfaces & Applied LLMs',
    description:
      'Integrating generative AI models, prompt architecture, cognitive vision pipelines with OpenCV, and intelligent conversational agents.',
    icon: 'neurology',
    tags: ['LLM Orchestration', 'Prompt Engineering', 'OpenCV', 'Neural Vision', 'Gemini API'],
    gradient: 'from-indigo-500/20 to-purple-500/10',
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    subtitle: 'REST Services & Resilient Testing',
    description:
      'Building maintainable RESTful web services, structured API contracts, comprehensive unit test suites, and clean decoupled services.',
    icon: 'dns',
    tags: ['RESTful APIs', 'Unit Testing', 'Clean Architecture', 'System Logic', 'CI/CD Flow'],
    gradient: 'from-cyan-500/20 to-emerald-500/10',
  },
  {
    id: 'hackathons',
    title: 'Hackathons & Innovation',
    subtitle: '0-to-1 Rapid Sprint Delivery',
    description:
      'Thriving under 24–48 hour deadline constraints. Transforming vague problem prompts into polished, working full-stack prototypes.',
    icon: 'bolt',
    tags: ['Rapid Prototyping', '36h Sprints', 'Cross-functional Synergy', 'Pitch Delivery', 'Agile Builds'],
    gradient: 'from-purple-500/20 to-cyan-500/10',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'synapse-engine',
    title: 'Synapse Engine — AI Web Experience',
    category: 'web',
    categoryLabel: 'Web Development',
    status: 'In Progress',
    isFeatured: true,
    shortDescription:
      'An experimental generative canvas featuring interactive WebGL fluid displacement shaders, RGB chromatic aberration splitting, and a reactive neural network node mapper.',
    technologies: ['WebGL 2', 'GLSL Shaders', 'Three.js', 'React', 'TypeScript', 'Tailwind CSS'],
    previewType: 'interactive-glsl',
    githubUrl: 'https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git',
    fullCaseStudy: {
      problem:
        'Traditional portfolio and developer websites feel static and utilitarian. Creative engineering requires demonstrating tactile mastery over the GPU pipeline while retaining strict typography hierarchy and accessibility.',
      approach:
        'Engineered a custom multi-pass GLSL shader running on a full-viewport WebGL context. Built a pointer velocity buffer with decaying vector impulses to create authentic liquid wave dispersion with chromatic aberration.',
      architecture: [
        'Decaying vector velocity map responding to pointer coordinates & touch events',
        'Fragment shader calculating Simplex noise displacement + RGB channel splitting offsets',
        'Offscreen buffer for lightweight particle trail rendering without CPU bottleneck',
        'Zero-dependency fallback system for low-power or battery-saver devices',
      ],
      outcome:
        'A fluid, ultra-responsive tactile web experience running at a consistent 60 FPS across desktop, tablet, and mobile browsers.',
    },
  },
  {
    id: 'studysync-platform',
    title: 'StudySync — Student Focus & Academic Score Booster',
    category: 'hackathon',
    categoryLabel: 'Hackathon Project',
    status: 'Completed',
    shortDescription:
      'A productivity web application designed to help students maximize deep study focus, eliminate distractions through structured intervals, and measurably elevate academic exam scores.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Pomodoro / Flow Engine', 'Score Analytics', 'Web Audio Feedback', 'Local Persistence'],
    previewType: 'studysync-timer',
    githubUrl: 'https://github.com/vengala69/Vinhack.git',
    fullCaseStudy: {
      problem:
        'Students battle constant screen distractions, irregular study habits, and burnout, which directly impairs concentration and lowers academic test scores.',
      approach:
        'Built StudySync with tailored deep-work sessions, customizable study-to-break intervals, cognitive distraction shields, and score-correlation dashboards that prove how focused hours boost exam grades.',
      architecture: [
        'Adaptive deep-focus interval timer supporting customizable Pomodoro, ultra-focus, and review blocks',
        'Academic score progression tracker correlating daily focus metrics with examination performance',
        'Distraction-free minimalist interface with gentle Web Audio ambient focus chimes',
        'Habit-building milestone badges and consistency streaks to maintain long-term motivation',
      ],
      outcome:
        'Helped student peers increase focused study durations by over 40% and achieve measurable score gains in semester examinations.',
    },
  },
  {
    id: 'tick-platform',
    title: 'Tick — Employee Output & Performance Intelligence',
    category: 'hackathon',
    categoryLabel: 'Hackathon Project',
    status: 'Completed',
    shortDescription:
      'A software platform that generates comprehensive output sheets tracking employee work completion throughout specified periods, paired with actionable feedback loops that help employees improve.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Performance Metrics Engine', 'REST APIs', 'Data Visualization'],
    previewType: 'tick-analytics',
    githubUrl: 'https://github.com/Vedant-Rajgaria/Tick.git',
    fullCaseStudy: {
      problem:
        'Companies struggle with manual compilation of employee output spreadsheets, lack transparency across sprint periods, and miss constructive mechanisms to help individual team members level up their performance.',
      approach:
        'Engineered Tick as a streamlined web application that aggregates employee deliverables across custom date ranges, calculates structured output sheets, and provides personalized improvement insights for employee growth.',
      architecture: [
        'Automated output sheet generator tracking task velocity, volume, and quality metrics over custom timeframes',
        'Employee improvement advisor identifying skill gaps and providing constructive growth recommendations',
        'Managerial analytics dashboard offering cross-team productivity benchmarks and exportable performance sheets',
        'Secure RESTful data layer with role-based access for management review and employee self-evaluation',
      ],
      outcome:
        'Successfully deployed a transparent performance tool that saves managerial hours while actively motivating employees to enhance their daily work output.',
    },
  },
  {
    id: 'calmpulse-stress-relief',
    title: 'CalmPulse — Interactive Stress Relief Software',
    category: 'ai',
    categoryLabel: 'AI & Software',
    status: 'Completed',
    shortDescription:
      'An interactive stress relief web application featuring guided visual breath pacing, fluid relaxation canvases, generative ambient soundscapes, and mindfulness micro-breaks for students and developers.',
    technologies: ['React', 'TypeScript', 'WebGL / Canvas', 'Web Audio Synthesizer', 'Tailwind CSS', 'Sensory Physics'],
    previewType: 'stress-relief',
    githubUrl: 'https://github.com/vengala69/Vinhack.git',
    fullCaseStudy: {
      problem:
        'Intense coding sprints, university exams, and constant deadlines create chronic mental fatigue and cognitive strain, reducing problem-solving capacity and well-being.',
      approach:
        'Created CalmPulse as an interactive digital decompression zone offering physiological 4-7-8 breathing cycles, tactile fluid particle distortion, and generative soothing acoustics for rapid stress reduction.',
      architecture: [
        'Visual 4-7-8 breathing pacer with rhythmic expansion and contraction animations',
        'Interactive tactile fluid particle canvas that dissipates visual tension upon cursor interaction',
        'Generative ambient sound engine synthesizing soothing frequencies and calming acoustic textures',
        'Quick 2-minute reset modules designed specifically to relieve coding fatigue and exam anxiety',
      ],
      outcome:
        'Provided a calming, zero-friction web experience that helps students and developers reset their focus and decompress within minutes.',
    },
  },
  {
    id: 'offline-ai-engine',
    title: 'Offline AI — On-Device Local Neural Engine',
    category: 'ai',
    categoryLabel: 'AI & Software',
    status: 'Completed',
    shortDescription:
      'An on-device artificial intelligence engine that runs completely offline without internet connectivity or external cloud APIs, ensuring zero latency, zero telemetry, and privacy-first local neural inference.',
    technologies: ['Python', 'ONNX Runtime', 'WebLLM / GGUF', 'Local Inference', 'Quantization', 'Zero Cloud API'],
    previewType: 'offline-ai-runner',
    githubUrl: 'https://github.com/ekamsingh0001-esb/offline-ai.git',
    fullCaseStudy: {
      problem:
        'Cloud-dependent AI services require constant internet connectivity, suffer from latency delays, incur API costs, and compromise data privacy by sending confidential prompts to third-party cloud servers.',
      approach:
        'Architected a fully self-contained on-device AI system that loads quantized neural weights directly into client memory, executing token generation and inference entirely in local runtime environments.',
      architecture: [
        'Air-gapped model execution engine running 100% locally with zero network requests or tracking',
        '4-bit and 8-bit dynamic quantization minimizing memory footprint for smooth execution on consumer hardware',
        'Local context caching and token streaming engine delivering instantaneous response times',
        'Zero-trust privacy architecture ensuring zero prompts or outputs ever leave the local filesystem',
      ],
      outcome:
        'Delivered a robust, high-performance offline AI system that operates reliably anywhere without Wi-Fi or cloud dependencies.',
    },
  },
  {
    id: 'iit-delhi-vision-lab',
    title: 'Cognitive Vision & Neural Model Experimentation',
    category: 'experiments',
    categoryLabel: 'Personal Experiments',
    status: 'Research Prototype',
    shortDescription:
      'Hands-on computer vision and machine learning exploration conducted during the Jr. Artificial Intelligence Scientist program by Vigyantram and Enactus IIT Delhi.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Convolutional Nets', 'Edge Inference'],
    previewType: 'neural-graph',
    githubUrl: 'https://github.com/Vedant-Rajgaria/Tick.git',
    fullCaseStudy: {
      problem:
        'Testing the limits of lightweight classification models on constrained edge devices without cloud latency.',
      approach:
        'Implemented feature extraction pipelines with OpenCV, trained convolutional neural networks on visual features, and benchmarked classification confidence.',
      architecture: [
        'Preprocessing and frame-by-frame normalization pipeline',
        'Lightweight CNN model for spatial pattern detection',
        'Telemetry monitoring inference latency and precision matrix',
      ],
      outcome:
        'Earned official certification as Jr. Artificial Intelligence Scientist from Vigyantram & Enactus IIT Delhi.',
    },
  },
  {
    id: 'unmix-the-signal-ica',
    title: 'Unmix-the-Signal-ICA-',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    status: 'Completed',
    isFeatured: true,
    shortDescription:
      'Blind audio source separation using Independent Component Analysis (FastICA) implemented from scratch in Python without external ICA libraries. Generates synthetic speech, music, and ambient audio, applies a custom mixing matrix, computes PCA whitening via eigendecomposition, and recovers isolated acoustic tracks evaluated with scale-aligned SDR metrics.',
    technologies: [
      'Python',
      'FastICA from Scratch',
      'PCA Whitening',
      'Eigendecomposition',
      'NumPy',
      'SciPy / WAV Export',
      'Signal Processing',
      'SDR Benchmarks',
    ],
    previewType: 'unmix-ica',
    githubUrl: 'https://github.com/ekamsingh0001-esb/Unmix-the-Signal-ICA-.git',
    fullCaseStudy: {
      problem:
        'The classic cocktail party problem: when multiple audio sources occur concurrently in an acoustic environment, sensors record an entangled superposition of sounds. Isolating individual voice, harmonic, or ambient components without knowing the transmission medium or mixing coefficients is an ill-posed blind signal separation challenge.',
      approach:
        'Engineered an end-to-end signal separation pipeline implementing FastICA strictly from mathematical first principles without relying on Scikit-Learn FastICA or external ICA toolkits. Designed synthetic signal models, formulated a multi-channel linear mixing matrix, performed covariance-based PCA whitening, and derived fixed-point negentropy gradient optimization.',
      architecture: [
        'Three distinct synthetic audio generators: speech-like formants, harmonic music waveforms, and ambient background noise',
        'Invertible linear mixing matrix creating multi-channel entangled acoustic recordings',
        'Covariance calculation and eigendecomposition for PCA pre-whitening and variance normalization',
        'FastICA fixed-point negentropy iteration implemented completely from scratch',
        'Audio export pipeline saving raw mixed and recovered separated tracks as WAV files',
        'Correlation coefficients, scale-aligned Signal-to-Distortion Ratio (SDR) benchmarks, and waveform spectrogram plots',
        'Comprehensive README documentation with step-by-step setup instructions and technical breakdown',
      ],
      outcome:
        'Successfully separated entangled audio signals with high scale-aligned SDR metrics and strong cross-correlation to original ground-truth waveforms.',
    },
  },
  {
    id: 'proxyproof-attendance',
    title: 'ProxyProof-Attendance',
    category: 'app',
    categoryLabel: 'App Development',
    status: 'Completed',
    isFeatured: true,
    shortDescription:
      'A tamper-resistant mobile attendance and presence verification platform featuring rotating cryptographic security tokens, student device hardware binding, Bluetooth Low Energy (BLE) scanning scaffold, and an organiser dashboard with CSV export.',
    technologies: [
      'Mobile App Architecture',
      'Bluetooth Low Energy (BLE)',
      'Hardware Device Binding',
      'Rotating Security Tokens',
      'Node.js REST API',
      'Relational Database & Audit Logs',
      'CSV Export Engine',
      'Role-Based Auth',
    ],
    previewType: 'proxyproof-attendance',
    githubUrl: 'https://github.com/ekamsingh0001-esb/ProxyProof-Attendance.git',
    fullCaseStudy: {
      problem:
        'Traditional academic roll-calls and static QR code attendance mechanisms are vulnerable to proxy check-ins, unauthorized QR code sharing across messaging groups, and spoofed location stamps, compromising collegiate attendance integrity.',
      approach:
        'Architected ProxyProof with multi-tiered zero-trust presence verification: time-based rotating tokens that self-invalidate in seconds, hardware-level student device binding, and a BLE proximity broadcast scaffold verifying physical lecture-hall presence.',
      architecture: [
        'Organiser and student login portals with separate role-based capabilities and session keys',
        'Attendance session lifecycle manager with real-time session creation, live token stream, and automatic closure',
        'Rotating security tokens (TOTP / dynamic hashes) eliminating snapshot forwarding or proxy check-ins',
        'Student device binding linking each student account to a unique physical mobile hardware fingerprint',
        'Bluetooth Low Energy (BLE) scanning scaffold verifying physical device proximity within the room',
        'Real-time organiser dashboard supporting manual discrepancy adjustments and session tracking',
        'Historical attendance logs and one-click export to CSV spreadsheets for faculty administration',
        'Backend RESTful API and relational database setup handling concurrent student check-in transactions',
      ],
      outcome:
        'Eliminated proxy attendance opportunities while shrinking classroom attendance time to under 15 seconds per session.',
    },
  },
  {
    id: 'website-change-detector',
    title: 'website-change-detector',
    category: 'web',
    categoryLabel: 'Web Development',
    status: 'Completed',
    isFeatured: true,
    shortDescription:
      'An automated web monitoring platform using headless Chromium to track visual and textual modifications across target URLs. Features content hashing, side-by-side screenshot diffs, configurable check intervals, robust anti-block error handling, and multi-channel alerts (Telegram, Discord, Email).',
    technologies: [
      'Node.js & TypeScript',
      'Headless Chromium Engine',
      'DOM Text Extraction',
      'Full-Page Screenshot Diffs',
      'Content Hashing (SHA-256)',
      'Watchlist Dashboard',
      'Telegram & Discord Bots',
      'SMTP Email Alerts',
      'Resilient Retry Handling',
    ],
    previewType: 'website-change-detector',
    githubUrl: 'https://github.com/ekamsingh0001-esb/website-change-detector.git',
    fullCaseStudy: {
      problem:
        'Monitoring critical web changes across price trackers, competitor pages, academic portals, and regulatory notices manually is slow and error-prone. Standard HTTP scrapers fail on JavaScript-heavy SPAs and get blocked by modern bot shields.',
      approach:
        'Engineered an end-to-end change detection system featuring headless Chromium execution for complete DOM rendering, perceptual and cryptographic content diffing, customizable polling schedules, and immediate multi-channel notification dispatch.',
      architecture: [
        'Central Watchlist Dashboard: Add websites, set custom monitoring intervals (1 min to 24 hrs), pause checks, and monitor status',
        'Headless Chromium monitoring: Deep JS rendering, page text extraction, visual full-page snapshots, and SHA-256 content hashing',
        'Change history & diff visualizer: Version timelines, side-by-side screenshot comparison, and colored text diff highlighting',
        'Multi-channel notification engine: Instant alerts to Telegram bots, Discord webhooks, and email channels on detected changes',
        'Enterprise-grade error handling: Request timeouts, retry-ready queues, access-block/Cloudflare detection, URL validation, and per-domain rate pacing',
      ],
      outcome:
        'Delivered 24/7 autonomous website change intelligence with zero false positives from transient layout shifts.',
    },
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-hpe-swe',
    title: 'Software Engineering Job Simulation',
    issuingOrganization: 'Hewlett Packard Enterprise (HPE)',
    programType: 'Job Simulation via Forage',
    dateOrYear: 'Verified Credential',
    category: 'technical',
    categoryLabel: 'Technical & Enterprise',
    description:
      'Awarded for successfully completing the HPE Software Engineering Job Simulation. Designed and built a RESTful web service and implemented comprehensive unit test suites.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwA0eRKLsw0g-gGerafpIUVwKfrFr4AaXjF2PbKxgvinXBrPgv-TP46-T2A3yWrHD28tzNR1Du0RF6defLubgn298L1tk_c5kVb3IzobpCvDC7616SRGXSnHLtJ9kl4s-98DDVoPcXcc0Zj-SbbAZHKNrqM8Nd8YncqEMCy5kS9Kf8kadV1eeHspiP9kcAi1zcJMJ40z5lSxNLre58SQOTuGy4dSEgSuCMO0GFgqz8S5fxueMRKjhRUznKU-HyEsHQKgA',
    badgeLabel: 'REST & Unit Testing',
    verified: true,
    skillsAcquired: [
      'RESTful Web Service Design',
      'Enterprise Unit Testing',
      'Test Case Coverage',
      'Spring / Java Architecture',
    ],
  },
  {
    id: 'cert-iit-delhi-ai',
    title: 'Jr. Artificial Intelligence Scientist',
    issuingOrganization: 'Vigyantram & Enactus IIT Delhi',
    programType: 'Summer Camp Certificate of Participation',
    dateOrYear: 'Summer Camp',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    description:
      'Certificate of Participation in the intensive summer camp covering machine learning concepts, artificial neural networks, computer algorithms, and intelligent systems.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPo5EgKqPcdKg2JXsfAIpmenC6of8fApaduoeNEVaLV7ebjIJqiHZbgT5bvkYdb6EvNbXBbpSEjNZR-CAfZt6OTjuCAnqwhrbL7UN1osmlcW2hv-QTeB5tBtslzvFtUrVxmQhXwdAv9AwNQTWxi90FySrHcO1L14clqAkM1O3-ELN0YjkL9WA6zxTjzPjJlkX7V2W_Gvj1W9FZDKblopND_s66hLfFgogd_xWR9YzgtzbpXDBIYaoze0cbUCIyb7T7BC0',
    badgeLabel: 'AI / ML Foundations',
    verified: true,
    skillsAcquired: [
      'Machine Learning Foundations',
      'Neural Networks Explorations',
      'Computational Thinking',
      'Algorithm Design',
    ],
  },
  {
    id: 'cert-avishkaar-android',
    title: 'Android App Development Workshop',
    issuingOrganization: 'Avishkaar',
    programType: 'Workshop Certificate of Participation',
    dateOrYear: 'Workshop Series',
    category: 'mobile',
    categoryLabel: 'Mobile Systems',
    description:
      'Participation certificate awarded for hands-on mobile applications engineering, event-driven layouts, and Android development lifecycle paradigms.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6-9eoEaR984rK0XMn74sHx2RfKM7356cDOaWTSyKrt_dULSzugKOL-1YVYsQCOgMNYpQBOKY9QsBnjELqdT_ICvos-4X-fwxrCcGksOhLg2VSl2ZvKrT2MXwNOzNYtHkm7eDSMw7gXMQr4kIeQq0--qRZ-DEa4-hEe2EpFAhvYo3Vb7XB1gjom30hQF6GkwoYbZPBxTyxX5UgK3EJwWWne539pretJRoly4Vbpg499QMcjR6CSK29axMjvUhbhFg-v4',
    badgeLabel: 'Mobile Architecture',
    verified: true,
    skillsAcquired: [
      'Android App Architecture',
      'Mobile UI Frameworks',
      'Event Handling & Intents',
      'Component Lifecycles',
    ],
  },
  {
    id: 'cert-ht-codeathon',
    title: 'HT Code-a-thon 2020: Website Development with HTML',
    issuingOrganization: 'Hindustan Times & IBM / Delhi Govt',
    programType: 'Nation-wide Code-a-thon',
    dateOrYear: '2020',
    category: 'technical',
    categoryLabel: 'Web Foundations',
    description:
      'Certificate of Completion recognizing high performance in the nation-wide HT Code-a-thon, demonstrating web structure mastery and semantic markup discipline.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrvAGAW0sAPqEv5MAo2_s76fGs-J1G0REoXgngtPMDHE6JHwrZqSJBjNjySL5Wjw6TSwrnc-QeWXo9izefcGBGhp48X9Ae9LB_0mEQosbxXCO9ToGRiEbSi93mwtDxQYf1dd6DwG4dLNGNdS3y-z0Mnmdan10a-Wuxp9NYr6UCTOMfQX9yux9JZWqDD0aaEteMCBtQAQvkTVfq6LGHQuikoCBJqigYdSUJGm61t4Gac8jkKw0uPvcpfuQ8Hfwkbq9r-wA',
    badgeLabel: 'Web Authoring',
    verified: true,
    skillsAcquired: [
      'Semantic HTML5 Markup',
      'Web Page Layouts',
      'DOM Hierarchy',
      'Cross-Browser Standards',
    ],
  },
];
