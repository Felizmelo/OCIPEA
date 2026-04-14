import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
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
}

const ITEMS_PER_PAGE = 6;

const categoryColors: Record<string, string> = {
  Investigação: 'bg-blue-100 text-blue-800',
  Eventos: 'bg-amber-100 text-amber-800',
  Publicações: 'bg-green-100 text-green-800',
  Geral: 'bg-slate-100 text-slate-700',
};

const categoryKey: Record<string, string> = {
  Investigação: 'investigacao',
  Eventos: 'eventos',
  Publicações: 'publicacoes',
  Geral: 'geral',
};

const News = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('news')
      .select('id, title, summary, content, category, image_url, author, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    setNews(data || []);
    setLoading(false);
  };

  const categories = ['all', ...Array.from(new Set(news.map((n) => n.category)))];

  const filtered =
    selectedCategory === 'all'
      ? news
      : news.filter((n) => n.category === selectedCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'all') return t.news.categories.all;
    const key = categoryKey[cat] as keyof typeof t.news.categories | undefined;
    if (key && t.news.categories[key]) return t.news.categories[key];
    return cat;
  };

  const featured = filtered[0];
  const rest = paginated.slice(featured && currentPage === 1 ? 1 : 0);

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{t.news.sectionTitle}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.news.sectionSubtitle}</p>
          <div className="mt-4 h-1 w-16 bg-amber-500 mx-auto rounded-full" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-lg">{t.news.noNews}</div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            {/* Featured Article */}
            {featured && currentPage === 1 && (
              <div
                className="mb-10 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group flex flex-col md:flex-row"
                onClick={() => setSelectedArticle(featured)}
              >
                {featured.image_url && (
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img
                      src={featured.image_url}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className={`p-8 flex flex-col justify-center ${featured.image_url ? 'md:w-1/2' : 'w-full'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] || 'bg-slate-100 text-slate-700'}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(featured.published_at)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-500 mb-5 leading-relaxed line-clamp-3">{featured.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {t.news.by} {featured.author}
                    </span>
                    <span className="text-sm font-semibold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.news.readMore} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold opacity-20">OCIPEA</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[article.category] || 'bg-slate-100 text-slate-700'}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.published_at)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{article.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                      <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                        {t.news.readMore} <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium border transition ${
                      currentPage === i + 1
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedArticle.image_url && (
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[selectedArticle.category] || 'bg-slate-100 text-slate-700'}`}>
                    {selectedArticle.category}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedArticle.published_at)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                {selectedArticle.title}
              </h2>
              <p className="text-sm text-gray-400 flex items-center gap-1 mb-6">
                <User className="h-4 w-4" />
                {t.news.by} {selectedArticle.author}
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4 font-medium">
                {selectedArticle.summary}
              </p>
              <div className="h-px bg-gray-100 mb-6" />
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
