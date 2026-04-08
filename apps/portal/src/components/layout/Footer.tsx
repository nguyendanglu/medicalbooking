import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0A1128] to-[#14B8A6]" />
              <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                The Clinical Editorial
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              Elevating the standard of proactive medical care through precision, transparency, and editorial excellence.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Mail size={20} className="hover:text-[#14B8A6] cursor-pointer transition-colors" />
              <Phone size={20} className="hover:text-[#14B8A6] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Practice */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">The Practice</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">About Our Philosophy</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Our Medical Team</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Clinical Facilities</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Partners & Networks</li>
            </ul>
          </div>

          {/* Patient Portal */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Patient Portal</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Schedule Appointment</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Health Packages</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Medical Records</li>
              <li className="hover:text-[#0A1128] cursor-pointer transition-colors">Insurance Partners</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#14B8A6] shrink-0" />
                <span>123 Medical Sanctum, Riverside District, District 1, HCMC</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#14B8A6] shrink-0" />
                <span>+84 (0) 28 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#14B8A6] shrink-0" />
                <span>concierge@clinical-editorial.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 The Clinical Editorial. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
