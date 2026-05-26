// Central Configuration File for your Portfolio.
// Simply edit this file to customize all content!

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon: string; // Dynamic icon name (we will map these to Lucide icons)
  glowColor: string; // Hex color or HSL representing the brand's custom glow color
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: 'Full-Stack' | 'Frontend' | 'Mobile' | 'Design';
  tags: string[];
  image: string; // Placeholder or generated image filename
  liveUrl?: string;
  githubUrl?: string;
  keyFeatures: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Metric {
  label: string;
  value: number;
  suffix: string;
}

export const personalInfo = {
  name: "Mubtasim Fuad",
  title: "Creative Full-Stack Developer",
  tagline: "Building high-performance, visually stunning web applications with pixel-perfect precision.",
  bio: "I am a passionate software engineer specializing in crafting premium digital experiences. By bridging the gap between elegant UI design and robust backend architecture, I build applications that not only perform exceptionally but also look and feel beautiful.",
  location: "Dhaka, Bangladesh",
  email: "mubtasimfuad7@gmail.com",
  github: "https://github.com/mubtasimfuad7",
  linkedin: "https://linkedin.com/in/mubtasimfuad7",
  twitter: "https://twitter.com/mubtasimfuad7",
  resumeUrl: "#", // Add link to your PDF resume here
};

export const metrics: Metric[] = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Completed Projects", value: 20, suffix: "+" },
  { label: "GitHub Contributions", value: 500, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" }
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", icon: "React", glowColor: "rgba(97, 218, 251, 0.4)" },
  { name: "TypeScript", category: "frontend", icon: "TypeScript", glowColor: "rgba(49, 120, 198, 0.4)" },
  { name: "Next.js", category: "frontend", icon: "Nextjs", glowColor: "rgba(255, 255, 255, 0.4)" },
  { name: "CSS3 / SCSS", category: "frontend", icon: "Css", glowColor: "rgba(38, 77, 228, 0.4)" },
  { name: "HTML5", category: "frontend", icon: "Html", glowColor: "rgba(227, 79, 38, 0.4)" },
  
  // Backend
  { name: "Node.js", category: "backend", icon: "Node", glowColor: "rgba(51, 153, 51, 0.4)" },
  { name: "Express.js", category: "backend", icon: "Express", glowColor: "rgba(255, 255, 255, 0.2)" },
  { name: "PostgreSQL", category: "backend", icon: "Postgres", glowColor: "rgba(51, 103, 145, 0.4)" },
  { name: "MongoDB", category: "backend", icon: "Mongo", glowColor: "rgba(71, 162, 72, 0.4)" },
  
  // Tools & Others
  { name: "Git / GitHub", category: "tools", icon: "Git", glowColor: "rgba(240, 80, 50, 0.4)" },
  { name: "Docker", category: "tools", icon: "Docker", glowColor: "rgba(36, 150, 237, 0.4)" },
  { name: "Figma", category: "tools", icon: "Figma", glowColor: "rgba(242, 78, 30, 0.4)" },
  { name: "AWS", category: "tools", icon: "Aws", glowColor: "rgba(255, 153, 0, 0.4)" }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "NovaCommerce",
    shortDescription: "A premium, lightning-fast Full-Stack e-commerce dashboard and storefront.",
    longDescription: "NovaCommerce is a high-performance commerce solution built using Next.js, Node.js, and PostgreSQL. It incorporates modern elements such as stripe payment processing, interactive real-time sales dashboard chart graphics, fully optimized image load-times, and intuitive shopping bag animations.",
    category: "Full-Stack",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    image: "novacommerce.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Stripe payment integration with webhooks and fraud detection.",
      "Beautiful admin control board tracking lifetime orders and sales analytics.",
      "Optimized static rendering for e-commerce listings for instantaneous SEO loads.",
      "Custom responsive interface with dark mode preference support."
    ]
  },
  {
    id: "2",
    title: "Synapse Notes",
    shortDescription: "A collaborative markdown editor utilizing CRDTs for real-time document sync.",
    longDescription: "Synapse Notes offers standard web application editors a seamless collaborative space. Using real-time WebSockets and conflict-free replicated data types (CRDTs), multiple developers can author markdown reports simultaneously without experiencing merge conflicts.",
    category: "Frontend",
    tags: ["React", "WebSockets", "CRDTs", "Vanilla CSS", "Markdown"],
    image: "synapse.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Zero-latency multi-user editor alignment using Yjs CRDT technology.",
      "Embedded code execution sandbox supporting multiple languages.",
      "Custom themes with glassmorphism workspace customization.",
      "Dynamic file hierarchy sidebar with local storage offline backups."
    ]
  },
  {
    id: "3",
    title: "Vortex Motion",
    shortDescription: "An interactive, physics-based 3D workspace showcasing CSS and Canvas capabilities.",
    longDescription: "Vortex Motion is a high-fidelity creative visual web space built to push the limits of modern browsers. Combining lightweight customized 2D physics libraries with canvas and complex CSS properties, users experience interactive particle flow fields that react dynamically to acoustics.",
    category: "Design",
    tags: ["HTML5 Canvas", "Physics Engine", "Web Audio API", "Vanilla CSS"],
    image: "vortex.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    keyFeatures: [
      "Custom particle physics simulation rendering over 50,000 entities at 60fps.",
      "Fluid microphone frequency analyzer modulating gradient colors and speeds.",
      "Sleek customizable glassmorphic setting controller.",
      "Fully touch-responsive gesture recognition for mobile and tablets."
    ]
  }
];

export const experiences: Experience[] = [
  {
    id: "exp1",
    role: "B.Sc. in Computer Science & Engineering (CSE)",
    company: "North South University",
    period: "2021 - 2026",
    description: [
      "Studying in Dhaka, Bangladesh, pursuing a Bachelor of Science degree in CSE.",
      "Acquiring advanced skills in Software Engineering, Database Systems, Algorithms, and Object-Oriented Programming.",
      "Participating in university programming labs and building collaborative web projects."
    ]
  },
  {
    id: "exp2",
    role: "Higher Secondary School Certificate (HSC)",
    company: "Science Group",
    period: "2017 - 2019",
    description: [
      "Completed Higher Secondary Certificate with a focus on Mathematics, Physics, Chemistry, and ICT.",
      "Developed deep problem-solving skills and academic excellence in sciences."
    ]
  },
  {
    id: "exp3",
    role: "Secondary School Certificate (SSC)",
    company: "Science Group",
    period: "2015 - 2017",
    description: [
      "Completed Secondary School Certificate in Science group with outstanding results.",
      "Learned basic computing principles, math, and introductory logical problem-solving."
    ]
  }
];
