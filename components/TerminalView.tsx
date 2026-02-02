'use client';

import { useState, useRef, useEffect, FormEvent, MouseEvent } from 'react';
import { fileSystem, FileNode, findNode, getParentPath } from '@/data/fileSystem';
import FileTree from './FileTree';
import TerminalShell from './TerminalShell';
import { ExternalLink, Cpu, Github, Database, Server, Smartphone, Brain, Code, Globe, MessageSquare, BarChart3, Layers, Box, Zap, Cloud, User, GraduationCap, Briefcase, Award, FileText, Mail, BookOpen, Trophy } from 'lucide-react';

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
  'node.js': { icon: <Server size={20} />, color: '#339933' },
  'express.js': { icon: <Server size={20} />, color: '#000000' },
  'mongodb': { icon: <Database size={20} />, color: '#47A248' },
  'postgresql': { icon: <Database size={20} />, color: '#4169E1' },
  'mysql': { icon: <Database size={20} />, color: '#4479A1' },
  'docker': { icon: <Box size={20} />, color: '#2496ED' },
  'flutter': { icon: <Smartphone size={20} />, color: '#02569B' },
  'opencv': { icon: <Globe size={20} />, color: '#5C3EE8' },
  'twilio': { icon: <MessageSquare size={20} />, color: '#F22F46' },
  'langchain': { icon: <Layers size={20} />, color: '#1C3C3C' },
  'gemini': { icon: <Brain size={20} />, color: '#8E75B2' },
  'rag': { icon: <Brain size={20} />, color: '#10B981' },
  'genai': { icon: <Brain size={20} />, color: '#8B5CF6' },
  'mern': { icon: <Layers size={20} />, color: '#00D8FF' },
  'aws': { icon: <Cloud size={20} />, color: '#FF9900' },
  'gcp': { icon: <Cloud size={20} />, color: '#4285F4' },
  'random forest': { icon: <BarChart3 size={20} />, color: '#228B22' },
  'xgboost': { icon: <Zap size={20} />, color: '#FF4500' },
  'kmeans': { icon: <BarChart3 size={20} />, color: '#9370DB' },
  'google maps': { icon: <Globe size={20} />, color: '#4285F4' },
  'geolocator': { icon: <Globe size={20} />, color: '#34A853' },
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
    "Welcome to Suhas's portfolio terminal.",
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState('');
  const [panelWidth, setPanelWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

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

  const pwdCommand = (): string[] => [cwd === '/' ? '/Suhas Uppala' : `/Suhas Uppala${cwd}`];

  const whoamiCommand = (): string[] => ['suhas'];

  const echoCommand = (text: string): string[] => [text || ''];

  // Helper to get the prompt string
  const getPrompt = (path: string) => {
    const displayPath = path === '/' ? '~' : `~${path}`;
    return `suhas@portfolio:${displayPath}$`;
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

  return (
    <div className="h-full">
      {/* Terminal */}
      <TerminalShell title="suhas@portfolio — bash" className="h-full flex flex-col">
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
            {/* Fixed header showing current path */}
            <div className="shrink-0 px-2 py-2 border-b border-slate-800/50 bg-slate-900/50">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-sm">
                <span>📁</span>
                <span className="truncate">
                  {cwd === '/' ? 'Suhas Uppala' : `Suhas Uppala${cwd}`}
                </span>
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
            <div className="flex-1 overflow-auto green-scroll p-3 min-h-0" ref={outputRef}>
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
                        <div key={i} className="my-4">
                          {/* Project Card */}
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <h3 className="text-xl font-bold text-emerald-400 flex-1">
                                {title}
                              </h3>
                              {/* Rotating Project Icon with Link */}
                              {githubUrl && (
                                <a 
                                  href={githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="group flex flex-col items-center gap-2"
                                >
                                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/60 transition-all duration-300">
                                    <Cpu 
                                      size={32} 
                                      className="text-emerald-400 group-hover:text-emerald-300 group-hover:animate-spin transition-colors" 
                                      style={{ animationDuration: '2s' }}
                                    />
                                  </div>
                                  <span className="text-xs text-slate-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                                    <ExternalLink size={12} />
                                    View Project
                                  </span>
                                </a>
                              )}
                            </div>
                            
                            {/* Description */}
                            {sections.description?.filter(d => d.trim()).length > 0 && (
                              <p className="text-slate-300 mb-4 leading-relaxed">
                                {sections.description.filter(d => d.trim()).join(' ')}
                              </p>
                            )}
                            
                            {/* Technologies */}
                            {sections.technologies?.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-cyan-400 font-semibold text-sm mb-3">Technologies</h4>
                                <div className="flex flex-wrap gap-3">
                                  {sections.technologies.map((tech, idx) => (
                                    <TechIcon key={idx} tech={tech} />
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Features or Research Contributions */}
                            {(sections.features?.length > 0 || sections['research contributions']?.length > 0) && (
                              <div className="mb-4">
                                <h4 className="text-cyan-400 font-semibold text-sm mb-2">
                                  {sections['research contributions']?.length > 0 ? 'Research Contributions' : 'Features'}
                                </h4>
                                <ul className="space-y-1">
                                  {(sections.features || sections['research contributions'] || []).map((feature, idx) => (
                                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                                      <span className="text-emerald-500 mt-0.5">›</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Awards if any */}
                            {sections.awards?.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-yellow-400 font-semibold text-sm mb-2">🏆 Awards</h4>
                                {sections.awards.map((award, idx) => (
                                  <p key={idx} className="text-yellow-300/80 text-sm">{award}</p>
                                ))}
                              </div>
                            )}
                            
                            {/* Status if any */}
                            {sections.status?.length > 0 && (
                              <div className="mb-2">
                                <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
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

                      return (
                        <div key={i} className="my-4">
                          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700/50">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center">
                                {getFileIcon()}
                              </div>
                              <h3 className="text-xl font-bold text-emerald-400">{title}</h3>
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-4">
                              {sections.map((section, sIdx) => (
                                <div key={sIdx}>
                                  {section.name !== 'content' && (
                                    <h4 className="text-cyan-400 font-semibold text-sm mb-2">{section.name}</h4>
                                  )}
                                  <div className="space-y-1">
                                    {section.items.map((item, iIdx) => {
                                      // Check for bullet points
                                      if (item.startsWith('•') || item.startsWith('- ')) {
                                        return (
                                          <div key={iIdx} className="text-slate-300 text-sm flex items-start gap-2 pl-2">
                                            <span className="text-emerald-500 mt-0.5">›</span>
                                            <span>{item.replace(/^[•\-]\s*/, '')}</span>
                                          </div>
                                        );
                                      }
                                      // Check for emoji lines (achievements, contact)
                                      if (item.match(/^[🏆🥈🥉🏅📜⭐🎓📧📱📍🔗]/)) {
                                        return (
                                          <div key={iIdx} className="text-slate-200 text-sm py-1">{item}</div>
                                        );
                                      }
                                      // Check for progress bars
                                      if (item.match(/████/)) {
                                        const parts = item.split(/\s{2,}/);
                                        return (
                                          <div key={iIdx} className="flex items-center gap-3 text-sm">
                                            <span className="text-slate-300 w-24">{parts[0]}</span>
                                            <span className="text-emerald-400">{item.match(/█+/)?.[0] || ''}</span>
                                            <span className="text-slate-600">{item.match(/░+/)?.[0] || ''}</span>
                                            <span className="text-slate-500 text-xs">{parts[1]?.match(/\d+%/)?.[0] || ''}</span>
                                          </div>
                                        );
                                      }
                                      // Check for links
                                      if (item.includes('github.com') || item.includes('linkedin.com') || item.includes('@')) {
                                        return (
                                          <div key={iIdx} className="text-blue-400 text-sm hover:text-blue-300">{item}</div>
                                        );
                                      }
                                      // Check for dividers
                                      if (item.match(/^━+$/)) {
                                        return <div key={iIdx} className="border-t border-slate-700/50 my-2" />;
                                      }
                                      // Regular text
                                      return (
                                        <div key={iIdx} className="text-slate-300 text-sm leading-relaxed">{item}</div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
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
                      <div key={i} className="whitespace-pre-wrap text-blue-400 hover:text-blue-300">
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
                  } else if (line.startsWith('suhas@portfolio:')) {
                    return (
                      <div key={i} className="whitespace-pre-wrap text-emerald-400">
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
            </div>

            {/* Input area - fixed at bottom */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-slate-800/70 flex items-center gap-2 p-2 bg-slate-950/30"
            >
              <span className="text-emerald-400 font-mono shrink-0">
                suhas@portfolio:{cwd === '/' ? '~' : `~${cwd}`}$
              </span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-200 font-mono placeholder:text-slate-500"
                placeholder=""
                autoComplete="off"
                autoFocus
              />
            </form>
          </div>
        </div>
      </TerminalShell>
    </div>
  );
}

