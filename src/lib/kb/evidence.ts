import { groupByCause, uniqueById, type Report, type Tenant } from './causes';

export function incidentEvidence(raw: Report[], tenants: Tenant[], ticket = 4471) {
  const directory = new Map(tenants.map(t => [t.handle, t]));
  const reports = uniqueById(raw).filter(r => r.mergedInto === ticket);
  const groups = groupByCause(reports, r => directory.get(r.tenant));
  const mismatch = groups.reduce((sum, g) => sum + g.reports.filter(r => r.meta.intakeTag !== g.cause).length, 0);
  const weeks = new Map<string, { received: number; merged: number }>();
  const monday = (iso: string) => {
    const d = new Date(iso.slice(0, 10));
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
    return d.toISOString().slice(0, 10);
  };
  for (const r of reports) {
    for (const [date, field] of [[r.receivedAt, 'received'], [r.mergedAt, 'merged']] as const) {
      if (!date) continue;
      const week = monday(date);
      const row = weeks.get(week) ?? { received: 0, merged: 0 };
      row[field]++;
      weeks.set(week, row);
    }
  }
  return { reports, groups, mismatch, duplicateRows: raw.length - uniqueById(raw).length,
    weeks: [...weeks].sort(([a], [b]) => a.localeCompare(b)).map(([week, row]) => ({ week, ...row })) };
}
