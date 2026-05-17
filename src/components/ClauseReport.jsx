import React, { useState } from 'react';
import { getRiskColor } from '../utils/riskUtils';
import { AlertTriangle, Ghost, HelpCircle, CheckCircle2, Handshake, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClauseReport({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="space-y-12">
      
      {/* Top Risks */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <AlertTriangle className="text-primary" /> Clause-Level Risk Report
        </h2>
        {analysis.top_risks?.length > 0 ? (
          <div className="space-y-4">
            {analysis.top_risks.map((risk, idx) => (
              <RiskCard key={idx} risk={risk} index={idx} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6 text-center text-white/50">
            No major risks detected in the analyzed text.
          </div>
        )}
      </section>

      {/* Hidden Liabilities */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Ghost className="text-primary" /> Hidden Liabilities
        </h2>
        {analysis.hidden_liabilities?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {analysis.hidden_liabilities.map((item, idx) => (
              <div key={idx} className="glass-panel p-5 border-l-2 border-l-purple-500">
                <div className="text-sm font-medium text-white/60 mb-2 font-mono">"{item.clause}"</div>
                <div className="mb-2"><span className="text-white/50 text-sm">Liability:</span> {item.liability_explanation}</div>
                <div className="text-sm text-red-400 font-medium">Potential Cost: {item.possible_cost_or_damage}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6 text-center text-white/50">
            No hidden liabilities detected in the analyzed text.
          </div>
        )}
      </section>

      {/* Ambiguous Terms */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="text-primary" /> Ambiguous Terms
        </h2>
        {analysis.ambiguous_terms?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {analysis.ambiguous_terms.map((item, idx) => (
              <div key={idx} className="glass-panel p-5 border-l-2 border-l-yellow-500">
                <div className="font-bold text-lg mb-2">"{item.term_or_phrase}"</div>
                <div className="text-sm text-white/70 mb-2"><span className="text-white/50">Why:</span> {item.why_ambiguous}</div>
                <div className="text-sm text-cyan-400"><span className="text-white/50">Needed:</span> {item.clarification_needed}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6 text-center text-white/50">
            No major ambiguous terms detected in the analyzed text.
          </div>
        )}
      </section>

      {/* Negotiation Points */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Handshake className="text-primary" /> Negotiation Points
        </h2>
        {analysis.negotiation_points?.length > 0 ? (
          <div className="glass-panel p-6">
            <ul className="space-y-3">
              {analysis.negotiation_points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="glass-panel p-6 text-center text-white/50">
            No specific negotiation points were generated.
          </div>
        )}
      </section>

    </div>
  );
}

function RiskCard({ risk, index }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = getRiskColor(risk.risk_level) || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  const borderColorClass = colorClass.split(' ')[2] || 'border-gray-500/20';

  return (
    <div className={`glass-card overflow-hidden border-l-4 transition-all duration-300 ${borderColorClass} ${expanded ? 'shadow-2xl shadow-black/50' : ''}`}>
      {/* Header */}
      <div 
        className="p-5 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1 pr-4">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-white/50 shrink-0">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${colorClass}`}>
                {risk.risk_level}
              </span>
              <h3 className="font-bold text-lg">{risk.risk_category}</h3>
            </div>
            <p className="text-sm text-white/60 line-clamp-1">{risk.why_it_is_risky}</p>
          </div>
        </div>
        <div className="shrink-0 text-white/40">
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-white/5 mt-2 space-y-6">
              
              <div className="bg-surface p-4 rounded-lg border border-white/5 relative mt-4">
                <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-mono text-white/40 uppercase tracking-widest">Original Clause</div>
                <p className="text-white/80 font-serif italic">"{risk.exact_clause}"</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase mb-2">Real World Consequence</h4>
                  <p className="text-sm text-red-300/80">{risk.real_world_consequence}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase mb-2">Company Side Argument</h4>
                  <p className="text-sm text-white/60">{risk.company_side_argument}</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg relative">
                <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold text-primary uppercase tracking-widest">Safer Rewrite</div>
                <p className="text-sm text-white/90">{risk.safer_rewritten_clause}</p>
              </div>

              {risk.questions_to_ask_before_signing?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-white/40 uppercase mb-3">Questions to Ask Before Signing</h4>
                  <ul className="space-y-2">
                    {risk.questions_to_ask_before_signing.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                        <HelpCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
