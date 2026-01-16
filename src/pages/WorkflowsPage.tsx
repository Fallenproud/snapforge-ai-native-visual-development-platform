import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, Code, Palette, Zap, Cpu, Layout, Layers, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatService } from '@/lib/chat';
import { toast } from 'sonner';
const workflows = [
  {
    title: "SaaS Landing Page",
    description: "Full-stack landing page with hero, features, pricing and contact forms.",
    category: "Frontend",
    complexity: "Medium",
    template: "landing",
    icon: Layout,
    color: "from-blue-500 to-brand-cyan"
  },
  {
    title: "Auth & User Management",
    description: "Complete authentication flow using NextAuth or Clerk with D1 database.",
    category: "Backend",
    complexity: "High",
    template: "auth",
    icon: ShieldCheck,
    color: "from-brand-purple to-pink-500"
  },
  {
    title: "UI System Generator",
    description: "Generate a consistent design system with Radix UI and Tailwind variables.",
    category: "UI/UX",
    complexity: "Easy",
    template: "landing",
    icon: Palette,
    color: "from-orange-400 to-yellow-500"
  },
  {
    title: "API Gateway Scaffolding",
    description: "Hono based API server with Zod validation and OpenAPI documentation.",
    category: "Logic",
    complexity: "Medium",
    template: "logic",
    icon: Cpu,
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Mobile App Starter",
    description: "React Native template with Expo and mobile-optimized UI components.",
    category: "Mobile",
    complexity: "High",
    template: "landing",
    icon: Zap,
    color: "from-indigo-500 to-brand-purple"
  },
  {
    title: "Admin Dashboard",
    description: "Management portal with complex tables, charts and data visualization.",
    category: "Fullstack",
    complexity: "Medium",
    template: "dashboard",
    icon: Layers,
    color: "from-brand-cyan to-blue-600"
  }
];
export default function WorkflowsPage() {
  const navigate = useNavigate();
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const handleLaunch = async (workflow: typeof workflows[0]) => {
    setLaunchingId(workflow.title);
    try {
      const title = `${workflow.title} Forge`;
      const res = await chatService.createSession(title);
      if (res.success && res.data) {
        toast.success(`Initializing ${workflow.title}...`);
        navigate(`/workspace/${res.data.sessionId}`);
      } else {
        toast.error("Failed to initialize workflow");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLaunchingId(null);
    }
  };
  return (
    <AppLayout container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-12">
          <header className="relative p-10 rounded-[32px] overflow-hidden bg-slate-900 border border-white/10 text-center">
            <div className="relative z-10 space-y-4">
              <Badge variant="outline" className="border-brand-cyan text-brand-cyan bg-brand-cyan/5 px-4 py-1">
                Workflow Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                AI Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Workflows</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Accelerate your development cycle with battle-tested AI blueprints. Select a category to start forging.
              </p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15),_transparent_70%)] pointer-events-none" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflows.map((wf, idx) => (
              <Card key={idx} className="group glass-panel border-white/5 bg-slate-950/40 hover:border-brand-cyan/40 transition-all hover:-translate-y-1">
                <CardHeader className="relative">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${wf.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-white/10 group-hover:border-brand-cyan/50 transition-colors shadow-glow/10")}>
                    <wf.icon className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <CardTitle className="pt-4 text-white group-hover:text-brand-cyan transition-colors">{wf.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{wf.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/5 border-white/10 text-xs">{wf.category}</Badge>
                  <Badge variant="outline" className="text-xs border-brand-purple/30 text-brand-purple">{wf.complexity}</Badge>
                </CardContent>
                <CardFooter className="pt-4 border-t border-white/5">
                  <Button 
                    onClick={() => handleLaunch(wf)}
                    disabled={launchingId !== null}
                    className="w-full bg-slate-900 hover:bg-brand-cyan hover:text-white border border-white/10 group-hover:border-brand-cyan/50 transition-all"
                  >
                    {launchingId === wf.title ? (
                      <>Launching... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                    ) : (
                      <>Launch Workflow <Rocket className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <section className="bg-brand-cyan/5 rounded-3xl border border-brand-cyan/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Custom Workflow?</h3>
              <p className="text-muted-foreground text-sm">Our agents can learn your proprietary coding standards and stack.</p>
            </div>
            <Button className="bg-brand-cyan text-white px-8 h-12 font-bold whitespace-nowrap shadow-glow">
              Request Enterprise Access
            </Button>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}