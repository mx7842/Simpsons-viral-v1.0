import React, { useState } from 'react';
import { 
  ArrowRight, MessageSquare, Globe, Tv, Sparkles, 
  Landmark, Cpu, Users, Gavel, TrendingUp, Zap, ArrowLeft 
} from 'lucide-react';
import { AppStep, Language } from '../types';

interface StepWizardProps {
  currentStep: AppStep;
  onLanguageSelect: (lang: Language) => void;
  onTopicSubmit: (topic: string) => void;
}

const CATEGORIES = [
  { id: 'politics', label: 'POLITICS & GOV', icon: Landmark, color: 'text-blue-500', border: 'border-blue-600', bg: 'hover:bg-blue-900/40' },
  { id: 'global', label: 'GLOBAL EVENTS', icon: Globe, color: 'text-red-500', border: 'border-red-600', bg: 'hover:bg-red-900/40' },
  { id: 'tech', label: 'TECH & BIG TECH', icon: Cpu, color: 'text-cyan-400', border: 'border-cyan-500', bg: 'hover:bg-cyan-900/40' },
  { id: 'pop', label: 'POP CULTURE', icon: Sparkles, color: 'text-purple-500', border: 'border-purple-600', bg: 'hover:bg-purple-900/40' },
  { id: 'social', label: 'SOCIAL ISSUES', icon: Users, color: 'text-green-500', border: 'border-green-600', bg: 'hover:bg-green-900/40' },
  { id: 'crime', label: 'CRIME & TRUE CASES', icon: Gavel, color: 'text-stone-400', border: 'border-stone-500', bg: 'hover:bg-stone-900/40' },
  { id: 'economy', label: 'ECONOMY', icon: TrendingUp, color: 'text-emerald-500', border: 'border-emerald-600', bg: 'hover:bg-emerald-900/40' },
  { id: 'viral', label: 'VIRAL NEWS', icon: Zap, color: 'text-yellow-500', border: 'border-yellow-600', bg: 'hover:bg-yellow-900/40' },
  { id: 'custom', label: 'SUGGEST TOPIC', icon: MessageSquare, color: 'text-slate-400', border: 'border-slate-600', bg: 'hover:bg-slate-800' },
];

export const StepWizard: React.FC<StepWizardProps> = ({ currentStep, onLanguageSelect, onTopicSubmit }) => {
  const [topicInput, setTopicInput] = useState('');
  const [inputMode, setInputMode] = useState<'grid' | 'form'>('grid');

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicInput.trim()) {
      onTopicSubmit(topicInput);
    }
  };

  const handleCategoryClick = (category: typeof CATEGORIES[0]) => {
    if (category.id === 'custom') {
      setInputMode('form');
    } else {
      onTopicSubmit(category.label);
    }
  };

  if (currentStep === AppStep.LANGUAGE_SELECT) {
    return (
      <div className="max-w-md mx-auto w-full animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-yellow-400">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-10 h-10 text-blue-500 mr-2" />
            <h2 className="text-2xl font-cartoon text-slate-900">SELECT LANGUAGE</h2>
          </div>
          <p className="text-slate-600 mb-6 text-center font-bold">In which language do you want the prophecy?</p>
          
          <div className="space-y-3">
            {(['Português', 'Espanhol', 'Inglês'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageSelect(lang)}
                className="w-full py-4 px-6 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-lg transition-all transform hover:scale-105 border-2 border-blue-200 flex items-center justify-between group"
              >
                <span>{lang}</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === AppStep.TOPIC_INPUT) {
    if (inputMode === 'grid') {
      return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-8 uppercase tracking-tighter text-white">
            CHOOSE THE THEME OF <span className="text-red-600">BREAKING NEWS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`
                  relative h-32 p-6 rounded-2xl border-2 ${cat.border} bg-black/40 backdrop-blur-md
                  transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${cat.bg}
                  flex flex-col justify-between group overflow-hidden text-left
                `}
              >
                <div className={`absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity ${cat.color} rotate-12`}>
                  <cat.icon size={120} strokeWidth={2} />
                </div>
                
                <div className={`${cat.color} mb-2`}>
                  <cat.icon size={32} />
                </div>
                
                <span className="font-bold text-white uppercase tracking-wider text-lg md:text-xl relative z-10 font-cartoon">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto w-full animate-fade-in">
        <button 
          onClick={() => setInputMode('grid')}
          className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-bold text-sm bg-slate-800/50 px-4 py-2 rounded-full w-fit hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> CHOOSE ANOTHER THEME
        </button>
        <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-yellow-400">
           <div className="flex items-center justify-center mb-6">
            <Tv className="w-10 h-10 text-pink-500 mr-2" />
            <h2 className="text-2xl font-cartoon text-slate-900">THE CONSPIRACY</h2>
          </div>
          <p className="text-slate-600 mb-6 text-center font-bold">What is the topic of the script?</p>
          
          <form onSubmit={handleTopicSubmit}>
            <div className="relative mb-6">
              <MessageSquare className="absolute top-3 left-3 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g., Simpsons predicted 2025 lottery..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-yellow-400 text-slate-900 placeholder-slate-400 transition-colors"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!topicInput.trim()}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-cartoon text-xl tracking-wider rounded-lg shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              GENERATE SCRIPT
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};