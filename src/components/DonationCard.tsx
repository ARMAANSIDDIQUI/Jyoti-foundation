import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface DonationCardProps {
  key?: React.Key;
  amount: number;
  description: string;
  isPopular?: boolean;
  onSelect: (amount: number) => void;
  selected: boolean;
}

export default function DonationCard({ amount, description, isPopular, onSelect, selected }: DonationCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(amount)}
      className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
        selected 
          ? 'border-primary bg-primary/5 shadow-md' 
          : 'border-gray-100 bg-white hover:border-secondary shadow-sm'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-orange-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Heart className="w-3 h-3 fill-current" /> Most Popular
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="font-heading text-3xl font-bold text-text">
          ₹{amount}
        </span>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-primary' : 'border-gray-300'
        }`}>
          {selected && <div className="w-3 h-3 rounded-full bg-primary" />}
        </div>
      </div>
      <p className="text-gray-600 font-medium">{description}</p>
    </motion.button>
  );
}
