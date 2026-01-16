import React from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { toast } from 'sonner';
export function CodeViewer() {
  const selectedArtifactId = useWorkspaceStore((s) => s.selectedArtifactId);
  const artifacts = useWorkspaceStore((s) => s.artifacts);
  const artifactContent = useWorkspaceStore((s) => s.artifactContent);
  const [copied, setCopied] = React.useState(false);
  const selectedArtifact = artifacts.find(a => a.id === selectedArtifactId);
  const content = selectedArtifactId ? artifactContent[selectedArtifactId] : '';
  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  const highlightCode = (code: string) => {
    if (!code) return <span className="text-muted-foreground italic">No code generated yet.</span>;
    return code.split('\n').map((line, i) => {
      // Very basic syntax highlighting for demo purposes
      const parts = line.split(/(\s+|,|\.|\(|\)|\{|\}|\[|\]|;|'|")/);
      return (
        <div key={i} className="flex gap-4 group">
          <span className="w-8 text-right text-muted-foreground/30 select-none shrink-0 font-mono">
            {i + 1}
          </span>
          <span className="whitespace-pre">
            {parts.map((part, j) => {
              if (['import', 'export', 'default', 'function', 'const', 'return', 'if', 'else'].includes(part)) {
                return <span key={j} className="text-brand-purple font-bold">{part}</span>;
              }
              if (['React', 'useState', 'useEffect', 'useWorkspaceStore'].includes(part)) {
                return <span key={j} className="text-amber-400">{part}</span>;
              }
              if (part.startsWith('<') || part.endsWith('>')) {
                return <span key={j} className="text-brand-cyan">{part}</span>;
              }
              if (part.startsWith('"') || part.startsWith("'")) {
                return <span key={j} className="text-emerald-400">{part}</span>;
              }
              return <span key={j} className="text-slate-300">{part}</span>;
            })}
          </span>
        </div>
      );
    });
  };
  return (
    <div className="flex flex-col h-full bg-slate-950 font-mono text-[13px] leading-relaxed relative">
      <div className="flex items-center justify-between px-4 h-10 border-b border-white/10 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-brand-cyan" />
          <span className="text-xs text-slate-400">{selectedArtifact?.name || 'No file selected'}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopy}
          className="h-7 w-7 text-muted-foreground hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-brand-cyan" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="min-w-max">
          {highlightCode(content)}
        </div>
      </ScrollArea>
      {!selectedArtifactId && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
          <p className="text-muted-foreground/50 italic">Select an artifact to view source</p>
        </div>
      )}
    </div>
  );
}