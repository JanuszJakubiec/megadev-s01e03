<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import { incidentEvidence } from '#lib/kb/evidence';
  import type { Report, Tenant } from '#lib/kb/causes';
  const tenants = Object.values(import.meta.glob<Tenant>('/src/lib/data/tenants/*.json', { eager: true, import: 'default' }));
  const evidence = incidentEvidence(reports as Report[], tenants);
</script>

<p><strong>{evidence.reports.length} unique reports</strong>, from {reports.length} export rows.
  {evidence.duplicateRows} overlapping rows are not additional reports.
  {evidence.mismatch} intake tags disagree with the tenant-based cause.</p>
<h3>Separate engineering tickets</h3>
<ul>
  {#each evidence.groups as g (g.cause)}
    <li><a href={'https://github.com/JanuszJakubiec/megadev-s01e03/issues/' + (g.cause === 'parser' ? '1' : '2')}>{g.cause}: {g.reports.length} reports</a>,
      {g.tenants} tenants, received {g.firstSeen} to {g.lastSeen}.</li>
  {/each}
</ul>
<details>
  <summary>Weekly received and merged counts (accessible timeline data)</summary>
  <table>
    <thead><tr><th>Week starting</th><th>Received</th><th>Merged</th></tr></thead>
    <tbody>{#each evidence.weeks as w (w.week)}<tr><td>{w.week}</td><td>{w.received}</td><td>{w.merged}</td></tr>{/each}</tbody>
  </table>
</details>
