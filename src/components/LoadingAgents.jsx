import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, Scale, Building2, BookOpen, Gavel, FileSearch, BrainCircuit } from 'lucide-react';

const steps = [
  { id: 1, text: "Extracting document text...", icon: FileSearch },
  { id: 2, text: "Running Clause Extractor Agent...", icon: Search },
  { id: 3, text: "Running Risk Detector Agent...", icon: ShieldAlert },
  { id: 4, text: "Running User Rights Advocate Agent...", icon: Scale },
  { id: 5, text: "Running Company Defender Agent...", icon: Building2 },
  { id: 6, text: "Running Legal Ambiguity Critic...", icon: BookOpen },
  { id: 7, text: "Generating Final Verdict...", icon: Gavel },
  { id: 8, text: "Building risk dashboard...", icon: BrainCircuit },
];

export default function LoadingAgents() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Progress through steps to simulate multi-agent thought process
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev; // Stay at last step until actual API completes
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-16 glass-card p-8 md:p-12 text-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-t-2 border-r-2 border-primary mx-auto mb-8"
      />
      
      <h3 className="text-2xl font-bold mb-8">Adversarial AI Analysis in Progress</h3>
      
      <div className="space-y-4 max-w-md mx-auto text-left">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          
          if (index > currentStep) return null;

          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-4 p-3 rounded-lg ${isActive ? 'bg-primary/20 border border-primary/30' : 'opacity-50'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-white' : 'bg-white/10 text-white/50'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                {step.text}
              </span>
              {isPast && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-2 h-2 rounded-full bg-green-500" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
