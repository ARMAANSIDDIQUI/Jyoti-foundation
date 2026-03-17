import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you soon. (Frontend Demo)");
  };

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Have questions about our services, want to volunteer, or need medical assistance? We're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
              <h3 className="font-heading text-xl font-bold mb-6">Foundation Office</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-gray-600">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="block font-medium text-text mb-1">Address</span>
                    Moradabad, Uttar Pradesh, India
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-600">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="block font-medium text-text mb-1">Phone</span>
                    +91 98765 43210
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-600">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="block font-medium text-text mb-1">Email</span>
                    info@jyoti-foundation.org
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
              <h3 className="font-heading text-xl font-bold mb-6">Hospital Locations</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-text mb-2">Apollo Laser Eye Hospital</h4>
                  <p className="text-gray-600 text-sm flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    Moradabad, Uttar Pradesh
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    Mon-Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-text mb-2">Dr Vinod Hospital</h4>
                  <p className="text-gray-600 text-sm flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    407, City Rd, Hasanpur, UP 244241
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    24/7 Emergency Services
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="font-heading text-2xl font-bold text-text mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 w-full justify-center md:w-auto"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-gray-100 rounded-3xl h-64 overflow-hidden shadow-sm border border-gray-50 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Interactive Map Placeholder</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
