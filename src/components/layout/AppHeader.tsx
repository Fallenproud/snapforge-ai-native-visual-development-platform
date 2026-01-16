import React from 'react';
import { Search, Zap, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search files, tasks, or workflows..." 
              className="pl-10 bg-slate-900/50 border-white/10 focus-visible:ring-brand-cyan"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2 border-brand-cyan/20 bg-brand-cyan/5 hover:bg-brand-cyan/10 hover:border-brand-cyan/40 text-brand-cyan"
          >
            <Zap className="h-4 w-4 fill-brand-cyan" />
            <span>Autopilot On</span>
          </Button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple p-[1px]">
            <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}