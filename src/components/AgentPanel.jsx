import React from 'react';
import { Search, ShieldAlert, Scale, Building2, BookOpen, Gavel } from 'lucide-react';

export default function AgentPanel({ agentSummary }) {
  if (!agentSummary) return null;

  const agents = [
    { key: 'clause_extractor', title: 'Clause Extractor', icon: Search, color: 'text-blue-400' },
    { key: 'risk_detector', title: 'Risk Detector', icon: ShieldAlert, color: 'text-red-400' },
    { key: 'user_rights_advocate', title: 'User Advocate', icon: Scale, color: 'text-green-400' },
    { key: 'company_defender', title: 'Company Defender', icon: Building2, color: 'text-yellow-400' },
    { key: 'legal_ambiguity_critic', title: 'Ambiguity Critic', icon: BookOpen, color: 'text-purple-400' },
    { key: 'final_verdict', title: 'Final Verdict Agent', icon: Gavel, color: 'text-cyan-400' },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Scale className="text-primary" /> Multi-Agent Review Panel
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(({ key, title, icon: Icon, color }) => (
          <div key={key} className="glass-panel p-5 hover:bg-surface/80 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded bg-white/5 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {agentSummary[key] || "No summary provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
