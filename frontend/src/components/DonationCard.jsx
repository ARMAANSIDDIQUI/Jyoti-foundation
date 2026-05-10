import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DonationCard({ option }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center flex flex-col h-full">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
        {option.icon}
      </div>
      <h3 className="font-heading text-xl font-bold text-text mb-4">{option.title}</h3>
      <p className="text-gray-600 mb-8 flex-grow">
        {option.description}
      </p>
      <div className="pt-6 border-t border-gray-50">
        <div className="text-2xl font-bold text-text mb-6">₹{option.amount.toLocaleString()}</div>
        <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-not-allowed">
          Available Soon <ArrowRight className="w-4 h-4 opacity-50" />
        </button>
      </div>
    </div>
  );
}

