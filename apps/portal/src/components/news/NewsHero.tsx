import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';

interface NewsHeroProps {
  article: {
    title: string;
    subtitle?: string;
    category: string;
    image: string;
    author: string;
    readTime: string;
    summary: string;
  };
}

const NewsHero: React.FC<NewsHeroProps> = ({ article }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A1128] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center rounded-full bg-[#14B8A6]/20 px-4 py-1 text-sm font-semibold text-[#14B8A6]">
              Featured Article • {article.category}
            </div>
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white font-manrope">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
              {article.subtitle || article.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <button className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#0A1128] transition-all hover:bg-slate-100">
              Read Entire Piece
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
          </div>
          
          {/* Visual */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={article.image} 
              alt={article.title}
              className="h-full w-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#14B8A6] opacity-[0.05] blur-3xl"></div>
    </section>
  );
};

export default NewsHero;
