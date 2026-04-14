import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface TeamMember {
  id: string;
  name_pt: string;
  name_en: string;
  name_fr: string;
  position_pt: string;
  position_en: string;
  position_fr: string;
  bio_pt: string;
  bio_en: string;
  bio_fr: string;
  photo_url: string;
  order: number;
}

const Team = () => {
  const { t, language } = useLanguage();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching team members:', error);
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMemberName = (member: TeamMember): string => {
    switch (language) {
      case 'en':
        return member.name_en;
      case 'fr':
        return member.name_fr;
      default:
        return member.name_pt;
    }
  };

  const getMemberPosition = (member: TeamMember): string => {
    switch (language) {
      case 'en':
        return member.position_en;
      case 'fr':
        return member.position_fr;
      default:
        return member.position_pt;
    }
  };

  const getMemberBio = (member: TeamMember): string => {
    switch (language) {
      case 'en':
        return member.bio_en;
      case 'fr':
        return member.bio_fr;
      default:
        return member.bio_pt;
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t.team.sectionTitle}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t.team.sectionSubtitle}
            </p>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return null;
  }

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.team.sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t.team.sectionSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={member.photo_url}
                  alt={getMemberName(member)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {getMemberName(member)}
                </h3>
                <p className="mt-1 text-sm font-medium text-amber-600">
                  {getMemberPosition(member)}
                </p>
                <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                  {getMemberBio(member)}
                </p>
                <div className="mt-4 flex justify-end">
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={selectedMember !== null}
          onClose={() => setSelectedMember(null)}
          title={selectedMember ? getMemberName(selectedMember) : ''}
        >
          {selectedMember && (
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-40 flex-shrink-0">
                <img
                  src={selectedMember.photo_url}
                  alt={getMemberName(selectedMember)}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-amber-600 mb-4">
                  {getMemberPosition(selectedMember)}
                </p>
                <div className="text-gray-700 whitespace-pre-line space-y-3">
                  {getMemberBio(selectedMember)}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Team;
