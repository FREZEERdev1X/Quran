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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const getHijriDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-umalqura'
    } as any;
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', options).format(new Date());
  };

  const filteredSurahs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return surahs.filter(s => s.name.includes(query) || s.number.toString() === query);
  }, [searchQuery]);

  if (selectedSurah) {
    return <SurahView surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-950" dir="rtl">
      <div className="relative">
        <Header currentHijriDate={getHijriDate()} />
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 left-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-50"
        >
          {darkMode ? '☀️ وضع النهار' : '🌙 وضع الليل'}
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-emerald-100 dark:border-slate-800 transition-colors">
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
