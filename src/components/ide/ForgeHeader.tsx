import React, { useState } from 'react';
import { Rocket, ShieldCheck, ChevronRight, Edit2, Check, RefreshCcw, Settings, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { chatService } from '@/lib/chat';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
interface ForgeHeaderProps {
  initialTitle: string;
  sessionId: string;
}
export function ForgeHeader({ initialTitle, sessionId }: ForgeHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isDeploying, setIsDeploying] = useState(false);
  const artifacts = useWorkspaceStore((s) => s.artifacts);
  const isForging = useWorkspaceStore((s) => s.isForging);
  const addLog = useWorkspaceStore((s) => s.addLog);
  const artifactCount = artifacts.length;
  const handleRename = async () => {
    if (!title.trim() || title === initialTitle) {
      setIsEditing(false);
      return;
    }
    try {
      const res = await chatService.updateSessionTitle(sessionId, title);
      if (res.success) {
        toast.success("Project updated");
        addLog('info', `Project renamed to: ${title}`);
      }
    } catch (err) {
      toast.error("Failed to rename");
    } finally {
      setIsEditing(false);
    }
  };
  const handleDeploy = () => {
    setIsDeploying(true);
    addLog('info', 'Starting cloud deployment sequence...');
    toast.promise(new Promise(r => setTimeout(r, 2000)), {
      loading: 'Scaffolding edge environment...',
      success: 'Deployment live at preview-forge.snapforge.app',
      error: 'Deployment failed',
    });
    setTimeout(() => {
      setIsDeploying(false);
      addLog('success', 'Production deployment verified and active.');
    }, 2500);
  };
  const handleShare = () => {
    const mockLink = `https://snapforge.app/preview/${sessionId}`;
    navigator.clipboard.writeText(mockLink);
    toast.success("Preview link copied to clipboard");
  };
  return (
    <div className="h-14 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hover:text-white cursor-pointer transition-colors">Workspace</span>
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
                className="bg-slate-900 border border-brand-cyan/50 text-white text-sm px-2 py-0.5 rounded outline-none focus:ring-1 ring-brand-cyan"
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
            V1.0.4-PRO
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-white/5 mr-2 transition-all">
          <div className={cn("h-1.5 w-1.5 rounded-full shadow-glow", isForging ? "bg-brand-purple animate-ping" : "bg-brand-cyan")} />
          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-tighter">
            {isForging ? "Sopphy: Forging..." : `Sopphy: Idle • ${artifactCount} Artifacts`}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Forge Settings</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">Configure your Forge workspace settings.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-bold">Framework Cluster</label>
                <div className="p-3 bg-slate-900 rounded-lg border border-white/5 text-sm">React 18 + Tailwind v3 (Default)</div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase font-bold">Agent Permission Level</label>
                <div className="p-3 bg-slate-900 rounded-lg border border-white/5 text-sm flex justify-between items-center">
                  <span>Full Autonomy</span>
                  <Badge className="bg-brand-cyan">Active</Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={handleDeploy}
          disabled={isDeploying}
          variant="outline"
          className="h-8 gap-2 border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan hover:text-white transition-all text-brand-cyan font-bold"
        >
          {isDeploying ? <RefreshCcw className="h-3.5 w-3.5 animate-spin" /> : <Rocket className="h-3.5 w-3.5" />}
          <span className="text-xs">Deploy</span>
        </Button>
      </div>
    </div>
  );
}