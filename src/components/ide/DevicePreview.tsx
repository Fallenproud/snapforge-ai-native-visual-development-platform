import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, RefreshCw, ExternalLink, Loader2, PieChart, Lock, User, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { cn } from '@/lib/utils';
export function DevicePreview() {
  const [device, setDevice] = useState('mobile');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const activeTemplate = useWorkspaceStore((s) => s.activeTemplate);
  const isForging = useWorkspaceStore((s) => s.isForging);
  const addLog = useWorkspaceStore((s) => s.addLog);
  useEffect(() => {
    if (activeTemplate !== 'none') {
      setIsRefreshing(true);
      addLog('info', `Hot-reloading preview for template: ${activeTemplate}...`);
      setTimeout(() => setIsRefreshing(false), 1200);
    }
  }, [activeTemplate, addLog]);
  const handleRefresh = () => {
    setIsRefreshing(true);
    addLog('info', 'Manual preview refresh triggered.');
    setTimeout(() => setIsRefreshing(false), 1500);
  };
  const deviceConfigs: Record<string, string> = {
    mobile: "w-[320px] h-[600px] rounded-[40px] border-[8px]",
    tablet: "w-[600px] h-[800px] rounded-[30px] border-[10px]",
    desktop: "w-full max-w-[1000px] h-[600px] rounded-t-xl border-t-[12px] border-x-[12px]"
  };
  const renderMockContent = () => {
    if (activeTemplate === 'landing') {
      return (
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="flex justify-between items-center">
            <div className="h-6 w-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40" />
            <div className="flex gap-2"><div className="h-1 w-6 bg-white/10 rounded" /><div className="h-1 w-6 bg-white/10 rounded" /></div>
          </div>
          <div className="text-center py-10 space-y-4">
            <div className="h-10 w-3/4 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-lg mx-auto" />
            <div className="h-4 w-1/2 bg-white/5 rounded mx-auto" />
          </div>
          <div className="aspect-video w-full bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center">
            <Layout className="h-10 w-10 text-white/10" />
          </div>
          <div className="h-12 w-full bg-brand-cyan rounded-xl mt-10" />
        </div>
      );
    }
    if (activeTemplate === 'auth') {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="h-16 w-16 rounded-3xl bg-brand-purple/20 flex items-center justify-center border border-brand-purple/40">
            <Lock className="h-8 w-8 text-brand-purple" />
          </div>
          <div className="w-full space-y-4">
            <div className="h-10 w-full bg-slate-900 rounded-lg border border-white/10" />
            <div className="h-10 w-full bg-slate-900 rounded-lg border border-white/10" />
            <div className="h-12 w-full bg-brand-purple rounded-xl shadow-glow-purple" />
          </div>
          <div className="h-1 w-24 bg-white/5 rounded" />
        </div>
      );
    }
    if (activeTemplate === 'dashboard') {
      return (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-800" />
            <div className="space-y-1 flex-1"><div className="h-3 w-24 bg-white/20 rounded" /><div className="h-2 w-16 bg-white/10 rounded" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 bg-slate-900 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
              <PieChart className="h-5 w-5 text-brand-cyan" />
              <div className="h-4 w-12 bg-brand-cyan/20 rounded" />
            </div>
            <div className="h-28 bg-slate-900 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
              <User className="h-5 w-5 text-brand-purple" />
              <div className="h-4 w-12 bg-brand-purple/20 rounded" />
            </div>
          </div>
          <div className="h-40 w-full bg-slate-900 rounded-2xl border border-white/5" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="h-20 w-20 rounded-full border border-dashed border-white/10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-muted-foreground/20" />
        </div>
        <div className="space-y-2">
          <p className="text-white/40 font-mono text-sm">NO ACTIVE ARTIFACTS</p>
          <p className="text-xs text-muted-foreground max-w-[200px]">Prompt Sopphy to begin the forging process.</p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col h-full bg-slate-900 forge-bg">
      <div className="p-2 border-b border-white/10 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Tabs value={device} onValueChange={setDevice}>
            <TabsList className="bg-slate-900 h-8 p-1 gap-1">
              <TabsTrigger value="mobile" className="h-6 w-8 p-0"><Smartphone className="h-3 w-3" /></TabsTrigger>
              <TabsTrigger value="tablet" className="h-6 w-8 p-0"><Tablet className="h-3 w-3" /></TabsTrigger>
              <TabsTrigger value="desktop" className="h-6 w-8 p-0"><Laptop className="h-3 w-3" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground bg-slate-900 px-2 py-1 rounded">localhost:3000</span>
          <Button onClick={handleRefresh} variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className={cn("h-3 w-3", (isRefreshing || isForging) && "animate-spin text-brand-cyan")} /></Button>
          <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="h-3 w-3" /></Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div className={cn(
          "relative bg-slate-950 border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-700",
          deviceConfigs[device],
          (isRefreshing || isForging) && "scale-[0.98] opacity-80"
        )}>
          {device !== 'desktop' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-10" />
          )}
          <div className={cn(
            "flex-1 bg-[#020617] p-6 overflow-y-auto relative",
          )}>
            {(isRefreshing || isForging) && (
              <div className="absolute inset-0 z-20 bg-slate-950/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 border-2 border-brand-cyan/20 border-t-brand-cyan rounded-full animate-spin" />
                <p className="text-[10px] font-mono text-brand-cyan animate-pulse tracking-[0.2em] uppercase">Synthesizing Artifacts</p>
              </div>
            )}
            {renderMockContent()}
          </div>
        </div>
      </div>
    </div>
  );
}