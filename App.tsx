import React, { useState } from 'react';
import { StepWizard } from './components/StepWizard';
import { ResultDisplay } from './components/ResultDisplay';
import { AppStep, Language, ScriptResponse } from './types';
import { generateViralScript } from './services/gemini';
import { Zap, AlertOctagon } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.IDLE);
  const [language, setLanguage] = useState<Language | null>(null);
  const [result, setResult] = useState<ScriptResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startApp = () => setStep(AppStep.LANGUAGE_SELECT);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep(AppStep.TOPIC_INPUT);
  };

  const handleTopicSubmit = async (topic: string) => {
    if (!language) return;

    setStep(AppStep.GENERATING);
    setError(null);

    try {
      const data = await generateViralScript(language, topic);
      setResult(data);
      setStep(AppStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate the conspiracy. The system might be jammed by the authorities.");
      setStep(AppStep.ERROR);
    }
  };

  const resetApp = () => {
    setStep(AppStep.LANGUAGE_SELECT);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white selection:bg-yellow-400 selection:text-black">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-1 rounded-md rotate-3">
               <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="font-cartoon text-2xl tracking-wider text-white">
              VIRAL<span className="text-yellow-400">SIMPSONS</span>
            </span>
          </div>
          <div className="text-xs font-mono text-slate-500 uppercase">
             Confidential Agent v1.0
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        
        {step === AppStep.IDLE && (
          <div className="text-center space-y-8 animate-fade-in max-w-2xl">
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse mb-4 uppercase tracking-widest">
              Breaking News
            </div>
            <h1 className="text-6xl md:text-7xl font-cartoon leading-none">
              CREATE VIRAL<br />
              <span className="text-yellow-400 text-shadow-yellow">PROPHECIES</span>
            </h1>
            <p className="text-xl text-slate-400 font-light max-w-lg mx-auto">
              Generate alarmist, journalistic scripts in the style of The Simpsons tailored for TikTok. 
              <span className="block mt-2 text-yellow-400 font-bold opacity-80">High engagement. Low risk.</span>
            </p>
            <button
              onClick={startApp}
              className="group relative px-8 py-4 bg-yellow-400 text-slate-900 font-cartoon text-2xl rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:shadow-[0_0_40px_rgba(250,204,21,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              START GENERATOR
              <span className="absolute inset-0 rounded-xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all"></span>
            </button>
          </div>
        )}

        {(step === AppStep.LANGUAGE_SELECT || step === AppStep.TOPIC_INPUT) && (
          <StepWizard
            currentStep={step}
            onLanguageSelect={handleLanguageSelect}
            onTopicSubmit={handleTopicSubmit}
          />
        )}

        {step === AppStep.GENERATING && (
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
               <div className="absolute inset-0 border-8 border-slate-800 rounded-full"></div>
               <div className="absolute inset-0 border-8 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-4xl">🍩</span>
               </div>
            </div>
            <h3 className="text-2xl font-cartoon text-white mb-2">CONSULTING THE CRYSTAL BALL...</h3>
            <p className="text-slate-400 animate-pulse">Analyzing viral patterns & conspiracy theories</p>
          </div>
        )}

        {step === AppStep.RESULTS && result && (
          <ResultDisplay data={result} onReset={resetApp} />
        )}

        {step === AppStep.ERROR && (
          <div className="text-center max-w-md bg-red-900/20 p-8 rounded-xl border-2 border-red-500/50">
            <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-cartoon text-red-500 mb-2">TRANSMISSION FAILED</h3>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={resetApp}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors"
            >
              TRY AGAIN
            </button>
          </div>
        )}

      </main>

    </div>
  );
};

export default App;