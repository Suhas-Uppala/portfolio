export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileNode[];
}

export const fileSystem: FileNode = {
  name: process.env.NEXT_PUBLIC_NAME || 'Portfolio',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'about.txt',
      type: 'file',
      path: '/about.txt',
      content: `=== ABOUT ME ===

Name: ${process.env.NEXT_PUBLIC_NAME}
Location: ${process.env.NEXT_PUBLIC_LOCATION}
Email: ${process.env.NEXT_PUBLIC_EMAIL}
Phone: ${process.env.NEXT_PUBLIC_PHONE}

I'm an AI/ML Engineer  
B.Tech in Computer Science & Engineering (AIML) at 
VNR Vignana Jyothi Institute of Engineering and Technology.
CGPA: 8.60

My expertise spans:
• Machine Learning & Deep Learning (PyTorch, YOLO, NLP)
• Computer Vision (OpenCV, Ultralytics)
• Generative AI & RAG (LangChain)
• Full-Stack Development (Flask, MERN, Flutter, Streamlit)
• Data Visualization (Power BI, Tableau, R Studio)

Currently focused on developing AI-powered solutions,
edge AI deployment, and contributing to hackathons 
and research publications.

Winner of GDGC Solution Challenge 2025 and 
Finalist at Smart India Hackathon 2024 & 2025.
Selected for Amazon ML Summer School 2024 & 2025.`
    },
    {
      name: 'education.txt',
      type: 'file',
      path: '/education.txt',
      content: `=== EDUCATION ===

[2022 - 2026]
B.Tech. in Computer Science and Engineering (AIML)
VNR VIGNANA JYOTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY
• CGPA: 8.60/10
• Relevant Coursework: Machine Learning, Data Structures,
  Algorithms, Database Systems, AI/ML, Computer Vision

[2022 - 2026]
CCBP 4.0 BY NxT Wave
• Full-stack development and database certifications
• Developer Foundations & Intro to Databases`
    },
    {
      name: 'experience.txt',
      type: 'file',
      path: '/experience.txt',
      content: `=== ROLES & RESPONSIBILITIES ===

[Jun 2024 - Present]
Superior Non-Technical Head
CSI STUDENT CHAPTER (COMPUTER SOCIETY OF INDIA), VNR VJIET
• Led non-technical operations for 1000+ members
• Coordinating events and managing cross-team collaboration

[Aug 2024 - Present]
Superior Design Head
KRITHOMEDH (AIML CLUB), VNR VJIET
• Managed design and branding for 300+ member AIML club
• Supporting events and technical activities through 
  visual communication`
    },
    {
      name: 'skills.txt',
      type: 'file',
      path: '/skills.txt',
      content: `=== TECHNICAL SKILLS ===

[Programming Languages]
• Python
• C++
• C
• SQL
• R

[Frameworks & Libraries]
• Flask
• MERN Stack
• Flutter
• Streamlit

[AI/ML Technologies]
• PyTorch
• OpenCV
• Gen AI
• RAG
• YOLO
• NLP

[Data Visualization]
• Power BI
• Tableau
• R Studio

[Databases]
• MySQL
• MongoDB
• SQLite

[Tools & Platforms]
• GitHub
• Docker
• Windows
• Linux`
    },
    {
      name: 'contact.txt',
      type: 'file',
      path: '/contact.txt',
      content: `=== CONTACT INFORMATION ===

📧 Email: ${process.env.NEXT_PUBLIC_EMAIL}
📱 Phone: ${process.env.NEXT_PUBLIC_PHONE}
📍 Location: ${process.env.NEXT_PUBLIC_LOCATION}, India

🔗 LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GitHub      : ${process.env.NEXT_PUBLIC_GITHUB_USERNAME ? `github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}` : ''}
LinkedIn    : ${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME ? `linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}` : ''}

Feel free to reach out for collaborations, 
opportunities, or just a chat about tech!`
    },
    {
      name: 'projects',
      type: 'folder',
      path: '/projects',
      children: [
        {
          name: 'cctv-threat-detection.txt',
          type: 'file',
          path: '/projects/cctv-threat-detection.txt',
          content: `=== REAL-TIME CCTV THREAT DETECTION ===

Intelligent CCTV surveillance system with a web dashboard 
for real-time fight and weapon detection, triggering 
immediate SMS and voice alerts for rapid incident response.

[Technologies]
• Ultralytics, OpenCV
• Jetson Orin NX, Flask

[Features]
• YOLOv11-based weapon detection with real-time inference
• 3D CNN with sliding-window spatio-temporal analysis for fight detection
• Web dashboard for monitoring and alert management
• Immediate SMS and voice alerts for rapid incident response
• Edge AI inference on Jetson Orin NX for low-latency processing

[Research]
📝 Published Patent and research paper
• "AI on the Edge: A Survey of Threat Detection Systems 
   for Smart CCTV Cameras"
• Accepted at ICACECS 2026 (Scopus Indexed Springer Series)

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_CCTV_GITHUB || 'https://github.com/Suhas-Uppala/Real-time_Monitoring_of_CCTV_for_Threat_Detection'}`
        },
        {
          name: 'optideliver.txt',
          type: 'file',
          path: '/projects/optideliver.txt',
          content: `=== OPTIDELIVER - AI DELIVERY OPTIMIZATION SYSTEM ===

A delivery scheduling engine that predicts suitable time 
slots for customers using historical delivery patterns 
and user profiles. Implements route optimization and 
clustering to reduce travel distance and resource wastage.

[Technologies]
• Scikit-learn, Twilio
• Flask, MongoDB, Next.js

[Features]
• Predicts suitable delivery time slots using historical patterns
• Route optimization and clustering for reduced travel distance
• Modular Python backend services for slot prediction and route planning
• Notification system for delivery updates via Twilio
• Easy scaling and integration with postal workflows

[Research]
📝 Research Paper: OptiDeliver: An AI-driven System to 
   Modernise Last-Mile Delivery Systems
• Presented at IGNITE-2026 (IEEE Conference), 
  KJ College of Engineering

[Awards]
🏅 Smart India Hackathon 2024 Finalist
• Top 5 teams of 13,000+ nationwide

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_OPTIDELIVER_GITHUB}`
        },
        {
          name: 'sportai.txt',
          type: 'file',
          path: '/projects/sportai.txt',
          content: `=== SPORTAI - AI ATHLETE MANAGEMENT PLATFORM ===

Winner of GDGC Solution Challenge 2025!
A live exercise monitoring system that tracks athlete 
posture in real time, counts exercise sets, and stores 
workout activity for performance analysis.

[Technologies]
• Flutter, OpenCV, RAG
• LangChain, SQL

[Features]
• Live exercise monitoring with real-time posture tracking
• Exercise set counting and workout activity storage
• RAG-based coach assistant with personalized guidance
• Uses athlete health data and training history for insights
• Risk score prediction using Random Forest on athlete vitals
• Automated daily suggestion emails through Gmail

[Awards]
🏆 Winner, GDGC Solution Challenge 2025

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_SPORTAI_GITHUB}`
        },
        {
          name: 'digipraman.txt',
          type: 'file',
          path: '/projects/digipraman.txt',
          content: `=== DIGIPRAMAN - LOAN VERIFICATION & FRAUD DETECTION ===

A multi-layer fraud detection platform (VIDYA AI) for 
automated loan evidence verification and risk assessment.

[Technologies]
• Flutter, YOLOv8, XGBoost
• FastAPI, PostgreSQL, React

[Features]
• VIDYA AI: Multi-layer fraud detection service
• YOLOv8 + Google Cloud Vision OCR for document analysis
• Perceptual hashing for image integrity verification
• XGBoost risk model for auto-triaging loan evidence
• Three-tier system: approve, review, or video-verify
• Full-stack loan management with FastAPI/PostgreSQL
• React risk dashboard for administrators
• Flutter app with geolocation, 2FA, and speech-to-text
• Designed for field officers in remote areas

[Awards]
🏅 Smart India Hackathon 2025 Finalist
• Top 5 teams of 13,000+ nationwide

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_DIGIPRAMAN_GITHUB || 'https://github.com/Suhas-Uppala/DigiPraman'}`
        }
      ]
    },
    {
      name: 'achievements.txt',
      type: 'file',
      path: '/achievements.txt',
      content: `=== ACHIEVEMENTS ===

🏆 [2025] Winner, GDGC Solution Challenge
   Developed SportAI using RAG, ML, OpenCV, and Flutter

⭐ [2024 & 2025] Amazon ML Summer School
   Selected for advanced machine learning program

🏅 [2024 & 2025] Finalist, Smart India Hackathon
   Top 5 teams of 13,000+ nationwide
   Developed OptiDeliver (2024) & DigiPraman (2025)

🥈 [2025] 2nd Prize, Project Contest at Convergence 2025
   AI-powered solution with strong real-world impact

📜 [2025] Consolation Prize, Paper Presentation
   Convergence 2025 - Impactful research contribution

🥉 [2025] 3rd Place, Project Expo
   Among 100+ teams, Dept. of CSE-AIML & IoT, VNRVJIET`
    },
    {
      name: 'certifications.txt',
      type: 'file',
      path: '/certifications.txt',
      content: `=== CERTIFICATIONS ===

[2025] Oracle OCI 2025 Certified AI Foundations Associate
       Oracle

[2025] Amazon ML Summer School 2025
       Amazon

[2024] Introduction to IoT - NPTEL
       NPTEL Certification

[2024] Coder - Smart Interviews
       Global Rank

[2024] Introduction to Databases (CCBP 4.0)
       NxtWave

[2024] Developer Foundations (CCBP 4.0)
       NxtWave`
    },
    {
      name: 'README.md',
      type: 'file',
      path: '/README.md',
      content: `# Welcome to My Terminal Portfolio! 🚀

## Quick Navigation

Use terminal commands to explore:

  ls          - List files and folders
  cd [folder] - Change directory
  cat [file]  - View file contents
  tree        - Show directory structure
  clear       - Clear terminal
  help        - Show all commands

## About Me

I'm ${process.env.NEXT_PUBLIC_NAME}, an AI/ML Engineer and Full-Stack Developer
pursuing B.Tech in CSE (AIML) at ${process.env.NEXT_PUBLIC_COLLEGE_SHORT}, ${process.env.NEXT_PUBLIC_LOCATION?.split(',')[0]}.

🏆 Winner - GDGC Solution Challenge 2025
⭐ Finalist - Smart India Hackathon 2024 & 2025
🎓 Amazon ML Summer School 2024 & 2025
📝 Published Patent & Research Papers

## Contact

Email: ${process.env.NEXT_PUBLIC_EMAIL}
LinkedIn: ${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME ? `linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}` : ''}
GitHub: ${process.env.NEXT_PUBLIC_GITHUB_USERNAME ? `github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}` : ''}

`
    }
  ]
};

export function findNode(path: string): FileNode | null {
  const parts = path.split('/').filter(Boolean);
  let current: FileNode = fileSystem;
  
  for (const part of parts) {
    if (current.type !== 'folder' || !current.children) return null;
    const found = current.children.find(c => c.name === part);
    if (!found) return null;
    current = found;
  }
  
  return current;
}

export function getParentPath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  parts.pop();
  return '/' + parts.join('/');
}
