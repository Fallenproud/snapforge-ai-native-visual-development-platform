import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Code2, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
const projects = [
  {
    id: 'landing-gen',
    name: 'SaaS Landing Page',
    description: 'High-conversion template for tech startups.',
    status: 'Ready',
    type: 'Frontend',
    icon: Globe,
    color: 'text-brand-cyan'
  },
  {
    id: 'auth-pack',
    name: 'Auth Gateway',
    description: 'Ready-to-deploy OAuth2 and Clerk integration.',
    status: 'Generating',
    type: 'Backend',
    icon: ShieldCheck,
    color: 'text-brand-purple'
  },
  {
    id: 'mobile-mock',
    name: 'E-commerce Mobile',
    description: 'React Native scaffold with shopping cart.',
    status: 'Draft',
    type: 'Mobile',
    icon: Zap,
    color: 'text-orange-400'
  }
];
export function HomePage() {
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-10">
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
              <Button size="lg" className="bg-brand-cyan hover:bg-brand-cyan/90 text-white px-8">
                Create Project <Plus className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                Browse Templates
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} to={`/workspace/${project.id}`}>
                <Card className="glass-panel hover:border-brand-cyan/50 transition-all group cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={cn("p-2 rounded-lg bg-slate-950 border border-white/5", project.color)}>
                        <project.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="bg-slate-950 text-muted-foreground border-white/5">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="pt-4 group-hover:text-brand-cyan transition-colors">{project.name}</CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between border-t border-white/5 pt-4">
                    <span className="text-xs font-mono text-muted-foreground/60">{project.type}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-cyan transition-transform group-hover:translate-x-1" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <div className="text-center py-10 opacity-50 text-xs">
          Note: SnapForge is currently in visual-only preview mode. Some tools may have usage limits.
        </div>
      </div>
    </AppLayout>
  );
}