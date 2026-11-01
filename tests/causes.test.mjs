import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { causeOf, dayFirst, sameCause, uniqueById, groupByCause, readAs } from '../src/lib/kb/causes.ts';
import { deskRef } from '../src/lib/kb/desk-ref.ts';
const root = new URL('../src/lib/data/', import.meta.url);
const raw = JSON.parse(fs.readFileSync(new URL('reports-4471.json', root)));
const tenants = fs.readdirSync(new URL('tenants/', root)).map(f => JSON.parse(fs.readFileSync(new URL('tenants/' + f, root))));
const tenant = r => tenants.find(t => t.handle === r.tenant);
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const groups = groupByCause(reports, tenant);

test('export overlap is deduped by ID; every report has exactly one cause', () => {
  assert.equal(raw.length, 427); assert.equal(reports.length, 412);
  assert.deepEqual(Object.fromEntries(groups.map(g => [g.cause, g.reports.length])), {parser:379,hint:33});
  assert.equal(new Set(groups.flatMap(g => g.reports.map(r => r.id))).size, reports.length);
});
test('tenant locale and form determine cause, not browser locale or subject', () => {
  const t = {handle:'test',name:'Test',locale:'en-GB',form:'booking-v3'};
  assert.equal(dayFirst('en-GB'), true); assert.equal(dayFirst('en-US'), false);
  assert.equal(causeOf({channel:'form'}, t), 'hint');
  assert.equal(causeOf({channel:'app'}, t), 'parser');
  assert.equal(causeOf({channel:'form'}, {...t,form:'booking-v2'}), 'parser');
  assert.equal(causeOf({channel:'app'}, {...t,locale:'en-US'}), null);
  assert.equal(sameCause({channel:'email'}, undefined, {channel:'email'}, undefined), false);
  assert.equal(groups.reduce((n,g)=>n+g.reports.filter(r=>r.meta.intakeTag!==g.cause).length,0),38);
});
test('five one-day descriptions stay footnoted under their supplied parser classification', () => {
  const notes = JSON.parse(fs.readFileSync(new URL('desk-notes.json', root)));
  assert.equal(readAs(groups.find(g=>g.cause==='parser'), notes.oneDayMove),5);
  assert.equal(readAs(groups.find(g=>g.cause==='hint'), notes.oneDayMove),0);
});
test('desk stamp is derived and stable', () => {
  const signature='Janusz Jakubiec / Pi / S01E03';
  assert.match(deskRef(signature),/^DR-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
  assert.equal(deskRef(signature),deskRef('  '+signature+'  '));
});
