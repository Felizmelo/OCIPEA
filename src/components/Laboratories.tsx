import React from 'react';
import { FlaskRound as Flask } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Laboratories = () => {
  const { t } = useLanguage();
  const labs = t.laboratories;

  return (
    <section id="laboratories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {labs.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {labs.sectionSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {labs.labs.map((lab, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <Flask className="h-6 w-6 text-amber-500 flex-shrink-0" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  {lab.title}
                </h3>
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                {lab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Laboratories;
