import React from 'react';
import { Cloud, Server, Database, Lock, Cpu, LayoutDashboard } from 'lucide-react';

export default function CloudArchitecture() {
  const features = [
    {
      title: "Google Cloud Run Deployment",
      desc: "LexGuard is hosted on Google Cloud Run for scalable, secure, and lightweight containerized deployment with min instances set to 0 for cost safety.",
      icon: Cloud,
      color: "text-blue-400"
    },
    {
      title: "Live Gemini AI Analysis",
      desc: "Server-side integration with Gemini API to ensure no API keys are exposed to the frontend, powering live multi-agent document analysis.",
      icon: Cpu,
      color: "text-purple-400"
    },
    {
      title: "Server-Side Parsing",
      desc: "PDF and TXT documents are securely parsed in the Express backend using in-memory streams. No files are saved to disk.",
      icon: Server,
      color: "text-green-400"
    },
    {
      title: "Document AI Ready (Planned)",
      desc: "Future architecture includes Google Document AI integration for precise OCR of scanned physical contracts and complex tables.",
      icon: LayoutDashboard,
      color: "text-yellow-400",
      future: true
    },
    {
      title: "Cloud Storage Ready (Planned)",
      desc: "Future-ready for Google Cloud Storage to securely hold anonymized documents for enterprise compliance auditing.",
      icon: Database,
      color: "text-cyan-400",
      future: true
    },
    {
      title: "No-Auth Public Access",
      desc: "Currently configured for public unauthenticated access for hackathon judging, with no database required.",
      icon: Lock,
      color: "text-red-400"
    }
  ];

  return (
    <section className="mt-24 mb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-3xl" />
      
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold mb-4">Google Cloud Architecture</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            LexGuard is built lightweight and secure for the hackathon, while laying the groundwork for a robust enterprise architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((f, idx) => (
            <div key={idx} className="bg-surface/50 border border-white/5 rounded-xl p-6 hover:bg-surface/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                {f.future && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/10 text-white/50">
                    Future-Ready
                  </span>
                )}
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
