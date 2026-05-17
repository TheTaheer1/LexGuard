import React, { useState, useRef } from 'react';
import { Upload, FileText, X, ChevronDown, CheckCircle } from 'lucide-react';
import { sampleDocument } from '../data/sampleDocument';

const DOC_TYPES = [
  "Offer Letter", "Rental Agreement", "Terms & Conditions", "Refund Policy",
  "Quotation", "Privacy Policy", "Ticket Terms", "Service Agreement", "Other"
];

export default function UploadPanel({ onAnalyze, isLoading }) {
  const [text, setText] = useState('');
  const [docType, setDocType] = useState('Offer Letter');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.size > 4 * 1024 * 1024) {
      alert("File is too large. Maximum size is 4MB.");
      return;
    }
    if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setText(''); // clear text if file uploaded
    } else {
      alert("Unsupported file type. Please upload a PDF or TXT file.");
    }
  };

  const handleSubmit = () => {
    if (!file && text.trim().length < 80) {
      alert("Document text is too short. Please paste at least 80 characters or upload a document.");
      return;
    }
    onAnalyze({ text, file, docType });
  };

  const handleClear = () => {
    setText('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="glass-card p-6 md:p-8 max-w-4xl mx-auto border-t-4 border-t-primary">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-primary" />
          Document Input
        </h2>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/60">Type:</label>
          <div className="relative">
            <select 
              className="appearance-none bg-surface border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-primary text-white"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              {DOC_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/20 bg-surface/30'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.txt"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          {file ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
              <span className="font-medium text-white truncate max-w-xs">{file.name}</span>
              <span className="text-xs text-white/40 mt-1">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <span className="font-medium mb-1">Drag & Drop PDF or TXT</span>
              <span className="text-sm text-white/40 mb-4">or click to browse</span>
              <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">Max 4MB</span>
            </div>
          )}
        </div>

        {/* Paste Area */}
        <div className="relative flex flex-col">
          <textarea
            className="flex-1 w-full bg-surface/30 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary resize-none placeholder-white/30"
            placeholder="Or paste your contract/policy text here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (file) setFile(null); // clear file if typing
            }}
            disabled={!!file}
          ></textarea>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => { setText(sampleDocument); setFile(null); }}
            className="text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Try Sample Contract
          </button>
          {(text || file) && (
            <button 
              onClick={handleClear}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Clear input"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={isLoading || (!file && text.length < 80)}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${isLoading || (!file && text.length < 80) ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_20px_rgba(109,40,217,0.4)]'}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </div>
    </div>
  );
}
