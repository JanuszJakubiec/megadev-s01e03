import{a as u,f as d}from"./CeQ0Fui8.js";import{R as p}from"./DRCCkNLQ.js";import{w as a,g as l}from"./-v_Lc1Yp.js";import{l as h,s as m}from"./BvfZsH8o.js";import{D as g}from"./BUJr8kqu.js";import{R as f}from"./DcCN1BeL.js";const e={layout:"runbook",title:"0002 · Duplicates share a verified cause",owner:"Janusz Jakubiec and Pi",status:"accepted",reviewed:"2026-11-01",signature:"Janusz Jakubiec / Pi / S01E03"},{layout:R,title:T,owner:q,status:z,reviewed:J,signature:b}=e;var v=d(`<h2>Context</h2> <p>This record replaces <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a> and its subject-only
rule, not its historical text. The #4471 rendered cause table disproves the assumption that one
large ticket necessarily represents one bug. The old triage page and decision are retained as
historical evidence; apply this record instead.</p> <h2>Decision</h2> <p>Group reports by a verified cause. For the date incident, use the supplied tenant directory,
platform date order, form version and channel through causes.ts and locales.ts. Read report
bodies for conflicting symptoms. Do not use browser locale, intake tags, matching subject lines,
or the existing merge target as a substitute for this check.</p> <p>Keep distinct causes in separate engineering issues, count each unique report ID once, and
link the issues from the reassessment page. Unknown tenants are unplaced until investigated;
matching unknown subjects do not establish a cause. For other products, investigate their own
mechanisms rather than assuming the date-specific classifier applies.</p> <h2>Consequences</h2> <p>Triage needs more context than a subject match. It avoids hiding independent fixes under
“known.” On each new export, deduplicate IDs, recompute group counts, review unplaced cases,
and inspect the received-versus-merged timeline. Resolution requires evidence of each fix,
not merely an empty merge queue.</p> <h2>Check the rule against the supplied examples</h2> <!> <!>`,1);function _(r,n){const i=h(n,["children","$$slots","$$events","$$legacy"]);p(r,m(()=>i,()=>e,{children:(o,y)=>{var t=v(),s=a(l(t),16);g(s,{});var c=a(s,2);f(c,{get signature(){return b}}),u(o,t)},$$slots:{default:!0}}))}const P=Object.freeze(Object.defineProperty({__proto__:null,default:_,metadata:e},Symbol.toStringTag,{value:"Module"}));export{P as _,_ as a};
