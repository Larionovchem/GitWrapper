import type { Event } from '@/entities/event/api/event.schema';

export type MonthStructure = {
  month: string;
  count: number;
};

export type ActivityByMonth = {
  months: MonthStructure[];
  bestMonth: MonthStructure | null;
  firstDate: Date | null;
  lastDate: Date | null;
};

const rusMonths = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

export function calculateActivityByMonth(events: readonly Event[]): ActivityByMonth {
  const counts = new Array(12).fill(0);
  let firstDate: Date | null = null;
  let lastDate: Date | null = null;

  events.forEach((el) => {
    counts[el.created_at.getMonth()] += 1;
    if (!firstDate || el.created_at < firstDate) firstDate = el.created_at;
    if (!lastDate || el.created_at > lastDate) lastDate = el.created_at;
  });

  const months = counts.map((count, i) => ({ month: rusMonths[i], count }));

  const bestMonth =
    events.length === 0 ? null : months.reduce((best, m) => (m.count > best.count ? m : best));

  return {
    months,
    bestMonth,
    firstDate,
    lastDate,
  };
}
