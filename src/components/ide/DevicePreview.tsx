import React, { useState } from 'react';
import { Smartphone, Laptop, Tablet, RefreshCw, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
export function DevicePreview() {
  const [device, setDevice] = useState('mobile');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };
  const deviceConfigs: Record<string, string> = {
    mobile: "w-[320px] h-[600px] rounded-[40px] border-[8px]",
    tablet: "w-[600px] h-[800px] rounded-[30px] border-[10px]",
    desktop: "w-full max-w-[1000px] h-[600px] rounded-t-xl border-t-[12px] border-x-[12px]"
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
          <Button onClick={handleRefresh} variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} /></Button>
          <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="h-3 w-3" /></Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden transition-all duration-500">
        <div className={cn(
          "relative bg-slate-950 border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-500",
          deviceConfigs[device]
        )}>
          {device !== 'desktop' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-10" />
          )}
          <div className={cn(
            "flex-1 bg-[#020617] p-6 space-y-6 overflow-y-auto",
            isRefreshing && "animate-pulse opacity-50"
          )}>
            {isRefreshing ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="h-10 w-10 text-brand-cyan animate-spin" />
                <p className="text-brand-cyan text-sm font-mono">RECOMPILING ARTIFACTS...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/40" />
                  <div className="h-2 w-12 bg-white/10 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 w-3/4 bg-white/10 rounded" />
                  <div className="h-8 w-1/2 bg-white/10 rounded" />
                </div>
                <div className="aspect-video w-full bg-slate-900 rounded-xl border border-white/5 flex items-center justify-center group">
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-brand-cyan border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-slate-900 rounded-xl border border-white/5" />
                  <div className="h-24 bg-slate-900 rounded-xl border border-white/5" />
                </div>
                <div className="mt-auto pt-8">
                  <div className="h-10 w-full bg-brand-cyan/20 rounded-lg border border-brand-cyan/40" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}