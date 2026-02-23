import { useState, useEffect } from 'react';
import { Surah } from '../data/quran';

interface SurahViewProps {
  surah: Surah;
  onBack: () => void;
}

export function SurahView({ surah, onBack }: SurahViewProps) {
  const [ayahs, setAyahs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(28);

  useEffect(() => {
    const fetchAyahs = async () => {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/ar.alafasy`);
        const data = await response.json();
        
        if (data.code === 200) {
          const ayahTexts = data.data.ayahs.map((ayah: any) => {
            const text = ayah.text;
            if (ayah.numberInSurah === 1 && surah.number !== 1 && surah.number !== 9) {
              return text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '').trim();
            }
            return text;
          });
          setAyahs(ayahTexts);
        }
      } catch (error) {
        console.error('Error fetching ayahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, [surah.number]);

  const basmalah = surah.number !== 1 && surah.number !== 9;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">عودة</span>
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-900 font-amiri">{surah.name}</h2>
              <p className="text-sm text-emerald-600">{surah.englishName}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(20, fontSize - 2))}
                className="w-10 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-700 transition-colors"
              >
                <span className="text-lg font-bold">A-</span>
              </button>
              <button
                onClick={() => setFontSize(Math.min(40, fontSize + 2))}
                className="w-10 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-700 transition-colors"
              >
                <span className="text-xl font-bold">A+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Surah Info Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <span className="text-3xl font-bold">{surah.number}</span>
              </div>
              <h1 className="text-4xl font-bold font-amiri mb-2">{surah.name}</h1>
              <p className="text-emerald-100 mb-4">{surah.englishNameTranslation}</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {surah.numberOfAyahs} آية
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                </span>
              </div>
            </div>

            {/* Basmalah */}
            {basmalah && (
              <div className="text-center py-8">
                <p className="text-3xl font-amiri text-emerald-800 leading-loose">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* Ayahs */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-100">
              <div className="text-right leading-loose" style={{ fontSize: `${fontSize}px` }}>
                {ayahs.map((ayah, index) => (
                  <span key={index} className="inline">
                    <span className="font-amiri text-emerald-900">{ayah}</span>
                    <span className="inline-flex items-center justify-center w-10 h-10 mx-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold align-middle">
                      {index + 1}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
