import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Code2, Globe, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { chatService } from '@/lib/chat';
import { SessionInfo } from '../../worker/types';
export function HomePage() {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
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
    fetchSessions();
  }, []);
  const handleCreateProject = async () => {
    const res = await chatService.createSession();
    if (res.success && res.data) {
      navigate(`/workspace/${res.data.sessionId}`);
    }
  };
  return (
    <AppLayout container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10 animate-in fade-in duration-700">
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-10 shadow-glow/10">
            <div className="relative z-10 max-w-2xl space-y-4">
              <Badge variant="outline" className="border-brand-cyan text-brand-cyan px-3 py-1 bg-brand-cyan/5">
                SnapForge Engine v1.0
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Forge your next <span className="text-brand-cyan">masterpiece</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Describe your vision to Sopphy, and watch the scaffolding, logic, and UI manifest in real-time.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" onClick={handleCreateProject} className="bg-brand-cyan hover:bg-brand-cyan/90 text-white px-8">
                  Create Project <Plus className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/10 hover:bg-white/5">
                  <Link to="/workflows">Browse Templates</Link>
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-cyan/10 to-transparent pointer-events-none" />
          </section>
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Active Projects</h2>
              <Button variant="link" className="text-brand-cyan p-0">View All</Button>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 rounded-2xl bg-slate-900/50 animate-pulse border border-white/5" />
                ))}
              </div>
            ) : sessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <Link key={session.id} to={`/workspace/${session.id}`}>
                    <Card className="glass-panel hover:border-brand-cyan/50 transition-all group cursor-pointer h-full border-white/10 bg-slate-900/40">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-brand-cyan">
                            <Terminal className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary" className="bg-slate-950 text-muted-foreground border-white/5">
                            {new Date(session.lastActive).toLocaleDateString()}
                          </Badge>
                        </div>
                        <CardTitle className="pt-4 group-hover:text-brand-cyan transition-colors truncate">{session.title}</CardTitle>
                        <CardDescription className="text-muted-foreground line-clamp-2">
                          Project initialized on {new Date(session.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between border-t border-white/5 pt-4">
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase">Session: {session.id.slice(0, 8)}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-cyan transition-transform group-hover:translate-x-1" />
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-white/10">
                <Zap className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active projects found. Start by creating a new one!</p>
              </div>
            )}
          </section>
          <footer className="text-center py-10 border-t border-white/5 mt-10">
            <p className="text-xs text-muted-foreground/50">
              Note: SnapForge is currently in visual-only preview mode. Although it has AI capabilities, there is a limit on requests across all users.
            </p>
          </footer>
        </div>
      </div>
    </AppLayout>
  );
}