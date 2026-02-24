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
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-xl font-bold font-amiri">الأذكار والتسبيح</h2>
      </div>

      <div className="flex border-b dark:border-slate-800">
        <button onClick={() => setActiveTab('duas')} className={`flex-1 py-4 ${activeTab === 'duas' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}>📿 الأدعية</button>
        <button onClick={() => setActiveTab('tasbih')} className={`flex-1 py-4 ${activeTab === 'tasbih' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}>💫 التسبيح</button>
      </div>

      <div className="p-6">
        {activeTab === 'duas' ? (
          <div className="space-y-4">
            {dailyDuas.map((dua, i) => (
              <div key={i} className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800/50 border border-amber-100 dark:border-slate-700">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2">{dua.title}</h3>
                <p className="font-amiri text-lg dark:text-emerald-50">{dua.arabic}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <button onClick={() => setTasbihCount(tasbihCount + 1)} className="w-32 h-32 rounded-full bg-emerald-500 text-white text-4xl font-bold shadow-lg mb-4 active:scale-95 transition-transform">
              {tasbihCount}
            </button>
            <button onClick={() => setTasbihCount(0)} className="block w-full py-2 text-gray-400 hover:text-red-400">تصفير</button>
          </div>
        )}
      </div>
    </div>
  );
}
