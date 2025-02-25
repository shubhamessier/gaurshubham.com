export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    company: "Solsphere AI",
    role: "Software Development Engineer",
    duration: "Feb 2025 - Present",
    description:
      "Starting Afresh."
  },
  {
    company: "Smartdocs Inc",
    role: "Software Development Engineer",
    duration: "Aug 2024 - Nov 2024",
    description:
      "Developed and deployed 3 production applications and 2 proof-of-concept projects. Built a real-time chatbot with optimized LLM context tokens and created a Thick client application using ElectronJS, reducing yearly Jenkins server costs.",
  },
  {
    company: "Anti AI",
    role: "Software Development Engineer",
    duration: "Mar 2024 - July 2024",
    description:
      "Led development of company's first PoC software release. Developed cross-platform releases using React, Next.js, ElectronJS, and PostgreSQL.",
  },
  {
    company: "NIT Trichy",
    role: "Summer Research Intern",
    duration: "Jun 2023 - Aug 2023",
    description:
      "Worked on Microsoft's CyberBattleSim project, implementing DQL/PPO Learning Algorithms. Co-authored a book chapter on Cyberdeception for Detection of Lateral Movement in Enterprise Networks.",
  },
];
