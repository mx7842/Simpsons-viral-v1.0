import React, { useState } from 'react';
import { ScriptResponse } from '../types';
import { Copy, Check, AlertTriangle, Hash, Image as ImageIcon, FileText, BarChart2 } from 'lucide-react';

interface ResultDisplayProps {
  data: ScriptResponse;
  onReset: () => void;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in-up">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h2 className="text-yellow-400 font-cartoon text-xl">MISSION ACCOMPLISHED</h2>
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold transition-colors"
        >
          NEW CONSPIRACY
        </button>
      </div>

      {/* STEP 1: SCRIPT */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-red-600">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center text-red-600">
             <FileText className="w-5 h-5 mr-2" />
             <h3 className="font-cartoon text-xl tracking-wide">STEP 1: BREAKING NEWS SCRIPT</h3>
          </div>
          <CopyButton text={data.step1_script} />
        </div>
        <div className="p-6">
          <p className="whitespace-pre-wrap text-slate-800 leading-relaxed font-medium">
            {data.step1_script}
          </p>
        </div>
      </div>

      {/* STEP 2: PROMPTS */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-yellow-400">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center text-yellow-600">
             <ImageIcon className="w-5 h-5 mr-2" />
             <h3 className="font-cartoon text-xl tracking-wide">STEP 2: 20 IMAGE PROMPTS</h3>
          </div>
          <CopyButton text={data.step2_prompts.join('\n\n')} />
        </div>
        <div className="p-6 max-h-96 overflow-y-auto bg-slate-50 inner-shadow">
          <div className="space-y-3">
            {data.step2_prompts.map((prompt, idx) => (
              <div key={idx} className="flex gap-3 text-sm p-3 bg-white rounded border border-slate-200">
                <span className="font-bold text-yellow-500 font-mono w-6 flex-shrink-0">{idx + 1}.</span>
                <p className="text-slate-700 font-mono">{prompt}</p>
                <div className="flex-shrink-0">
                  <CopyButton text={prompt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3 & 5: HEADLINES & RISK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HEADLINES */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-blue-500">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center text-blue-600">
              <BarChart2 className="w-5 h-5 mr-2" />
              <h3 className="font-cartoon text-xl tracking-wide">STEP 3: VIRAL HEADLINES</h3>
            </div>
            <div className="p-4 space-y-4">
              {data.step3_headlines.map((item, idx) => (
                <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900">{item.headline}</h4>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">{item.score}</span>
                  </div>
                  <p className="text-xs text-slate-500 italic">{item.translation}</p>
                </div>
              ))}
            </div>
        </div>

        {/* RISK & DESCRIPTION */}
        <div className="space-y-6">
           {/* RISK */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-green-500">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center text-green-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <h3 className="font-cartoon text-xl tracking-wide">RISK ASSESSMENT</h3>
              </div>
              <div className="p-6 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-4xl font-black text-slate-900 mb-2">{data.step5_risk}</div>
                    <p className="text-slate-500 text-sm">TikTok Ban Risk Level</p>
                 </div>
              </div>
          </div>

          {/* DESCRIPTION */}
           <div className="bg-white rounded-xl shadow-xl overflow-hidden border-l-8 border-pink-500">
             <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center text-pink-600">
                <div className="flex items-center">
                  <Hash className="w-5 h-5 mr-2" />
                  <h3 className="font-cartoon text-xl tracking-wide">STEP 4: CAPTION</h3>
                </div>
                <CopyButton text={`${data.step4_description.copy}\n\n${data.step4_description.hashtags.join(' ')}`} />
             </div>
             <div className="p-4">
                <p className="text-slate-800 text-sm mb-4">{data.step4_description.copy}</p>
                <div className="flex flex-wrap gap-2">
                  {data.step4_description.hashtags.map((tag, i) => (
                    <span key={i} className="text-blue-500 text-xs font-bold">#{tag.replace('#', '')}</span>
                  ))}
                </div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};