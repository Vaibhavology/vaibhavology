import { NextRequest, NextResponse } from "next/server";

// ============================================
// SMART OFFLINE PORTFOLIO CHATBOT
// No API key needed — answers from portfolio data
// ============================================

const PORTFOLIO = {
  name: "Vaibhav S",
  role: "Freelancer — Automation Engineer",
  bio: "Backend-focused developer with experience building production-grade automation systems, real-time pipelines, and enterprise applications. Skilled in designing scalable architectures, optimizing compute-heavy workflows, and deploying systems.",
  email: "vaibhavsu24@gmail.com",
  github: "https://github.com/vaibhavology",
  linkedin: "https://www.linkedin.com/in/vaibhavology",
  instagram: "https://www.instagram.com/vaibhavology_",
  skills: {
    languages: ["Java", "C++", "JavaScript", "Python", "HTML/CSS"],
    backend: ["React", "Node.js", "Flask", "FastAPI", "REST APIs"],
    databases: ["PostgreSQL", "MySQL", "Supabase"],
    cloud: ["AWS", "Salesforce", "Docker", "Google App Engine"],
  },
  experience: [
    {
      role: "Software Developer – Automation Systems",
      company: "Freelance",
      duration: "Apr 2025 – Present",
      highlights: [
        "Built GPU-accelerated video pipeline (FFmpeg NVENC)",
        "Designed queue-based async processing system (10+ jobs/week)",
        "Automated AI-based content generation and publishing",
        "Scaled pipeline contributing to 5.5K+ subscribers",
      ],
      tech: ["Flask", "FFmpeg (NVENC)", "AWS EC2", "Queue Systems", "Nginx"],
    },
    {
      role: "IQC Technician",
      company: "Foxconn",
      duration: "Dec 2023 – Jun 2024",
      highlights: [
        "Developed programs for CMM/OMM machines",
        "Automated measurement and alignment processes",
        "Performed data-driven defect analysis using 5 Whys",
      ],
      tech: ["CMM Programming", "Industrial Automation", "Data Analysis"],
    },
    {
      role: "Technician",
      company: "Bosch India",
      duration: "2022 – 2023",
      highlights: [
        "Worked on embedded systems and industrial automation",
        "Hardware-software integration experience",
        "Cross-functional engineering team collaboration",
      ],
      tech: ["Embedded Systems", "IoT", "C++"],
    },
  ],
  projects: [
    {
      name: "Aerostream AI",
      desc: "GPU-accelerated video processing pipeline with queue-based async processing, contributing to 5.5K+ subscribers.",
      tech: ["Flask", "FFmpeg (NVENC)", "AWS EC2", "Queue-Based Processing", "Nginx"],
    },
    {
      name: "Smart Ignition & Vehicle Management System",
      desc: "IoT-based vehicle system with fingerprint + BLE ignition, real-time driver monitoring using OpenCV, GPS alerts, PostgreSQL backend, and a web dashboard for live tracking.",
      tech: ["ESP32-S3", "OpenCV", "PostgreSQL", "FastAPI", "Python"],
    },
  ],
};

// Pattern-based response engine
function getResponse(message: string): string {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|sup|yo|greetings|howdy|hola)/i.test(msg)) {
    return `Hey there! 👋 I'm Vaibhav's portfolio assistant. I can tell you about his **skills**, **work experience**, **projects**, or how to **contact** him. What would you like to know?`;
  }

  // Who / About / What does he do
  if (/(who is|about|what does|tell me about|introduce|describe|what do you do)/i.test(msg)) {
    return `**Vaibhav S** is a ${PORTFOLIO.role}.\n\n${PORTFOLIO.bio}\n\nHe's currently freelancing as a Software Developer building automation systems, with prior experience at **Foxconn** and **Bosch India**.`;
  }

  // Skills / Tech stack
  if (/(skill|tech stack|technologies|what can|expertise|proficien|know|language|framework|tool|database|cloud)/i.test(msg)) {
    const s = PORTFOLIO.skills;
    return `Here's Vaibhav's tech stack:\n\n**Languages:** ${s.languages.join(", ")}\n**Backend/Frameworks:** ${s.backend.join(", ")}\n**Databases:** ${s.databases.join(", ")}\n**Cloud & DevOps:** ${s.cloud.join(", ")}`;
  }

  // Experience / Work
  if (/(experience|work|career|job|employ|position|where.*work|company|freelanc|foxconn|bosch)/i.test(msg)) {
    const expList = PORTFOLIO.experience
      .map(
        (e) =>
          `**${e.role}** at ${e.company} _(${e.duration})_\n${e.highlights.map((h) => `- ${h}`).join("\n")}`
      )
      .join("\n\n");
    return `Here's Vaibhav's work experience:\n\n${expList}`;
  }

  // Projects
  if (/(project|portfolio|built|build|made|create|aerostream|ignition|vehicle|iot)/i.test(msg)) {
    const projList = PORTFOLIO.projects
      .map(
        (p) =>
          `**${p.name}**\n${p.desc}\n_Tech: ${p.tech.join(", ")}_`
      )
      .join("\n\n");
    return `Here are Vaibhav's featured projects:\n\n${projList}`;
  }

  // Contact
  if (/(contact|reach|email|mail|hire|connect|get in touch|social|linkedin|github|instagram)/i.test(msg)) {
    return `You can reach Vaibhav through:\n\n- **Email:** ${PORTFOLIO.email}\n- **GitHub:** [vaibhavology](${PORTFOLIO.github})\n- **LinkedIn:** [vaibhavology_](${PORTFOLIO.linkedin})\n- **Instagram:** [vaibhavology_](${PORTFOLIO.instagram})\n\nFeel free to reach out — he'd love to hear from you! 🚀`;
  }

  // Resume / CV
  if (/(resume|cv|download|pdf)/i.test(msg)) {
    return `I don't have a downloadable resume link right now, but you can view Vaibhav's complete experience and skills here on this portfolio. For a formal copy, feel free to email him at **${PORTFOLIO.email}**.`;
  }

  // Availability / Hire
  if (/(available|hire|open to|freelance|looking for|opportunity|hiring)/i.test(msg)) {
    return `Yes! Vaibhav is currently **open to opportunities** — freelance projects, full-time roles, or contract work. He specializes in backend automation, system design, and scalable architectures.\n\nReach out at **${PORTFOLIO.email}** to discuss your project! 🚀`;
  }

  // Education
  if (/(education|degree|college|university|study|student|school)/i.test(msg)) {
    return `I don't have specific education details right now. Vaibhav is a self-taught developer with strong industry experience at companies like **Bosch** and **Foxconn**, and currently works as a freelance automation engineer. For more details, feel free to contact him at **${PORTFOLIO.email}**.`;
  }

  // Thanks
  if (/(thank|thanks|thx|appreciate|helpful|great)/i.test(msg)) {
    return `You're welcome! 😊 Glad I could help. If you have more questions about Vaibhav or want to get in touch, just ask!`;
  }

  // Goodbye
  if (/(bye|goodbye|see you|later|cya|peace)/i.test(msg)) {
    return `Goodbye! 👋 Thanks for visiting Vaibhav's portfolio. Feel free to come back anytime!`;
  }

  // Fallback
  return `I can help you with info about Vaibhav! Try asking about:\n\n- **Skills** — "What's his tech stack?"\n- **Experience** — "Where has he worked?"\n- **Projects** — "Tell me about his projects"\n- **Contact** — "How can I reach him?"\n\nOr feel free to email him directly at **${PORTFOLIO.email}**!`;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const reply = getResponse(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
