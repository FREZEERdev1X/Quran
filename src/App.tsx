import { useState, useMemo } from 'react';
import { surahs, Surah } from './data/quran';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SurahCard } from './components/SurahCard';
import { SurahView } from './components/SurahView';
import { SearchBar } from './components/SearchBar';

export function App() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current Hijri date (approximate)
  const getHijriDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      calendar: 'islamic-umalqura'
    } as any;
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', options).format(today);
  };

  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return surahs;
    const query = searchQuery.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.name.includes(searchQuery) ||
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query) ||
        surah.number.toString() === searchQuery
    );
  }, [searchQuery]);

  if (selectedSurah) {
    return <SurahView surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50" dir="rtl">
      <Header currentHijriDate={getHijriDate()} />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Search Bar Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            {/* Filter Info */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-emerald-600">
                {filteredSurahs.length} سورة
                {searchQuery && ` (نتيجة البحث: "${searchQuery}")`}
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  المصحف الشريف
                </span>
              </div>
            </div>
          </div>

          {/* Surah Grid - Made wider since sidebar is gone */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurahs.map((surah) => (
              <SurahCard
                key={surah.number}
                surah={surah}
                onClick={() => setSelectedSurah(surah)}
              />
            ))}
          </div>

          {/* No Results State */}
          {filteredSurahs.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-emerald-700 font-medium text-lg">لا توجد نتائج للبحث</p>
              <p className="text-emerald-500 mt-2">جرب البحث بكلمات أخرى أو رقم السورة</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
