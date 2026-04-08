import React from 'react';

interface PackageCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  featured?: boolean;
}

export const PackageCard = ({ title, description, features, price, featured }: PackageCardProps) => {
  return (
    <div 
      className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-500 ${
        featured 
          ? 'bg-surface-container-highest shadow-2xl scale-105 z-10' 
          : 'bg-surface-container-lowest hover:shadow-xl'
      }`}
    >
      {featured && (
        <span className="absolute -top-4 left-8 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-primary">
          Premium Choice
        </span>
      )}
      
      <div className="flex-1">
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-on-surface">
          {title}
        </h3>
        <p className="mb-8 text-on-surface-variant leading-relaxed">
          {description}
        </p>
        
        <ul className="mb-10 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-on-surface-variant">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto pt-8 border-t border-surface-container-low">
        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-on-surface">{price}</span>
        </div>
        
        <button 
          className={`w-full rounded-full py-4 text-sm font-bold transition-all duration-300 ${
            featured
              ? 'bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/20'
              : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'
          }`}
        >
          {featured ? 'Apply for Membership' : 'Explore Package'}
        </button>
      </div>
    </div>
  );
};
