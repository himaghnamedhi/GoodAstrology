import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { BlogArticle } from '../types/astrology';
import { BookOpen, Calendar, Clock, User, Tag, ArrowRight, Share2, Sparkles, ChevronRight, Check } from 'lucide-react';

interface BlogSectionProps {
  onNavigateToChart: () => void;
  onNavigateToHouses: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onNavigateToChart,
  onNavigateToHouses,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = ['All', 'Kundli Basics', 'House Guide', 'Planetary Transits', 'Remedies & Mantras'];

  const filteredArticles = selectedCategory === 'All'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter(a => a.category === selectedCategory);

  const handleShareArticle = (slug: string) => {
    navigator.clipboard.writeText(window.location.origin + '#' + slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Blog Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-800/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold uppercase tracking-wider border border-amber-600/30">
            goodastrology editorial blog
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-vedic text-amber-100">
            Vedic Astrology & Kundli House Chart Insights
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed">
            In-depth guides, classical scriptural interpretations, house geometry breakdowns, and practical remedies written for modern astrology enthusiasts.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Blogger Layout: Articles Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Center Articles Column */}
        <div className="lg:col-span-8 space-y-6">
          {selectedArticle ? (
            /* Full Article Reader View */
            <article className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5"
              >
                &larr; Back to all articles
              </button>

              <div className="space-y-3 border-b border-stone-200 pb-5">
                <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300">{selectedArticle.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArticle.publishedDate}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-vedic leading-tight">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-amber-700" /> By {selectedArticle.author}
                  </span>
                  <button
                    onClick={() => handleShareArticle(selectedArticle.slug)}
                    className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-medium"
                  >
                    {copiedSlug === selectedArticle.slug ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied Link</span>
                    ) : (
                      <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> Share Guide</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Article Content Render */}
              <div className="prose prose-amber max-w-none text-stone-800 text-sm leading-relaxed space-y-4">
                {selectedArticle.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-bold font-vedic text-amber-950 mt-5 pt-3 border-t border-stone-100">
                        {block.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (block.startsWith('* ') || block.startsWith('1. ') || block.startsWith('2. ')) {
                    return (
                      <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5 my-3">
                        {block.split('\n').map((line, lineIdx) => (
                          <p key={lineIdx} className="text-xs text-stone-800 leading-normal">
                            {line}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-stone-700 leading-relaxed text-sm">
                      {block}
                    </p>
                  );
                })}
              </div>

              {/* Action Banner inside Article */}
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-amber-950 text-sm font-vedic">Explore the Interactive House Chart</h4>
                  <p className="text-xs text-stone-600">See which house is which in your birth chart with our visual diamond chart.</p>
                </div>
                <button
                  onClick={onNavigateToChart}
                  className="px-4 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-950 transition-all shrink-0"
                >
                  Open House Chart &rarr;
                </button>
              </div>
            </article>
          ) : (
            /* Articles List Grid */
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 hover:border-amber-700 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-amber-950 font-vedic group-hover:text-amber-800 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-700" /> {article.author}
                    </span>
                    <span className="text-amber-900 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Blogger Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Blogger Bio Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-200 flex items-center justify-center font-vedic text-xl font-bold shadow-xs">
                GA
              </div>
              <div>
                <h4 className="font-bold text-amber-950 text-sm font-vedic">goodastrology</h4>
                <p className="text-xs text-stone-500">Authentic Vedic Kundli Knowledge</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dedicated to making Vedic astrology clear, precise, and accessible. Learn house geometry, planetary strengths, yogas, and life remedies.
            </p>
          </div>

          {/* Quick House Cheat Sheet Widget */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-amber-900/15 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider font-vedic flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              12 Bhavas Quick Summary:
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>1st H:</strong> Self & Health</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>2nd H:</strong> Wealth & Speech</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>3rd H:</strong> Courage & Siblings</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>4th H:</strong> Mother & Property</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>5th H:</strong> Intellect & Children</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>6th H:</strong> Enemies & Debts</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>7th H:</strong> Spouse & Partner</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>8th H:</strong> Longevity & Occult</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>9th H:</strong> Luck & Dharma</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>10th H:</strong> Career & Status</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>11th H:</strong> Gains & Income</div>
              <div className="p-1.5 rounded bg-white border border-stone-200"><strong>12th H:</strong> Foreign & Moksha</div>
            </div>
            <button
              onClick={onNavigateToHouses}
              className="w-full py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold transition-all text-center"
            >
              Explore All 12 Bhavas &rarr;
            </button>
          </div>

          {/* Navagraha Quick Mantras Box */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2.5">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider font-vedic">
              Daily Navagraha Days:
            </h4>
            <ul className="space-y-1 text-xs text-stone-700">
              <li><strong className="text-amber-950">Sunday:</strong> Sun (Surya) — Vitality & Power</li>
              <li><strong className="text-amber-950">Monday:</strong> Moon (Chandra) — Peace of Mind</li>
              <li><strong className="text-amber-950">Tuesday:</strong> Mars (Mangal) — Courage & Land</li>
              <li><strong className="text-amber-950">Wednesday:</strong> Mercury (Budh) — Business & Intellect</li>
              <li><strong className="text-amber-950">Thursday:</strong> Jupiter (Guru) — Wealth & Wisdom</li>
              <li><strong className="text-amber-950">Friday:</strong> Venus (Shukra) — Luxury & Romance</li>
              <li><strong className="text-amber-950">Saturday:</strong> Saturn (Shani) — Discipline & Karma</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
