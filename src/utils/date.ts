/** "2026-05-27" → "05.27" */
export function formatMonthDay(isoDate: string) {
  const [, month, day] = isoDate.split("-");
  return `${month}.${day}`;
}

/** "2026-04-01", "2026-04-30" → "04.01 — 04.30" */
export function formatDateRange(startDate: string, endDate: string) {
  return `${formatMonthDay(startDate)} — ${formatMonthDay(endDate)}`;
}
