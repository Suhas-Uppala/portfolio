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

I'm an AI/ML Enthusiast  
B.Tech in Computer Science & Engineering (AIML) at 
VNR Vignana Jyothi Institute of Engineering and Technology.

My expertise spans:
• Machine Learning & Deep Learning
• Computer Vision & NLP
• Full-Stack Web Development (MERN, Flask, FastAPI)
• Data Visualization & Analytics

Currently focused on developing AI-powered solutions and 
contributing to hackathons and open-source projects.

Winner of GDGC Solution Challenge 2025 and 
Finalist at Smart India Hackathon 2024 & 2025.`
    },
    {
      name: 'education.txt',
      type: 'file',
      path: '/education.txt',
      content: `=== EDUCATION ===

[2022 - 2026]
B.Tech. in Computer Science and Engineering (AIML)
VNR VIGNANA JYOTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY
• CGPA: 8.45/10
• Relevant Coursework: Machine Learning, Data Structures,
  Algorithms, Database Systems, AI/ML

[2020 - 2022]
Intermediate (12th Grade)
SRI CHAITANYA JUNIOR COLLEGE, Telangana
• Percentage: 95.8%
• Stream: MPC (Mathematics, Physics, Chemistry)

[2019 - 2020]
High School (10th Grade)
SRI CHAITANYA TECHNO SCHOOL, Telangana
• CGPA: 10.00/10`
    },
    {
      name: 'experience.txt',
      type: 'file',
      path: '/experience.txt',
      content: `=== EXPERIENCE ===

[Oct 2024 - Dec 2024]
Full Stack Developer Intern
BIO CLINPHARM PVT LTD
• Worked on company website focusing on functionality, 
  user experience, and data handling
• Strengthened full stack development skills
• Gained hands-on exposure to real-world applications

[2024 - Present]
Superior Non-Technical Head
CSI STUDENT CHAPTER, VNR VJIET
• Led non-technical operations for 1000+ members
• Coordinating events and managing cross-team collaboration

[2024 - Present]
Superior Design Head
KRITHOMEDH (AIML CLUB)
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
Python        ████████████████████ 95%
JavaScript    ████████████████░░░░ 85%
C/C++         ████████████████░░░░ 80%
SQL           ████████████████░░░░ 80%

[Frameworks & Libraries]
Flask, FastAPI, MERN Stack
Flutter, Streamlit
TensorFlow, Scikit-learn
OpenCV, LangChain

[Data Visualization]
Power BI, Tableau, R Studio

[Databases]
MySQL, MongoDB, SQLite, PostgreSQL

[Tools & Platforms]
Git, GitHub, Docker
Power BI, Twilio

[Operating Systems]
Windows, Linux

[AI/ML Specializations]
• Computer Vision (OpenCV)
• Deep Learning (TensorFlow)
• RAG & GenAI (LangChain, Gemini)
• Machine Learning (Scikit-learn)`
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
          name: 'optideliver.txt',
          type: 'file',
          path: '/projects/optideliver.txt',
          content: `=== OPTIDELIVER - AI DELIVERY OPTIMIZATION SYSTEM ===

An AI-powered logistics solution for India Post that optimizes 
delivery routes and time slots for 1,000+ daily shipments.

[Technologies]
• TensorFlow, Scikit-learn
• Twilio, Flask, React.js
• MongoDB

[Features]
• Optimizes delivery routes and time slots
• Reduces delivery times and fuel consumption
• React-based sender interface for order creation
• Live tracking and delivery status notifications
• Twilio SMS alerts integration
• Scalable backend services for seamless delivery tracking

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_OPTIDELIVER_GITHUB}`
        },
        {
          name: 'sportai.txt',
          type: 'file',
          path: '/projects/sportai.txt',
          content: `=== SPORTAI - AI ATHLETE MANAGEMENT PLATFORM ===

Winner of GDGC Solution Challenge 2025!
Real-time motion and biometric analysis platform for athletes.

[Technologies]
• Flutter, OpenCV, RAG
• Scikit-learn, PostgreSQL, GenAI
• FastAPI, LangChain, Gemini API

[Features]
• Real-time motion and biometric analysis
• ML-based injury risk detection models
• Fatigue and strain signals analysis for proactive injury prevention
• AI-driven coaching insights
• Personalized training plans and recovery suggestions

[Awards]
🏆 Winner, GDGC Solution Challenge 2025

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_SPORTAI_GITHUB}`
        },
        {
          name: 'books-hub.txt',
          type: 'file',
          path: '/projects/books-hub.txt',
          content: `=== BOOKS HUB - LIBRARY MANAGER ===

A full-stack digital library system for book cataloging, 
borrowing, and returns through a clean web interface.

[Technologies]
• MERN Stack (MongoDB, Express.js, React.js, Node.js)

[Features]
• Book cataloging, borrowing, and returns management
• Clean and intuitive web interface
• Role-based authentication (RBAC)
• User data and control access for librarians and readers
• Responsive, scalable UI/UX
• Seamless usage across devices
• Future feature extensions support

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_BOOKSHUB_GITHUB}`
        },
        {
          name: 'anomaly-detection.txt',
          type: 'file',
          path: '/projects/anomaly-detection.txt',
          content: `=== ANOMALY DETECTION IN CCTV FOOTAGE ===

Deep learning-based system to analyze CCTV footage 
and flag suspicious activity in real-time.

[Technologies]
• TensorFlow, Flask, OpenCV
• Twilio, Geolocator, Scikit-learn

[Features]
• LRCN-based deep learning system
• Real-time CCTV footage analysis
• Flask-based interface and REST APIs
• Upload footage, run inference, view anomaly reports
• Twilio alerts for incident notifications
• Date-wise anomaly logs for streamlined monitoring

[Links]
GitHub: ${process.env.NEXT_PUBLIC_PROJECT_ANOMALY_GITHUB}`
        },
        {
          name: 'postal-logistics-research.txt',
          type: 'file',
          path: '/projects/postal-logistics-research.txt',
          content: `=== AI-POWERED POSTAL LOGISTICS RESEARCH ===

Research project: Optimizing Deliveries with Customized Time Slots

[Technologies]
• Random Forest, XGBoost
• KMeans++ Clustering
• Google Maps API

[Research Contributions]
• Analyzed supervised ML models to predict optimal delivery 
  time slots and increase successful deliveries
• Applied KMeans++ clustering and Google Maps API for 
  dynamic route optimization
• Enabled efficient courier assignment and reduced travel distance
• Integrated real-world delivery and traffic data
• Quantified time and fuel savings while improving customer experience

[Status]
📝 Active Research Work`
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

🥈 [2024] 2nd Place, Project Expo at Convergence
   AI-powered solution with strong real-world impact

🥉 [2023] 3rd Place, VJ Hackathon
   Innovative AI-driven solution

🏅 [2024] 3rd Position, NxtWave Coding Challenge
   Among 3,000 participants

📜 [2024] Consolation Prize, Paper Presentation
   Convergence - Impactful research contribution

⭐ [2024] Finalist, Smart India Hackathon
   Top 2.4% among 13,000+ participants
   Ministry of Communication problem statement

⭐ [2025] Finalist, Smart India Hackathon
   Selected among national finalists for ministry-level problem

🎓 [2024 & 2025] Amazon ML Summer School
   Selected for advanced exposure to applied ML and industry practices`
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
       Score: 85%

[2024] Tableau Certification
       Internshala

[2024] Python Certification
       NxtWave

[2024] Introduction to Databases
       NxtWave

[2024] Developer Foundations
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

I'm ${process.env.NEXT_PUBLIC_NAME}, an AI/ML Enthusiast and Full-Stack Developer
pursuing B.Tech in CSE (AIML) at ${process.env.NEXT_PUBLIC_COLLEGE_SHORT}, ${process.env.NEXT_PUBLIC_LOCATION?.split(',')[0]}.

🏆 Winner - GDGC Solution Challenge 2025
⭐ Finalist - Smart India Hackathon 2024 & 2025
🎓 Amazon ML Summer School 2024 & 2025

## Contact

Email: ${process.env.NEXT_PUBLIC_EMAIL}
LinkedIn: ${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME ? `linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}` : ''}
GitHub: ${process.env.NEXT_PUBLIC_GITHUB_USERNAME ? `github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}` : ''}

---
Built with ❤️ using Next.js & TypeScript`
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
