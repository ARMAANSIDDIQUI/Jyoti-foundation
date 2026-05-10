import React, { useState } from 'react';
import { Phone, Instagram, Facebook, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [activeModal, setActiveModal] = useState(null);

  const hospitals = [
    { 
      name: 'Apollo Laser Eye Hospital', 
      phone: '+91 94122 36889', 
      insta: 'https://www.instagram.com/apolloeyecare?igsh=MWdkcmFwdjQ4MzNzZQ==',
      facebook: 'https://facebook.com/share/18RGM3WPeu/'
    },
    { 
      name: 'Dr. Vinod Hospital', 
      phone: '+91 94106 77222', 
      insta: 'https://www.instagram.com/drvinod_hospital_6889?igsh=MW1taHIxeW1iZnlmNg==' 
    }
  ];

  return (
    <>
      {/* --- MOBILE VIEW: Bottom CTA Ribbon --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-[90] flex justify-around items-center">
        <button 
          onClick={() => setActiveModal('contact')}
          className="flex-1 flex items-center justify-center gap-1.5 text-primary font-bold py-4 text-sm hover:bg-gray-50 transition-colors"
        >
          <Phone className="w-4 h-4" /> Contact
        </button>
        <div className="w-px h-8 bg-gray-200"></div>
        <button 
          onClick={() => setActiveModal('facebook')}
          className="flex-1 flex items-center justify-center gap-1.5 text-[#1877F2] font-bold py-4 text-sm hover:bg-gray-50 transition-colors"
        >
          <Facebook className="w-4 h-4" /> Facebook
        </button>
        <div className="w-px h-8 bg-gray-200"></div>
        <button 
          onClick={() => setActiveModal('insta')}
          className="flex-1 flex items-center justify-center gap-1.5 text-pink-600 font-bold py-4 text-sm hover:bg-gray-50 transition-colors"
        >
          <Instagram className="w-4 h-4" /> Instagram
        </button>
      </div>

      {/* --- MOBILE VIEW: Modals --- */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[95]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="md:hidden fixed inset-x-0 bottom-14 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[100] p-6 border-t border-gray-100 pb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-xl text-text">
                  {activeModal === 'contact' ? 'Contact Us' : activeModal === 'facebook' ? 'Our Facebook' : 'Our Instagram'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {hospitals.filter(h => activeModal === 'facebook' ? h.facebook : true).map((h, i) => (
                  <a 
                    key={i}
                    href={activeModal === 'contact' ? `tel:${h.phone.replace(/\\s+/g, '')}` : activeModal === 'facebook' ? h.facebook : h.insta}
                    target={activeModal !== 'contact' ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      activeModal === 'contact' 
                        ? 'border-primary/20 bg-primary/5 text-primary hover:bg-primary/10' 
                        : activeModal === 'facebook'
                        ? 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100'
                    }`}
                  >
                    <span className="font-bold text-gray-800">{h.name}</span>
                    <span className="text-sm font-bold bg-white/50 px-3 py-1 rounded-full border border-current/10">
                      {activeModal === 'contact' ? h.phone : 'Follow'}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DESKTOP VIEW: Floating Side Icons --- */}
      <div className="hidden md:flex fixed left-6 bottom-8 z-[100] flex-col gap-4 items-start">
        
        {/* Contact Dropdown Group */}
        <div className="relative group/contact">
          {/* Dropdown Card */}
          <div className="absolute left-full ml-4 bottom-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 opacity-0 invisible group-hover/contact:opacity-100 group-hover/contact:visible transition-all duration-300 -translate-x-4 group-hover/contact:translate-x-0 z-50">
            <div className="absolute left-[-6px] bottom-6 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45"></div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider pl-2">Contact Us</h4>
            <div className="space-y-2">
              {hospitals.map((h, i) => (
                <a key={i} href={`tel:${h.phone.replace(/\s+/g, '')}`} className="flex flex-col p-3 hover:bg-primary/5 rounded-xl transition-colors border border-transparent hover:border-primary/10">
                  <span className="text-xs text-gray-500 font-medium">{h.name}</span>
                  <span className="text-sm font-bold text-primary">{h.phone}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Icon Button */}
          <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 hover:bg-primary/90 transition-all duration-300 relative z-10">
            <Phone className="w-6 h-6" />
          </button>
        </div>

        {/* Facebook Dropdown Group */}
        <div className="relative group/facebook">
          {/* Dropdown Card */}
          <div className="absolute left-full ml-4 bottom-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 opacity-0 invisible group-hover/facebook:opacity-100 group-hover/facebook:visible transition-all duration-300 -translate-x-4 group-hover/facebook:translate-x-0 z-50">
            <div className="absolute left-[-6px] bottom-6 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45"></div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider pl-2">Follow Us</h4>
            <div className="space-y-2">
              {hospitals.filter(h => h.facebook).map((h, i) => (
                <a key={i} href={h.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-xl transition-colors text-blue-600 border border-transparent hover:border-blue-100">
                  <span className="text-sm font-bold text-gray-700">{h.name}</span>
                  <Facebook className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Icon Button */}
          <button className="w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 transition-all duration-300 relative z-10">
            <Facebook className="w-6 h-6" />
          </button>
        </div>

        {/* Instagram Dropdown Group */}
        <div className="relative group/insta">
          {/* Dropdown Card */}
          <div className="absolute left-full ml-4 bottom-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 opacity-0 invisible group-hover/insta:opacity-100 group-hover/insta:visible transition-all duration-300 -translate-x-4 group-hover/insta:translate-x-0 z-50">
            <div className="absolute left-[-6px] bottom-6 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45"></div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider pl-2">Follow Us</h4>
            <div className="space-y-2">
              {hospitals.map((h, i) => (
                <a key={i} href={h.insta} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-pink-50 rounded-xl transition-colors text-pink-600 border border-transparent hover:border-pink-100">
                  <span className="text-sm font-bold text-gray-700">{h.name}</span>
                  <Instagram className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Icon Button */}
          <button className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full shadow-lg shadow-pink-500/30 flex items-center justify-center hover:scale-110 transition-all duration-300 relative z-10">
            <Instagram className="w-6 h-6" />
          </button>
        </div>

      </div>
    </>
  );
}
