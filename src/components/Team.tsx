import React, { useState, useEffect } from 'react';
import { ExternalLink, User } from 'lucide-react';
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
  photo_path: string;
  order: number;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';

const getPhotoUrl = (path: string) => {
  if (!path) return '';
  return `${supabaseUrl}/storage/v1/object/public/team-photos/${path}`;
};

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

  const getName = (m: TeamMember) =>
    language === 'en' ? m.name_en : language === 'fr' ? m.name_fr : m.name_pt;

  const getPosition = (m: TeamMember) =>
    language === 'en' ? m.position_en : language === 'fr' ? m.position_fr : m.position_pt;

  const getBio = (m: TeamMember) =>
    language === 'en' ? m.bio_en : language === 'fr' ? m.bio_fr : m.bio_pt;

  if (loading) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t.team.sectionTitle}</h2>
            <p className="mt-4 text-xl text-gray-600">{t.team.sectionSubtitle}</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t.team.sectionTitle}</h2>
          <p className="mt-4 text-xl text-gray-600">{t.team.sectionSubtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            const photoUrl = getPhotoUrl(member.photo_path);
            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={getName(member)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-20 w-20 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{getName(member)}</h3>
                  <p className="mt-1 text-sm font-semibold text-amber-600">{getPosition(member)}</p>
                  <p className="mt-3 text-gray-500 text-sm line-clamp-3">{getBio(member)}</p>
                  <div className="mt-4 flex justify-end">
                    <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={selectedMember !== null}
          onClose={() => setSelectedMember(null)}
          title={selectedMember ? getName(selectedMember) : ''}
        >
          {selectedMember && (
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-44 flex-shrink-0">
                {getPhotoUrl(selectedMember.photo_path) ? (
                  <img
                    src={getPhotoUrl(selectedMember.photo_path)}
                    alt={getName(selectedMember)}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-amber-600 mb-4">{getPosition(selectedMember)}</p>
                <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                  {getBio(selectedMember)}
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
