import React, { useState } from 'react';
import { FileText, Users, MessageCircle, GraduationCap } from 'lucide-react';
import Modal from './Modal';
import { useLanguage } from '../i18n/LanguageContext';

const serviceIcons = [FileText, Users, MessageCircle, GraduationCap];

const Services = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = t.services.items;
  const selectedService = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.services.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t.services.sectionSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <div
                key={index}
                className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="h-8 w-8 text-amber-500" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-500 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          title={selectedService?.title || ''}
        >
          <div className="prose prose-amber">
            <p className="text-gray-600 italic mb-4">{selectedService?.description}</p>
            <div className="text-gray-700 whitespace-pre-line">
              {selectedService?.details}
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Services;
