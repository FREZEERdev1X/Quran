import { Surah } from '../data/quran';

interface SurahCardProps {
  surah: Surah;
  onClick: () => void;
}

export function SurahCard({ surah, onClick }: SurahCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 text-right shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-emerald-100 hover:to-teal-100 border border-emerald-100"
    >
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-br-full transition-all duration-300 group-hover:from-emerald-400/30 group-hover:to-teal-400/30" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-md">
            {surah.number}
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 font-amiri">{surah.name}</h3>
            <p className="text-sm text-emerald-600">{surah.englishName}</p>
          </div>
        </div>
        
        <div className="text-left">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="text-sm">{surah.numberOfAyahs} آية</span>
            <span className="w-1 h-1 bg-emerald-400 rounded-full" />
            <span className="text-xs bg-emerald-100 px-2 py-1 rounded-full">
              {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
            </span>
          </div>
          <p className="text-xs text-emerald-500 mt-1">{surah.englishNameTranslation}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-emerald-200/30 to-transparent rounded-tl-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
