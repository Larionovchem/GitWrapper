import type { Event } from '@/entities/event/api/event.schema';

export type WeekdaysStructure = {
  day: string;
  count: number;
};

export type ActivityTimeByWeekdays = {
  days: WeekdaysStructure[];
  firstDate: Date | null;
  lastDate: Date | null;
};

export function calculateActivityByWeekday(events: readonly Event[]) {
  const days = new Array(7).fill(0);
  let firstDate: Date | null = null;
  let lastDate: Date | null = null;

  events.forEach((el) => {
    const day = el.created_at.getDay();
    days[day] += 1;
    if (!firstDate || el.created_at < firstDate) firstDate = el.created_at;
    if (!lastDate || el.created_at > lastDate) lastDate = el.created_at;
  });
  const rusDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  return {
    days: days.map((count, day) => ({ day: `${rusDays[day]}`, count })),
    firstDate: firstDate,
    lastDate: lastDate,
  };
}
