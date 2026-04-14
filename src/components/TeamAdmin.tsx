import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, X, Save, ChevronDown, ChevronUp, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const emptyMember = (): Omit<TeamMember, 'id'> => ({
  name_pt: '',
  name_en: '',
  name_fr: '',
  position_pt: '',
  position_en: '',
  position_fr: '',
  bio_pt: '',
  bio_en: '',
  bio_fr: '',
  photo_path: '',
  order: 0,
});

interface MemberFormProps {
  member: TeamMember;
  onSave: (member: TeamMember) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  getPhotoUrl: (path: string) => string;
}

const MemberForm = ({ member, onSave, onDelete, getPhotoUrl }: MemberFormProps) => {
  const [form, setForm] = useState<TeamMember>(member);
  const [expanded, setExpanded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(member.photo_path ? getPhotoUrl(member.photo_path) : '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef(form);
  formRef.current = form;

  const handleChange = (field: keyof TeamMember, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${member.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(path, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('team_members')
        .update({ photo_path: path })
        .eq('id', member.id);

      if (updateError) throw updateError;

      setForm(prev => ({ ...prev, photo_path: path }));
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Erro ao carregar foto. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formRef.current);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      alert('Erro ao guardar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem a certeza que quer eliminar este membro?')) return;
    setDeleting(true);
    try {
      await onDelete(member.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{form.name_pt || 'Sem nome'}</p>
          <p className="text-sm text-amber-600 truncate">{form.position_pt || 'Sem cargo'}</p>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </div>

      {expanded && (
        <div className="border-t border-gray-100 p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
              {previewUrl ? (
                <img src={previewUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <User className="h-10 w-10" />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-60"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'A carregar...' : 'Carregar Foto'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['pt', 'en', 'fr'] as const).map(lang => (
              <div key={lang} className="space-y-3">
                <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-500 border-b pb-1">
                  {lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Français'}
                </h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nome</label>
                  <input
                    type="text"
                    value={form[`name_${lang}`]}
                    onChange={e => handleChange(`name_${lang}`, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cargo</label>
                  <input
                    type="text"
                    value={form[`position_${lang}`]}
                    onChange={e => handleChange(`position_${lang}`, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Biografia / Currículo</label>
                  <textarea
                    value={form[`bio_${lang}`]}
                    onChange={e => handleChange(`bio_${lang}`, e.target.value)}
                    rows={6}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600">Ordem</label>
            <input
              type="number"
              value={form.order}
              onChange={e => handleChange('order', parseInt(e.target.value) || 0)}
              className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-60 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? 'A eliminar...' : 'Eliminar Membro'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors text-white ${saveSuccess ? 'bg-green-500' : 'bg-amber-500 hover:bg-amber-600'}`}
            >
              <Save className="h-4 w-4" />
              {saving ? 'A guardar...' : saveSuccess ? 'Guardado!' : 'Guardar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface NewMemberFormProps {
  onCreated: () => void;
  getPhotoUrl: (path: string) => string;
}

const NewMemberForm = ({ onCreated, getPhotoUrl }: NewMemberFormProps) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyMember());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [tempPhotoFile, setTempPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof Omit<TeamMember, 'id'>, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTempPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([form])
        .select()
        .single();

      if (error) throw error;

      if (tempPhotoFile && data) {
        setUploading(true);
        const ext = tempPhotoFile.name.split('.').pop();
        const path = `${data.id}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('team-photos')
          .upload(path, tempPhotoFile, { upsert: true });

        if (!uploadError) {
          await supabase
            .from('team_members')
            .update({ photo_path: path })
            .eq('id', data.id);
        }
        setUploading(false);
      }

      setForm(emptyMember());
      setPreviewUrl('');
      setTempPhotoFile(null);
      setShow(false);
      onCreated();
    } catch (err) {
      console.error('Create error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-6 text-gray-500 hover:border-amber-400 hover:text-amber-500 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Adicionar Membro
      </button>
    );
  }

  return (
    <div className="border-2 border-amber-400 rounded-xl p-6 bg-amber-50 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Novo Membro</h3>
        <button onClick={() => setShow(false)} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <User className="h-8 w-8" />
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Escolher Foto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['pt', 'en', 'fr'] as const).map(lang => (
          <div key={lang} className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-gray-500 border-b pb-1">
              {lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Français'}
            </h4>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nome</label>
              <input
                type="text"
                value={form[`name_${lang}`]}
                onChange={e => handleChange(`name_${lang}`, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cargo</label>
              <input
                type="text"
                value={form[`position_${lang}`]}
                onChange={e => handleChange(`position_${lang}`, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Biografia / Currículo</label>
              <textarea
                value={form[`bio_${lang}`]}
                onChange={e => handleChange(`bio_${lang}`, e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-600">Ordem</label>
        <input
          type="number"
          value={form.order}
          onChange={e => handleChange('order', parseInt(e.target.value) || 0)}
          className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          disabled={saving || uploading}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors"
        >
          <Save className="h-4 w-4" />
          {saving ? 'A criar...' : uploading ? 'A carregar foto...' : 'Criar Membro'}
        </button>
      </div>
    </div>
  );
};

const TeamAdmin = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';

  const getPhotoUrl = (path: string) => {
    if (!path) return '';
    return `${supabaseUrl}/storage/v1/object/public/team-photos/${path}`;
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });

      if (!error) setMembers(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (member: TeamMember) => {
    const { error } = await supabase
      .from('team_members')
      .update({
        name_pt: member.name_pt,
        name_en: member.name_en,
        name_fr: member.name_fr,
        position_pt: member.position_pt,
        position_en: member.position_en,
        position_fr: member.position_fr,
        bio_pt: member.bio_pt,
        bio_en: member.bio_en,
        bio_fr: member.bio_fr,
        photo_path: member.photo_path,
        order: member.order,
      })
      .eq('id', member.id);

    if (error) {
      console.error('Save error:', error);
      throw error;
    }
    await fetchMembers();
  };

  const handleDelete = async (id: string) => {
    const member = members.find(m => m.id === id);
    if (member?.photo_path) {
      await supabase.storage.from('team-photos').remove([member.photo_path]);
    }
    await supabase.from('team_members').delete().eq('id', id);
    await fetchMembers();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestão da Equipa</h1>
          <p className="mt-2 text-gray-500">Adicione, edite ou elimine membros da equipa. As fotos são carregadas do seu computador.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {members.map(member => (
              <MemberForm
                key={member.id}
                member={member}
                onSave={handleSave}
                onDelete={handleDelete}
                getPhotoUrl={getPhotoUrl}
              />
            ))}
            <NewMemberForm onCreated={fetchMembers} getPhotoUrl={getPhotoUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamAdmin;
