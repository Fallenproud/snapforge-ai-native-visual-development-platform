import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
export function AgentChatPanel() {
  const [tasks] = useState([
    { id: 1, label: 'Plan structure', status: 'completed' },
    { id: 2, label: 'Scaffold components', status: 'active' },
    { id: 3, label: 'Inject logic & styles', status: 'pending' },
  ]);
  return (
    <div className="flex flex-col h-full bg-slate-950/80 border-r border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-brand-cyan/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-brand-cyan" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Sopphy Agent</h3>
          <p className="text-[10px] text-brand-cyan animate-pulse">Processing instructions...</p>
        </div>
      </div>
      <div className="p-4 bg-slate-900/40 border-b border-white/10">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Task Progress</h4>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              {task.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {task.status === 'active' && <Loader2 className="h-4 w-4 text-brand-cyan animate-spin" />}
              {task.status === 'pending' && <Circle className="h-4 w-4 text-white/20" />}
              <span className={cn(
                "text-xs",
                task.status === 'completed' ? "text-muted-foreground line-through" : "text-white"
              )}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-300">
          Hello! I'm ready to forge your landing page. I'll start by scaffolding the hero section and navigation.
        </div>
        <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl p-3 text-sm text-white self-end ml-8">
          Make it dark themed with neon cyan accents.
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <Input 
            placeholder="Instruct Sopphy..." 
            className="pr-12 bg-slate-900 border-white/10 focus-visible:ring-brand-cyan"
          />
          <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand-cyan">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}