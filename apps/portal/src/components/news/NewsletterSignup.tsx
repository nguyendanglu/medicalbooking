import React from 'react';
import { Send } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#0A1128] py-16 px-8 md:px-16 text-center text-white">
        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-manrope">
              Stay informed. Live better.
            </h2>
            <p className="text-lg text-slate-300">
              Join over 10,000 readers who receive our curated medical insights and clinic updates every Tuesday.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your professional email"
              required
              className="flex-1 rounded-full bg-white/10 px-6 py-4 text-white placeholder-slate-400 outline-none ring-1 ring-white/20 focus:ring-[#14B8A6] transition-all"
            />
            <button 
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14B8A6] px-8 py-4 font-bold text-white transition-all hover:bg-[#0D9488] active:scale-95"
            >
              Subscribe
              <Send size={18} />
            </button>
          </form>
          
          <p className="text-xs text-slate-500">
            By subscribing, you agree to our Privacy Policy and consent to receive clinical updates.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#14B8A6] opacity-[0.1] blur-3xl"></div>
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#14B8A6] opacity-[0.05] blur-3xl"></div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
