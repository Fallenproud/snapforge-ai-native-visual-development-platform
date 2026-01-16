import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AgentChatPanel } from '@/components/ide/AgentChatPanel';
import { DevicePreview } from '@/components/ide/DevicePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { chatService } from '@/lib/chat';
export default function WorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  useEffect(() => {
    if (projectId) {
      chatService.switchSession(projectId);
      // Basic validation: check if session is reachable
      const validateSession = async () => {
        try {
          const res = await chatService.getMessages();
          if (!res.success) {
            console.warn("Session context might be invalid or new");
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
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
            <AgentChatPanel />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-white/5" />
          <ResizablePanel defaultSize={70}>
            <DevicePreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </AppLayout>
  );
}