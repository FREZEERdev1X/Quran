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
  
  // الوضع الافتراضي فاتح (Light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    return surahs.filter(s => s.name.includes(searchQuery) || s.number.toString() === searchQuery);
  }, [searchQuery]);

  if (selectedSurah) return <SurahView surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-emerald-50 dark:bg-slate-950" dir="rtl">
      {/* الهيدر الأصلي مع زر التبديل */}
      <header className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-amiri">المصحف</h1>
                <p className="text-emerald-200 text-sm">القرآن الكريم كاملاً</p>
              </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
              <p className="text-emerald-100 text-xs mb-1">التاريخ الهجري</p>
              <p className="text-xl font-bold font-amiri">{getHijriDate()}</p>
            </div>
            
            {/* زر التبديل (شمس/قمر) */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
            >
              {isDarkMode ? "☀️" : "🌙"}
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
              {filteredSurahs.map(surah => (
                <SurahCard key={surah.number} surah={surah} onClick={() => setSelectedSurah(surah)} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <ReligiousMenu />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
