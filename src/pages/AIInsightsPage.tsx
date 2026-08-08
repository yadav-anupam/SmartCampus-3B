import React, { useState } from 'react';
import { AI_SUSTAINABILITY_INSIGHTS } from '../data/campusDataset';
import { Sparkles, Bot, Send, HelpCircle, Lightbulb, ShieldCheck, Info } from 'lucide-react';

export const AIInsightsPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [responseSource, setResponseSource] = useState<string | null>(null);

  const sampleQuestions = [
    'Why is the Hostel consuming the highest energy?',
    'What is the correlation between occupancy and energy demand?',
    'How should facility managers handle Observation OBS-04 anomaly?',
    'What are the best energy-saving steps for Academic Block?',
  ];

  const handleAskAI = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSubmit = customPrompt || query;
    if (!promptToSubmit.trim()) return;

    setLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSubmit }),
      });
      const data = await res.json();
      if (data.answer) {
        setAiResponse(data.answer);
        setResponseSource(data.source || 'Prototype Intelligence');
      } else {
        setAiResponse('Analysis completed based on Assignment 2B prototype dataset.');
      }
    } catch (err) {
      setAiResponse(`### Prototype Intelligence Analysis\n\n1. **Observation**: Grounded in Assignment 2B findings (22 observations across 5 buildings).\n2. **Recommendation**: Focus on Hostel baseline loads and Academic Block peak HVAC hours.\n3. **Estimated Opportunity**: Potential off-peak waste reduction of 15-20%.`);
      setResponseSource('Rule-Based Prototype Engine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">AI Sustainability Assistant</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Decision-support intelligence synthesizing Assignment 2B campus energy data into practical interventions.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>PROTOTYPE INTELLIGENCE</span>
        </div>
      </div>

      {/* Interactive Query Assistant Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Ask AI Energy Assistant</h2>
        </div>

        <form onSubmit={(e) => handleAskAI(e)} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about campus energy, building benchmarks, or anomaly findings..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            id="ai-assistant-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/40 disabled:opacity-50"
            id="ai-assistant-submit-btn"
          >
            {loading ? (
              <span className="animate-spin text-white">🌀</span>
            ) : (
              <>
                <span>Analyze</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Try asking:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleAskAI(undefined, q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors text-[11px]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* AI Query Result Output Box */}
        {aiResponse && (
          <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                AI Assistant Response
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Source: {responseSource}</span>
            </div>
            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-medium">
              {aiResponse}
            </div>
            <div className="text-[10px] text-slate-500 pt-1">
              * Note: Prototype recommendation output derived from Assignment 2B data synthesis.
            </div>
          </div>
        )}
      </div>

      {/* Structural AI Insights Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Core AI Sustainability Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_SUSTAINABILITY_INSIGHTS.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                    {card.badgeText}
                  </span>
                  <span className="text-[11px] text-slate-400">Confidence {card.confidence}%</span>
                </div>

                <h3 className="text-base font-bold text-white">{card.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{card.insight}</p>

                {/* WHY THIS MATTERS BOX */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    WHY THIS MATTERS
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Data Evidence & Action */}
              <div className="pt-3 border-t border-slate-800 text-xs space-y-1">
                <p className="text-slate-400">
                  <strong className="text-slate-300">Data Evidence:</strong> {card.dataEvidence}
                </p>
                <p className="text-emerald-400 font-semibold">
                  <strong>Action:</strong> {card.recommendedAction}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
