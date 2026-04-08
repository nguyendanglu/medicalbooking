import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface WeeklyTipProps {
  tip: {
    title: string;
    description: string;
    cta: string;
  };
}

const WeeklyTip: React.FC<WeeklyTipProps> = ({ tip }) => {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-[#F0FDFA] p-8 ring-1 ring-[#14B8A6]/20">
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#14B8A6] text-white shadow-lg shadow-[#14B8A6]/20">
            <Lightbulb size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              {tip.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {tip.description}
            </p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 text-sm font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors pt-8">
          {tip.cta}
          <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#14B8A6] opacity-[0.05]"></div>
      <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-[#14B8A6] opacity-[0.03]"></div>
    </div>
  );
};

export default WeeklyTip;
