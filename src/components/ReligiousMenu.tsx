import { useState } from 'react';

export function ReligiousMenu() {
  const [activeTab, setActiveTab] = useState<'duas' | 'tasbih'>('duas');
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihText, setTasbihText] = useState('سبحان الله');

  const tasbihOptions = ['سبحان الله', 'الحمد لله', 'الله أكبر', 'أستغفر الله', 'لا إله إلا الله'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-emerald-100 dark:border-slate-800 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold font-amiri">الركن الديني</h2>
      </div>

      <div className="flex border-b border-emerald-100 dark:border-slate-800 text-sm">
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
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
            <p className="text-center font-amiri text-amber-900 dark:text-amber-200">أذكار الصباح والمساء</p>
          </div>
        )}

        {activeTab === 'tasbih' && (
          <div className="text-center">
            <select
              value={tasbihText}
              onChange={(e) => { setTasbihText(e.target.value); setTasbihCount(0); }}
              className="w-full p-2 mb-4 rounded-lg border border-emerald-100 dark:bg-slate-800 dark:text-white"
            >
              {tasbihOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-4xl font-bold shadow-lg mb-4">
              {tasbihCount}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setTasbihCount(0)} className="flex-1 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">تصفير</button>
              <button onClick={() => setTasbihCount(tasbihCount + 1)} className="flex-2 py-2 bg-emerald-600 text-white rounded-lg font-bold">تسبيح</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
