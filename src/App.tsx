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

  // مراقبة الوضع الداكن لضمان توافق الخلفية مع الزر الموجود في الـ Header
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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
        surah.number.toString() === searchQuery
    );
  }, [searchQuery]);

  if (selectedSurah) {
    return <SurahView surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-emerald-50 dark:bg-slate-950" dir="rtl">
      <Header currentHijriDate={getHijriDate()} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* المحتوى الرئيسي: قائمة السور */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-emerald-100 dark:border-slate-800">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {filteredSurahs.length} سورة
                </p>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                  المصحف الشريف
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSurahs.map((surah) => (
                <SurahCard
                  key={surah.number}
                  surah={surah}
                  onClick={() => setSelectedSurah(surah)}
                />
              ))}
            </div>
          </div>

          {/* الجانب الأيسر: السبحة (ReligiousMenu) فقط */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReligiousMenu />
              {/* تم حذف بطاقات الورد وآخر ما قرأت بنجاح */}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
