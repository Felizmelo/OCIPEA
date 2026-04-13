import React, { useState } from 'react';
import { BookOpen, Scale, Globe as Globe2, Users, GraduationCap, Building2, Library, Leaf, MessageCircle } from 'lucide-react';
import Modal from './Modal';
import { useLanguage } from '../i18n/LanguageContext';

const unitIcons = [BookOpen, Library, Scale, Globe2, Users, Building2, GraduationCap, Leaf, MessageCircle];

const ResearchUnits = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const units = t.researchUnits.units;
  const selectedUnit = selectedIndex !== null ? units[selectedIndex] : null;

  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.researchUnits.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t.researchUnits.sectionSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, index) => {
            const Icon = unitIcons[index];
            return (
              <div
                key={index}
                className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex items-center">
                  <Icon className="h-6 w-6 text-amber-500 flex-shrink-0" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {unit.title}
                  </h3>
                </div>
                <p className="mt-2 text-gray-500 text-sm">
                  {unit.description}
                </p>
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          title={selectedUnit?.title || ''}
        >
          <div className="prose prose-amber">
            <p className="text-gray-600 italic mb-4">{selectedUnit?.description}</p>
            <div className="text-gray-700 whitespace-pre-line">
              {selectedUnit?.details}
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default ResearchUnits;
