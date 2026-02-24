import { useState } from 'react';

export function ReligiousMenu() {
  const [activeTab, setActiveTab] = useState<'duas' | 'tasbih'>('duas');
  const [tasbihCount, setTasbihCount] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-emerald-100 dark:border-slate-800 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold font-amiri">الركن الديني</h2>
      </div>
      <div className="flex border-b border-emerald-100 dark:border-slate-800">
        <button onClick={() => setActiveTab('duas')} className={`flex-1 py-4 text-center ${activeTab === 'duas' ? 'text-emerald-700 bg-emerald-50 dark:bg-slate-800' : 'text-gray-500'}`}>📿 الأدعية</button>
        <button onClick={() => setActiveTab('tasbih')} className={`flex-1 py-4 text-center ${activeTab === 'tasbih' ? 'text-emerald-700 bg-emerald-50 dark:bg-slate-800' : 'text-gray-500'}`}>💫 التسبيح</button>
      </div>
      <div className="p-6">
        {activeTab === 'tasbih' && (
          <div className="text-center">
             <div className="w-32 h-32 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-4xl font-bold mb-4 shadow-md">{tasbihCount}</div>
             <button onClick={() => setTasbihCount(tasbihCount + 1)} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg">تسبيح</button>
             <button onClick={() => setTasbihCount(0)} className="mt-2 text-gray-400 text-sm">تصفير</button>
          </div>
        )}
        {activeTab === 'duas' && <p className="text-center dark:text-white font-amiri">أذكار الصباح والمساء</p>}
      </div>
    </div>
  );
}
