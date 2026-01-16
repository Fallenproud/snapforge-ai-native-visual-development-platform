import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Zap, Terminal, MoreVertical, Trash2, Edit3, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { chatService } from '@/lib/chat';
import { SessionInfo } from '../../worker/types';
import { SystemStats } from '@/components/dashboard/SystemStats';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
export function HomePage() {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchSessions = async () => {
    try {
      const res = await chatService.listSessions();
      if (res.success && res.data) {
        setSessions(res.data);
      }
    } catch (err) {
      console.error("Failed to load sessions", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);
  const handleCreateProject = async () => {
    const res = await chatService.createSession();
    if (res.success && res.data) {
      navigate(`/workspace/${res.data.sessionId}`);
    }
  };
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await chatService.deleteSession(id);
      if (res.success) {
        setSessions(prev => prev.filter(s => s.id !== id));
        toast.success("Project deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };
  return (
    <AppLayout container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 py-8 md:py-10">
          <section className="relative overflow-hidden rounded-[40px] bg-slate-900 border border-white/10 p-10 shadow-glow/10 group">
            <div className="relative z-10 space-y-6">
              <Badge variant="outline" className="border-brand-cyan text-brand-cyan px-4 py-1.5 bg-brand-cyan/5 font-mono text-xs">
                SnapForge Engine v1.0.4 Premium
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Design at the speed of <span className="text-brand-cyan text-glow">thought</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                SnapForge leverages state-of-the-art AI to translate your vision into production-ready artifacts in seconds.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" onClick={handleCreateProject} className="bg-brand-cyan hover:bg-brand-cyan/90 text-white px-8 h-14 text-md font-bold shadow-glow">
                  Create Project <Plus className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/10 hover:bg-white/5 h-14 px-8 text-md font-bold">
                  <Link to="/workflows">Workflows <Sparkles className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-cyan/10 to-transparent pointer-events-none group-hover:from-brand-cyan/20 transition-all duration-1000" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
          </section>
          <SystemStats />
        </div>
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-white">Active Projects</h2>
              <p className="text-sm text-muted-foreground">Manage and monitor your ongoing forge sequences.</p>
            </div>
            <Button variant="outline" onClick={fetchSessions} className="border-white/10 gap-2 h-9 px-4">
              <Terminal className="h-4 w-4" /> Sync Cluster
            </Button>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-56 rounded-[32px] bg-slate-900/50 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <Link key={session.id} to={`/workspace/${session.id}`}>
                  <Card className="glass-panel hover:border-brand-cyan/50 transition-all group cursor-pointer h-full border-white/10 bg-slate-900/40 relative rounded-[32px] overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-slate-950 border border-white/5 text-brand-cyan shadow-inner">
                          <Terminal className="h-5 w-5" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-950 border-white/10 text-white">
                             <DropdownMenuItem onClick={(e) => handleDelete(e, session.id)} className="gap-2 text-red-400 focus:text-red-400">
                              <Trash2 className="h-4 w-4" /> Archive Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="pt-6 group-hover:text-brand-cyan transition-colors truncate text-xl">{session.title}</CardTitle>
                      <CardDescription className="text-muted-foreground/60 text-xs font-mono uppercase tracking-widest pt-1">
                        FORGE ID: {session.id.slice(0, 8)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between border-t border-white/5 pt-4 bg-slate-950/20">
                      <span className="text-[10px] text-muted-foreground/60">Updated {new Date(session.lastActive).toLocaleDateString()}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-cyan transition-transform group-hover:translate-x-1" />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-[40px] border border-dashed border-white/10">
              <Zap className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No active projects detected in current cluster.</p>
              <Button variant="link" onClick={handleCreateProject} className="text-brand-cyan mt-2">Initialize First Project</Button>
            </div>
          )}
        </section>
        <footer className="text-center py-12 border-t border-white/5 opacity-40">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            SnapForge Internal Preview • AI Limits May Apply Across Sessions
          </p>
        </footer>
      </div>
    </AppLayout>
  );
}