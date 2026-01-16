import React, { useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { cn } from '@/lib/utils';
export function ForgeTerminal() {
  const logs = useWorkspaceStore((state) => state.logs);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-emerald-400';
      case 'warn': return 'text-amber-400';
      case 'error': return 'text-rose-400';
      default: return 'text-brand-cyan';
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-950 border-t border-white/10 font-mono text-xs">
      <div className="flex items-center justify-between px-4 h-9 border-b border-white/10 bg-slate-900/50">
        <Tabs defaultValue="terminal" className="h-full">
          <TabsList className="bg-transparent h-full p-0 gap-4">
            <TabsTrigger value="terminal" className="data-[state=active]:bg-transparent data-[state=active]:text-brand-cyan text-muted-foreground border-none h-full px-0 gap-2">
              <Terminal className="h-3 w-3" /> Terminal
            </TabsTrigger>
            <TabsTrigger value="output" className="data-[state=active]:bg-transparent data-[state=active]:text-brand-cyan text-muted-foreground border-none h-full px-0">
              Output
            </TabsTrigger>
            <TabsTrigger value="problems" className="data-[state=active]:bg-transparent data-[state=active]:text-brand-cyan text-muted-foreground border-none h-full px-0 gap-2">
              Problems <span className="bg-slate-800 px-1 rounded text-[10px]">0</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 group">
              <span className="text-muted-foreground/40 shrink-0 tabular-nums">
                [{new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
              </span>
              <div className="flex gap-2">
                <span className={cn("uppercase font-bold shrink-0", getLevelColor(log.level))}>
                  {log.level}:
                </span>
                <span className="text-slate-300 break-all">{log.message}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 text-brand-cyan py-1" ref={scrollRef}>
            <ChevronRight className="h-3 w-3 animate-pulse" />
            <div className="w-2 h-4 bg-brand-cyan/50 animate-pulse" />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}