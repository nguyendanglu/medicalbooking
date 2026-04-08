import React from 'react';

export const ConsultationSection = () => {
  return (
    <section className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[3rem] bg-on-surface p-12 lg:p-20 text-center text-surface-container-lowest relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-6 lg:text-4xl">
            Not sure which package fits your health journey?
          </h2>
          <p className="text-lg text-surface-container-lowest/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our clinicians can design a bespoke diagnostic protocol tailored to your family history, lifestyle goals, and unique physiological markers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full bg-surface-container-lowest px-8 py-4 text-sm font-display font-bold text-on-surface transition-all hover:bg-surface-container-low hover:scale-105 active:scale-95">
              Contact a Specialist
            </button>
            <button className="rounded-full border border-surface-container-lowest/20 px-8 py-4 text-sm font-display font-bold text-surface-container-lowest transition-all hover:bg-surface-container-lowest/5">
              View All Diagnostics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
