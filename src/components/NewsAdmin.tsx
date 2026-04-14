import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, ArrowLeft, Newspaper, CheckCircle, FileText, LayoutGrid, List, Calendar, User, Tag, Image as ImageIcon, AlignLeft, Type, Search } from 'lucide-react';
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

type View = 'list' | 'create' | 'edit';

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

const categoryColors: Record<string, string> = {
  Investigação: 'bg-blue-100 text-blue-700',
  Eventos: 'bg-amber-100 text-amber-700',
  Publicações: 'bg-green-100 text-green-700',
  Geral: 'bg-slate-100 text-slate-600',
};

const NewsAdmin = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [displayMode, setDisplayMode] = useState<'table' | 'cards'>('table');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { fetchNews(); }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

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
    setForm({ ...emptyForm, published_at: new Date().toISOString().slice(0, 16) });
    setEditingItem(null);
    setView('create');
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
    setEditingItem(item);
    setView('edit');
  };

  const handleSave = async () => {
    if (!form.title || !form.summary || !form.content || !form.author) return;
    setSaving(true);
    const payload = { ...form, published_at: new Date(form.published_at).toISOString() };

    if (editingItem) {
      await supabase.from('news').update(payload).eq('id', editingItem.id);
      setToast('Notícia actualizada com sucesso.');
    } else {
      await supabase.from('news').insert(payload);
      setToast('Notícia criada com sucesso.');
    }

    setSaving(false);
    setView('list');
    fetchNews();
  };

  const togglePublish = async (item: NewsItem) => {
    await supabase.from('news').update({ is_published: !item.is_published }).eq('id', item.id);
    setToast(item.is_published ? 'Notícia retirada de publicação.' : 'Notícia publicada.');
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('news').delete().eq('id', id);
    setDeleteConfirm(null);
    setToast('Notícia eliminada.');
    fetchNews();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

  const filtered = news.filter((n) => {
    const matchCat = filterCat === 'all' || n.category === filterCat;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = {
    total: news.length,
    published: news.filter((n) => n.is_published).length,
    drafts: news.filter((n) => !n.is_published).length,
  };

  const isFormValid = form.title && form.summary && form.content && form.author;

  if (view === 'create' || view === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <img src="/Designer.png" alt="OCIPEA" className="h-7 w-7 object-contain" />
            <span className="text-sm font-semibold text-gray-700">OCIPEA</span>
            <span className="text-gray-300 text-sm">/</span>
            <span className="text-sm text-gray-500">{view === 'create' ? 'Nova Notícia' : 'Editar Notícia'}</span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm border-b border-gray-50 pb-3">
                  <Type className="h-4 w-4" /> Conteúdo
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition"
                    placeholder="Escreva o título da notícia..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Resumo / Chapeau *
                  </label>
                  <textarea
                    rows={3}
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 resize-none transition"
                    placeholder="Parágrafo introdutório ou resumo da notícia..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Corpo do Artigo *
                  </label>
                  <textarea
                    rows={16}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 resize-y transition leading-relaxed"
                    placeholder="Escreva o artigo completo aqui..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{form.content.length} caracteres</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm border-b border-gray-50 pb-3">
                  <AlignLeft className="h-4 w-4" /> Publicação
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Estado
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setForm({ ...form, is_published: false })}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition ${
                        !form.is_published
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Rascunho
                    </button>
                    <button
                      onClick={() => setForm({ ...form, is_published: true })}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition ${
                        form.is_published
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Publicado
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    <Calendar className="h-3.5 w-3.5 inline mr-1" />Data
                  </label>
                  <input
                    type="datetime-local"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    <Tag className="h-3.5 w-3.5 inline mr-1" />Categoria
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white transition"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    <User className="h-3.5 w-3.5 inline mr-1" />Autor *
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    placeholder="Nome do autor"
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'A guardar...' : view === 'create' ? 'Criar Notícia' : 'Guardar Alterações'}
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm border-b border-gray-50 pb-3">
                  <ImageIcon className="h-4 w-4" /> Imagem de Capa
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
                {form.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 aspect-video">
                    <img
                      src={form.image_url}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
                {!form.image_url && (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 aspect-video flex items-center justify-center text-gray-300">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Designer.png" alt="OCIPEA" className="h-8 w-8 object-contain" />
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Gestão de Notícias</h1>
              <p className="text-xs text-gray-400">OCIPEA — Observatório</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/#news" target="_blank" rel="noreferrer"
              className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors hidden sm:block">
              Ver página pública
            </a>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              <Plus className="h-4 w-4" /> Nova Notícia
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="p-2.5 bg-slate-100 rounded-lg">
              <Newspaper className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-400 font-medium">Total de Artigos</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{stats.published}</p>
              <p className="text-xs text-gray-400 font-medium">Publicados</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{stats.drafts}</p>
              <p className="text-xs text-gray-400 font-medium">Rascunhos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por título ou autor..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white transition"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setDisplayMode('table')}
                  className={`p-2 transition ${displayMode === 'table' ? 'bg-slate-900 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDisplayMode('cards')}
                  className={`p-2 transition ${displayMode === 'cards' ? 'bg-slate-900 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-50 rounded-lg animate-pulse" />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Newspaper className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma notícia encontrada.</p>
              <button onClick={openCreate} className="mt-3 text-amber-600 text-sm font-semibold hover:underline">
                Criar nova notícia
              </button>
            </div>
          )}

          {!loading && filtered.length > 0 && displayMode === 'table' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Artigo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Data</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Estado</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          <img src={item.image_url} alt="" className="h-10 w-14 rounded object-cover flex-shrink-0" />
                        ) : (
                          <div className="h-10 w-14 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate max-w-xs">{item.title}</div>
                          <div className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{item.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-slate-100 text-slate-600'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs hidden lg:table-cell whitespace-nowrap">
                      {formatDate(item.published_at)}
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => togglePublish(item)}
                          title={item.is_published ? 'Despublicar' : 'Publicar'}
                          className="p-1.5 rounded-md text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition"
                        >
                          {item.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filtered.length > 0 && displayMode === 'cards' && (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition group">
                  {item.image_url ? (
                    <div className="h-36 overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-36 bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[item.category] || 'bg-slate-100 text-slate-600'}`}>
                        {item.category}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-3">{item.author} · {formatDate(item.published_at)}</p>
                    <div className="flex items-center gap-1 pt-2 border-t border-gray-50">
                      <button onClick={() => togglePublish(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-gray-500 hover:text-slate-900 hover:bg-gray-50 rounded-md transition">
                        {item.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        {item.is_published ? 'Retirar' : 'Publicar'}
                      </button>
                      <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-gray-500 hover:text-slate-900 hover:bg-gray-50 rounded-md transition">
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </button>
                      <button onClick={() => setDeleteConfirm(item.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition">
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900">Eliminar notícia?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">Esta acção é irreversível. O artigo será permanentemente eliminado da base de dados.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Eliminar
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <CheckCircle className="h-4 w-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;
