import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../utils/api.js';

export default function Contact() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: t('contact.successMsg') });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.errorMsg') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 h-full">
              <h3 className="font-heading text-xl font-bold mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" /> {t('contact.ourLocations')}
              </h3>

              <div className="space-y-10">
                <div className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h4 className="font-bold text-text text-lg mb-2">Apollo Laser Eye Hospital</h4>
                  <p className="text-gray-700 text-sm mb-3">Moradabad, Uttar Pradesh, India</p>
                  <div className="space-y-2">
                    <p className="text-sm text-text flex items-center gap-2"><Phone className="w-4 h-4" /> +91 94122 36889</p>
                    <p className="text-sm text-text flex items-center gap-2"><Clock className="w-4 h-4" /> {t('contact.monSat')}</p>
                    <a href="https://drpallaveye.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2 font-bold">
                       drpallaveye.com
                    </a>
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500" />
                  <h4 className="font-bold text-text text-lg mb-2">Dr Vinod Hospital</h4>
                  <p className="text-gray-700 text-sm mb-3">407, City Rd, Hasanpur, UP 244241</p>
                  <div className="space-y-2">
                    <p className="text-sm text-text flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98711 22334</p>
                    <p className="text-sm text-text flex items-center gap-2"><Clock className="w-4 h-4" /> {t('contact.emergencyRange')}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-text mb-3">{t('contact.foundationOffice')}</h4>
                  <p className="text-sm text-text font-medium flex items-center gap-2"><Mail className="w-4 h-4" /> info@jyoti-foundation.org</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="font-heading text-2xl font-bold text-text mb-8">{t('contact.sendMessage')}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {status && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {status.message}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('contact.fullName')}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('contact.emailAddress')}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact.phoneNumber')}</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+91 94122 36889"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact.messageLabel')}</label>

                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 w-full justify-center md:w-auto"
                >
                  {isSubmitting ? (
                    <>{t('contact.sendingAction')} <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>{t('contact.sendAction')} <Send className="w-5 h-5" /></>
                  )}
                </button>

              </form>
            </div>

            {/* Dual Maps */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-widest block">Apollo Laser Eye Hospital</span>
                <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative">
                  <iframe 
                    title="Apollo Laser Eye Hospital"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.7211898002624!2d78.7604002755087!3d28.847159675548237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afbe46c3994fb%3A0x85185eae8b4b93e4!2sApollo%20Laser%20Eye%20Hospital%20-%20Eye%20Hospital%20%2F%20Doctor%2F%20Dr.Pallav%20Agarwal%20%2F%20Specialist%20in%20Moradabad!5e0!3m2!1sen!2sin!4v1773754075712!5m2!1sen!2sin" 
                    className="w-full h-full border-0" 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-widest block">Dr Vinod Hospital</span>
                <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative">
                  <iframe 
                    title="Dr Vinod Hospital"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8245046487064!2d78.27934337550421!3d28.72479027561453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b72a89e5286d5%3A0xa0c8cc344952f611!2sDr%20Vinod%20Hospital!5e0!3m2!1sen!2sin!4v1773754047641!5m2!1sen!2sin" 
                    className="w-full h-full border-0" 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
