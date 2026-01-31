export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileNode[];
}

export const fileSystem: FileNode = {
  name: 'Suhas Uppala',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'about.txt',
      type: 'file',
      path: '/about.txt',
      content: `=== ABOUT ME ===

Name: Suhas Uppala
Location: Hyderabad, Telangana
Email: suhasuppala1805@gmail.com
Phone: +91-7989665270

I'm an AI/ML Enthusiast and Full-Stack Developer with a passion for 
building intelligent applications that solve real-world problems.

My expertise spans:
• Machine Learning & Deep Learning
• Computer Vision & NLP
• Full-Stack Web Development
• Cloud Architecture & DevOps

Currently focused on developing scalable AI solutions and 
contributing to open-source projects.`
    },
    {
      name: 'education.txt',
      type: 'file',
      path: '/education.txt',
      content: `=== EDUCATION ===

[2021 - 2025]
Bachelor of Technology in Computer Science
KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY, Hyderabad
• CGPA: 8.5/10
• Relevant Coursework: Machine Learning, Data Structures,
  Algorithms, Database Systems, Cloud Computing

[2019 - 2021]
Intermediate (12th Grade)
• Mathematics, Physics, Chemistry
• Percentage: 95%`
    },
    {
      name: 'experience.txt',
      type: 'file',
      path: '/experience.txt',
      content: `=== EXPERIENCE ===

[Jun 2024 - Present]
Machine Learning Engineer Intern
TECH STARTUP, Remote
• Developed ML models for predictive analytics
• Improved model accuracy by 25% using ensemble methods
• Built REST APIs for model deployment

[Jan 2024 - May 2024]
Full Stack Developer Intern
SOFTWARE COMPANY, Hyderabad
• Built responsive web applications using React/Next.js
• Implemented authentication & authorization systems
• Optimized database queries for better performance`
    },
    {
      name: 'skills.txt',
      type: 'file',
      path: '/skills.txt',
      content: `=== TECHNICAL SKILLS ===

[Programming Languages]
Python    ████████████████████ 95%
JavaScript/TypeScript ████████████████░░░░ 85%
Java      ████████████░░░░░░░░ 70%
C++       ██████████░░░░░░░░░░ 60%

[Frameworks & Libraries]
TensorFlow, PyTorch, Keras
React, Next.js, Node.js
Express, FastAPI, Flask

[Tools & Platforms]
Git, Docker, Kubernetes
AWS, GCP, Vercel
PostgreSQL, MongoDB, Redis

[AI/ML Specializations]
• Computer Vision
• Natural Language Processing
• Deep Learning
• Reinforcement Learning`
    },
    {
      name: 'contact.txt',
      type: 'file',
      path: '/contact.txt',
      content: `=== CONTACT INFORMATION ===

📧 Email: suhasuppala1805@gmail.com
📱 Phone: +91-7989665270
📍 Location: Hyderabad, Telangana, India

🔗 LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GitHub      : github.com/suhasuppala
LinkedIn    : linkedin.com/in/suhasuppala
Portfolio   : suhasuppala.dev
Twitter     : twitter.com/suhasuppala

Feel free to reach out for collaborations, 
opportunities, or just a chat about tech!`
    },
    {
      name: 'projects',
      type: 'folder',
      path: '/projects',
      children: [
        {
          name: 'water-quality.txt',
          type: 'file',
          path: '/projects/water-quality.txt',
          content: `=== WATER QUALITY ANALYSIS ===

A machine learning system for predicting water potability
using various physicochemical parameters.

[Technologies]
• Python, Scikit-learn, Pandas
• TensorFlow for deep learning models
• Flask for API deployment
• Docker for containerization

[Features]
• Multi-parameter water quality assessment
• Real-time prediction API
• Interactive visualization dashboard
• 94% accuracy on test dataset

[Links]
GitHub: github.com/suhasuppala/water-quality
Demo: water-quality.vercel.app`
        },
        {
          name: 'violence-detection.txt',
          type: 'file',
          path: '/projects/violence-detection.txt',
          content: `=== VIOLENCE DETECTION SYSTEM ===

Deep learning-based real-time violence detection 
in video surveillance feeds.

[Technologies]
• Python, PyTorch, OpenCV
• LSTM + CNN Architecture
• FastAPI for backend
• React for dashboard

[Features]
• Real-time video analysis
• Alert notification system
• 97% detection accuracy
• Low latency processing (<100ms)

[Links]
GitHub: github.com/suhasuppala/violence-detection
Paper: arxiv.org/...`
        },
        {
          name: 'portfolio.txt',
          type: 'file',
          path: '/projects/portfolio.txt',
          content: `=== TERMINAL PORTFOLIO ===

A unique terminal-themed portfolio website with 
interactive file system navigation.

[Technologies]
• Next.js 14, TypeScript
• Tailwind CSS
• Framer Motion animations
• Lucide React icons

[Features]
• Terminal emulator with commands
• File tree navigation
• Resizable split panels
• Animated backgrounds
• Fully responsive design

[Links]
Live: suhasuppala.dev
GitHub: github.com/suhasuppala/portfolio`
        },
        {
          name: 'chatbot.txt',
          type: 'file',
          path: '/projects/chatbot.txt',
          content: `=== AI CHATBOT ===

An intelligent conversational AI powered by 
large language models.

[Technologies]
• Python, LangChain
• OpenAI GPT API
• Vector databases (Pinecone)
• Streamlit for UI

[Features]
• Context-aware conversations
• Document Q&A capability
• Multi-language support
• Custom knowledge base integration

[Links]
GitHub: github.com/suhasuppala/ai-chatbot
Demo: chatbot.suhasuppala.dev`
        }
      ]
    },
    {
      name: 'certifications.txt',
      type: 'file',
      path: '/certifications.txt',
      content: `=== CERTIFICATIONS ===

[2024] AWS Certified Machine Learning - Specialty
       Amazon Web Services

[2024] TensorFlow Developer Certificate
       Google

[2023] Deep Learning Specialization
       Coursera (DeepLearning.AI)

[2023] Full Stack Web Development
       Udemy

[2022] Python for Data Science
       IBM`
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

## About This Portfolio

This is an interactive terminal-themed portfolio.
Navigate through my projects, skills, and experience
using familiar command-line interfaces.

## Contact

Email: suhasuppala1805@gmail.com
LinkedIn: linkedin.com/in/suhasuppala
GitHub: github.com/suhasuppala

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
