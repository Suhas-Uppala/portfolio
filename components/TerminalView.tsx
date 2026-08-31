'use client';

import { useState, useRef, useEffect, FormEvent, MouseEvent, Fragment } from 'react';
import { fileSystem, FileNode, findNode, getParentPath } from '@/data/fileSystem';
import FileTree from './FileTree';
import TerminalShell from './TerminalShell';
import { ExternalLink, Cpu, Github, Database, Server, Smartphone, Brain, Code, Globe, MessageSquare, BarChart3, Layers, Box, Zap, Cloud, User, GraduationCap, Briefcase, Award, FileText, Mail, BookOpen, Trophy, Menu, X } from 'lucide-react';

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

// Tech icon mapping
const techIcons: { [key: string]: { icon: React.ReactNode; color: string } } = {
  'python': { icon: <Code size={20} />, color: '#3776AB' },
  'tensorflow': { icon: <Brain size={20} />, color: '#FF6F00' },
  'pytorch': { icon: <Zap size={20} />, color: '#EE4C2C' },
  'scikit-learn': { icon: <BarChart3 size={20} />, color: '#F7931E' },
  'flask': { icon: <Server size={20} />, color: '#000000' },
  'fastapi': { icon: <Zap size={20} />, color: '#009688' },
  'react': { icon: <Code size={20} />, color: '#61DAFB' },
  'react.js': { icon: <Code size={20} />, color: '#61DAFB' },
  'next.js': { icon: <Globe size={20} />, color: '#000000' },
  'node.js': { icon: <Server size={20} />, color: '#339933' },
  'express.js': { icon: <Server size={20} />, color: '#000000' },
  'mongodb': { icon: <Database size={20} />, color: '#47A248' },
  'postgresql': { icon: <Database size={20} />, color: '#4169E1' },
  'mysql': { icon: <Database size={20} />, color: '#4479A1' },
  'sql': { icon: <Database size={20} />, color: '#336791' },
  'docker': { icon: <Box size={20} />, color: '#2496ED' },
  'flutter': { icon: <Smartphone size={20} />, color: '#02569B' },
  'opencv': { icon: <Globe size={20} />, color: '#5C3EE8' },
  'ultralytics': { icon: <Cpu size={20} />, color: '#0080FF' },
  'yolov8': { icon: <Cpu size={20} />, color: '#FF6F61' },
  'yolov11': { icon: <Cpu size={20} />, color: '#FF6F61' },
  'jetson': { icon: <Cpu size={20} />, color: '#76B900' },
  'xgboost': { icon: <Zap size={20} />, color: '#FF4500' },
  'twilio': { icon: <MessageSquare size={20} />, color: '#F22F46' },
  'langchain': { icon: <Layers size={20} />, color: '#1C3C3C' },
  'gemini': { icon: <Brain size={20} />, color: '#8E75B2' },
  'rag': { icon: <Brain size={20} />, color: '#10B981' },
  'genai': { icon: <Brain size={20} />, color: '#8B5CF6' },
  'gen ai': { icon: <Brain size={20} />, color: '#8B5CF6' },
  'mern': { icon: <Layers size={20} />, color: '#00D8FF' },
  'streamlit': { icon: <Globe size={20} />, color: '#FF4B4B' },
  'aws': { icon: <Cloud size={20} />, color: '#FF9900' },
  'gcp': { icon: <Cloud size={20} />, color: '#4285F4' },
  'google cloud vision': { icon: <Cloud size={20} />, color: '#4285F4' },
  'random forest': { icon: <BarChart3 size={20} />, color: '#228B22' },
  'kmeans': { icon: <BarChart3 size={20} />, color: '#9370DB' },
  'google maps': { icon: <Globe size={20} />, color: '#4285F4' },
  'geolocator': { icon: <Globe size={20} />, color: '#34A853' },
  'yolo': { icon: <Cpu size={20} />, color: '#FF6F61' },
  'nlp': { icon: <MessageSquare size={20} />, color: '#6366F1' },
};


const TechIcon = ({ tech }: { tech: string }) => {
  const techLower = tech.toLowerCase().trim();
  const techInfo = Object.entries(techIcons).find(([key]) => techLower.includes(key));
  
  if (techInfo) {
    const [, { icon, color }] = techInfo;
    return (
      <div 
        className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 transition-all cursor-pointer"
        style={{ color }}
        title={tech}
      >
        {icon}
        {/* Tooltip */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          {tech}
        </span>
      </div>
    );
  }
  
  // Fallback for unknown techs
  return (
    <div 
      className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 transition-all cursor-pointer text-slate-400"
      title={tech}
    >
      <Code size={20} />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {tech}
      </span>
    </div>
  );
};

interface TerminalViewProps {
  onGoHome: () => void;
}

export default function TerminalView({ onGoHome }: TerminalViewProps) {
  const [cwd, setCwd] = useState('/');
  const [output, setOutput] = useState<string[]>([
    `Welcome to ${process.env.NEXT_PUBLIC_NAME?.split(' ')[0]}'s portfolio terminal.`,
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState('');
  const [panelWidth, setPanelWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Helper to find a file with flexible matching (with or without extension)
  const findFileFlexible = (filename: string): FileNode | null => {
    const currentDir = findNode(cwd);
    if (!currentDir || currentDir.type !== 'folder' || !currentDir.children) {
      return null;
    }

    // Try exact match first
    let filePath = filename.startsWith('/') 
      ? filename 
      : (cwd === '/' ? `/${filename}` : `${cwd}/${filename}`);
    
    let node = findNode(filePath);
    if (node) return node;

    // Try adding common extensions
    const extensions = ['.txt', '.md', '.json'];
    for (const ext of extensions) {
      const pathWithExt = filename.startsWith('/') 
        ? `${filename}${ext}` 
        : (cwd === '/' ? `/${filename}${ext}` : `${cwd}/${filename}${ext}`);
      node = findNode(pathWithExt);
      if (node) return node;
    }

    // Try matching by name without extension
    const matchingChild = currentDir.children.find(child => {
      const childNameWithoutExt = child.name.replace(/\.[^.]+$/, '');
      return childNameWithoutExt.toLowerCase() === filename.toLowerCase() ||
             child.name.toLowerCase() === filename.toLowerCase();
    });

    return matchingChild || null;
  };

  // Helper to find a folder with flexible matching
  const findFolderFlexible = (target: string): { node: FileNode; path: string } | null => {
    // Handle special cases
    if (target === '/' || target === '~' || target === 'portfolio' || target === '~/' ) {
      return { node: fileSystem, path: '/' };
    }

    if (target === '..') {
      const parentPath = getParentPath(cwd) || '/';
      const parentNode = findNode(parentPath);
      return parentNode ? { node: parentNode, path: parentPath } : null;
    }

    if (target === '.') {
      const currentNode = findNode(cwd);
      return currentNode ? { node: currentNode, path: cwd } : null;
    }

    // Try absolute path
    if (target.startsWith('/')) {
      const node = findNode(target);
      if (node && node.type === 'folder') {
        return { node, path: target };
      }
    }

    // Try relative path
    const relativePath = cwd === '/' ? `/${target}` : `${cwd}/${target}`;
    const relativeNode = findNode(relativePath);
    if (relativeNode && relativeNode.type === 'folder') {
      return { node: relativeNode, path: relativePath };
    }

    // Try matching folder by name in current directory
    const currentDir = findNode(cwd);
    if (currentDir && currentDir.type === 'folder' && currentDir.children) {
      const matchingFolder = currentDir.children.find(child => 
        child.type === 'folder' && 
        child.name.toLowerCase() === target.toLowerCase()
      );
      if (matchingFolder) {
        return { node: matchingFolder, path: matchingFolder.path };
      }
    }

    return null;
  };

  // Command implementations
  const helpCommand = (): string[] => [
    '',
    'Available commands:',
    '  help          - Show this help message',
    '  ls            - List files in current directory',
    '  cd <dir>      - Change directory (cd projects, cd .., cd /)',
    '  cat <file>    - Display file contents (works without extension)',
    '  tree          - Show directory structure',
    '  pwd           - Print working directory',
    '  clear         - Clear terminal',
    '  whoami        - Show current user',
    '  echo <text>   - Print text',
    '',
    'Tips:',
    '  - File extensions are optional (cat about = cat about.txt)',
    '  - Click files in the tree to view them',
    '',
  ];

  const lsCommand = (args: string): string[] => {
    let targetPath = cwd;
    let showDetails = false;

    // Parse arguments
    const parts = args.split(/\s+/).filter(Boolean);
    for (const part of parts) {
      if (part === '-l' || part === '-la' || part === '-al') {
        showDetails = true;
      } else if (!part.startsWith('-')) {
        targetPath = part.startsWith('/') ? part : (cwd === '/' ? `/${part}` : `${cwd}/${part}`);
      }
    }

    const node = findNode(targetPath);
    if (!node) {
      return [`ls: cannot access '${args}': No such file or directory`];
    }
    if (node.type !== 'folder' || !node.children) {
      // It's a file, just show its name
      return [node.name];
    }

    if (showDetails) {
      const items = node.children.map((c) => {
        const type = c.type === 'folder' ? 'd' : '-';
        const size = c.content ? c.content.length.toString().padStart(6) : '   --';
        const icon = c.type === 'folder' ? '📁' : '📄';
        return `${type}rw-r--r--  ${size}  ${icon} ${c.name}`;
      });
      return ['', `total ${node.children.length}`, ...items, ''];
    }

    const items = node.children.map((c) =>
      c.type === 'folder' ? `📁 ${c.name}/` : `📄 ${c.name}`
    );
    return ['', ...items, ''];
  };

  const cdCommand = (target: string): string[] => {
    if (!target || target === '~') {
      setCwd('/');
      return [];
    }

    const result = findFolderFlexible(target);
    if (!result) {
      // Check if they're trying to cd into a file
      const fileCheck = findFileFlexible(target);
      if (fileCheck && fileCheck.type === 'file') {
        return [`cd: ${target}: Not a directory`];
      }
      return [`cd: ${target}: No such file or directory`];
    }

    setCwd(result.path);
    return [];
  };

  const catCommand = (filename: string): string[] => {
    if (!filename) {
      return ['Usage: cat <filename>', '', 'Examples:', '  cat about', '  cat about.txt', '  cat README.md'];
    }

    const node = findFileFlexible(filename);
    if (!node) {
      return [`cat: ${filename}: No such file or directory`];
    }
    if (node.type === 'folder') {
      return [`cat: ${filename}: Is a directory`];
    }

    // Check if this is a project file (in /projects folder)
    const isProjectFile = node.path.includes('/projects/');
    
    if (isProjectFile) {
      // Extract project data for card display
      const content = node.content || '';
      const lines = content.split('\n');
      
      // Extract title
      const titleLine = lines.find(l => l.startsWith('===') && l.endsWith('==='));
      const title = titleLine ? titleLine.replace(/^===\s*/, '').replace(/\s*===$/, '') : node.name;
      
      // Extract GitHub link
      const githubLine = lines.find(l => l.toLowerCase().includes('github:') || l.includes('github.com'));
      let githubUrl = '';
      if (githubLine) {
        const match = githubLine.match(/github\.com\/[\w-]+\/[\w-]+/);
        if (match) {
          githubUrl = `https://${match[0]}`;
        }
      }
      
      // Get all content as JSON for the card
      return [`§PROJECT_CARD§${JSON.stringify({ title, content, githubUrl, filename: node.name })}`];
    }

    // For all other files, use a general file card format
    const content = node.content || '';
    const lines = content.split('\n');
    
    // Extract title from first header line
    const titleLine = lines.find(l => l.startsWith('===') && l.endsWith('==='));
    const title = titleLine 
      ? titleLine.replace(/^===\s*/, '').replace(/\s*===$/, '') 
      : node.name.replace(/\.[^.]+$/, '').toUpperCase();
    
    // Determine file type for icon
    const fileType = node.name.includes('about') ? 'about' :
                     node.name.includes('education') ? 'education' :
                     node.name.includes('experience') ? 'experience' :
                     node.name.includes('skills') ? 'skills' :
                     node.name.includes('contact') ? 'contact' :
                     node.name.includes('achievements') ? 'achievements' :
                     node.name.includes('certifications') ? 'certifications' :
                     node.name.includes('README') ? 'readme' : 'file';
    
    return [`§FILE_CARD§${JSON.stringify({ title, content, filename: node.name, fileType })}`];
  };

  const treeCommand = (node: FileNode = fileSystem, prefix: string = ''): string[] => {
    const lines: string[] = [];
    if (prefix === '') lines.push(node.name);

    if (node.children) {
      node.children.forEach((child, index) => {
        const isLast = index === node.children!.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const icon = child.type === 'folder' ? '📁 ' : '📄 ';
        lines.push(`${prefix}${connector}${icon}${child.name}`);

        if (child.type === 'folder' && child.children) {
          const newPrefix = prefix + (isLast ? '    ' : '│   ');
          lines.push(...treeCommand(child, newPrefix).slice(1));
        }
      });
    }
    return lines;
  };

  const pwdCommand = (): string[] => [cwd === '/' ? `/${process.env.NEXT_PUBLIC_NAME}` : `/${process.env.NEXT_PUBLIC_NAME}${cwd}`];

  const whoamiCommand = (): string[] => [process.env.NEXT_PUBLIC_TERMINAL_USER || 'user'];

  const echoCommand = (text: string): string[] => [text || ''];

  // Helper to get the prompt string
  const getPrompt = (path: string) => {
    const displayPath = path === '/' ? '~' : `~${path}`;
    return `${process.env.NEXT_PUBLIC_TERMINAL_USER}@${process.env.NEXT_PUBLIC_TERMINAL_HOST}:${displayPath}$`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(' ');

    // Capture current path before any cd command changes it
    const currentPrompt = getPrompt(cwd);

    let result: string[] = [];

    switch (cmd.toLowerCase()) {
      case 'help':
      case '?':
        result = helpCommand();
        break;
      case 'ls':
      case 'dir':
        result = lsCommand(arg);
        break;
      case 'cd':
        result = cdCommand(arg);
        break;
      case 'cat':
      case 'more':
      case 'less':
      case 'open':
        result = catCommand(arg);
        break;
      case 'tree':
        result = ['', ...treeCommand(), ''];
        break;
      case 'pwd':
        result = pwdCommand();
        break;
      case 'whoami':
        result = whoamiCommand();
        break;
      case 'echo':
        result = echoCommand(arg);
        break;
      case 'clear':
      case 'cls':
        setOutput([]);
        setInput('');
        return;
      case 'exit':
      case 'quit':
        onGoHome();
        return;
      default:
        result = [
          `${cmd}: command not found`,
          `Type 'help' for available commands.`
        ];
    }

    setOutput((prev) => [...prev, `${currentPrompt} ${trimmed}`, ...result]);
    setInput('');
  };

  const handleOpenFile = (node: FileNode) => {
    if (node.type === 'file') {
      const currentPrompt = getPrompt(cwd);
      // Use catCommand to get formatted output (same as typing cat command)
      const result = catCommand(node.name);
      setOutput((prev) => [...prev, `${currentPrompt} cat ${node.name}`, ...result]);
    } else if (node.type === 'folder') {
      const currentPrompt = getPrompt(cwd);
      setCwd(node.path);
      setOutput((prev) => [...prev, `${currentPrompt} cd ${node.name}`]);
    }
    // Close drawer on mobile after selecting a file
    if (isMobile) setDrawerOpen(false);
  };

  // Resize handlers
  const startResize = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = Math.max(150, Math.min(400, e.clientX - 16));
    setPanelWidth(newWidth);
  };

  const stopResize = () => {
    setIsDragging(false);
  };

  // File tree sidebar content (reused for both desktop and mobile drawer)
  const fileTreeContent = (
    <>
      {/* Fixed header showing current path */}
      <div className="shrink-0 px-2 py-2 border-b border-slate-800/50 bg-slate-900/50">
        <div className="flex items-center justify-between gap-1.5 text-emerald-400 font-medium text-sm">
          <div className="flex items-center gap-1.5 min-w-0">
            <span>📁</span>
            <span className="truncate">
              {cwd === '/' ? process.env.NEXT_PUBLIC_NAME : `${process.env.NEXT_PUBLIC_NAME}${cwd}`}
            </span>
          </div>
          {isMobile && (
            <button onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      {/* Scrollable file list */}
      <div className="flex-1 overflow-auto green-scroll p-2 min-h-0">
        <FileTree 
          tree={fileSystem} 
          onOpenFile={handleOpenFile} 
          showRoot={false} 
          currentPath={cwd}
        />
      </div>
    </>
  );

  // Shared rendered output — computed once, used in both mobile and desktop layouts
  const renderedOutput = (
    <div className="font-mono text-sm space-y-0.5">
      {output.map((line, i) => {
        // Handle PROJECT_CARD for project files
        if (line.startsWith('§PROJECT_CARD§')) {
          try {
            const data = JSON.parse(line.replace('§PROJECT_CARD§', ''));
            const { title, content, githubUrl } = data;
            const contentLines = content.split('\n');
            
            // Parse sections
            const sections: { [key: string]: string[] } = {};
            let currentSection = 'description';
            sections[currentSection] = [];
            
            contentLines.forEach((l: string) => {
              if (l.match(/^\[.+\]$/)) {
                currentSection = l.replace(/[\[\]]/g, '').toLowerCase();
                sections[currentSection] = [];
              } else if (l.startsWith('•') || l.startsWith('- ')) {
                sections[currentSection]?.push(l.replace(/^[•\-]\s*/, ''));
              } else if (l && !l.startsWith('===') && !l.includes('GitHub:') && !l.includes('github.com')) {
                sections[currentSection]?.push(l);
              }
            });

            return (
              <div key={i} className="my-4 stagger-fade-in">
                {/* Project Card */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-md card-glow card-accent-border relative overflow-hidden">
                  {/* Ambient background glow inside the card */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-emerald-400 flex-1">
                      {title}
                    </h3>
                    {/* Rotating Project Icon with Link */}
                    {githubUrl && (
                      <a 
                        href={githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1 sm:gap-2 shrink-0"
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/60 transition-all duration-300">
                          <Cpu 
                            size={24} 
                            className="text-emerald-400 group-hover:text-emerald-300 group-hover:animate-spin transition-colors sm:w-8 sm:h-8" 
                            style={{ animationDuration: '2s' }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                          <ExternalLink size={10} />
                          View
                        </span>
                      </a>
                    )}
                  </div>
                  
                  {/* Description */}
                  {sections.description?.filter(d => d.trim()).length > 0 && (
                    <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                      {sections.description.filter(d => d.trim()).join(' ')}
                    </p>
                  )}
                  
                  {/* Technologies */}
                  {sections.technologies?.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {sections.technologies.map((tech, idx) => (
                          <TechIcon key={idx} tech={tech} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Features or Research Contributions */}
                  {(sections.features?.length > 0 || sections['research contributions']?.length > 0) && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm mb-2">
                        {sections['research contributions']?.length > 0 ? 'Research Contributions' : 'Features'}
                      </h4>
                      <ul className="space-y-1">
                        {(sections.features || sections['research contributions'] || []).map((feature, idx) => (
                          <li key={idx} className="text-slate-300 text-xs sm:text-sm flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">›</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Research section */}
                  {sections.research?.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-blue-400 font-semibold text-xs sm:text-sm mb-2">📝 Research</h4>
                      <div className="space-y-1 pl-2">
                        {sections.research.map((item, idx) => (
                          <p key={idx} className="text-blue-300/80 text-xs sm:text-sm">{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Awards if any */}
                  {sections.awards?.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-yellow-400 font-semibold text-xs sm:text-sm mb-2">🏆 Awards</h4>
                      {sections.awards.map((award, idx) => (
                        <p key={idx} className="text-yellow-300/80 text-xs sm:text-sm">{award}</p>
                      ))}
                    </div>
                  )}
                  
                  {/* Status if any */}
                  {sections.status?.length > 0 && (
                    <div className="mb-2">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                        {sections.status.join(' ').replace(/📝\s*/, '')}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            );
          } catch {
            return <div key={i} className="text-red-400">Error parsing project data</div>;
          }
        }
        
        // Handle FILE_CARD for all other files
        if (line.startsWith('§FILE_CARD§')) {
          try {
            const data = JSON.parse(line.replace('§FILE_CARD§', ''));
            const { title, content, fileType } = data;
            const contentLines = content.split('\n').filter((l: string) => !l.startsWith('==='));
            
            // Get file type icon
            const getFileIcon = () => {
              switch(fileType) {
                case 'about': return <User size={28} className="text-emerald-400" />;
                case 'education': return <GraduationCap size={28} className="text-blue-400" />;
                case 'experience': return <Briefcase size={28} className="text-purple-400" />;
                case 'skills': return <Code size={28} className="text-cyan-400" />;
                case 'contact': return <Mail size={28} className="text-rose-400" />;
                case 'achievements': return <Trophy size={28} className="text-yellow-400" />;
                case 'certifications': return <Award size={28} className="text-orange-400" />;
                case 'readme': return <BookOpen size={28} className="text-emerald-400" />;
                default: return <FileText size={28} className="text-slate-400" />;
              }
            };
            
            // Parse content into sections
            const sections: { name: string; items: string[] }[] = [];
            let currentSection = { name: 'content', items: [] as string[] };
            
            contentLines.forEach((l: string) => {
              if (l.match(/^\[.+\]$/)) {
                if (currentSection.items.length > 0) sections.push(currentSection);
                currentSection = { name: l.replace(/[\[\]]/g, ''), items: [] };
              } else if (l.trim()) {
                currentSection.items.push(l);
              }
            });
            if (currentSection.items.length > 0) sections.push(currentSection);

            // Neural network animation component for About card
            const NeuralNetworkAnimation = () => {
              const orbitNodes = [
                { label: 'ML', color: '#10b981', delay: '0s', angle: 0 },
                { label: 'CV', color: '#3b82f6', delay: '0.5s', angle: 72 },
                { label: 'NLP', color: '#8b5cf6', delay: '1s', angle: 144 },
                { label: 'Web', color: '#06b6d4', delay: '1.5s', angle: 216 },
                { label: 'Data', color: '#f59e0b', delay: '2s', angle: 288 },
              ];

              return (
                <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
                  {/* Outer orbit ring */}
                  <div className="absolute w-56 h-56 rounded-full border border-slate-600/20 animate-orbit">
                    {orbitNodes.map((node, idx) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const x = Math.cos(rad) * 112;
                      const y = Math.sin(rad) * 112;
                      return (
                        <div
                          key={idx}
                          className="absolute animate-node-pulse"
                          style={{
                            left: `calc(50% + ${x}px - 16px)`,
                            top: `calc(50% + ${y}px - 16px)`,
                            color: node.color,
                            animationDelay: node.delay,
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border animate-orbit-reverse"
                            style={{
                              backgroundColor: `${node.color}15`,
                              borderColor: `${node.color}40`,
                              color: node.color,
                            }}
                          >
                            {node.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle orbit ring */}
                  <div className="absolute w-36 h-36 rounded-full border border-emerald-500/10 animate-orbit-reverse" />

                  {/* Inner orbit ring */}
                  <div className="absolute w-20 h-20 rounded-full border border-emerald-500/20 animate-orbit-slow" />

                  {/* Connection lines (SVG) */}
                  <svg className="absolute w-56 h-56 animate-connection-glow" viewBox="-112 -112 224 224">
                    {orbitNodes.map((node, idx) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const x = Math.cos(rad) * 112;
                      const y = Math.sin(rad) * 112;
                      return (
                        <line
                          key={idx}
                          x1="0" y1="0"
                          x2={x} y2={y}
                          stroke={node.color}
                          strokeWidth="0.5"
                          strokeDasharray="4 4"
                          style={{
                            animation: `dataFlow 2s linear infinite`,
                            animationDelay: node.delay,
                          }}
                        />
                      );
                    })}
                    {/* Cross connections */}
                    {orbitNodes.map((node, idx) => {
                      const nextNode = orbitNodes[(idx + 2) % orbitNodes.length];
                      const rad1 = (node.angle * Math.PI) / 180;
                      const rad2 = (nextNode.angle * Math.PI) / 180;
                      return (
                        <line
                          key={`cross-${idx}`}
                          x1={Math.cos(rad1) * 112}
                          y1={Math.sin(rad1) * 112}
                          x2={Math.cos(rad2) * 112}
                          y2={Math.sin(rad2) * 112}
                          stroke="rgba(100, 200, 180, 0.08)"
                          strokeWidth="0.5"
                        />
                      );
                    })}
                  </svg>

                  {/* Core center node */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center animate-core-glow animate-float">
                    <Brain size={28} className="text-emerald-400" />
                  </div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={`particle-${idx}`}
                      className="absolute w-1 h-1 rounded-full bg-emerald-400/40 animate-float"
                      style={{
                        left: `${20 + ((idx * 17) % 61)}%`,
                        top: `${20 + ((idx * 23) % 61)}%`,
                        animationDelay: `${idx * 0.7}s`,
                        animationDuration: `${3 + ((idx * 7) % 3)}s`,
                      }}
                    />
                  ))}
                </div>
              );
            };

            // Render content section helper
            const renderContentSections = (sections: { name: string; items: string[] }[]) => (
              <div className="space-y-3 sm:space-y-4">
                {sections.map((section, sIdx) => (
                  <div key={sIdx}>
                    {section.name !== 'content' && (
                      <h4 className="text-cyan-400 font-semibold text-xs sm:text-sm mb-2">{section.name}</h4>
                    )}
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => {
                        if (item.startsWith('•') || item.startsWith('- ')) {
                          return (
                            <div key={iIdx} className="text-slate-300 text-xs sm:text-sm flex items-start gap-2 pl-2">
                              <span className="text-emerald-500 mt-0.5">›</span>
                              <span>{item.replace(/^[•\-]\s*/, '')}</span>
                            </div>
                          );
                        }
                        if (item.match(/^[🏆🥈🥉🏅📜⭐🎓📧📱📍🔗]/)) {
                          return (
                            <div key={iIdx} className="text-slate-200 text-xs sm:text-sm py-1">{item}</div>
                          );
                        }
                        if (item.match(/████/)) {
                          const parts = item.split(/\s{2,}/);
                          const skillName = parts[0]?.trim() || '';
                          const percentMatch = item.match(/\d+%/);
                          const percentStr = percentMatch ? percentMatch[0] : '80%';
                          const percentValue = parseInt(percentStr) || 80;
                          return (
                            <div key={iIdx} className="space-y-1.5 my-3 max-w-md stagger-fade-in">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-300 font-semibold font-mono">{skillName}</span>
                                <span className="text-emerald-400 font-bold font-mono">{percentStr}</span>
                              </div>
                              <div className="h-2 w-full bg-slate-950/60 rounded-full overflow-hidden border border-slate-800/60 relative">
                                <div 
                                  className="h-full skill-bar-fill rounded-full" 
                                  style={{ 
                                    '--fill-width': `${percentValue}%`,
                                    width: `${percentValue}%` 
                                  } as React.CSSProperties} 
                                />
                              </div>
                            </div>
                          );
                        }
                        if (item.includes('github.com') || item.includes('linkedin.com') || item.includes('@')) {
                          return (
                            <div key={iIdx} className="text-blue-400 text-xs sm:text-sm hover:text-blue-300 break-all">{item}</div>
                          );
                        }
                        if (item.match(/^━+$/)) {
                          return <div key={iIdx} className="border-t border-slate-700/50 my-2" />;
                        }
                        return (
                          <div key={iIdx} className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item}</div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );

            // Skills card renders grouping in cards with chip badges (no percentages or bars)
            if (fileType === 'skills') {
              return (
                <div key={i} className="my-4 stagger-fade-in">
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-md card-glow card-accent-border relative overflow-hidden">
                    {/* Ambient background glow inside the card */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-700/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center">
                        {getFileIcon()}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-400">{title}</h3>
                    </div>
                    
                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {sections.map((section, sIdx) => {
                        // Skip default content section if empty
                        if (section.name === 'content' && section.items.length === 0) return null;
                        const sectionTitle = section.name === 'content' ? 'General' : section.name;
                        return (
                          <div key={sIdx} className="bg-slate-950/45 rounded-lg border border-slate-800/70 p-3 sm:p-4 hover:border-slate-700/50 transition-colors">
                            <h4 className="text-cyan-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                              {sectionTitle}
                            </h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {section.items.map((item, iIdx) => {
                                const cleanItem = item.replace(/^[•\-]\s*/, '').trim();
                                return (
                                  <div 
                                    key={iIdx} 
                                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-slate-300 hover:text-emerald-300 text-[10px] sm:text-xs font-mono flex items-center gap-1 sm:gap-1.5 hover:scale-[1.03] cursor-default"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
                                    {cleanItem}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            // About card uses two-column layout with animation
            if (fileType === 'about') {
              return (
                <div key={i} className="my-4 stagger-fade-in">
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-md card-glow card-accent-border relative overflow-hidden">
                    {/* Ambient background glow inside the card */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-700/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center">
                        {getFileIcon()}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-400">{title}</h3>
                    </div>
                    
                    {/* Two-column: Content + Animation */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 sm:gap-6">
                      {/* Left: Content */}
                      {renderContentSections(sections)}
                      
                      {/* Right: Neural Network Animation */}
                      <div className="hidden md:flex items-center justify-center">
                        <NeuralNetworkAnimation />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Experience card uses timeline
            if (fileType === 'experience') {
              // Parse experience entries from sections
              const experienceEntries: { period: string; role: string; company: string; details: string[] }[] = [];
              let currentEntry: { period: string; role: string; company: string; details: string[] } | null = null;

              sections.forEach(section => {
                if (section.name !== 'content') {
                  const items = section.items.filter(it => it.trim());
                  currentEntry = {
                    period: section.name,
                    role: items[0] || '',
                    company: items[1] || '',
                    details: items.slice(2).map(d => d.replace(/^[•\-]\s*/, '')),
                  };
                  experienceEntries.push(currentEntry);
                } else {
                  let tempEntry: { period: string; role: string; company: string; details: string[] } | null = null;
                  section.items.forEach(item => {
                    if (tempEntry) {
                      if (item.startsWith('•') || item.startsWith('- ')) {
                        tempEntry.details.push(item.replace(/^[•\-]\s*/, ''));
                      } else if (!tempEntry.company) {
                        tempEntry.company = item;
                      } else {
                        experienceEntries.push(tempEntry);
                        tempEntry = { period: '', role: item, company: '', details: [] };
                      }
                    } else {
                      tempEntry = { period: '', role: item, company: '', details: [] };
                    }
                  });
                  if (tempEntry && (tempEntry as { role: string }).role) {
                    experienceEntries.push(tempEntry);
                  }
                }
              });

              const nodeColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

              // Reusable window card renderer
              const renderWindowCard = (
                entry: { period: string; role: string; company: string; details: string[] },
                color: string,
                fadeDelay: string,
                shimmerDelay: string,
              ) => (
                <div
                  className="animate-window-fade h-full"
                  style={{ animationDelay: fadeDelay }}
                >
                  <div
                    className="rounded-lg border overflow-hidden animate-window-shimmer backdrop-blur-sm h-full"
                    style={{
                      borderColor: `${color}40`,
                      backgroundColor: `${color}08`,
                      animationDelay: shimmerDelay,
                    }}
                  >
                    {/* Title bar */}
                    <div
                      className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5"
                      style={{ backgroundColor: `${color}15`, borderBottom: `1px solid ${color}25` }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: `${color}80` }} />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: `${color}40` }} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono opacity-70" style={{ color }}>{entry.period}</span>
                      <span className="text-[10px] sm:text-xs opacity-50" style={{ color }}>✕</span>
                    </div>
                    {/* Body */}
                    <div className="px-2.5 sm:px-3.5 py-2 sm:py-3">
                      <div className="text-xs sm:text-sm font-semibold leading-tight" style={{ color }}>{entry.role}</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-1">{entry.company}</div>
                      {entry.details.length > 0 && (
                        <div className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1">
                          {entry.details.map((d, dIdx) => (
                            <div key={dIdx} className="text-[10px] sm:text-[11px] text-slate-400 flex items-start gap-1 sm:gap-1.5">
                              <span style={{ color }} className="mt-px text-[10px] sm:text-xs">›</span>
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              // Mobile: single-column timeline; Desktop: alternating 3-column
              const TimelineTreeAnimation = () => (
                <div className="relative w-full max-w-3xl mx-auto py-4 sm:py-6">
                  {/* Mobile: single column with spine on left */}
                  <div className="block md:hidden">
                    <div className="relative pl-8">
                      {/* Vertical spine */}
                      <div className="absolute left-3 top-0 bottom-0 w-[2px]" style={{
                        background: `linear-gradient(to bottom, ${nodeColors[0]}60, ${nodeColors[Math.min(experienceEntries.length - 1, nodeColors.length - 1)]}60)`,
                      }} />
                      {experienceEntries.map((entry, idx) => {
                        const color = nodeColors[idx % nodeColors.length];
                        const fadeDelay = `${idx * 0.2}s`;
                        const shimmerDelay = `${idx * 1}s`;
                        return (
                          <div key={idx} className="relative mb-4">
                            {/* Dot */}
                            <div
                              className="absolute -left-5 top-3 w-3 h-3 rounded-full animate-timeline-pulse z-10"
                              style={{ backgroundColor: color, color: color }}
                            />
                            {/* Branch line */}
                            <div className="absolute -left-2 top-4 w-4 h-[1px]" style={{ backgroundColor: `${color}60` }} />
                            {renderWindowCard(entry, color, fadeDelay, shimmerDelay)}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desktop: 3-column alternating */}
                  <div className="hidden md:block">
                    <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 60px minmax(0, 1fr)', gap: '0' }}>
                      {experienceEntries.map((entry, idx) => {
                        const isLeft = idx % 2 === 0;
                        const color = nodeColors[idx % nodeColors.length];
                        const fadeDelay = `${idx * 0.2}s`;
                        const shimmerDelay = `${idx * 1}s`;

                        return (
                          <Fragment key={idx}>
                            {/* Left column */}
                            <div className="flex items-center justify-end overflow-hidden" style={{ minHeight: '120px', paddingTop: idx > 0 ? '16px' : '0' }}>
                              {isLeft ? renderWindowCard(entry, color, fadeDelay, shimmerDelay) : null}
                            </div>

                            {/* Center column — spine + dot + arrows */}
                            <div className="relative flex items-center justify-center" style={{ paddingTop: idx > 0 ? '16px' : '0' }}>
                              {/* Vertical spine segment */}
                              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-[1px] w-[2px]" style={{
                                background: `linear-gradient(to bottom, ${nodeColors[Math.max(0, idx - 1) % nodeColors.length]}60, ${color}60)`,
                              }} />

                              {/* Center dot */}
                              <div
                                className="relative z-10 w-4 h-4 rounded-full animate-timeline-pulse flex-shrink-0"
                                style={{ backgroundColor: color, color: color }}
                              />

                              {/* Arrow: left-pointing (card is on the left) */}
                              {isLeft && (
                                <svg className="absolute left-0 top-1/2 -translate-y-1/2" width="22" height="12" viewBox="0 0 22 12" style={{ marginTop: idx > 0 ? '8px' : '0' }}>
                                  <line x1="22" y1="6" x2="8" y2="6" stroke={color} strokeWidth="1" strokeDasharray="4 4" className="animate-arrow-flow" style={{ animationDelay: fadeDelay }} />
                                  <polygon points="2,6 8,2 8,10" fill={color} opacity="0.8" />
                                </svg>
                              )}

                              {/* Arrow: right-pointing (card is on the right) */}
                              {!isLeft && (
                                <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="22" height="12" viewBox="0 0 22 12" style={{ marginTop: idx > 0 ? '8px' : '0' }}>
                                  <line x1="0" y1="6" x2="14" y2="6" stroke={color} strokeWidth="1" strokeDasharray="4 4" className="animate-arrow-flow" style={{ animationDelay: fadeDelay }} />
                                  <polygon points="20,6 14,2 14,10" fill={color} opacity="0.8" />
                                </svg>
                              )}
                            </div>

                            {/* Right column */}
                            <div className="flex items-center justify-start overflow-hidden" style={{ minHeight: '120px', paddingTop: idx > 0 ? '16px' : '0' }}>
                              {!isLeft ? renderWindowCard(entry, color, fadeDelay, shimmerDelay) : null}
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={i} className="my-4 stagger-fade-in">
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-md card-glow card-accent-border relative overflow-hidden">
                    {/* Ambient background glow inside the card */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-700/50">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center">
                        {getFileIcon()}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-400">{title}</h3>
                    </div>
                    
                    {/* Timeline Tree as sole content */}
                    <TimelineTreeAnimation />
                  </div>
                </div>
              );
            }

            // Default card for other file types
            return (
              <div key={i} className="my-4 stagger-fade-in">
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 backdrop-blur-md card-glow card-accent-border relative overflow-hidden">
                  {/* Ambient background glow inside the card */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-700/50">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center">
                      {getFileIcon()}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-emerald-400">{title}</h3>
                  </div>
                  
                  {/* Content */}
                  {renderContentSections(sections)}
                </div>
              </div>
            );
          } catch {
            return <div key={i} className="text-red-400">Error parsing file data</div>;
          }
        }
        
        // Handle formatted lines with markers (fallback)
        if (line.startsWith('§HEADER§')) {
          const content = line.replace('§HEADER§', '');
          return (
            <div key={i} className="py-2">
              <span className="text-emerald-400 font-bold text-base">{content}</span>
            </div>
          );
        } else if (line.startsWith('§SECTION§')) {
          const content = line.replace('§SECTION§', '');
          return (
            <div key={i} className="pt-3 pb-1">
              <span className="text-cyan-400 font-semibold">{content}</span>
            </div>
          );
        } else if (line.startsWith('§BULLET§')) {
          const content = line.replace('§BULLET§', '');
          return (
            <div key={i} className="whitespace-pre-wrap text-slate-300 pl-2">
              <span className="text-emerald-500">›</span>
              <span className="ml-1">{content.replace(/^[•\-]\s*/, '')}</span>
            </div>
          );
        } else if (line.startsWith('§LINK§')) {
          const content = line.replace('§LINK§', '');
          return (
            <div key={i} className="whitespace-pre-wrap text-blue-400 hover:text-blue-300 break-all">
              {content}
            </div>
          );
        } else if (line.startsWith('§EMOJI§')) {
          const content = line.replace('§EMOJI§', '');
          return (
            <div key={i} className="whitespace-pre-wrap text-slate-200 py-0.5">
              {content}
            </div>
          );
        } else if (line.startsWith('§DIVIDER§')) {
          return (
            <div key={i} className="text-slate-600 py-1">
              {'─'.repeat(40)}
            </div>
          );
        } else if (line.startsWith('§MARKDOWN_H§')) {
          const content = line.replace('§MARKDOWN_H§', '').replace(/^#+\s*/, '');
          return (
            <div key={i} className="py-2">
              <span className="text-emerald-300 font-bold text-base">{content}</span>
            </div>
          );
        } else if (line.startsWith('§PROGRESS§')) {
          const content = line.replace('§PROGRESS§', '');
          return (
            <div key={i} className="whitespace-pre-wrap font-mono">
              <span className="text-slate-400">{content.split(/████/)[0]}</span>
              <span className="text-emerald-400">{content.match(/█+/)?.[0] || ''}</span>
              <span className="text-slate-600">{content.match(/░+/)?.[0] || ''}</span>
              <span className="text-slate-400">{content.split(/[█░]+/).pop() || ''}</span>
            </div>
          );
        } else if (line.startsWith(`${process.env.NEXT_PUBLIC_TERMINAL_USER}@${process.env.NEXT_PUBLIC_TERMINAL_HOST}:`)) {
          return (
            <div key={i} className="whitespace-pre-wrap text-emerald-400 break-all">
              {line}
            </div>
          );
        }
        return (
          <div key={i} className="whitespace-pre-wrap text-slate-300">
            {line}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="h-full">
      {/* Mobile file drawer overlay */}
      {isMobile && (
        <>
          <div className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
          <div className={`drawer-panel ${drawerOpen ? 'open' : ''} flex flex-col green-scroll`}>
            {/* Drawer header */}
            <div className="shrink-0 px-3 py-3 border-b border-slate-800/50 bg-slate-900/80">
              <div className="text-emerald-400 font-semibold text-sm">Explorer</div>
            </div>
            {fileTreeContent}
          </div>
        </>
      )}

      {/* Terminal */}
      <TerminalShell title={`${process.env.NEXT_PUBLIC_TERMINAL_USER}@${process.env.NEXT_PUBLIC_TERMINAL_HOST} — bash`} className="h-full flex flex-col">
        {isMobile ? (
          /* Mobile: single column, no sidebar grid */
          <div className="flex flex-col h-full min-h-0">
            {/* Mobile files toggle + output area */}
            <div className="flex-1 overflow-auto green-scroll p-2 sm:p-3 min-h-0" ref={outputRef}>
              {/* Mobile file toggle button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="mb-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800/60 border border-slate-700/50 text-emerald-400 text-xs font-mono hover:bg-slate-700/60 transition-colors"
              >
                <Menu size={14} />
                <span>Files</span>
              </button>
              {renderedOutput}
            </div>

            {/* Input area - fixed at bottom */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-slate-800/70 flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-slate-950/30"
            >
              <span className="text-emerald-400 font-mono shrink-0 text-xs sm:text-sm">
                <span className="hidden sm:inline">{process.env.NEXT_PUBLIC_TERMINAL_USER}@{process.env.NEXT_PUBLIC_TERMINAL_HOST}:</span>
                <span className="sm:hidden">$</span>
                <span className="hidden sm:inline">{cwd === '/' ? '~' : `~${cwd}`}$</span>
              </span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-200 font-mono placeholder:text-slate-500 caret-emerald-400 text-xs sm:text-sm"
                placeholder=""
                autoComplete="off"
                autoFocus
              />
            </form>
          </div>
        ) : (
          /* Desktop: 3-column grid with sidebar */
          <div
            className="grid h-full"
            style={{
              gridTemplateColumns: `${panelWidth}px 8px 1fr`,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={stopResize}
            onMouseLeave={stopResize}
          >
            {/* File tree panel */}
            <div className="flex flex-col min-h-0 border-r border-slate-800/70 bg-slate-950/30">
              {fileTreeContent}
            </div>

            {/* Resize handle */}
            <div
              className="cursor-col-resize bg-slate-800/70 hover:bg-slate-700/80 transition-colors"
              onMouseDown={startResize}
              title="Drag to resize"
            />

            {/* Main terminal area */}
            <div className="flex flex-col min-w-0 min-h-0">
              {/* Output area */}
              <div className="flex-1 overflow-auto green-scroll p-3 min-h-0" ref={!isMobile ? outputRef : undefined}>
                {renderedOutput}
              </div>

              {/* Input area - fixed at bottom */}
              <form
                onSubmit={handleSubmit}
                className="shrink-0 border-t border-slate-800/70 flex items-center gap-2 p-2 bg-slate-950/30"
              >
                <span className="text-emerald-400 font-mono shrink-0">
                  {process.env.NEXT_PUBLIC_TERMINAL_USER}@{process.env.NEXT_PUBLIC_TERMINAL_HOST}:{cwd === '/' ? '~' : `~${cwd}`}$
                </span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-slate-200 font-mono placeholder:text-slate-500 caret-emerald-400"
                  placeholder=""
                  autoComplete="off"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </TerminalShell>
    </div>
  );
}