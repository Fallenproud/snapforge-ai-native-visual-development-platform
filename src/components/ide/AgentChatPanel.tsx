import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatService, renderToolCall } from '@/lib/chat';
import { useWorkspaceStore } from '@/lib/workspace-store';
import { Message } from '../../../worker/types';
export function AgentChatPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const isForging = useWorkspaceStore((s) => s.isForging);
  const setIsForging = useWorkspaceStore((s) => s.setIsForging);
  const addLog = useWorkspaceStore((s) => s.addLog);
  const addArtifact = useWorkspaceStore((s) => s.addArtifact);
  const updateArtifactStatus = useWorkspaceStore((s) => s.updateArtifactStatus);
  const setTemplate = useWorkspaceStore((s) => s.setTemplate);
  const [streamingMessage, setStreamingMessage] = useState('');
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadMessages = async () => {
      const res = await chatService.getMessages();
      if (res.success && res.data) {
        setMessages(res.data.messages);
      }
    };
    loadMessages();
  }, []);
  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamingMessage]);
  const detectIntent = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('landing') || lowerText.includes('hero')) {
      addLog('info', 'Detected Landing Page intent. Scaffolding UI artifacts...');
      setTemplate('landing');
      addArtifact({ name: 'LandingPage.tsx', type: 'ui', status: 'forging' });
      setTimeout(() => updateArtifactStatus(messages[messages.length-1]?.id || '1', 'stable'), 3000);
    } else if (lowerText.includes('auth') || lowerText.includes('login')) {
      addLog('info', 'Detected Auth pattern. Provisioning logic and storage...');
      setTemplate('auth');
      addArtifact({ name: 'AuthContext.tsx', type: 'logic', status: 'forging' });
      addArtifact({ name: 'LoginScreen.tsx', type: 'ui', status: 'stable' });
    } else if (lowerText.includes('dashboard') || lowerText.includes('admin')) {
      addLog('info', 'Detected Dashboard intent. Generating data visualization artifacts...');
      setTemplate('dashboard');
      addArtifact({ name: 'AnalyticsPanel.tsx', type: 'component', status: 'stable' });
    }
  };
  const handleSendMessage = async () => {
    if (!input.trim() || isForging) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsForging(true);
    addLog('info', `Processing instruction: "${currentInput.slice(0, 30)}..."`);
    setStreamingMessage('');
    try {
      await chatService.sendMessage(currentInput, undefined, (chunk) => {
        setStreamingMessage(prev => prev + chunk);
      });
      const res = await chatService.getMessages();
      if (res.success && res.data) {
        setMessages(res.data.messages);
        detectIntent(currentInput);
        addLog('success', 'Sopphy forge sequence completed successfully.');
      }
    } catch (err) {
      addLog('error', 'Forge sequence interrupted by unexpected error.');
    } finally {
      setIsForging(false);
      setStreamingMessage('');
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-950/80 border-r border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand-cyan" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sopphy Agent</h3>
            <p className={cn("text-[10px]", isForging ? "text-brand-cyan animate-pulse" : "text-muted-foreground")}>
              {isForging ? "Forging artifacts..." : "Ready to build"}
            </p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[85%] rounded-2xl p-3 text-sm transition-all",
                msg.role === 'user'
                  ? "bg-brand-cyan text-white rounded-tr-none shadow-glow/20"
                  : "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none glass-panel"
              )}>
                {msg.content}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                    {msg.toolCalls.map(tc => (
                      <div key={tc.id} className="text-[10px] font-mono text-brand-cyan/80 bg-black/20 p-1 rounded">
                        {renderToolCall(tc)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {streamingMessage && (
            <div className="flex flex-col gap-2 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="max-w-[85%] rounded-2xl p-3 text-sm bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none glass-panel">
                {streamingMessage}
                <span className="inline-block w-1 h-4 bg-brand-cyan ml-1 animate-pulse" />
              </div>
            </div>
          )}
          {isForging && !streamingMessage && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs italic p-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Sopphy is synthesizing instructions...
            </div>
          )}
          <div ref={scrollAnchorRef} className="h-4" />
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="relative group">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isForging ? "Forge in progress..." : "Instruct Sopphy..."}
            disabled={isForging}
            className="pr-12 bg-slate-900 border-white/10 focus-visible:ring-brand-cyan focus-visible:border-brand-cyan/50 h-11"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isForging || !input.trim()}
            size="icon"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand-cyan hover:bg-brand-cyan/90 transition-all active:scale-95"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}