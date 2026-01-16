import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, RefreshCw, ExternalLink, Loader2, PieChart, Lock, User, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { CodeViewer } from './CodeViewer';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
export function DevicePreview() {
  const [device, setDevice] = useState('mobile');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const activeTemplate = useWorkspaceStore((s) => s.activeTemplate);
  const isForging = useWorkspaceStore((s) => s.isForging);
  const selectedArtifactId = useWorkspaceStore((s) => s.selectedArtifactId);
  const artifacts = useWorkspaceStore((s) => s.artifacts);
  const addLog = useWorkspaceStore((s) => s.addLog);
  const selectedArtifact = artifacts.find(a => a.id === selectedArtifactId);
  useEffect(() => {
    if (selectedArtifactId) {
      setIsRefreshing(true);
      const timer = setTimeout(() => setIsRefreshing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selectedArtifactId]);
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
    const artName = selectedArtifact?.name.toLowerCase() || '';
    const artType = selectedArtifact?.type || '';
    // Selection-aware rendering
    if (activeTemplate === 'landing' || artName.includes('landing') || artName.includes('hero')) {
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
    if (activeTemplate === 'auth' || artName.includes('login') || artName.includes('auth') || artType === 'logic') {
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
    if (activeTemplate === 'dashboard' || artName.includes('dash') || artName.includes('analyt')) {
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
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
            {selectedArtifact ? `PREVIEWING ${selectedArtifact.name}` : "NO ACTIVE ARTIFACTS"}
          </p>
          <p className="text-xs text-muted-foreground max-w-[200px]">Prompt Sopphy to begin the forging process.</p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col h-full bg-slate-900 forge-bg">
      <div className="p-2 border-b border-white/10 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList className="bg-slate-900 h-8 p-1">
              <TabsTrigger value="preview" className="h-6 px-3 text-[10px] uppercase font-bold tracking-widest">Preview</TabsTrigger>
              <TabsTrigger value="code" className="h-6 px-3 text-[10px] uppercase font-bold tracking-widest">Code</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <Tabs value={device} onValueChange={setDevice} className={cn(viewMode === 'code' && "opacity-20 pointer-events-none")}>
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
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
        <AnimatePresence>
          {isRefreshing && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex flex-col items-center justify-center gap-4"
            >
               <div className="h-1 w-64 bg-slate-800 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-brand-cyan"
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 0.8 }}
                 />
               </div>
               <p className="text-[10px] font-mono text-brand-cyan animate-pulse tracking-[0.2em] uppercase">Visual Scan In Progress</p>
            </motion.div>
          )}
        </AnimatePresence>
        {viewMode === 'preview' ? (
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
              {renderMockContent()}
            </div>
          </div>
        ) : (
          <div className="w-full h-full max-w-4xl glass-panel rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <CodeViewer />
          </div>
        )}
      </div>
    </div>
  );
}