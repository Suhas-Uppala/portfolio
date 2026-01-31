'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';
import { FileNode } from '@/data/fileSystem';

interface FileTreeProps {
  tree: FileNode;
  onOpenFile: (node: FileNode) => void;
  showRoot?: boolean;
  currentPath?: string;
}

interface TreeNodeProps {
  node: FileNode;
  depth?: number;
  onOpenFile: (node: FileNode) => void;
  currentPath?: string;
}

function TreeNode({ node, depth = 0, onOpenFile, currentPath = '/' }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const isCurrentDir = currentPath === node.path;
  const isInCurrentPath = currentPath.startsWith(node.path) && node.path !== '/';

  // Auto-expand folders that are in the current path
  useEffect(() => {
    if (isInCurrentPath && isFolder) {
      setIsOpen(true);
    }
  }, [currentPath, isInCurrentPath, isFolder]);

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
      onOpenFile(node);
    } else {
      onOpenFile(node);
    }
  };

  return (
    <div>
      <div
        className={`
          flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-sm
          transition-colors
          ${depth > 0 ? 'ml-3' : ''}
          ${isCurrentDir ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : 'hover:bg-slate-800/50'}
        `}
        onClick={handleClick}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            ) : (
              <ChevronRight size={14} className="text-slate-400 shrink-0" />
            )}
            <Folder size={14} className={`shrink-0 ${isCurrentDir ? 'text-emerald-300' : 'text-emerald-400'}`} />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <FileText size={14} className="text-slate-400 shrink-0" />
          </>
        )}
        <span className={`truncate ${isFolder ? (isCurrentDir ? 'text-emerald-200 font-medium' : 'text-emerald-300') : 'text-slate-300'}`}>
          {node.name}
        </span>
      </div>

      {isOpen && hasChildren && (
        <div className="border-l border-slate-700/50 ml-[11px]">
          {node.children!.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              onOpenFile={onOpenFile}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({ tree, onOpenFile, showRoot = true, currentPath = '/' }: FileTreeProps) {
  // If showRoot is false, render only the children directly
  if (!showRoot && tree.children) {
    return (
      <div className="space-y-0.5">
        {tree.children.map((child) => (
          <TreeNode 
            key={child.path} 
            node={child} 
            onOpenFile={onOpenFile} 
            currentPath={currentPath}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <TreeNode node={tree} onOpenFile={onOpenFile} currentPath={currentPath} />
    </div>
  );
}