import React from "react";
import { Home, Layers, Zap, BrainCircuit, Users, Settings, Plus, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Layers, label: "Projects", path: "/projects" },
  { icon: Zap, label: "Workflows", path: "/workflows" },
  { icon: BrainCircuit, label: "Memory", path: "/memory" },
  { icon: Users, label: "Agents", path: "/agents" },
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar className="border-r border-white/10 bg-slate-950">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple shadow-glow">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SnapForge</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  className={cn(
                    "hover:bg-white/5 transition-colors h-11",
                    location.pathname === item.path ? "text-brand-cyan bg-brand-cyan/10" : "text-muted-foreground"
                  )}
                >
                  <Link to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button className="w-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-semibold border-none">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
        <div className="mt-4 px-2 text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">
          v1.0.4 Premium
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}