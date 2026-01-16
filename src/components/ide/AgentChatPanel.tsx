import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, CheckCircle2, Circle, Loader2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatService, renderToolCall } from '@/lib/chat';
import { Message } from '../../../worker/types';
export function AgentChatPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);
  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);
    setStreamingMessage('');
    try {
      await chatService.sendMessage(input, undefined, (chunk) => {
        setStreamingMessage(prev => prev + chunk);
      });
      // Re-fetch final state
      const res = await chatService.getMessages();
      if (res.success && res.data) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error("Chat error", err);
    } finally {
      setIsProcessing(false);
      setStreamingMessage('');
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-950/80 border-r border-white/10">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-brand-cyan" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sopphy Agent</h3>
            <p className={cn("text-[10px]", isProcessing ? "text-brand-cyan animate-pulse" : "text-muted-foreground")}>
              {isProcessing ? "Processing instructions..." : "Ready to forge"}
            </p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
        <div className="space-y-6 pb-4">
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
          {isProcessing && !streamingMessage && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs italic p-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Sopphy is thinking...
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="relative group">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Instruct Sopphy..."
            disabled={isProcessing}
            className="pr-12 bg-slate-900 border-white/10 focus-visible:ring-brand-cyan focus-visible:border-brand-cyan/50 h-11"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isProcessing || !input.trim()}
            size="icon" 
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand-cyan hover:bg-brand-cyan/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}