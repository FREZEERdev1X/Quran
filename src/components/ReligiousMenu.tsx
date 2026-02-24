import { useState } from 'react';

export function ReligiousMenu() {
  // تم حذف 'prayers' من الـ Tab
  const [activeTab, setActiveTab] = useState<'duas' | 'tasbih'>('duas');
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihText, setTasbihText] = useState('سبحان الله');

  const dailyDuas = [
    {
      title: 'دعاء الصباح',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ',
      reference: 'مسلم'
    },
    {
      title: 'دعاء المساء',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ',
      reference: 'مسلم'
    }
  ];

  const tasbihOptions = ['سبحان الله', 'الحمد لله', 'الله أكبر', 'أستغفر الله'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-emerald-100 dark:border-slate-800 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold font-amiri">الأذكار والتسبيح</h2>
      </div>

      <div className="flex border-b border-emerald-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('duas')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'duas' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50 dark:bg-slate-800' : 'text-gray-500'
          }`}
        >
          📿 الأدعية
        </button>
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'tasbih' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50 dark:bg-slate-800' : 'text-gray-500'
          }`}
        >
          💫 التسبيح
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'duas' && (
          <div className="space-y-4">
            {dailyDuas.map((dua, index) => (
              <div key={index} className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-2">{dua.title}</h3>
                <p className="text-right text-lg text-amber-800 dark:text-slate-200 font-amiri leading-loose">{dua.arabic}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasbih' && (
          <div className="text-center">
            <select
              value={tasbihText}
              onChange={(e) => {setTasbihText(e.target.value); setTasbihCount(0);}}
              className="w-full p-3 rounded-xl border border-emerald-200 dark:border-slate-700 bg-emerald-50 dark:bg-slate-800 text-emerald-900 dark:text-slate-200 mb-6"
            >
              {tasbihOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-emerald-500 text-white text-4xl font-bold mb-6 shadow-lg">
              {tasbihCount}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setTasbihCount(0)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-slate-700 dark:text-white">تصفير</button>
              <button onClick={() => setTasbihCount(tasbihCount + 1)} className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-md">تسبيح</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
