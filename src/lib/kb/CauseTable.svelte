<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, readAs, ticketCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  let { ticket, issueLinks = {} }: { ticket: number; issueLinks?: Record<string, string> } = $props();

  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf));
  const owner = $derived(ticketCause(groups, ticket));
  const tags = (g: { taggedAs: Record<string, number> }) =>
    Object.entries(g.taggedAs)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
</script>

<p class="sum">
  <strong>{merged.length}</strong> reports merged into #{ticket} ·
  <strong>{groups.length}</strong>
  {groups.length === 1 ? 'cause' : 'causes'}
</p>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users must be able to scroll the overflow region.) -->
<div class="table-scroll" tabindex="0" role="region" aria-label="Report counts by cause; scroll horizontally on narrow screens">
<table>
  <thead>
    <tr><th>cause</th><th>reports</th><th>tagged as</th><th>tenants</th><th>seen</th><th></th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.cause)}
      <tr class:wrong={g.cause !== owner}>
        <td><code>{g.cause}</code></td>
        <td>{g.reports.length}</td>
        <td class="tags">{tags(g)}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{#if issueLinks[g.cause]}<a href={issueLinks[g.cause]}>separate {g.cause} ticket</a>{:else}{g.cause === owner ? `#${ticket}` : 'not this ticket — no ticket of its own'}{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>
</div>

{#each groups as g (g.cause)}
  {@const moved = readAs(g, notes.oneDayMove)}
  {#if moved}
    <p class="note">{moved} reports read as a one-day move; filed under <code>{g.cause}</code> by tenant.</p>
  {/if}
{/each}

<style>
  .table-scroll { max-width: 100%; overflow-x: auto; }
  .table-scroll:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  .sum { font-size: 1.1rem; }
  .tags { color: var(--muted); font-size: 0.85em; }
  .note { color: var(--muted); font-size: 0.85em; }
  .wrong td { background: var(--warn-bg); }
  .wrong td:last-child { color: var(--warn); font-weight: 600; }
</style>
