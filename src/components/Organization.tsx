import React, { useState } from 'react';
import { Target, Eye, BookOpen, GitBranch, CheckCircle2, Users, Building2, Layers } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type OrgTab = 'mission' | 'vision' | 'history' | 'branches' | 'objectives' | 'structure';

const tabConfig: { key: OrgTab; icon: React.ElementType; color: string }[] = [
  { key: 'mission', icon: Target, color: 'text-amber-600' },
  { key: 'vision', icon: Eye, color: 'text-sky-600' },
  { key: 'history', icon: BookOpen, color: 'text-emerald-600' },
  { key: 'branches', icon: GitBranch, color: 'text-rose-600' },
  { key: 'objectives', icon: CheckCircle2, color: 'text-teal-600' },
  { key: 'structure', icon: Layers, color: 'text-gray-600' },
];

const tabLabels: Record<string, Record<OrgTab, string>> = {
  pt: {
    mission: 'Missão',
    vision: 'Visão',
    history: 'História',
    branches: 'Ramos',
    objectives: 'Objetivos',
    structure: 'Estrutura',
  },
  en: {
    mission: 'Mission',
    vision: 'Vision',
    history: 'History',
    branches: 'Branches',
    objectives: 'Objectives',
    structure: 'Structure',
  },
  fr: {
    mission: 'Mission',
    vision: 'Vision',
    history: 'Histoire',
    branches: 'Branches',
    objectives: 'Objectifs',
    structure: 'Structure',
  },
};

const Organization = () => {
  const { t, language } = useLanguage();
  const org = t.organization;
  const [activeTab, setActiveTab] = useState<OrgTab>('mission');

  const labels = tabLabels[language] || tabLabels.en;

  const activeConfig = tabConfig.find(c => c.key === activeTab)!;
  const ActiveIcon = activeConfig.icon;

  return (
    <section id="organization" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {org.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            {org.sectionSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabConfig.map(({ key, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeTab === key
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${activeTab === key ? 'text-white' : color}`} />
              {labels[key]}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'mission' && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-100 rounded-xl">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{org.mission.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base">{org.mission.text}</p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-sky-100 rounded-xl">
                  <Eye className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{org.vision.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base">{org.vision.text}</p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{org.history.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base">{org.history.text}</p>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-rose-100 rounded-xl">
                  <GitBranch className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{org.branches.title}</h3>
              </div>
              <ul className="space-y-4">
                {org.branches.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-rose-100 shadow-sm">
                    <span className="flex-shrink-0 w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'objectives' && (
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-teal-100 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{org.objectives.title}</h3>
              </div>
              <ul className="space-y-4">
                {org.objectives.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 bg-white rounded-xl px-5 py-4 border border-teal-100 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{org.researchTeam.title}</h3>
                </div>
                <ul className="space-y-2">
                  {org.researchTeam.items.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-sky-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{org.organisation.title}</h3>
                </div>
                <ul className="space-y-2">
                  {org.organisation.items.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{org.councils.title}</h3>
                </div>
                <ul className="space-y-2">
                  {org.councils.items.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Organization;
