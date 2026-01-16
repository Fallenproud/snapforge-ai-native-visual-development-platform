import React from 'react';
import { Smartphone, Laptop, Tablet, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function DevicePreview() {
  return (
    <div className="flex flex-col h-full bg-slate-900 forge-bg">
      <div className="p-2 border-b border-white/10 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Tabs defaultValue="mobile">
            <TabsList className="bg-slate-900 h-8 p-1 gap-1">
              <TabsTrigger value="mobile" className="h-6 w-8 p-0"><Smartphone className="h-3 w-3" /></TabsTrigger>
              <TabsTrigger value="tablet" className="h-6 w-8 p-0"><Tablet className="h-3 w-3" /></TabsTrigger>
              <TabsTrigger value="desktop" className="h-6 w-8 p-0"><Laptop className="h-3 w-3" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground bg-slate-900 px-2 py-1 rounded">localhost:3000</span>
          <Button variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className="h-3 w-3" /></Button>
          <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="h-3 w-3" /></Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        {/* Phone Frame */}
        <div className="relative w-[320px] h-[600px] bg-slate-950 rounded-[40px] border-[8px] border-slate-800 shadow-2xl flex flex-col overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-10" />
          {/* Simulated App Content */}
          <div className="flex-1 bg-[#020617] p-6 space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-6 w-6 rounded-full bg-brand-cyan/20" />
              <div className="h-2 w-12 bg-white/10 rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-white/10 rounded" />
              <div className="h-8 w-1/2 bg-white/10 rounded" />
            </div>
            <div className="aspect-video w-full bg-slate-900 rounded-xl border border-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-slate-900 rounded-xl border border-white/5" />
              <div className="h-24 bg-slate-900 rounded-xl border border-white/5" />
            </div>
            <div className="mt-auto pt-8">
              <div className="h-10 w-full bg-brand-cyan/20 rounded-lg border border-brand-cyan/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}