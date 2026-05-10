import type { Event } from '@/entities/event/api/event.schema';

export type HourStructure = {
  hour: string;
  count: number;
};

export type ActivityTimeByHour = {
  firstDate: Date | null;
  lastDate: Date | null;
  totalEvents: number;
  hours: HourStructure[];
};

export function calculateActivityByHour(events: readonly Event[]): ActivityTimeByHour {
  const hours = new Array(24).fill(0);
  let firstDate: Date | null = null;
  let lastDate: Date | null = null;

  events.forEach((el) => {
    hours[el.created_at.getHours()] += 1;
    if (!firstDate || el.created_at < firstDate) firstDate = el.created_at;
    if (!lastDate || el.created_at > lastDate) lastDate = el.created_at;
  });

  return {
    hours: hours.map((count, hour) => ({ hour: `${hour}:00`, count })),
    firstDate,
    lastDate,
    totalEvents: events.length,
  };
}
