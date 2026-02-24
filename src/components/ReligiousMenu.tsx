import { useState } from 'react';

interface DailyDua {
  title: string;
  arabic: string;
  translation: string;
  reference: string;
}

export function ReligiousMenu() {
  // تم حذف 'prayers' من التبويبات
  const [activeTab, setActiveTab] = useState<'duas' | 'tasbih'>('duas');
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihText, setTasbihText] = useState('سبحان الله');

  const dailyDuas: DailyDua[] = [
    {
      title: 'دعاء الصباح',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ',
      translation: 'أصبحنا وأصبح الملك لله والحمد لله..',
      reference: 'Muslim'
    }
  ];

  const tasbihOptions = ['سبحان الله', 'الحمد لله', 'الله أكبر', 'أستغفر الله', 'لا إله إلا الله'];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold font-amiri">الركن الديني</h2>
      </div>

      <div className="flex border-b border-emerald-100">
        <button
          onClick={() => setActiveTab('duas')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'duas' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          📿 الأدعية
        </button>
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'tasbih' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          💫 التسبيح
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'duas' && (
          <div className="space-y-4">
            {dailyDuas.map((dua, index) => (
              <div key={index} className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-2">{dua.title}</h3>
                <p className="text-right text-lg text-amber-800 font-amiri leading-loose mb-2">{dua.arabic}</p>
                <div className="flex justify-between items-center text-xs text-amber-600 border-t border-amber-200 pt-2">
                  <span>المصدر: {dua.reference}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasbih' && (
          <div className="text-center">
            <div className="mb-6">
              <select
                value={tasbihText}
                onChange={(e) => {
                  setTasbihText(e.target.value);
                  setTasbihCount(0);
                }}
                className="w-full p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {tasbihOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
                <span className="text-5xl font-bold">{tasbihCount}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setTasbihCount(0)}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
              >
                تصفير
              </button>
              <button
                onClick={() => setTasbihCount(tasbihCount + 1)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold transition-colors shadow-md"
              >
                تسبيح
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
