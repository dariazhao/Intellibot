'use client';

import { useTheme, THEMES, type ThemeId } from '@/components/theme-provider';

export function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {THEMES.map(t => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`group relative rounded-xl border-2 p-1 transition-all ${
              isActive
                ? 'border-primary shadow-lg shadow-primary/20'
                : 'border-border hover:border-primary/40'
            }`}
          >
            {/* Mini preview */}
            <div
              className="rounded-lg overflow-hidden h-24 flex"
              style={{ backgroundColor: t.preview.bg }}
            >
              {/* Mini sidebar */}
              <div
                className="w-5 flex flex-col items-center py-2 gap-1"
                style={{ backgroundColor: t.preview.sidebar }}
              >
                <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: t.preview.accent }} />
                <div className="w-2 h-2 rounded-sm mt-1" style={{ backgroundColor: t.preview.text, opacity: 0.3 }} />
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: t.preview.text, opacity: 0.2 }} />
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: t.preview.text, opacity: 0.2 }} />
              </div>
              {/* Mini content area */}
              <div className="flex-1 p-2 space-y-1.5">
                {/* Top bar */}
                <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: t.preview.text, opacity: 0.1 }} />
                {/* Widget row */}
                <div className="flex gap-1">
                  <div className="flex-1 h-5 rounded" style={{ backgroundColor: t.preview.text, opacity: 0.06, borderTop: `2px solid ${t.preview.accent}` }} />
                  <div className="flex-1 h-5 rounded" style={{ backgroundColor: t.preview.text, opacity: 0.06, borderTop: `2px solid ${t.preview.accent}40` }} />
                  <div className="flex-1 h-5 rounded" style={{ backgroundColor: t.preview.text, opacity: 0.06, borderTop: `2px solid ${t.preview.accent}40` }} />
                </div>
                {/* Table area */}
                <div className="space-y-0.5">
                  <div className="h-1 rounded-full" style={{ backgroundColor: t.preview.text, opacity: 0.08, width: '100%' }} />
                  <div className="h-1 rounded-full" style={{ backgroundColor: t.preview.text, opacity: 0.06, width: '85%' }} />
                  <div className="h-1 rounded-full" style={{ backgroundColor: t.preview.text, opacity: 0.06, width: '92%' }} />
                  <div className="h-1 rounded-full" style={{ backgroundColor: t.preview.text, opacity: 0.06, width: '78%' }} />
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-[13px] font-medium">{t.name}</span>
              {isActive && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            {/* Accent color dot row */}
            <div className="flex items-center gap-1 px-2 pb-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.preview.accent }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.preview.sidebar }} />
              <div className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: t.preview.bg }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
