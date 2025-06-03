import React from "react";

/**
 * Timetable event defined by weekday and period (1–6)
 */
export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export type Period = 1 | 2 | 3 | 4 | 5 | 6;

export interface TimetableEvent {
  day: Day;
  period: Period;
  title: string;
}

const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayLabels: Record<Day, string> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
};

const periods: Period[] = [1, 2, 3, 4, 5, 6];

interface TimeTableProps {
  /** 時間割データ */
  events: TimetableEvent[];
  /** viewport 高に合わせて伸ばすか (デフォルト true) */
  fullHeight?: boolean;
  /** fullHeight 時に差し引く高さ (px) */
  offset?: number;
}

/**
 * Timetable component (Tailwind CSS)
 *
 * グリッドとイベントセルを統合：行⇢列の順でマス目を順番に描画し、
 * 各セルにイベントがあればそのタイトルを表示し、なければ空セルを描画。
 */
const TimeTable: React.FC<TimeTableProps> = ({
  events,
  fullHeight = true,
  offset = 0,
}) => {
  /** ルックアップ用マップ: { "Mon-1": "数学" } */
  const eventMap = React.useMemo(() => {
    const m: Record<string, string> = {};
    events.forEach((e) => {
      m[`${e.day}-${e.period}`] = e.title;
    });
    return m;
  }, [events]);

  // 行テンプレート：40px + 6行を均等分配
  const rows = "[grid-template-rows:40px_repeat(6,minmax(0,1fr))]";
  const containerStyle: React.CSSProperties | undefined = fullHeight
    ? { height: `calc(100vh - ${offset}px)` }
    : undefined;

  return (
    <div className="overflow-x-auto" style={containerStyle}>
      <div
        className={`grid border border-gray-300 [grid-template-columns:60px_repeat(6,1fr)] ${rows} h-full`}
      >
        {/* 左上ダミー */}
        <div className="bg-gray-100 border-b border-gray-300" />

        {/* 曜日ヘッダー（日本語表記） */}
        {days.map((day) => (
          <div
            key={day}
            className="bg-gray-100 border-b border-gray-300 flex items-center justify-center font-semibold text-sm"
          >
            {dayLabels[day]}
          </div>
        ))}

        {/* 本体：period × days */}
        {periods.map((p) => (
          <React.Fragment key={p}>
            {/* 時限ラベル */}
            <div className="border-r border-gray-300 flex items-center justify-center text-xs">
              {p}限
            </div>
            {/* 各曜日セル */}
            {days.map((d) => {
              const key = `${d}-${p}`;
              const title = eventMap[key];
              const base = "flex items-center justify-center text-xs border";
              return title ? (
                <div
                  key={key}
                  className={`${base} border-blue-300 bg-blue-100 rounded text-gray-900 p-1`}
                >
                  {title}
                </div>
              ) : (
                <div key={key} className={`${base} border-gray-200`} />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TimeTable;
