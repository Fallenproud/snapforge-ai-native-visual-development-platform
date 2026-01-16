import React from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AgentChatPanel } from '@/components/ide/AgentChatPanel';
import { DevicePreview } from '@/components/ide/DevicePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
export default function WorkspacePage() {
  const { projectId } = useParams();
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