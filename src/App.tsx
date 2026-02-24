import { useState, useMemo, useEffect } from 'react';
import { surahs, Surah } from './data/quran';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SurahCard } from './components/SurahCard';
import { SurahView } from './components/SurahView';
import { SearchBar } from './components/SearchBar';
import { ReligiousMenu } from './components/ReligiousMenu';

export function App() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // تفعيل/تعطيل الوضع الداكن (الإعدادات الأصلية)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const getHijriDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-umalqura'
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
        surah.number.toString() === searchQuery
    );
  }, [searchQuery]);

  if (selectedSurah) {
    return <SurahView surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-emerald-50 dark:bg-slate-950" dir="rtl">
      {/* الهيدر الأصلي مع زر التبديل */}
      <header className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-8 px-4 shadow-lg relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-amiri">المصحف</h1>
                <p className="text-emerald-200 text-sm">القرآن الكريم كاملاً</p>
              </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
              <p className="text-emerald-100 text-xs mb-1">التاريخ الهجري</p>
              <p className="text-xl font-bold font-amiri">{getHijriDate()}</p>
            </div>
            
            {/* زر الوضع الداكن الأصلي */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-inner"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg className="w-6 h-6 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-emerald-100 dark:border-slate-800">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSurahs.map((surah) => (
                <SurahCard key={surah.number} surah={surah} onClick={() => setSelectedSurah(surah)} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReligiousMenu />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
