import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { getRiskColor, getRiskIconColor } from '../utils/riskUtils';

export default function Dashboard({ analysis }) {
  if (!analysis) return null;

  const dist = analysis.risk_distribution;
  const pieData = [
    { name: 'Critical', value: dist.critical, color: '#ef4444' },
    { name: 'High', value: dist.high, color: '#f97316' },
    { name: 'Medium', value: dist.medium, color: '#eab308' },
    { name: 'Low', value: dist.low, color: '#22c55e' },
  ].filter(d => d.value > 0);

  const riskColorClass = getRiskColor(analysis.overall_risk_level) || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  const riskColorParts = riskColorClass.split(' ');
  const textColorClass = riskColorParts[0] || 'text-gray-400';
  const borderColorClass = riskColorParts[2] || 'border-gray-500/20';
  
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Score Card */}
      <div className={`glass-card p-6 flex flex-col items-center justify-center text-center border-t-4 ${borderColorClass}`}>
        <div className="text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">Overall Risk Score</div>
        <div className={`text-6xl font-black mb-2 ${textColorClass}`}>
          {analysis.overall_risk_score}
        </div>
        <div className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${riskColorClass}`}>
          {analysis.overall_risk_level} RISK
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="glass-card p-6 flex flex-col">
        <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Risk Distribution</h3>
        <div className="flex-1 min-h-[160px] relative">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#15151f', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/30">No risks detected</div>
          )}
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="text-white/70">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="glass-card p-6 flex flex-col">
        <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Final Recommendation</h3>
        <div className="flex items-start gap-3 mb-4">
          {analysis.user_should_sign?.toLowerCase().includes('yes') ? (
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
          ) : analysis.user_should_sign?.toLowerCase().includes('no') ? (
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold text-lg mb-1">{analysis.user_should_sign}</div>
            <div className="text-sm text-white/70 leading-relaxed">{analysis.final_recommendation}</div>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-white/10 text-sm text-white/60">
          <span className="font-medium text-white/80">Document Type:</span> {analysis.document_type}
        </div>
      </div>
    </div>
  );
}
