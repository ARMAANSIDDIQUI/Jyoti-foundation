import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';

export default function Contact() {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again later.' });
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
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 h-full">
              <h3 className="font-heading text-xl font-bold mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" /> Our Locations
              </h3>
              
              <div className="space-y-10">
                <div className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h4 className="font-bold text-text text-lg mb-2">Apollo Laser Eye Hospital</h4>
                  <p className="text-gray-600 text-sm mb-3">Moradabad, Uttar Pradesh, India</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Mon-Sat: 9 AM - 6 PM</p>
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500" />
                  <h4 className="font-bold text-text text-lg mb-2">Dr Vinod Hospital</h4>
                  <p className="text-gray-600 text-sm mb-3">407, City Rd, Hasanpur, UP 244241</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98711 22334</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> 24/7 Emergency Services</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-text mb-3">Foundation Office</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2"><Mail className="w-4 h-4" /> info@jyoti-foundation.org</p>
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
                {status && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {status.message}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
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
                    <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>

            {/* Dual Maps */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Apollo Laser Eye Hospital</span>
                <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative">
                  <iframe 
                    title="Moradabad Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112108.97486435344!2d78.7188225091497!3d28.832962451310186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390af96d19ca7b93%3A0xc3f9ad88d8b9432!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710680000000!5m2!1sen!2sin" 
                    className="w-full h-full border-0 grayscale opacity-80" 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Dr Vinod Hospital</span>
                <div className="bg-gray-100 rounded-3xl h-64 overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative">
                  <iframe 
                    title="Hasanpur Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.748348880624!2d78.27090547619225!3d28.517188789311654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b79560f89d5ef%3A0xb30612999e7f788b!2sHasanpur%2C%20Uttar%20Pradesh%20244241!5e0!3m2!1sen!2sin!4v1710680100000!5m2!1sen!2sin" 
                    className="w-full h-full border-0 grayscale opacity-80" 
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
