import fs from 'node:fs';
import { uniqueById, groupByCause, readAs } from '../src/lib/kb/causes.ts';
const data = new URL('../src/lib/data/', import.meta.url);
const raw = JSON.parse(fs.readFileSync(new URL('reports-4471.json', data)));
const notes = JSON.parse(fs.readFileSync(new URL('desk-notes.json', data)));
const tenants = fs.readdirSync(new URL('tenants/', data)).map(f => JSON.parse(fs.readFileSync(new URL('tenants/' + f, data))));
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const groups = groupByCause(reports, r => tenants.find(t => t.handle === r.tenant));
const evidence = { rawRows: raw.length, uniqueReports: reports.length, duplicateRows: raw.length - uniqueById(raw).length,
  groups: groups.map(({ reports, ...g }) => ({ ...g, count: reports.length, oneDayMove: readAs({reports}, notes.oneDayMove), reportIds: reports.map(r => r.id) })) };
fs.mkdirSync(new URL('../evidence/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../evidence/counts.json', import.meta.url), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence.groups.map(({reportIds,...g})=>g),null,2));
