---
title: "Current Routes"
---

Here's what's currently set on our walls. Routes are identified by **anchor number** (shown in floorplan), **hold colour**, and **grade** ([Yosemite Decimal System](https://en.wikipedia.org/wiki/Yosemite_Decimal_System)). Some anchors are lead only.

#### Floorplan

<figure class="floorplan">
  <img src="/img/floorplan.jpg" alt="Bird's-eye view floorplan showing the location of each anchor on the climbing wall">
</figure>

#### Routes

<div id="routes-app">
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

  <div id="routes-cards" class="routes-cards"></div>

  <div id="routes-loading" class="routes-loading">
    <div class="routes-spinner"></div>
    <span>Loading routes...</span>
  </div>

  <div id="routes-fallback" style="display: none;">
    <p style="margin-bottom: 0.5rem; opacity: 0.7; font-size: 0.9rem;">Could not load route data — showing spreadsheet view instead.</p>
    <iframe class="routes-fallback-iframe" width="100%" height="800px" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTJi2z1Y4MF8TA0m5II_51VLymia-hPssLSsMtaFhCw1iSFAC9EVFp65NEg-i83XDi84ixO9EoT3ZDQ/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
  </div>
</div>

<script src="/js/routes.js" defer></script>
