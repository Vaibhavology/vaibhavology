// ============================================
// PORTFOLIO CONFIGURATION
// Update all your personal details here!
// ============================================

export const siteConfig = {
    // ===========================================
    // PERSONAL INFO
    // ===========================================
    name: "Vaibhav S", // Your full name
    firstName: "Your", // Just first name (used in some places)

    // Roles that animate in the banner (typing effect)
    roles: [
        "Software Engineer",
        "System Design",
        "Backend Automation"
    ],

    // Your current position
    currentPosition: {
        role: "Freelancer",
        company: "Automation Engineer",
        companyLogo: "/assets/webhr.webp", // Replace with your company logo
    },

    // Short bio/tagline
    tagline: "A Designer who",
    headline: "Judges a book by its cover...",
    subHeadline: "Because if the cover does not impress you what else can?",

    // About section description
    aboutDescription: `Backend-focused developer with experience building production-grade automation systems, real-time pipelines, and enterprise applications. Skilled in designing scalable architectures, optimizing compute-heavy workflows, and deploying systems.`,

    // What I Solve section data
    whatISolve: [
        {
            title: "Workflow Automation",
            description: "Automating repetitive workflows and manual processes.",
            icon: "automation"
        },
        {
            title: "Async Architecture",
            description: "Designing async and queue-based processing systems.",
            icon: "queue"
        },
        {
            title: "Backend Pipelines",
            description: "Building scalable backend pipelines for high-throughput workloads.",
            icon: "server"
        },
        {
            title: "System Optimization",
            description: "Optimizing media processing and performance-critical systems.",
            icon: "performance"
        }
    ],

    // ===========================================
    // CONTACT INFO
    // ===========================================
    email: "vaibhavsu24@gmail.com",

    // Social media links (leave empty string to hide)
    socials: {
        instagram: "https://www.instagram.com/vaibhavology_",
        github: "https://github.com/vaibhavology",
        linkedin: "https://www.linkedin.com/in/vaibhavology_",
    },

    // Website URL (for SEO)
    url: "https://vaibhavology.com",

    // ===========================================
    // IMAGES
    // ===========================================
    images: {
        logo: "/logo/l1.png",
        profile: "/assets/me4.png",
        profileGlow: "/assets/me-glow.png",
        arrow: "/assets/arrow.png",
        circle: "/assets/circle.png",
        illustration: "/assets/illustration.png",
    },
};

// ===========================================
// SKILLS
// ===========================================
export const skills = {
    core: [
        {
            category: "Languages",
            icon: "terminal",
            items: ["Java", "C++", "JavaScript", "Python"],
        },
        {
            category: "Backend & APIs",
            icon: "server",
            items: ["Node.js", "Express.js", "Flask", "REST APIs"],
        },
        {
            category: "Systems & Architecture",
            icon: "cpu",
            items: ["Queue-based Processing", "Async Workflows", "Pipeline Design"],
        },
        {
            category: "Media & Encoding",
            icon: "film",
            items: ["FFmpeg", "NVIDIA NVENC", "GPU-accelerated Pipelines"],
        },
        {
            category: "Database",
            icon: "database",
            items: ["PostgreSQL", "Supabase", "MySQL"],
        },
        {
            category: "Cloud & DevOps",
            icon: "cloud",
            items: ["AWS EC2", "CI/CD", "Vercel", "Docker", "Nginx"],
        },
    ],
    familiar: [
        "React", "FastAPI", "GraphQL", "MongoDB", "Salesforce",
        "Google App Engine", "Tailwind CSS", "Redis", "Webpack",
    ],
};

// ===========================================
// WORK EXPERIENCE
// ===========================================
export const experienceCards = [
    {
        role: "Software Developer – Automation Systems",
        company: "Freelance",
        duration: "Apr 2025 – Present",
        icon: "/cards/ex1.png",

        description: [
            "Built & maintaining GPU-accelerated video pipeline (FFmpeg NVENC)",
            "Designed queue-based async processing system (10+ jobs/week)",
            "Automated AI-based content generation and publishing",
            "Improved system performance and reliability",
            "Scaled pipeline contributing to 5.5K+ subscribers"
        ],
        // icon: "/cards/ex1.png",
        techStack: ["Flask", "FFmpeg (NVENC)", "AWS EC2", "Queue Systems", "Nginx"]
    },
    {
        role: "IQC Technician",
        company: "Foxconn",
        duration: "Dec 2023 – Jun 2024",
        icon: "/cards/ex3.png",

        description: [
            "Developed and maintained programs for CMM/OMM machines to automate inspection workflows for bulk components",
            "Automated measurement and alignment processes, improving inspection efficiency and reducing manual intervention",
            "Performed data-driven defect analysis using 5 Whys to identify root causes and improve quality accuracy",
            // "Analyzed production data to detect recurring defect patterns and support process optimization"
        ],

        techStack: ["CMM Programming", "Industrial Automation", "Data Analysis", "Process Optimization"]
    },
    {
        role: "Technician",
        company: "Bosch India",
        duration: "2022 – 2023",
        description: [
            "Worked on embedded systems and industrial automation",
            "Gained hands-on experience with hardware-software integration",
            "Collaborated with cross-functional engineering teams",
        ],
        icon: "/cards/ex2.png",
        link: "https://www.bosch.com/",
        techStack: ["Embedded Systems", "IoT", "C++"],
    },
];

// ===========================================
// FEATURED CASE STUDIES
// ===========================================
export const caseStudies = [
    {
        id: 1,
        title: "AeroStream AI",
        tagline: "GPU-accelerated video pipeline powering 5,500+ subscribers with zero manual intervention.",
        image: "/projects/p1.png",
        link: "#",
        problem:
            "Manual video production is slow, error-prone, and doesn't scale. Creating, encoding, and publishing content across platforms required constant human involvement — bottlenecking growth.",
        solution:
            "Built a fully automated pipeline that handles AI-driven content generation, GPU-accelerated encoding via NVIDIA NVENC, and scheduled publishing — all orchestrated through an async queue system on AWS.",
        techStack: ["Flask", "FFmpeg", "NVIDIA NVENC", "AWS EC2", "Queue Systems", "Nginx", "Python", "REST APIs"],
        impact: [
            { metric: "5,500+", label: "Subscribers reached" },
            { metric: "10+", label: "Jobs processed / week" },
            { metric: "~4×", label: "Encoding speedup (GPU vs CPU)" },
            { metric: "0", label: "Manual steps in pipeline" },
        ],
        architecture: {
            layers: [
                {
                    label: "Client Layer",
                    nodes: [
                        { id: "user", label: "User", icon: "monitor" },
                        { id: "dashboard", label: "Dashboard", icon: "monitor" },
                    ],
                },
                {
                    label: "API & Control Layer",
                    nodes: [
                        { id: "api", label: "Flask API", icon: "server" },
                        { id: "gateway", label: "API Gateway", icon: "server" },
                        { id: "ratelimit", label: "Rate Limiter\nToken Bucket", icon: "shield" },
                        { id: "scheduler", label: "Job Scheduler\nPriority Queue", icon: "clock" },
                    ],
                },
                {
                    label: "Queue Layer",
                    nodes: [
                        { id: "queue", label: "Job Queue", icon: "queue" },
                    ],
                },
                {
                    label: "Processing Layer",
                    nodes: [
                        { id: "pool", label: "Worker Pool\nAsync Workers", icon: "cpu" },
                        { id: "ffmpeg", label: "FFmpeg\nNVENC", icon: "gpu" },
                    ],
                },
                {
                    label: "Storage & External",
                    nodes: [
                        { id: "storage", label: "Cloud\nStorage", icon: "disk" },
                        { id: "youtube", label: "YouTube\nAPI", icon: "upload" },
                    ],
                },
                {
                    label: "Reliability",
                    nodes: [
                        { id: "retry", label: "Retry Logic", icon: "retry" },
                        { id: "failover", label: "Failure\nHandling", icon: "shield" },
                    ],
                },
            ],
        },
    },
    {
        id: 2,
        title: "Project Veyron",
        tagline: "Real-time driver monitoring system combining IoT hardware, computer vision, and edge alerts.",
        image: "/projects/p2.png",
        link: "#",
        problem:
            "Driver fatigue and distraction cause thousands of accidents annually. Existing solutions are either too expensive for mass adoption or lack real-time alerting capabilities.",
        solution:
            "Designed a modular system using ESP32-S3 for secure ignition (fingerprint + BLE), real-time drowsiness detection via OpenCV, and a Flask/FastAPI backend with PostgreSQL for logging, GPS-based alerts, and a live dashboard.",
        techStack: ["ESP32-S3", "OpenCV", "Flask", "FastAPI", "PostgreSQL", "Python", "BLE", "GPS"],
        impact: [
            { metric: "<200ms", label: "Detection latency" },
            { metric: "Real-time", label: "Alert delivery" },
            { metric: "3-layer", label: "Security (fingerprint + BLE + pin)" },
            { metric: "Live", label: "Dashboard & analytics" },
        ],
        architecture: {
            layers: [
                {
                    label: "Input Layer",
                    nodes: [
                        { id: "camera", label: "Camera\nFeed", icon: "camera" },
                        { id: "fingerprint", label: "Fingerprint\nScanner", icon: "shield" },
                        { id: "ble", label: "BLE\nModule", icon: "chip" },
                    ],
                },
                {
                    label: "Detection Layer",
                    nodes: [
                        { id: "opencv", label: "OpenCV\n+ dlib", icon: "eye" },
                        { id: "drowsiness", label: "Drowsiness\nModel", icon: "cpu" },
                    ],
                },
                {
                    label: "Backend Layer",
                    nodes: [
                        { id: "flask", label: "Flask /\nFastAPI", icon: "server" },
                        { id: "auth", label: "Auth\nService", icon: "shield" },
                    ],
                },
                {
                    label: "Data & IoT Layer",
                    nodes: [
                        { id: "postgres", label: "PostgreSQL", icon: "database" },
                        { id: "esp32", label: "ESP32-S3", icon: "chip" },
                        { id: "gps", label: "GPS\nModule", icon: "monitor" },
                    ],
                },
                {
                    label: "Alert & Client Layer",
                    nodes: [
                        { id: "audio", label: "Audio\nAlert", icon: "alert" },
                        { id: "led", label: "LED\nIndicator", icon: "alert" },
                        { id: "dashboard", label: "Web\nDashboard", icon: "monitor" },
                    ],
                },
            ],
        },
    },
];


// ===========================================
// TESTIMONIALS
// ===========================================
export const testimonials = [
    {
        id: 1,
        quote: "An exceptional developer who brings both technical expertise and creative vision to every project. Their attention to detail and commitment to quality is outstanding.",
        name: "John Doe",
        role: "Engineering Manager",
        company: "Tech Corp",
        avatar: "", // Add avatar image path or leave empty for initial
    },
    {
        id: 2,
        quote: "Working with them was a pleasure. They delivered ahead of schedule and the quality of work exceeded our expectations. Highly recommended!",
        name: "Jane Smith",
        role: "Product Designer",
        company: "Design Studio",
        avatar: "",
    },
    {
        id: 3,
        quote: "Their ability to translate complex requirements into elegant, user-friendly solutions is remarkable. A true professional in every sense.",
        name: "Mike Johnson",
        role: "CEO",
        company: "Startup Inc",
        avatar: "",
    },
];

// ===========================================
// SEO METADATA
// ===========================================
export const seoConfig = {
    title: `${siteConfig.name} - ${siteConfig.roles[0]}`,
    description: siteConfig.aboutDescription,
    keywords: [
        siteConfig.name,
        ...siteConfig.roles,
        "Portfolio",
        "Web Developer",
        "Designer",
    ],
};
