
import React, { useState, useRef, useEffect } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import { MOCK_BUDGETS } from '../constants';
import { ChatMessage, Transaction, AccountInfo } from '../types';

const SUGGESTED_TASKS = [
  { label: "Analyze spending", query: "Can you analyze my spending patterns for the last week?" },
  { label: "Savings advice", query: "How can I save more for my dream home goal?" },
  { label: "Budget check", query: "Which budget category am I most likely to exceed?" },
  { label: "Investment tips", query: "Give me some basic investment tips for a beginner in India." },
  { label: "Expense summary", query: "Summarize my top 3 biggest expenses this month." }
];

interface AIChatProps {
  transactions: Transaction[];
  accounts: AccountInfo[];
}

const AIChat: React.FC<AIChatProps> = ({ transactions, accounts }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Namaste! I'm FundVision AI. I've analyzed your recent spending and noticed you spent ₹1,500 more on dining out this week. How can I help you optimize your finances today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', parts: [{ text: query }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getFinancialAdvice(
      query,
      transactions,
      accounts,
      MOCK_BUDGETS,
      messages.map(m => ({ role: m.role, parts: m.parts }))
    );

    setMessages(prev => [...prev, { role: 'model', parts: [{ text: advice }] }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-200px)] md:h-[calc(100vh-14rem)] max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
      <div className="p-3 md:p-4 border-b border-orange-100 flex items-center bg-orange-50/50 flex-shrink-0">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mr-3 shadow-sm">
          <i className="fas fa-robot text-sm md:text-base"></i>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm md:text-base">FundVision AI Assistant</h3>
          <p className="text-[10px] md:text-xs text-emerald-600 flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
            Online & Analyzing
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-[#FAFAFA] overscroll-contain">
        <div className="max-w-3xl mx-auto w-full space-y-4 md:space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-sm transition-all ${
                msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-orange-50 rounded-tl-none'
              }`}>
                <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-orange-50 p-3 md:p-4 rounded-2xl rounded-tl-none flex space-x-1 shadow-sm">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 md:p-4 bg-white border-t border-orange-100 flex-shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          {/* Suggested Tasks Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-1 no-scrollbar -mx-1 px-1 touch-pan-x">
            {SUGGESTED_TASKS.map((task, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(task.query)}
                disabled={isLoading}
                className="flex-shrink-0 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-[10px] md:text-xs font-bold text-orange-600 hover:bg-orange-100 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {task.label}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1 shadow-inner focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
            <input
              type="text"
              className="flex-1 px-3 py-2 md:py-3 outline-none text-xs md:text-sm text-slate-700 bg-transparent"
              placeholder="Ask FundVision AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-orange-600 text-white w-9 h-9 md:w-11 md:h-11 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
            >
              <i className="fas fa-paper-plane text-xs md:text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
