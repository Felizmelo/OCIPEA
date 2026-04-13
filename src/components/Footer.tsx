import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">OCIPEA</h3>
            <p className="text-gray-300">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.contact}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@cappe.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+123 456 7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Africa</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#research" className="hover:text-gray-300 transition-colors">{t.nav.researchUnits}</a></li>
              <li><a href="#laboratories" className="hover:text-gray-300 transition-colors">{t.nav.laboratories}</a></li>
              <li><a href="#services" className="hover:text-gray-300 transition-colors">{t.nav.services}</a></li>
              <li><a href="#organization" className="hover:text-gray-300 transition-colors">{t.nav.organization}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} OCIPEA. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
