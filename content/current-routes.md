---
title: "Current Routes"
---

<!-- Here's what's currently set on our walls. Routes are identified by **anchor number** (the station on the wall), **hold colour**, and **grade** ([Yosemite Decimal System](https://en.wikipedia.org/wiki/Yosemite_Decimal_System)).

{{< callout type="info" >}}
**New to climbing?** Look for routes graded **5.7–5.8** — they're great for beginners. Ask a volunteer if you need help finding one!
{{< /callout >}} -->

<!-- ===================================================================
     FLOORPLAN / BIRD'S EYE VIEW
     ===================================================================
     To enable the floorplan image:
     1. Place your bird's-eye-view image in:  static/img/floorplan.png
        (or .jpg / .svg — update the src below to match)
     2. Comment out the PLACEHOLDER block below
     3. Uncomment the IMAGE block below it
     =================================================================== -->

<!-- PLACEHOLDER — remove this block once the floorplan image is ready -->
<div id="floorplan-placeholder" style="
  width: 100%;
  min-height: 320px;
  border: 2px dashed var(--route-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 1.5rem 0;
  background: var(--route-bg);
  color: var(--route-muted);
">
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5;">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
  <span style="font-size: 1rem; font-weight: 600;">Floorplan Coming Soon</span>
  <span style="font-size: 0.85rem; opacity: 0.7;">Bird's-eye view showing anchor locations</span>
</div>
<!-- END PLACEHOLDER -->

<!-- IMAGE — uncomment this block once you've added the floorplan image to static/img/
<div style="width: 100%; margin: 1.5rem 0;">
  <img src="/img/floorplan.png" alt="Bird's-eye view floorplan showing the location of each anchor on the climbing wall" style="
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--route-border);
  ">
</div>
<!-- END IMAGE -->

<div id="routes-app">
  <!-- Filters -->
  <div class="routes-filters">
    <div class="routes-filter-group routes-grade-filters">
      <button class="grade-filter-btn grade-all active" data-grade="all">All</button>
      <button class="grade-filter-btn grade-beginner" data-grade="beginner">≤5.8</button>
      <button class="grade-filter-btn grade-intermediate" data-grade="intermediate">5.9–5.10</button>
      <button class="grade-filter-btn grade-advanced" data-grade="advanced">5.11</button>
      <button class="grade-filter-btn grade-expert" data-grade="expert">≥5.12</button>
    </div>
  </div>

  <p id="routes-count" class="routes-count"></p>

  <!-- Table (desktop) -->
  <div class="routes-table-wrapper">
    <table id="routes-table" class="routes-table">
      <thead>
        <tr>
          <th>Anchor</th>
          <th>Colour</th>
          <th>Route Name</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody id="routes-tbody"></tbody>
    </table>
  </div>

  <!-- Cards (mobile) -->
  <div id="routes-cards" class="routes-cards"></div>

  <!-- Loading state -->
  <div id="routes-loading" class="routes-loading">
    <div class="routes-spinner"></div>
    <span>Loading routes...</span>
  </div>

  <!-- Fallback if fetch fails -->
  <div id="routes-fallback" style="display: none;">
    <p style="margin-bottom: 0.5rem; opacity: 0.7; font-size: 0.9rem;">Could not load route data — showing spreadsheet view instead.</p>
    <iframe width="100%" height="800px" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTJi2z1Y4MF8TA0m5II_51VLymia-hPssLSsMtaFhCw1iSFAC9EVFp65NEg-i83XDi84ixO9EoT3ZDQ/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false" style="border: 1px solid var(--route-border); border-radius: 8px;"></iframe>
  </div>
</div>

<style>
  /* ── CSS Variables (light + dark mode) ── */
  :root {
    --route-bg: #f8f9fa;
    --route-bg-hover: #f0f1f3;
    --route-border: #e2e5e9;
    --route-text: #1a1a2e;
    --route-muted: #6b7280;
    --route-card-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --route-card-shadow-hover: 0 4px 12px rgba(0,0,0,0.08);
    --grade-beginner: #16a34a;
    --grade-intermediate: #837a01;
    --grade-advanced: #a03504;
    --grade-expert: #660639;
  }
  html.dark {
    --route-bg: #1e1e2e;
    --route-bg-hover: #2a2a3c;
    --route-border: #3a3a4c;
    --route-text: #e2e5e9;
    --route-muted: #9ca3af;
    --route-card-shadow: 0 1px 3px rgba(0,0,0,0.3);
    --route-card-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
  }
  /* Hextra uses .dark class on html element */
  [data-theme="dark"] {
    --route-bg: #1e1e2e;
    --route-bg-hover: #2a2a3c;
    --route-border: #3a3a4c;
    --route-text: #e2e5e9;
    --route-muted: #9ca3af;
    --route-card-shadow: 0 1px 3px rgba(0,0,0,0.3);
    --route-card-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
  }

  /* ── Filters ── */
  .routes-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  .routes-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .grade-filter-btn {
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--route-border);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    background: var(--route-bg);
    color: var(--route-text);
    cursor: pointer;
    transition: all 0.2s;
  }
  .grade-filter-btn:hover,
  .grade-filter-btn.grade-all:hover {
    background: var(--route-bg-hover);
    color: var(--route-text);
    border-color: var(--route-border);
  }
  .grade-filter-btn.active {
    background: #2F7FBA;
    color: #fff;
    border-color: #2F7FBA;
  }
  .grade-filter-btn.grade-all {
    background: #2F7FBA;
    color: #fff;
    border-color: #2F7FBA;
  }
  .grade-filter-btn.grade-beginner.active { background: var(--grade-beginner); border-color: var(--grade-beginner); }
  .grade-filter-btn.grade-intermediate.active { background: var(--grade-intermediate); border-color: var(--grade-intermediate); }
  .grade-filter-btn.grade-advanced.active { background: var(--grade-advanced); border-color: var(--grade-advanced); }
  .grade-filter-btn.grade-expert.active { background: var(--grade-expert); border-color: var(--grade-expert); }

  /* ── Count ── */
  .routes-count {
    font-size: 0.85rem;
    color: var(--route-muted);
    margin: 0 0 0.75rem 0;
  }

  /* ── Table (desktop) ── */
  .routes-table-wrapper {
    display: block;
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid var(--route-border);
  }
  .routes-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .routes-table thead {
    background: var(--route-bg);
  }
  .routes-table th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--route-muted);
    border-bottom: 2px solid var(--route-border);
  }
  .routes-table td,
  .routes-table th {
    white-space: nowrap;
  }
  .routes-table td:nth-child(3),
  .routes-table th:nth-child(3) {
    width: 100%;
    white-space: normal;
  }
  .routes-table td {
    padding: 0.7rem 1rem;
    border-bottom: 1px solid var(--route-border);
    vertical-align: middle;
  }
  .routes-table th:first-child,
  .routes-table td:first-child {
    padding-left: 1.5rem;
  }
  .routes-table th:last-child,
  .routes-table td:last-child {
    padding-right: 1.5rem;
  }
  .routes-table tbody tr {
    transition: background 0.15s;
  }
  .routes-table tbody tr:hover {
    background: var(--route-bg-hover);
  }
  .routes-table tbody tr:last-child td {
    border-bottom: none;
  }
  .routes-table tbody tr.anchor-group-start td {
    border-top: 2px solid var(--route-border);
  }

  /* ── Colour dot ── */
  .colour-dot {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
    border: 1px solid rgba(0,0,0,0.12);
    flex-shrink: 0;
  }
  .colour-cell {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Grade badge ── */
  .grade-badge {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 12px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #fff;
  }
  .grade-beginner { background: var(--grade-beginner); }
  .grade-intermediate { background: var(--grade-intermediate); }
  .grade-advanced { background: var(--grade-advanced); }
  .grade-expert { background: var(--grade-expert); }

  /* ── Cards (mobile) ── */
  .routes-cards {
    display: none;
    flex-direction: column;
    gap: 0.65rem;
  }
  .route-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border: 1px solid var(--route-border);
    border-radius: 12px;
    background: var(--route-bg);
    box-shadow: var(--route-card-shadow);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .route-card:hover {
    box-shadow: var(--route-card-shadow-hover);
    transform: translateY(-1px);
  }
  .route-card .colour-dot {
    width: 18px;
    height: 18px;
  }
  .route-card-body {
    flex: 1;
    min-width: 0;
  }
  .route-card-name {
    font-weight: 600;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .route-card-meta {
    font-size: 0.8rem;
    color: var(--route-muted);
    margin-top: 2px;
  }
  .route-card .grade-badge {
    flex-shrink: 0;
  }

  /* ── Loading ── */
  .routes-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 3rem 1rem;
    color: var(--route-muted);
  }
  .routes-spinner {
    width: 22px;
    height: 22px;
    border: 3px solid var(--route-border);
    border-top-color: #2F7FBA;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── No results ── */
  .routes-empty {
    text-align: center;
    padding: 2rem 1rem;
    color: var(--route-muted);
    font-size: 0.95rem;
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .routes-table-wrapper { display: none; }
    .routes-cards { display: flex; }
    .routes-filters { flex-direction: column; align-items: stretch; }
    .routes-grade-filters { justify-content: flex-start; }
  }
</style>

<script>
(function () {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJi2z1Y4MF8TA0m5II_51VLymia-hPssLSsMtaFhCw1iSFAC9EVFp65NEg-i83XDi84ixO9EoT3ZDQ/pub?gid=0&single=true&output=csv";

  /* ── Colour map for the dot indicators ── */
  const COLOUR_MAP = {
    red: "#dc2626",
    blue: "#2563eb",
    green: "#16a34a",
    lime: "#84cc16",
    orange: "#ea580c",
    pink: "#ec4899",
    purple: "#9333ea",
    yellow: "#eab308",
    black: "#1e1e2e",
    white: "#f1f5f9",
    grey: "#6b7280",
    gray: "#6b7280",
    brown: "#92400e",
  };

  /* ── Grade classification ── */
  function gradeClass(grade) {
    if (!grade) return "grade-beginner";
    var match = grade.match(/5\.(\d+)/);
    if (!match) return "grade-beginner";
    var num = parseInt(match[1], 10);
    if (num <= 8) return "grade-beginner";
    if (num <= 10) return "grade-intermediate";
    if (num <= 11) return "grade-advanced";
    return "grade-expert";
  }

  function gradeCategory(grade) {
    var cls = gradeClass(grade);
    return cls.replace("grade-", "");
  }

  /* ── Parse CSV (simple, handles quoted fields) ── */
  function parseCSV(text) {
    var lines = text.trim().split("\n");
    if (lines.length < 2) return [];
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
      var cols = lines[i].match(/(".*?"|[^",]+|^(?=,)|(?<=,)(?=,)|(?<=,)$)/g);
      if (!cols || cols.length < 4) continue;
      cols = cols.map(function (c) { return c.replace(/^"|"$/g, "").trim(); });
      if (!cols[0] && !cols[2]) continue; // skip empty rows
      rows.push({ anchor: cols[0], colour: cols[1], name: cols[2], grade: cols[3] });
    }
    return rows;
  }

  /* ── Render ── */
  function render(routes, filter) {
    var grade = filter.grade || "all";

    var filtered = routes.filter(function (r) {
      if (grade !== "all" && gradeCategory(r.grade) !== grade) return false;
      return true;
    });

    /* Count */
    var countEl = document.getElementById("routes-count");
    countEl.textContent = "Showing " + filtered.length + " of " + routes.length + " routes";

    /* Table */
    var tbody = document.getElementById("routes-tbody");
    var html = "";
    var prevAnchor = null;
    filtered.forEach(function (r) {
      var dotColour = COLOUR_MAP[r.colour.toLowerCase()] || "#888";
      var isGroupStart = r.anchor !== prevAnchor && prevAnchor !== null;
      html += '<tr class="' + (isGroupStart ? "anchor-group-start" : "") + '">';
      html += "<td>" + escHTML(r.anchor) + "</td>";
      html += '<td><span class="colour-cell"><span class="colour-dot" style="background:' + dotColour + '"></span>' + escHTML(r.colour) + "</span></td>";
      html += "<td>" + escHTML(r.name) + "</td>";
      html += '<td><span class="grade-badge ' + gradeClass(r.grade) + '">' + escHTML(r.grade) + "</span></td>";
      html += "</tr>";
      prevAnchor = r.anchor;
    });
    tbody.innerHTML = html || '<tr><td colspan="4" class="routes-empty">No routes match your filters.</td></tr>';

    /* Cards */
    var cardsEl = document.getElementById("routes-cards");
    var cardsHTML = "";
    filtered.forEach(function (r) {
      var dotColour = COLOUR_MAP[r.colour.toLowerCase()] || "#888";
      cardsHTML += '<div class="route-card">';
      cardsHTML += '<span class="colour-dot" style="background:' + dotColour + '"></span>';
      cardsHTML += '<div class="route-card-body">';
      cardsHTML += '<div class="route-card-name">' + escHTML(r.name) + "</div>";
      cardsHTML += '<div class="route-card-meta">Anchor ' + escHTML(r.anchor) + " · " + escHTML(r.colour) + "</div>";
      cardsHTML += "</div>";
      cardsHTML += '<span class="grade-badge ' + gradeClass(r.grade) + '">' + escHTML(r.grade) + "</span>";
      cardsHTML += "</div>";
    });
    cardsEl.innerHTML = cardsHTML || '<div class="routes-empty">No routes match your filters.</div>';
  }

  function escHTML(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Init ── */
  var filter = { grade: "all" };

  fetch(CSV_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function (text) {
      var routes = parseCSV(text);
      if (!routes.length) throw new Error("Empty data");

      document.getElementById("routes-loading").style.display = "none";
      document.getElementById("routes-table").closest(".routes-table-wrapper").style.display = "block";

      render(routes, filter);

      /* Grade filter buttons */
      document.querySelectorAll(".grade-filter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".grade-filter-btn").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          filter.grade = btn.getAttribute("data-grade");
          render(routes, filter);
        });
      });
    })
    .catch(function () {
      document.getElementById("routes-loading").style.display = "none";
      document.getElementById("routes-fallback").style.display = "block";
    });
})();
</script>
