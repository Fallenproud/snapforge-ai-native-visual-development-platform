import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, Activity, Cpu } from 'lucide-react';
const lineData = [
  { name: '00:00', forge: 12 },
  { name: '04:00', forge: 18 },
  { name: '08:00', forge: 45 },
  { name: '12:00', forge: 89 },
  { name: '16:00', forge: 64 },
  { name: '20:00', forge: 72 },
  { name: '23:59', forge: 34 },
];
const pieData = [
  { name: 'UI Components', value: 400, color: '#06b6d4' },
  { name: 'Logic Artifacts', value: 300, color: '#8b5cf6' },
  { name: 'Data Structures', value: 200, color: '#3b82f6' },
];
export function SystemStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl bg-slate-900/40 border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-brand-cyan" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Forge Activity (24h)</h3>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase">Live Clusters: 14</div>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                fontFamily="JetBrains Mono"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#06b6d4', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="forge" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-panel p-6 rounded-3xl bg-slate-900/40 border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="h-5 w-5 text-brand-purple" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">AI Resource Map</h3>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-2">
           {pieData.map((d) => (
             <div key={d.name} className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">{d.name}</span>
                <span style={{ color: d.color }}>{((d.value/900)*100).toFixed(0)}%</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}