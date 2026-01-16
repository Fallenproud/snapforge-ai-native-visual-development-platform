import React from 'react';
import { Settings, Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
interface PlaceholderViewProps {
  title: string;
}
export default function PlaceholderView({ title }: PlaceholderViewProps) {
  return (
    <AppLayout container className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-8 max-w-lg mx-auto p-12 glass-panel rounded-[40px] border-white/10">
        <div className="relative inline-block">
          <div className="h-24 w-24 rounded-full bg-brand-purple/10 flex items-center justify-center animate-pulse">
            <Construction className="h-12 w-12 text-brand-purple" />
          </div>
          <div className="absolute inset-0 rounded-full border border-brand-purple/20 animate-ping" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This module is currently being synthesized in our experimental forge lab. 
            Check back soon for advanced {title.toLowerCase()} capabilities.
          </p>
        </div>
        <Button asChild className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold h-12 px-8 rounded-xl shadow-glow-purple">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
}