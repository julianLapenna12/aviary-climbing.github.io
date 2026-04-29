(function () {
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJi2z1Y4MF8TA0m5II_51VLymia-hPssLSsMtaFhCw1iSFAC9EVFp65NEg-i83XDi84ixO9EoT3ZDQ/pub?gid=0&single=true&output=csv";

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
    return gradeClass(grade).replace("grade-", "");
  }

  function parseCSV(text) {
    var lines = text.trim().split("\n");
    if (lines.length < 2) return [];
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
      var cols = lines[i].match(/(".*?"|[^",]+|^(?=,)|(?<=,)(?=,)|(?<=,)$)/g);
      if (!cols || cols.length < 4) continue;
      cols = cols.map(function (c) { return c.replace(/^"|"$/g, "").trim(); });
      if (!cols[0] && !cols[2]) continue;
      rows.push({ anchor: cols[0], colour: cols[1], name: cols[2], grade: cols[3] });
    }
    return rows;
  }

  function escHTML(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function render(routes, filter) {
    var grade = filter.grade || "all";
    var filtered = routes.filter(function (r) {
      return grade === "all" || gradeCategory(r.grade) === grade;
    });

    document.getElementById("routes-count").textContent =
      "Showing " + filtered.length + " of " + routes.length + " routes";

    var tbody = document.getElementById("routes-tbody");
    var rowsHTML = "";
    var prevAnchor = null;
    filtered.forEach(function (r) {
      var dotColour = COLOUR_MAP[r.colour.toLowerCase()] || "#888";
      var isGroupStart = r.anchor !== prevAnchor && prevAnchor !== null;
      rowsHTML +=
        '<tr class="' + (isGroupStart ? "anchor-group-start" : "") + '">' +
        "<td>" + escHTML(r.anchor) + "</td>" +
        '<td><span class="colour-cell"><span class="colour-dot" style="background:' + dotColour + '"></span>' + escHTML(r.colour) + "</span></td>" +
        "<td>" + escHTML(r.name) + "</td>" +
        '<td><span class="grade-badge ' + gradeClass(r.grade) + '">' + escHTML(r.grade) + "</span></td>" +
        "</tr>";
      prevAnchor = r.anchor;
    });
    tbody.innerHTML = rowsHTML || '<tr><td colspan="4" class="routes-empty">No routes match your filters.</td></tr>';

    var cardsHTML = "";
    filtered.forEach(function (r) {
      var dotColour = COLOUR_MAP[r.colour.toLowerCase()] || "#888";
      cardsHTML +=
        '<div class="route-card">' +
        '<span class="colour-dot" style="background:' + dotColour + '"></span>' +
        '<div class="route-card-body">' +
        '<div class="route-card-name">' + escHTML(r.name) + "</div>" +
        '<div class="route-card-meta">Anchor ' + escHTML(r.anchor) + " · " + escHTML(r.colour) + "</div>" +
        "</div>" +
        '<span class="grade-badge ' + gradeClass(r.grade) + '">' + escHTML(r.grade) + "</span>" +
        "</div>";
    });
    document.getElementById("routes-cards").innerHTML =
      cardsHTML || '<div class="routes-empty">No routes match your filters.</div>';
  }

  function init() {
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
        document.querySelector(".routes-table-wrapper").style.display = "block";

        render(routes, filter);

        document.querySelectorAll(".grade-filter-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            document.querySelectorAll(".grade-filter-btn").forEach(function (b) {
              b.classList.remove("active");
            });
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
