import React from 'react';
import { ArrowUpRight, Clock, User } from 'lucide-react';

interface ArticleCardProps {
  article: {
    title: string;
    category: string;
    image: string;
    author: string;
    readTime: string;
    summary: string;
    date: string;
  };
  variant?: 'standard' | 'horizontal';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="group relative flex flex-col md:flex-row gap-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-xl hover:ring-[#14B8A6]/30">
        <div className="md:w-2/5 overflow-hidden rounded-xl">
          <img 
            src={article.image} 
            alt={article.title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between py-2">
          <div className="space-y-4">
            <span className="inline-block text-sm font-bold uppercase tracking-wider text-[#14B8A6]">
              {article.category}
            </span>
            <h3 className="text-2xl font-bold leading-tight text-slate-900 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-slate-600 line-clamp-3">
              {article.summary}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>
            <div className="rounded-full bg-slate-50 p-2 text-slate-400 group-hover:bg-[#0A1128] group-hover:text-white transition-colors">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer flex flex-col space-y-4 overflow-hidden rounded-xl bg-transparent transition-all">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
        <img 
          src={article.image} 
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
          {article.category}
        </span>
        <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-[#0A1128] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2">
          {article.summary}
        </p>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
        <div className="flex items-center gap-1">
          <User size={12} />
          <span>{article.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
