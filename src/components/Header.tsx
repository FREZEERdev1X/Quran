interface HeaderProps {
  currentHijriDate: string;
}

export function Header({ currentHijriDate }: HeaderProps) {
  return (
    <header className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-8 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Title */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold font-amiri">المصحف</h1>
                <p className="text-emerald-200 text-sm">القرآن الكريم كاملاً</p>
              </div>
            </div>
          </div>

          {/* Date Display */}
          <div className="text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
              <p className="text-emerald-100 text-sm mb-1">التاريخ الهجري</p>
              <p className="text-2xl font-bold font-amiri">{currentHijriDate}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">114</p>
              <p className="text-emerald-200 text-xs">سورة</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">30</p>
              <p className="text-emerald-200 text-xs">جزء</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
