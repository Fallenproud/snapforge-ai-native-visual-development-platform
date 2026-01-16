import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AgentChatPanel } from '@/components/ide/AgentChatPanel';
import { DevicePreview } from '@/components/ide/DevicePreview';
import { ArtifactExplorer } from '@/components/ide/ArtifactExplorer';
import { ForgeHeader } from '@/components/ide/ForgeHeader';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { chatService } from '@/lib/chat';
export default function WorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [isValidating, setIsValidating] = useState(true);
  const [projectTitle, setProjectTitle] = useState('New Forge Project');
  useEffect(() => {
    if (projectId) {
      chatService.switchSession(projectId);
      const validateSession = async () => {
        try {
          const res = await chatService.getMessages();
          if (res.success && res.data) {
            // Title recovery could be added here if session management provided it directly
          }
        } catch (e) {
          console.error("Session validation failed", e);
        } finally {
          setIsValidating(false);
        }
      };
      validateSession();
    }
  }, [projectId]);
  if (isValidating) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-brand-cyan/20 animate-pulse border border-brand-cyan/50" />
          <p className="text-brand-cyan font-mono text-sm animate-pulse uppercase tracking-widest">Initialising Forge Context...</p>
        </div>
      </div>
    );
  }
  return (
    <AppLayout className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <ForgeHeader initialTitle={projectTitle} sessionId={projectId || ''} />
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={18} minSize={12} maxSize={25} className="hidden lg:block">
              <ArtifactExplorer />
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden lg:flex bg-white/5" />
            <ResizablePanel defaultSize={32} minSize={20} maxSize={50}>
              <AgentChatPanel />
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-white/5" />
            <ResizablePanel defaultSize={50}>
              <DevicePreview />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </AppLayout>
  );
}