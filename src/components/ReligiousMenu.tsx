import { useState } from 'react';

export function ReligiousMenu() {
  const [activeTab, setActiveTab] = useState<'duas' | 'tasbih'>('duas');
  const [tasbihCount, setTasbihCount] = useState(0);

  const dailyDuas = [
    { title: 'دعاء الصباح', arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ' },
    { title: 'دعاء المساء', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-emerald-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white text-center">
        <h2 className="text-lg font-bold font-amiri">الأذكار والتسبيح</h2>
      </div>

      <div className="flex border-b dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('duas')} 
          className={`flex-1 py-3 text-sm transition-colors ${activeTab === 'duas' ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-600 font-bold' : 'text-gray-500'}`}
        >
          📿 الأدعية
        </button>
        <button 
          onClick={() => setActiveTab('tasbih')} 
          className={`flex-1 py-3 text-sm transition-colors ${activeTab === 'tasbih' ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-600 font-bold' : 'text-gray-500'}`}
        >
          💫 التسبيح
        </button>
      </div>

      <div className="p-5">
        {activeTab === 'duas' ? (
          <div className="space-y-3">
            {dailyDuas.map((dua, i) => (
              <div key={i} className="p-4 rounded-xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700 transition-colors">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">{dua.title}</h3>
                <p className="font-amiri text-base leading-relaxed dark:text-slate-200">{dua.arabic}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <button 
              onClick={() => setTasbihCount(tasbihCount + 1)} 
              className="w-28 h-28 rounded-full bg-emerald-500 text-white text-3xl font-bold shadow-lg mb-4 active:scale-90 transition-transform"
            >
              {tasbihCount}
            </button>
            <button 
              onClick={() => setTasbihCount(0)} 
              className="block w-full text-xs text-gray-400 hover:text-emerald-500 transition-colors"
            >
              إعادة العداد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
