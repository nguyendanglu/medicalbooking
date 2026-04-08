'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsHero from '@/components/news/NewsHero';
import CategoryFilters from '@/components/news/CategoryFilters';
import ArticleCard from '@/components/news/ArticleCard';
import WeeklyTip from '@/components/news/WeeklyTip';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { news, weeklyTip, newsCategories } from '@/data/mockData';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredArticle = news.find(n => n.featured) || news[0];
  const otherArticles = news.filter(n => !n.featured);
  
  const filteredArticles = activeCategory === 'All' 
    ? otherArticles 
    : otherArticles.filter(article => article.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Editorial Hero */}
      <NewsHero article={featuredArticle} />
      
      {/* Knowledge Center */}
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 font-manrope">
            Knowledge Center
          </h2>
          <CategoryFilters 
            categories={newsCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
        
        {/* Resource Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Article Stream */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredArticles.slice(0, 2).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {/* Horizontal Featured Row */}
            {filteredArticles.length > 2 && (
              <ArticleCard article={filteredArticles[2]} variant="horizontal" />
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredArticles.slice(3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="space-y-12">
            <WeeklyTip tip={weeklyTip} />
            
            {/* Quick Links / Popular Posts */}
            <div className="rounded-2xl border border-slate-100 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 font-manrope">
                Trending Insights
              </h3>
              <ul className="space-y-6">
                {news.slice(0, 3).map((article, index) => (
                  <li key={index} className="group flex gap-4 cursor-pointer">
                    <span className="text-2xl font-bold text-slate-200 group-hover:text-[#14B8A6] transition-colors">
                      0{index + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-[#0A1128] transition-colors leading-snug">
                        {article.title}
                      </h4>
                      <span className="text-xs text-slate-400 capitalize">{article.category}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Engagement */}
      <NewsletterSignup />
      
      <Footer />
    </main>
  );
}
