import { useState, useMemo } from 'react';
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Surah List */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSurahs.map((surah) => (
                <SurahCard
                  key={surah.number}
                  surah={surah}
                  onClick={() => setSelectedSurah(surah)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - تم حذف البطاقات الإضافية والإبقاء على القائمة الدينية فقط */}
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
