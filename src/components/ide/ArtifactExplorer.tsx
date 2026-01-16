import React, { useState } from 'react';
import { FileCode, Layout, Box, Search, ChevronRight, Folder, FolderOpen, Database, Globe } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useWorkspaceStore, Artifact } from '@/lib/workspace-store';
const TypeIcon = ({ type }: { type: Artifact['type'] }) => {
  switch (type) {
    case 'ui': return <Layout className="h-4 w-4 text-brand-cyan" />;
    case 'logic': return <FileCode className="h-4 w-4 text-brand-purple" />;
    case 'component': return <Box className="h-4 w-4 text-blue-400" />;
    case 'data': return <Database className="h-4 w-4 text-emerald-400" />;
    default: return <FileCode className="h-4 w-4 text-muted-foreground" />;
  }
};
export function ArtifactExplorer() {
  const [search, setSearch] = useState('');
  const artifacts = useWorkspaceStore((state) => state.artifacts);
  const filtered = artifacts.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex flex-col h-full bg-slate-950/90 border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
          <FolderOpen className="h-3 w-3" /> Artifact Explorer
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artifacts..."
            className="pl-8 bg-slate-900/50 border-white/5 h-8 text-xs focus-visible:ring-brand-cyan"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <div className="px-2 py-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-white cursor-pointer group">
            <ChevronRight className="h-3 w-3 transition-transform group-hover:rotate-90" />
            <Folder className="h-3.5 w-3.5 text-brand-cyan/60" />
            <span>src/components</span>
          </div>
          <div className="pl-4 space-y-1">
            {filtered.length === 0 && search === '' ? (
              <div className="px-3 py-4 text-[10px] text-muted-foreground italic border border-dashed border-white/5 rounded-lg text-center">
                Waiting for agent to forge artifacts...
              </div>
            ) : (
              filtered.map(artifact => (
                <div
                  key={artifact.id}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-all border border-transparent",
                    "hover:bg-brand-cyan/5 hover:border-brand-cyan/20 group",
                    artifact.status === 'forging' && "bg-brand-purple/5 border-brand-purple/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <TypeIcon type={artifact.type} />
                    <span className={cn(
                      "transition-colors",
                      artifact.status === 'forging' ? "text-brand-purple animate-pulse" : "text-slate-300 group-hover:text-white"
                    )}>
                      {artifact.name}
                    </span>
                  </div>
                  {artifact.status === 'forging' && (
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-purple shadow-glow-purple animate-ping" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-white/10 bg-slate-900/30">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            <span>Branch: main</span>
          </div>
          <span className="text-brand-cyan font-mono">{artifacts.length} Artifacts</span>
        </div>
      </div>
    </div>
  );
}