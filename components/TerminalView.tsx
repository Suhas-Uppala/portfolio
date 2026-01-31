'use client';

import { useState, useRef, useEffect, FormEvent, MouseEvent } from 'react';
import { fileSystem, FileNode, findNode, getParentPath } from '@/data/fileSystem';
import FileTree from './FileTree';
import TerminalShell from './TerminalShell';

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

    // Output file content directly to terminal
    const lines = (node.content || '').split('\n');
    return ['', ...lines, ''];
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
      const lines = (node.content || '').split('\n');
      const currentPrompt = getPrompt(cwd);
      setOutput((prev) => [...prev, `${currentPrompt} cat ${node.name}`, '', ...lines, '']);
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
                {output.map((line, i) => (
                  <div 
                    key={i} 
                    className={`whitespace-pre-wrap ${
                      line.startsWith('suhas@portfolio:') ? 'text-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    {line}
                  </div>
                ))}
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

