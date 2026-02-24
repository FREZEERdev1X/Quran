import { Surah } from '../data/quran';

export function SurahCard({ surah, onClick }: { surah: Surah, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl bg-white dark:bg-slate-900 p-6 text-right shadow-sm border border-emerald-100 dark:border-slate-800 hover:scale-[1.02] transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
            {surah.number}
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-50 font-amiri">{surah.name}</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">{surah.englishName}</p>
          </div>
        </div>
        <span className="text-xs bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
          {surah.numberOfAyahs} آية
        </span>
      </div>
    </button>
  );
}
