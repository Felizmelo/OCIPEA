import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  published_at: string;
  is_published: boolean;
}

const emptyForm: Omit<NewsItem, 'id'> = {
  title: '',
  summary: '',
  content: '',
  category: 'Geral',
  image_url: '',
  author: '',
  published_at: new Date().toISOString().slice(0, 16),
  is_published: false,
};

const categories = ['Investigação', 'Eventos', 'Publicações', 'Geral'];

const NewsAdmin = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });
    setNews(data || []);
    setLoading(false);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (item: NewsItem) => {
    setForm({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      image_url: item.image_url || '',
      author: item.author,
      published_at: item.published_at.slice(0, 16),
      is_published: item.is_published,
    });
    setEditing(item);
    setCreating(false);
  };

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.summary || !form.content || !form.author) return;
    setSaving(true);

    const payload = {
      ...form,
      published_at: new Date(form.published_at).toISOString(),
    };

    if (editing) {
      await supabase.from('news').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('news').insert(payload);
    }

    setSaving(false);
    closeForm();
    fetchNews();
  };

  const togglePublish = async (item: NewsItem) => {
    await supabase.from('news').update({ is_published: !item.is_published }).eq('id', item.id);
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('news').delete().eq('id', id);
    setDeleteConfirm(null);
    fetchNews();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  if (creating || editing) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={closeForm}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à lista
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editing ? 'Editar Notícia' : 'Nova Notícia'}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  placeholder="Título da notícia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resumo *</label>
                <textarea
                  rows={3}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                  placeholder="Breve resumo do artigo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo *</label>
                <textarea
                  rows={10}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none font-mono"
                  placeholder="Conteúdo completo do artigo..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Nome do autor"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
                  <input
                    type="datetime-local"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-slate-900"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                  Publicar imediatamente
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.summary || !form.content || !form.author}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'A guardar...' : 'Guardar'}
                </button>
                <button
                  onClick={closeForm}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Gestão de Notícias</h1>
            <p className="text-gray-500 text-sm mt-1">OCIPEA — Publicações do Observatório</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Nova Notícia
          </button>
        </div>

        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-16 animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-4">Nenhuma notícia criada ainda.</p>
            <button onClick={openCreate} className="text-amber-600 font-semibold hover:underline text-sm">
              Criar a primeira notícia
            </button>
          </div>
        )}

        {!loading && news.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Título</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Estado</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                      <div className="truncate">{item.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">{item.summary}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden lg:table-cell">
                      {formatDate(item.published_at)}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(item)}
                          title={item.is_published ? 'Despublicar' : 'Publicar'}
                          className="p-1.5 text-gray-400 hover:text-slate-900 transition-colors"
                        >
                          {item.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-400 hover:text-slate-900 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-gray-900 mb-2">Confirmar eliminação</h3>
            <p className="text-sm text-gray-500 mb-5">Esta acção é irreversível. A notícia será permanentemente eliminada.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;
