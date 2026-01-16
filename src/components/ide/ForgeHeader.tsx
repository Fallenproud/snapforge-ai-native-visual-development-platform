import React, { useState } from 'react';
import { Rocket, ShieldCheck, ChevronRight, Edit2, Check, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { chatService } from '@/lib/chat';
import { toast } from 'sonner';
interface ForgeHeaderProps {
  initialTitle: string;
  sessionId: string;
}
export function ForgeHeader({ initialTitle, sessionId }: ForgeHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isDeploying, setIsDeploying] = useState(false);
  const handleRename = async () => {
    if (!title.trim() || title === initialTitle) {
      setIsEditing(false);
      return;
    }
    try {
      const res = await chatService.updateSessionTitle(sessionId, title);
      if (res.success) {
        toast.success("Project updated");
      }
    } catch (err) {
      toast.error("Failed to rename");
    } finally {
      setIsEditing(false);
    }
  };
  const handleDeploy = () => {
    setIsDeploying(true);
    toast.promise(new Promise(r => setTimeout(r, 2000)), {
      loading: 'Scaffolding environment...',
      success: 'Deployment live at preview-forge.snapforge.app',
      error: 'Deployment failed',
    });
    setTimeout(() => setIsDeploying(false), 2500);
  };
  return (
    <div className="h-14 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hover:text-white cursor-pointer transition-colors">Projects</span>
          <ChevronRight className="h-3 w-3" />
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                className="bg-slate-900 border border-brand-cyan/50 text-white text-sm px-2 py-1 rounded outline-none focus:ring-1 ring-brand-cyan"
              />
              <Check className="h-4 w-4 text-brand-cyan cursor-pointer" onClick={handleRename} />
            </div>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
              <h2 className="text-sm font-bold text-white tracking-wide">{title}</h2>
              <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <Badge variant="outline" className="text-[10px] h-5 bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan font-mono">
            V1.0.4-BETA
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/5 mr-2">
          <div className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse shadow-glow" />
          <span className="text-[10px] font-medium text-slate-300 uppercase tracking-tighter">Sopphy: Analyzing Context</span>
        </div>
        <Button 
          onClick={handleDeploy}
          disabled={isDeploying}
          variant="outline" 
          className="h-8 gap-2 border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan hover:text-white transition-all text-brand-cyan"
        >
          {isDeploying ? <RefreshCcw className="h-3.5 w-3.5 animate-spin" /> : <Rocket className="h-3.5 w-3.5" />}
          <span className="text-xs font-bold">Deploy</span>
        </Button>
        <div className="h-8 w-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}