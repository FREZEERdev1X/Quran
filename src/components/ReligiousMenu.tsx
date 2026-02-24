import { useState } from 'react';

interface PrayerTime {
  name: string;
  time: string;
  icon: string;
}

interface DailyDua {
  title: string;
  arabic: string;
  translation: string;
  reference: string;
}

export function ReligiousMenu() {
  const [activeTab, setActiveTab] = useState<'prayers' | 'duas' | 'tasbih'>('prayers');
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihText, setTasbihText] = useState('سبحان الله');

  const prayerTimes: PrayerTime[] = [
    { name: 'الفجر', time: '05:30', icon: '🌅' },
    { name: 'الشروق', time: '07:00', icon: '🌄' },
    { name: 'الظهر', time: '12:30', icon: '☀️' },
    { name: 'العصر', time: '15:45', icon: '🌤️' },
    { name: 'المغرب', time: '18:15', icon: '🌅' },
    { name: 'العشاء', time: '19:45', icon: '🌙' },
  ];

  const dailyDuas: DailyDua[] = [
    {
      title: 'دعاء الصباح',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ',
      translation: 'أصبحنا وأصبح الملك لله، والحمد لله لا إله إلا الله',
      reference: 'مسلم'
    },
    {
      title: 'دعاء المساء',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ',
      translation: 'أمسينا وأمسى الملك لله، والحمد لله لا إله إلا الله',
      reference: 'مسلم'
    },
    {
      title: 'دعاء الاستخارة',
      arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
      translation: 'اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك',
      reference: 'البخاري'
    },
    {
      title: 'دعاء السفر',
      arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا',
      translation: 'الله أكبر، الله أكبر، الله أكبر، سبحان الذي سخر لنا هذا',
      reference: 'مسلم'
    }
  ];

  const tasbihOptions = [
    'سبحان الله',
    'الحمد لله',
    'الله أكبر',
    'لا إله إلا الله',
    'أستغفر الله',
    'لا حول ولا قوة إلا بالله'
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <h2 className="text-2xl font-bold font-amiri text-center">القائمة الدينية</h2>
        <p className="text-emerald-100 text-center mt-1">أوقات الصلاة والأذكار</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-emerald-100">
        <button
          onClick={() => setActiveTab('prayers')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'prayers'
              ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          🕌 الصلاة
        </button>
        <button
          onClick={() => setActiveTab('duas')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'duas'
              ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          📿 الأدعية
        </button>
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'tasbih'
              ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          💫 التسبيح
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'prayers' && (
          <div className="space-y-3">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">مواقيت الصلاة (تقريبي)</p>
              <p className="text-xs text-gray-400 mt-1">يرجى ضبطها حسب مدينتك</p>
            </div>
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prayer.icon}</span>
                  <span className="font-bold text-emerald-900">{prayer.name}</span>
                </div>
                <span className="text-lg font-bold text-emerald-700">{prayer.time}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'duas' && (
          <div className="space-y-4">
            {dailyDuas.map((dua, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100"
              >
                <h3 className="font-bold text-amber-900 mb-2">{dua.title}</h3>
                <p className="text-right text-lg text-amber-800 font-amiri leading-loose mb-2">
                  {dua.arabic}
                </p>
                <p className="text-sm text-amber-600 mb-2">{dua.translation}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                  {dua.reference}
                </span>
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

            <p className="text-center text-emerald-600 font-amiri text-xl mt-6">
              {tasbihText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
