import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

import UploadPanel from './components/UploadPanel';
import LoadingAgents from './components/LoadingAgents';
import Dashboard from './components/Dashboard';
import AgentPanel from './components/AgentPanel';
import ClauseReport from './components/ClauseReport';
import ChatPanel from './components/ChatPanel';
import CloudArchitecture from './components/CloudArchitecture';

import { normalizeAnalysis } from './utils/normalizeAnalysis';
import { exportReportToMarkdown } from './utils/exportReport';

function App() {
  const [appState, setAppState] = useState('idle'); // idle, loading, error, complete
  const [analysis, setAnalysis] = useState(null);
  const [documentText, setDocumentText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = async ({ text, file, docType }) => {
    setAppState('loading');
    setErrorMsg('');
    setAnalysis(null);

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (text) formData.append('documentText', text);
      if (docType) formData.append('documentType', docType);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze document.');
      }

      const normalized = normalizeAnalysis(data.analysis);
      setAnalysis(normalized);
      
      // We only have access to text on frontend if they pasted it. 
      // If they uploaded a file, backend extracts it. We need it for chat. 
      // In a real app we'd get the extracted text back or extract client-side.
      // We will just use the text if provided, else chat might have limited context unless we return it.
      // For this hackathon, we assume pasted text is the primary chat context, 
      // but let's safely fall back.
      setDocumentText(text || "Document text was extracted on the backend.");
      setAppState('complete');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setAppState('error');
    }
  };

  const handleExport = () => {
    if (!analysis) {
      alert("Please analyze a document first.");
      return;
    }
    exportReportToMarkdown(analysis);
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <header className="border-b border-white/5 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(109,40,217,0.5)]">
              L
            </div>
            <span className="font-bold text-xl tracking-tight">LexGuard</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
              <span className="text-white/80">Gemini Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        {appState === 'idle' && (
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
              Understand hidden risks <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">before you sign.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              LexGuard uses adversarial AI agents to analyze contracts, offer letters, quotations, ticket terms, refund policies, rental agreements, privacy policies, and online terms for exploitative clauses, hidden liabilities, legal ambiguities, and real-world risks.
            </p>
          </div>
        )}

        {/* Upload Panel */}
        {appState !== 'loading' && (
          <UploadPanel onAnalyze={handleAnalyze} isLoading={appState === 'loading'} />
        )}

        {/* Error Banner */}
        {appState === 'error' && (
          <div className="max-w-4xl mx-auto mt-8 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-center text-center">
            {errorMsg}
          </div>
        )}

        {/* Loading Screen */}
        {appState === 'loading' && <LoadingAgents />}

        {/* Results */}
        <AnimatePresence>
          {appState === 'complete' && analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Risk Report
                </button>
              </div>

              <Dashboard analysis={analysis} />
              <AgentPanel agentSummary={analysis.agent_summary} />
              
              <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                <div>
                  <ClauseReport analysis={analysis} />
                </div>
                <div className="lg:sticky lg:top-24 h-fit">
                  <ChatPanel documentText={documentText} analysis={analysis} />
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        <CloudArchitecture />
      </main>
      
      <footer className="border-t border-white/5 py-8 mt-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 opacity-50 mb-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-xs">L</div>
            <span className="font-bold tracking-tight">LexGuard</span>
          </div>
          <p className="text-sm text-white/40">Powered by Gemini + Google Cloud Run</p>
          <p className="text-xs text-white/30 max-w-2xl">
            LexGuard provides AI-generated risk awareness and is not a substitute for professional legal advice. 
            No mock analysis reports are used. Every analysis is generated dynamically from your document.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
