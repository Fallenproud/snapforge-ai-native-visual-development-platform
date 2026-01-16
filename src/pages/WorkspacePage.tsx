import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AgentChatPanel } from '@/components/ide/AgentChatPanel';
import { DevicePreview } from '@/components/ide/DevicePreview';
import { ArtifactExplorer } from '@/components/ide/ArtifactExplorer';
import { ForgeHeader } from '@/components/ide/ForgeHeader';
import { ForgeTerminal } from '@/components/ide/ForgeTerminal';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { chatService } from '@/lib/chat';
import { useWorkspaceStore } from '@/lib/workspace-store';
export default function WorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const addLog = useWorkspaceStore((s) => s.addLog);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);
  const artifacts = useWorkspaceStore((s) => s.artifacts);
  const isForging = useWorkspaceStore((s) => s.isForging);
  useEffect(() => {
    if (projectId) {
      chatService.switchSession(projectId);
      clearWorkspace();
      const validateSession = async () => {
        try {
          const res = await chatService.getMessages();
          if (res.success && res.data) {
            addLog('success', `Session ${projectId.slice(0, 8)} connected to Forge cluster.`);
            // Auto-init logic: if project is brand new and launched from workflows
            const sessionTitle = res.data.sessionId === projectId ? 'New Forge Project' : ''; 
            if (res.data.messages.length === 0) {
              addLog('info', 'Project detected as clean state. Initializing scaffolding sequence...');
              // We simulate the first prompt if it's a workflow launch
              // For now, we just let the UI show "Idle" until first message
            }
          }
        } catch (e) {
          addLog('error', 'Forge cluster connection failed.');
        } finally {
          setIsValidating(false);
        }
      };
      validateSession();
    }
  }, [projectId, addLog, clearWorkspace]);
  if (isValidating) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-brand-cyan/20 animate-pulse border border-brand-cyan/50 flex items-center justify-center">
             <div className="h-4 w-4 bg-brand-cyan rounded-sm animate-spin" />
          </div>
          <p className="text-brand-cyan font-mono text-sm animate-pulse uppercase tracking-[0.3em]">Initialising Forge Context</p>
        </div>
      </div>
    );
  }
  return (
    <AppLayout className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <ForgeHeader initialTitle="Project Forge" sessionId={projectId || ''} />
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={25} className="hidden lg:block">
              <ArtifactExplorer />
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden lg:flex bg-white/5" />
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={65} minSize={40}>
                  <AgentChatPanel />
                </ResizablePanel>
                <ResizableHandle withHandle className="bg-white/5" />
                <ResizablePanel defaultSize={35} minSize={10}>
                  <ForgeTerminal />
                </ResizablePanel>
              </ResizablePanelGroup>
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