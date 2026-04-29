import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center">
                <img src="/logo_header.png" alt="Jyoti Foundation Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex flex-col text-[#0b428d] font-bold leading-none">
                <span className="text-2xl tracking-tight uppercase">{t('common.brandName')}</span>
                <span className="text-xs tracking-[0.2em] mt-0.5 opacity-90">{t('common.brandType')}</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('common.aboutShort')}
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">{t('common.nav.about')}</Link></li>
              <li><Link to="/our-work" className="text-gray-600 hover:text-primary transition-colors">{t('footer.hospitals')}</Link></li>
              <li><Link to="/donate" className="text-gray-600 hover:text-primary transition-colors">{t('common.nav.donate')}</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">{t('common.nav.contact')}</Link></li>
            </ul>
          </div>


          {/* Hospitals */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">{t('footer.hospitals')}</h3>
            <ul className="space-y-4">
              <li className="text-gray-600">
                <span className="block font-medium text-text mb-1">Apollo Laser Eye Hospital</span>
                Moradabad, UP
              </li>
              <li className="text-gray-600">
                <span className="block font-medium text-text mb-1">Dr Vinod Hospital</span>
                Hasanpur, UP
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="block font-bold text-gray-800">Registered Office:</span>
                  <span className="block mb-3">A-75 Ashiyana, Moradabad</span>
                  <span className="block font-bold text-gray-800">Moradabad Correspondence:</span>
                  <span className="block mb-3">Apollo Laser Eye Hospital</span>
                  <span className="block font-bold text-gray-800">Hasanpur Correspondence:</span>
                  <span className="block">Dr Vinod Hospital</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 94122 36889</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>jyotifoundation@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {t('common.organizationSubtitle')} Foundation. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
