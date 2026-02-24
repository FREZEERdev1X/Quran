import { Surah } from '../data/quran';

export function SurahCard({ surah, onClick }: { surah: Surah, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl p-6 text-right shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800"
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white font-bold shadow-md">
            {surah.number}
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-50 font-amiri transition-colors">
              {surah.name}
            </h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              {surah.englishName}
            </p>
          </div>
        </div>
        
        <div className="text-left">
          <span className="text-xs bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full transition-colors">
            {surah.numberOfAyahs} آية
          </span>
        </div>
      </div>
    </button>
  );
}
