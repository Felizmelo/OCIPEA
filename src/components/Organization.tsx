import React from 'react';
import { Users, Building2, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Organization = () => {
  const { t } = useLanguage();
  const org = t.organization;

  return (
    <section id="organization" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {org.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {org.sectionSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-6 w-6 text-amber-500 mr-2" />
              {org.researchTeam.title}
            </h3>
            <ul className="space-y-2 text-gray-600">
              {org.researchTeam.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Building2 className="h-6 w-6 text-amber-500 mr-2" />
              {org.organisation.title}
            </h3>
            <ul className="space-y-2 text-gray-600">
              {org.organisation.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-amber-500 mr-2" />
              {org.councils.title}
            </h3>
            <ul className="space-y-2 text-gray-600">
              {org.councils.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organization;
