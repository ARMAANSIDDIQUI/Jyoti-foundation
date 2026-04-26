import { motion } from 'motion/react';
import { Heart, Landmark, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DonationCard from '../components/DonationCard';

export default function Donate() {
  const { t } = useTranslation();

  const donationOptions = [
    {
      id: 1,
      title: t('donate.options.cataract'),
      description: t('donate.options.cataractDesc'),
      amount: 1500,
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 2,
      title: t('donate.options.patient'),
      description: t('donate.options.patientDesc'),
      amount: 500,
      icon: <Landmark className="w-6 h-6" />
    },
    {
      id: 3,
      title: t('donate.options.camp'),
      description: t('donate.options.campDesc'),
      amount: 5000,
      icon: <Info className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">{t('donate.title')}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('donate.subtitle')}
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
            <h2 className="font-heading text-2xl font-bold mb-4">{t('donate.viaUPI')}</h2>
            <p className="text-gray-600 mb-8">{t('donate.upiDesc')}</p>

            
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
            <h2 className="font-heading text-2xl font-bold mb-4 text-center">{t('donate.bankTransfer')}</h2>
            <p className="text-gray-600 mb-8 text-center">{t('donate.bankDesc')}</p>

            
            <div className="space-y-4 bg-gray-50 p-8 rounded-3xl border border-gray-100 flex-grow">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('donate.accHolder')}</span>
                <span className="text-lg font-bold text-text">{t('donate.accHolderName')}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('donate.accNum')}</span>
                <span className="text-lg font-bold text-text tracking-wider">{t('donate.accNumValue')}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('donate.ifsc')}</span>
                <span className="text-lg font-bold text-primary tracking-widest">{t('donate.ifscValue')}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('donate.bankName')}</span>
                <span className="text-lg font-bold text-text">{t('donate.bankNameValue')}</span>
              </div>
            </div>

          </motion.div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto text-center mt-12">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center justify-center gap-3">
            <Info className="w-6 h-6 text-primary" /> {t('donate.taxInfoTitle')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('donate.taxInfoDesc')}
          </p>
          <Link to="/contact" className="inline-block bg-primary text-white font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition-all">
            {t('donate.contactReceipt')}
          </Link>
        </div>


      </div>
    </div>
  );
}

