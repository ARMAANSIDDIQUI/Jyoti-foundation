import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck } from 'lucide-react';
import DonationCard from '../components/DonationCard';

const donationOptions = [
  { amount: 500, description: "Sponsor a comprehensive eye checkup for one person." },
  { amount: 2000, description: "Support a life-changing cataract surgery.", isPopular: true },
  { amount: 5000, description: "Help fund a community medical camp in a rural area." },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount || parseInt(customAmount);
    if (!finalAmount) return;
    
    // UI Only - would integrate with payment gateway here
    alert(`Thank you for your intent to donate ₹${finalAmount}! This is a frontend demo.`);
  };

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              Support Vision, <br/><span className="text-primary">Support Life</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Your generosity enables us to provide free surgeries, conduct medical camps, and bring essential healthcare to those who cannot afford it.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 mb-8">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                Secure & Transparent
              </h3>
              <p className="text-gray-600 mb-4">
                100% of your donation goes directly towards patient care and medical supplies. We maintain complete transparency in our operations.
              </p>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Tax exemption under 80G
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Regular impact reports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Secure payment processing
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary fill-primary/20" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text">Make a Donation</h2>
              <p className="text-gray-500 mt-2">Choose an amount to give</p>
            </div>

            <form onSubmit={handleDonate} className="space-y-6">
              <div className="space-y-4">
                {donationOptions.map((option) => (
                  <DonationCard
                    key={option.amount}
                    amount={option.amount}
                    description={option.description}
                    isPopular={option.isPopular}
                    selected={selectedAmount === option.amount}
                    onSelect={(amount) => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  />
                ))}
              </div>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 font-medium">Or enter custom amount</span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">₹</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border-2 outline-none transition-colors text-lg font-medium ${
                    customAmount ? 'border-primary bg-primary/5' : 'border-gray-200 focus:border-primary'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={!selectedAmount && !customAmount}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Donate {selectedAmount || customAmount ? `₹${selectedAmount || customAmount}` : ''} Now
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
