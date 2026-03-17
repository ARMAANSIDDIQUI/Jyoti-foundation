import React from 'react';
import { motion } from 'motion/react';
import { Heart, Landmark, Info } from 'lucide-react';
import DonationCard from '../components/DonationCard';

const donationOptions = [
  {
    id: 1,
    title: 'Cataract Surgery',
    description: 'Provide a gift of sight to someone burdened by treatable blindness.',
    amount: 1500,
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Patient Care Fund',
    description: 'Support general medical treatments and post-operative care.',
    amount: 500,
    icon: <Landmark className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Medical Camp Sponsorship',
    description: 'Help us bring healthcare directly to rural villages.',
    amount: 5000,
    icon: <Info className="w-6 h-6" />
  }
];

export default function Donate() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">Support Our Mission</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your generous contributions go directly towards providing healthcare services to those who need it most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {donationOptions.map((option) => (
            <DonationCard key={option.id} option={option} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {/* UPI Payment Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center flex flex-col items-center"
          >
            <div className="bg-primary/10 p-4 rounded-3xl mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">Donate via UPI</h2>
            <p className="text-gray-600 mb-8">Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to make a direct contribution.</p>
            
            <div className="bg-gray-50 p-6 rounded-3xl border-4 border-white shadow-inner mb-6">
              {/* QR Code Placeholder - In a real app this would be a real QR */}
              <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
                <img src="/images/hero_banner.png" alt="UPI QR Code" className="w-full h-full object-cover opacity-20 grayscale" />
                <div className="absolute font-bold text-gray-400 rotate-45">UPI QR CODE</div>
              </div>
            </div>
            
            <div className="bg-blue-50 px-6 py-3 rounded-xl border border-blue-100 flex items-center gap-3">
              <span className="text-sm font-bold text-blue-700 select-all">jyoti.foundation@upi</span>
            </div>
          </motion.div>

          {/* Bank Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col"
          >
            <div className="bg-accent/20 p-4 rounded-3xl mb-6 self-center">
              <Landmark className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4 text-center">Bank Transfer</h2>
            <p className="text-gray-600 mb-8 text-center">Transfer funds directly to our foundation's bank account for official tax-deductible contributions.</p>
            
            <div className="space-y-4 bg-gray-50 p-8 rounded-3xl border border-gray-100 flex-grow">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Account Holder</span>
                <span className="text-lg font-bold text-text">Jyoti Medical Foundation</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Account Number</span>
                <span className="text-lg font-bold text-text tracking-wider">12345678901234</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">IFSC Code</span>
                <span className="text-lg font-bold text-primary tracking-widest">HDFC0001234</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Bank Name</span>
                <span className="text-lg font-bold text-text">HDFC Bank, Moradabad Branch</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto text-center mt-12">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center justify-center gap-3">
            <Info className="w-6 h-6 text-primary" /> Tax Exemption & Receipts
          </h2>
          <p className="text-gray-600 mb-8">
            All donations to Jyoti Foundation are exempt from tax under Section 80G. Please share your transaction details via the contact form or email to receive your official donation receipt.
          </p>
          <a href="/contact" className="inline-block bg-primary text-white font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition-all">
            Contact for Receipt
          </a>
        </div>

      </div>
    </div>
  );
}
