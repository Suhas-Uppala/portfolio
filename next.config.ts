import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_NAME: process.env.NEXT_PUBLIC_NAME || "Suhas Uppala",
    NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE || "AI/ML Engineer & Full-Stack Developer",
    NEXT_PUBLIC_TAGLINE: process.env.NEXT_PUBLIC_TAGLINE || "AI/ML Engineer · Full‑Stack Developer",
    NEXT_PUBLIC_LOCATION: process.env.NEXT_PUBLIC_LOCATION || "Hyderabad, Telangana",
    NEXT_PUBLIC_LOCATION_SHORT: process.env.NEXT_PUBLIC_LOCATION_SHORT || "Hyderabad, India",
    NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE || "+91-79896 65270",
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || "suhasuppala1805@gmail.com",
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/suhas-uppala",
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "suhas-uppala",
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/Suhas-Uppala",
    NEXT_PUBLIC_LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || "Suhas-Uppala",
    NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE || "Suhas Uppala | Portfolio",
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "AI/ML Enthusiast & Full-Stack Developer - Interactive Terminal Portfolio",
    NEXT_PUBLIC_SITE_KEYWORDS: process.env.NEXT_PUBLIC_SITE_KEYWORDS || "portfolio,AI,ML,developer,full-stack,Suhas Uppala",
    NEXT_PUBLIC_TERMINAL_USER: process.env.NEXT_PUBLIC_TERMINAL_USER || "suhas",
    NEXT_PUBLIC_TERMINAL_HOST: process.env.NEXT_PUBLIC_TERMINAL_HOST || "portfolio",
    NEXT_PUBLIC_RESUME_URL: process.env.NEXT_PUBLIC_RESUME_URL || "/Suhas_Uppala_Resume.pdf",
    NEXT_PUBLIC_COLLEGE: process.env.NEXT_PUBLIC_COLLEGE || "VNR VIGNANA JYOTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    NEXT_PUBLIC_COLLEGE_SHORT: process.env.NEXT_PUBLIC_COLLEGE_SHORT || "VNR VJIET",
    NEXT_PUBLIC_DEGREE: process.env.NEXT_PUBLIC_DEGREE || "B.Tech. in Computer Science and Engineering (AIML)",
    NEXT_PUBLIC_COLLEGE_YEARS: process.env.NEXT_PUBLIC_COLLEGE_YEARS || "2022 - 2026",
    NEXT_PUBLIC_CGPA: process.env.NEXT_PUBLIC_CGPA || "8.60/10",
    NEXT_PUBLIC_PROJECT_OPTIDELIVER_GITHUB: process.env.NEXT_PUBLIC_PROJECT_OPTIDELIVER_GITHUB || "https://github.com/Suhas-Uppala/Optideliver-AI-Powered-Delivery-Optimization-System",
    NEXT_PUBLIC_PROJECT_SPORTAI_GITHUB: process.env.NEXT_PUBLIC_PROJECT_SPORTAI_GITHUB || "https://github.com/Suhas-Uppala/Sport-AI",
    NEXT_PUBLIC_PROJECT_CCTV_GITHUB: process.env.NEXT_PUBLIC_PROJECT_CCTV_GITHUB || "https://github.com/Suhas-Uppala/Real-time_Monitoring_of_CCTV_for_Threat_Detection",
    NEXT_PUBLIC_PROJECT_DIGIPRAMAN_GITHUB: process.env.NEXT_PUBLIC_PROJECT_DIGIPRAMAN_GITHUB || "https://github.com/Suhas-Uppala/DigiPraman"
  }
};

export default nextConfig;
