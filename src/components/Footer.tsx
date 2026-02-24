export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-8 h-8 text-emerald-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <h3 className="text-2xl font-bold font-amiri">المصحف</h3>
          </div>
          <p className="text-emerald-200 mb-4">
            تطبيق القرآن الكريم - قراءة واستماع وتدبر
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-emerald-300">
            <span>📖 114 سورة</span>
            <span>✨ قراءة مجانية</span>
            <span>🎧 استماع متاح</span>
          </div>
          <div className="mt-6 pt-6 border-t border-emerald-700">
            <p className="text-emerald-400 text-xs">
              صدقة جارية - نسألكم الدعاء
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
