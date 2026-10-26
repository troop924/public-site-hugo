/* Ma-Ka-Ja-Wan merit badge planner. Data lives in schedule-data.js;
   PLANNER_ASSETS (set by the page) is the folder holding img/. */
const PERIODS = SCHEDULE.periods;

let camp = "east";
let selected = [];
let selectedPM = [];
let listView = "alpha";
let detailView = false;
let tableView = false;
let scoutYear = null;
let scoutAge = null;
let eagleOnly = false;

function setCamp(c) {
  camp = c;
  document.getElementById("btn-west").classList.toggle("active", c === "west");
  document.getElementById("btn-east").classList.toggle("active", c === "east");
  clearAll();
}

function setView(v) {
  listView = v;
  document.getElementById("btn-area").classList.toggle("active", v === "area");
  document.getElementById("btn-alpha").classList.toggle("active", v === "alpha");
  renderMBList();
}

function toggleDetailView() {
  detailView = !detailView;
  if (detailView && tableView) { tableView = false; document.getElementById("btn-table").classList.toggle("active", false); }
  document.getElementById("btn-detail").classList.toggle("active", detailView);
  renderMBList();
  renderPMList();
}

function toggleTableView() {
  tableView = !tableView;
  if (tableView && detailView) { detailView = false; document.getElementById("btn-detail").classList.toggle("active", false); }
  document.getElementById("btn-table").classList.toggle("active", tableView);
  renderMBList();
  renderPMList();
}

function setScoutYear(y) {
  scoutYear = y;
  document.getElementById("btn-year-any").classList.toggle("active", y === null);
  document.getElementById("btn-year-1").classList.toggle("active", y === 1);
  document.getElementById("btn-year-2").classList.toggle("active", y === 2);
  document.getElementById("btn-year-3").classList.toggle("active", y === 3);
  document.getElementById("trailblazer-note").style.display = y === 1 ? "" : "none";
  updateChips();
}

function setScoutAge() {
  const val = document.getElementById("scout-age").value;
  scoutAge = val ? parseInt(val) : null;
  updateChips();
}

function toggleEagleOnly() {
  eagleOnly = !eagleOnly;
  document.getElementById("btn-eagle").classList.toggle("active", eagleOnly);
  updateChips();
}

const FILL_ICON = { 3: " \uD83D\uDD25", 2: " \u23F1\uFE0F", 1: " \u23F3" };
function fillIcon(mb) { return FILL_ICON[mb.fillRisk] || ""; }

function ordinal(n) {
  return n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : n + "th";
}

function makeCard(mb) {
  const card = document.createElement("div");
  let cls = "mb-card";
  if (mb.slots === 2) cls += " double";
  card.className = cls;
  card.dataset.name = mb.name;
  const duration = mb.slots === 2 ? "2 hrs" : "1 hr";
  const timesStr = mb.starts.map(s => PERIODS[s].start).join(", ");
  const icons = fillIcon(mb) +
                (mb.eagle ? " \uD83E\uDD85" : "") +
                (mb.cost ? " \uD83D\uDCB2" : "");
  const desc = DESC[mb.id] || "";

  let imgHtml = "";
  if (mb.image) {
    const img = `<img class="badge-img" src="${PLANNER_ASSETS}img/badges/${mb.image}" alt="" onerror="this.style.display='none'">`;
    imgHtml = mb.url
      ? `<a href="${mb.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${img}</a>`
      : img;
  }

  const tags = [];
  if (mb.cost) tags.push("\uD83D\uDCB2 " + mb.cost);
  if (mb.prereqs && mb.prereqs.length) {
    const names = mb.prereqs.map(id => SCHEDULE.badges.find(b => b.id === id)?.name || id).join(", ");
    tags.push("Requires: " + names);
  }
  if (mb.recYear) tags.push("Recommended for " + ordinal(mb.recYear) + " year+ Scouts");
  if (mb.recAge) tags.push("Recommended for ages " + mb.recAge + "+");
  if (mb.minAge) tags.push("Ages " + mb.minAge + "+ only");
  const tagsHtml = tags.length
    ? `<div class="mb-card-tags">${tags.map(t => `<span class="mb-card-tag">${t}</span>`).join("")}</div>`
    : "";

  card.innerHTML =
    `<div class="mb-card-header">${imgHtml}<div>` +
    `<div class="mb-card-name">${mb.name}${icons}</div>` +
    `<div class="mb-card-meta">${mb.area} &middot; ${duration} &middot; ${timesStr}</div>` +
    `</div></div>` +
    tagsHtml +
    (desc ? `<div class="mb-card-desc">${desc}</div>` : "") +
    (mb.url ? `<a class="mb-card-link" href="${mb.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Scouting America page &nearr;</a>` : "");
  card.onclick = () => toggleMB(mb.name);
  return card;
}

function mbOf(n) { return SCHEDULE.badges.find(b => b.name === n) ?? null; }

function makeChip(mb) {
  if (detailView) return makeCard(mb);
  const chip = document.createElement("div");
  let cls = "mb-chip";
  if (mb.slots === 2) cls += " double";
  chip.className = cls;
  chip.dataset.name = mb.name;
  let label = mb.name;
  if (mb.slots === 2) label += " (2\u2011hrs)";
  label += fillIcon(mb);
  if (mb.eagle) label += " \uD83E\uDD85";
  if (mb.cost) label += " \uD83D\uDCB2";
  chip.textContent = label;
  chip.onclick = () => toggleMB(mb.name);
  return chip;
}

function renderMBList() {
  const el = document.getElementById("mb-list");
  el.innerHTML = "";
  if (tableView) { renderTableView(el); updateChips(); return; }
  const gridCls = "mb-grid" + (detailView ? " detail" : "");
  if (listView === "area") {
    const areaOrder = [...new Set(SCHEDULE.badges.map(b => b.area))];
    for (const areaName of areaOrder) {
      const mbs = SCHEDULE.badges.filter(b => b.area === areaName);
      const wrap = document.createElement("div");
      wrap.className = "area-group";
      const hdr = document.createElement("div");
      hdr.className = "area-header";
      hdr.textContent = areaName;
      const grid = document.createElement("div");
      grid.className = gridCls;
      for (const mb of mbs) grid.appendChild(makeChip(mb));
      wrap.appendChild(hdr);
      wrap.appendChild(grid);
      el.appendChild(wrap);
    }
  } else {
    const all = [...SCHEDULE.badges].sort((a, b) => a.name.localeCompare(b.name));
    const grid = document.createElement("div");
    grid.className = gridCls;
    for (const mb of all) grid.appendChild(makeChip(mb));
    el.appendChild(grid);
  }
  updateChips();
}

function renderTableView(el) {
  const scroll = document.createElement("div");
  scroll.className = "table-scroll";
  const grid = document.createElement("div");
  grid.className = "table-view";

  // Header row
  const corner = document.createElement("div");
  corner.className = "table-header";
  grid.appendChild(corner);
  for (let p = 0; p < 4; p++) {
    const th = document.createElement("div");
    th.className = "table-header";
    th.textContent = `${PERIODS[p].start}–${PERIODS[p].end}`;
    grid.appendChild(th);
  }

  // Get badges in order
  let badgeList;
  if (listView === "area") {
    const areaOrder = [...new Set(SCHEDULE.badges.map(b => b.area))];
    badgeList = [];
    for (const areaName of areaOrder) {
      badgeList.push({ areaHeader: areaName });
      for (const mb of SCHEDULE.badges.filter(b => b.area === areaName)) badgeList.push(mb);
    }
  } else {
    badgeList = [...SCHEDULE.badges].sort((a, b) => a.name.localeCompare(b.name));
  }

  for (const item of badgeList) {
    if (item.areaHeader) {
      const hdr = document.createElement("div");
      hdr.className = "table-area-header";
      hdr.textContent = item.areaHeader;
      grid.appendChild(hdr);
      continue;
    }
    const mb = item;
    const row = document.createElement("div");
    row.className = "table-row";
    row.dataset.name = mb.name;

    // Name cell
    const nameCell = document.createElement("div");
    nameCell.className = "table-name-cell";
    let label = mb.name;
    if (mb.slots === 2) label += " (2h)";
    label += fillIcon(mb);
    if (mb.eagle) label += " \uD83E\uDD85";
    nameCell.textContent = label;
    nameCell.onclick = () => toggleMB(mb.name);
    row.appendChild(nameCell);

    // Period cells
    const startSet = new Set(mb.starts);
    let col = 0;
    while (col < 4) {
      if (startSet.has(col)) {
        const cell = document.createElement("div");
        cell.className = "table-cell";
        cell.dataset.name = mb.name;
        if (mb.slots === 2) {
          cell.style.gridColumn = "span 2";
          cell.textContent = `${PERIODS[col].start}–${PERIODS[Math.min(col + mb.slots - 1, 3)].end}`;
        } else {
          cell.textContent = PERIODS[col].start;
        }
        cell.onclick = () => toggleMB(mb.name);
        row.appendChild(cell);
        col += mb.slots;
      } else {
        const empty = document.createElement("div");
        empty.className = "table-cell-empty";
        row.appendChild(empty);
        col++;
      }
    }

    grid.appendChild(row);
  }

  scroll.appendChild(grid);
  el.appendChild(scroll);
}

function slotsUsed() { return selected.reduce((s, n) => s + (mbOf(n)?.slots || 1), 0); }

function toggleMB(name) {
  const wasFull = slotsUsed() === 4;
  if (selected.includes(name)) {
    selected = selected.filter(n => n !== name);
  } else {
    const mb = mbOf(name);
    if (slotsUsed() + (mb?.slots || 1) > 4) return;
    selected.push(name);
  }
  updateChips(!wasFull && slotsUsed() === 4);
}

/* Check whether adding a candidate badge to the current selection can
   produce at least one valid schedule across all 4 periods. */
function canFitWith(name) {
  const mb = mbOf(name);
  if (!mb || slotsUsed() + mb.slots > 4) return false;
  const testSet = [...selected, name];
  for (const perm of permutations(testSet)) {
    if (assignSlots(perm)) return true;
  }
  return false;
}

function updateChips(scroll) {
  const used = slotsUsed();
  let eagleHiddenCount = 0;
  document.querySelectorAll("#mb-list .mb-chip, #mb-list .mb-card, #mb-list .table-row").forEach(el => {
    const n = el.dataset.name;
    const mb = mbOf(n);
    const isSel = selected.includes(n);
    const isRow = el.classList.contains("table-row");

    let hardDisable = false;
    let softWarn = false;
    let softRec = false;

    const eagleHidden = !isSel && eagleOnly && !mb.eagle;
    if (isRow) {
      el.classList.toggle("eagle-hidden", eagleHidden);
    } else {
      el.style.display = eagleHidden ? "none" : "";
    }

    if (!isSel && !eagleHidden) {
      const ageFail = scoutAge && mb.minAge && scoutAge < mb.minAge;
      if (ageFail) {
        hardDisable = true;
      } else {
        hardDisable = !canFitWith(n);
      }
      if (!hardDisable) {
        const yearWarn = scoutYear && mb.recYear && scoutYear < mb.recYear;
        const ageWarn = scoutAge && mb.recAge && scoutAge < mb.recAge;
        softWarn = !!(yearWarn || ageWarn);
        if (mb.id === "trailblazer" && scoutYear) {
          softRec = scoutYear === 1;
          softWarn = scoutYear >= 2;
        }
      }
    }

    if (isRow) {
      // Apply state to all children of the table row
      el.querySelectorAll(".table-cell, .table-name-cell").forEach(cell => {
        cell.classList.toggle("selected", isSel);
        cell.classList.toggle("disabled", hardDisable);
        cell.classList.toggle("soft-warn", softWarn);
        cell.classList.toggle("soft-rec", softRec);
      });
    } else {
      el.classList.toggle("selected", isSel);
      el.classList.toggle("disabled", hardDisable);
      el.classList.toggle("soft-warn", softWarn);
      el.classList.toggle("soft-rec", softRec);
    }
    if (eagleHidden) eagleHiddenCount++;
  });
  const eagleNote = document.getElementById("eagle-hidden-note");
  if (eagleHiddenCount > 0) {
    eagleNote.textContent = `${eagleHiddenCount} non-Eagle badge${eagleHiddenCount > 1 ? "s" : ""} hidden`;
    eagleNote.style.display = "";
  } else {
    eagleNote.style.display = "none";
  }
  document.getElementById("slot-tally").textContent = `${used} of 4 slots`;
  for (let i = 0; i < 4; i++) document.getElementById("s" + i).classList.toggle("filled", i < used);

  const selEl = document.getElementById("selected-chips");
  if (selected.length === 0) {
    selEl.innerHTML = '<span class="sel-empty">No merit badges selected yet</span>';
  } else {
    selEl.innerHTML = selected.map(n =>
      `<span class="sel-chip">${n}<span class="sel-chip-x" onclick="toggleMB('${n.replace(/'/g, "\\'")}')">&#x2715;</span></span>`
    ).join("");
  }

  const hint = document.getElementById("mb-summary-hint");
  if (hint) hint.textContent = selected.length ? `\u2014 ${selected.length} selected` : "";

  updatePMChips();
  if (typeof updateMapMarkers === "function") updateMapMarkers();
  if (slotsUsed() === 4) { solve(scroll); } else {
    document.getElementById("results-area").innerHTML = selected.length
      ? '<p class="no-results">Fill all 4 morning slots to see schedules.</p>'
      : '<p class="no-results">Select morning merit badges to build a schedule.</p>';
  }
}

/* ── Afternoon / Evening (PM) badge helpers ───────────────────────────── */

function pmOf(n) { return SCHEDULE.pmBadges.find(b => b.name === n) ?? null; }
const PM_PERIODS = SCHEDULE.pmPeriods;
function pmTime(mb) {
  const s = PM_PERIODS[mb.starts[0]];
  const e = PM_PERIODS[Math.min(mb.starts[0] + mb.slots - 1, PM_PERIODS.length - 1)];
  return `${s.start}\u2013${e.end}`;
}

function togglePM(name) {
  if (selectedPM.includes(name)) {
    selectedPM = selectedPM.filter(n => n !== name);
  } else {
    selectedPM.push(name);
  }
  updatePMChips();
  if (slotsUsed() === 4) solve();
  else if (typeof updateMapMarkers === "function") updateMapMarkers();
}

function makePMChip(mb) {
  if (detailView) return makePMCard(mb);
  const chip = document.createElement("div");
  chip.className = "mb-chip";
  chip.dataset.name = mb.name;
  let label = mb.name;
  if (mb.days) label += ` (${mb.days})`;
  if (mb.eagle) label += " \uD83E\uDD85";
  if (mb.cost) label += " \uD83D\uDCB2";
  chip.textContent = label;
  chip.onclick = () => togglePM(mb.name);
  return chip;
}

function makePMCard(mb) {
  const card = document.createElement("div");
  card.className = "mb-card";
  card.dataset.name = mb.name;
  const icons = (mb.eagle ? " \uD83E\uDD85" : "") + (mb.cost ? " \uD83D\uDCB2" : "");
  const desc = DESC[mb.id] || "";
  const timeStr = pmTime(mb) + (mb.days ? ` \u00b7 ${mb.days}` : "");

  let imgHtml = "";
  if (mb.image) {
    const img = `<img class="badge-img" src="${PLANNER_ASSETS}img/badges/${mb.image}" alt="" onerror="this.style.display='none'">`;
    imgHtml = mb.url
      ? `<a href="${mb.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${img}</a>`
      : img;
  }

  const tags = [];
  if (mb.cost) tags.push("\uD83D\uDCB2 " + mb.cost);
  const tagsHtml = tags.length
    ? `<div class="mb-card-tags">${tags.map(t => `<span class="mb-card-tag">${t}</span>`).join("")}</div>`
    : "";

  card.innerHTML =
    `<div class="mb-card-header">${imgHtml}<div>` +
    `<div class="mb-card-name">${mb.name}${icons}</div>` +
    `<div class="mb-card-meta">${timeStr}</div>` +
    `</div></div>` +
    tagsHtml +
    (desc ? `<div class="mb-card-desc">${desc}</div>` : "") +
    (mb.url ? `<a class="mb-card-link" href="${mb.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Scouting America page &nearr;</a>` : "");
  card.onclick = () => togglePM(mb.name);
  return card;
}

function renderPMList() {
  const el = document.getElementById("pm-list");
  el.innerHTML = "";
  if (tableView) {
    const scroll = document.createElement("div");
    scroll.className = "table-scroll";
    const grid = document.createElement("div");
    grid.className = "pm-table-view";

    // Header row: name + 3 PM periods + days
    const corner = document.createElement("div");
    corner.className = "table-header"; corner.style.textAlign = "left";
    grid.appendChild(corner);
    for (let p = 0; p < PM_PERIODS.length; p++) {
      const th = document.createElement("div");
      th.className = "table-header";
      th.textContent = `${PM_PERIODS[p].start}–${PM_PERIODS[p].end}`;
      grid.appendChild(th);
    }
    const daysHdr = document.createElement("div");
    daysHdr.className = "table-header";
    daysHdr.textContent = "Days";
    grid.appendChild(daysHdr);

    // Get badges in order
    let pmList;
    if (listView === "area") {
      const areaOrder = [...new Set(SCHEDULE.pmBadges.map(b => b.area))];
      pmList = [];
      for (const areaName of areaOrder) {
        pmList.push({ areaHeader: areaName });
        for (const mb of SCHEDULE.pmBadges.filter(b => b.area === areaName)) pmList.push(mb);
      }
    } else {
      pmList = [...SCHEDULE.pmBadges].sort((a, b) => a.name.localeCompare(b.name));
    }

    for (const item of pmList) {
      if (item.areaHeader) {
        const hdr = document.createElement("div");
        hdr.className = "table-area-header";
        hdr.textContent = item.areaHeader;
        grid.appendChild(hdr);
        continue;
      }
      const mb = item;
      const row = document.createElement("div");
      row.className = "table-row";
      row.dataset.name = mb.name;

      const nameCell = document.createElement("div");
      nameCell.className = "table-name-cell";
      let label = mb.name;
      if (mb.eagle) label += " \uD83E\uDD85";
      if (mb.cost) label += " \uD83D\uDCB2";
      nameCell.textContent = label;
      nameCell.onclick = () => togglePM(mb.name);
      row.appendChild(nameCell);

      // Period cells
      const startSet = new Set(mb.starts);
      let col = 0;
      while (col < PM_PERIODS.length) {
        if (startSet.has(col)) {
          const cell = document.createElement("div");
          cell.className = "table-cell";
          cell.dataset.name = mb.name;
          if (mb.slots === 2) {
            cell.style.gridColumn = "span 2";
            cell.textContent = `${PM_PERIODS[col].start}–${PM_PERIODS[Math.min(col + mb.slots - 1, PM_PERIODS.length - 1)].end}`;
          } else {
            cell.textContent = PM_PERIODS[col].start;
          }
          cell.onclick = () => togglePM(mb.name);
          row.appendChild(cell);
          col += mb.slots;
        } else {
          const empty = document.createElement("div");
          empty.className = "table-cell-empty";
          row.appendChild(empty);
          col++;
        }
      }

      // Days column
      const daysCell = document.createElement("div");
      daysCell.className = "table-cell";
      daysCell.textContent = mb.days || "Daily";
      daysCell.style.fontSize = "10px";
      daysCell.onclick = () => togglePM(mb.name);
      row.appendChild(daysCell);

      grid.appendChild(row);
    }

    scroll.appendChild(grid);
    el.appendChild(scroll);
  } else {
    const gridCls = "mb-grid" + (detailView ? " detail" : "");
    const grid = document.createElement("div");
    grid.className = gridCls;
    for (const mb of SCHEDULE.pmBadges) grid.appendChild(makePMChip(mb));
    el.appendChild(grid);
  }
  updatePMChips();
}

function updatePMChips() {
  document.querySelectorAll("#pm-list .mb-chip, #pm-list .mb-card, #pm-list .table-row").forEach(el => {
    const n = el.dataset.name;
    const mb = pmOf(n);
    const isSel = selectedPM.includes(n);
    const eagleHidden = !isSel && eagleOnly && !mb.eagle;
    const isRow = el.classList.contains("table-row");
    if (isRow) {
      el.classList.toggle("eagle-hidden", eagleHidden);
      el.querySelectorAll(".table-cell, .table-name-cell").forEach(cell => {
        cell.classList.toggle("selected", isSel);
      });
    } else {
      el.style.display = eagleHidden ? "none" : "";
      el.classList.toggle("selected", isSel);
    }
  });

  const pmSelEl = document.getElementById("selected-pm-chips");
  if (selectedPM.length === 0) {
    pmSelEl.innerHTML = '<span class="sel-empty">None selected</span>';
  } else {
    pmSelEl.innerHTML = selectedPM.map(n => {
      const mb = pmOf(n);
      const timeHint = mb ? ` (${pmTime(mb)})` : "";
      return `<span class="sel-chip">${n}${timeHint}<span class="sel-chip-x" onclick="togglePM('${n.replace(/'/g, "\\'")}')">&#x2715;</span></span>`;
    }).join("");
  }
}

function clearAll() {
  selected = [];
  selectedPM = [];
  renderMBList();
  renderPMList();
  document.getElementById("results-area").innerHTML = '<p class="no-results">Select morning merit badges to build a schedule.</p>';
}

/* Brute-force permutation generator. With a max of 4 merit badge slots
   the ceiling is 4! = 24 permutations — fast enough for real-time use. */
function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = permutations([...arr.slice(0, i), ...arr.slice(i + 1)]);
    for (const r of rest) res.push([arr[i], ...r]);
  }
  return res;
}

function assignSlots(order) {
  let slot = 0;
  const assignments = [];
  for (const name of order) {
    const mb = mbOf(name);
    const s = mb.slots;
    const validStart = mb.starts.find(st => st >= slot && st + s <= 4);
    if (validStart === undefined) return null;
    assignments.push({ name, area: mb.area, startSlot: validStart, slots: s });
    slot = validStart + s;
  }
  return assignments;
}

function travelTime(a1, a2) { return SCHEDULE.travel[camp]?.[a1]?.[a2] ?? 99; }

function scoreSchedule(assignments, threshold) {
  let maxTravel = 0, warnCount = 0;
  for (let i = 0; i < assignments.length - 1; i++) {
    const t = travelTime(assignments[i].area, assignments[i + 1].area);
    if (t > maxTravel) maxTravel = t;
    if (t > threshold) warnCount++;
  }
  return { maxTravel, warnCount };
}

function slotLabel(a) {
  return `${PERIODS[a.startSlot].start}\u2013${PERIODS[Math.min(a.startSlot + a.slots - 1, 3)].end}`;
}

function h(tag, cls, html) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html != null) el.innerHTML = html;
  return el;
}

function solve(scroll) {
  const threshold = parseInt(document.getElementById("threshold").value);
  const el = document.getElementById("results-area");
  if (!selected.length && !selectedPM.length) {
    el.innerHTML = '<p class="no-results">Please select at least one merit badge.</p>';
    return;
  }

  let results = [];
  if (selected.length) {
    const seen = new Set();
    for (const perm of permutations(selected)) {
      const asgn = assignSlots(perm);
      if (!asgn) continue;
      const key = asgn.map(a => a.name + a.startSlot).join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const { maxTravel, warnCount } = scoreSchedule(asgn, threshold);
      results.push({ assignments: asgn, maxTravel, warnCount });
    }
    results.sort((a, b) => a.maxTravel - b.maxTravel);

    if (!results.length) {
      el.innerHTML = '<p class="no-results">No valid orderings found. A fixed-time MB may conflict, or slots overflow 4 periods.</p>';
      return;
    }
  }

  el.innerHTML = "";
  const single = results.length === 1;

  // Print button at the top when there's a single option (or PM-only)
  if (single || (!results.length && selectedPM.length)) {
    const topPrint = h("div", null);
    topPrint.style.cssText = "display:flex; justify-content:flex-end; margin-bottom:8px;";
    const printBtn = h("button", "pl-btn pl-btn-sm", "Print schedule &nearr;");
    printBtn.onclick = () => printSchedule(0);
    topPrint.appendChild(printBtn);
    el.appendChild(topPrint);
  }

  if (results.length) {
    results.forEach((r, i) => {
      const isBest = i === 0, hasWarn = r.warnCount > 0;
      const card = h("div", `result-card morning-result${!single && isBest ? " best" : hasWarn ? " warn" : ""}`);
      card.dataset.resultIdx = i;
      const header = h("div", "result-header");
      if (!single) {
        header.appendChild(h("span", "result-label", `Option ${i + 1}`));
        if (isBest) header.appendChild(h("span", "pl-tag best", "Best route"));
      } else {
        header.appendChild(h("span", "result-label", "Morning"));
      }
      if (hasWarn) header.appendChild(h("span", "pl-tag warn",
        `${r.warnCount} travel warning${r.warnCount > 1 ? "s" : ""}`));
      header.appendChild(h("span", "result-max-travel", `max travel: ${r.maxTravel} min`));
      if (!single) {
        const showMapBtn = h("button", "pl-btn pl-btn-sm", "Show on map");
        showMapBtn.onclick = (e) => { e.stopPropagation(); setActiveResult(i); };
        header.appendChild(showMapBtn);
        const printBtn = h("button", "pl-btn pl-btn-sm", "Print &nearr;");
        printBtn.onclick = (e) => { e.stopPropagation(); printSchedule(i); };
        header.appendChild(printBtn);
      }
      card.appendChild(header);

      for (let j = 0; j < r.assignments.length; j++) {
        const a = r.assignments[j];
        const row = h("div", "schedule-row");
        row.appendChild(h("span", "time-badge", slotLabel(a)));
        row.appendChild(h("span", "mb-badge", a.name));
        row.appendChild(h("span", "area-label", a.area));
        card.appendChild(row);

        if (j < r.assignments.length - 1) {
          const next = r.assignments[j + 1];
          const t = travelTime(a.area, next.area);
          const isWarn = t > threshold;
          const isShuttle = a.area === "Triangle M Ranch" || next.area === "Triangle M Ranch";
          const note = isShuttle ? " &bull; shuttle required" : "";
          const tRow = h("div", "travel-row");
          tRow.appendChild(h("span", `travel-badge ${isWarn ? "travel-warn" : "travel-ok"}`,
            `${isWarn ? "&#9888; " : ""}${t} min${note} &rarr; ${next.area}`));
          card.appendChild(tRow);
        }
      }
      if (!single) {
        card.style.cursor = "pointer";
        card.onclick = () => setActiveResult(i);
      }
      el.appendChild(card);
    });
  }

  if (selectedPM.length) {
    const pmCard = h("div", "result-card");
    const pmHeader = h("div", "result-header");
    pmHeader.appendChild(h("span", "result-label", "Afternoon & Evening"));
    pmCard.appendChild(pmHeader);

    for (const name of selectedPM) {
      const mb = pmOf(name);
      const row = h("div", "schedule-row");
      const timeStr = pmTime(mb) + (mb.days ? ` (${mb.days})` : "");
      row.appendChild(h("span", "time-badge", timeStr));
      row.appendChild(h("span", "mb-badge", name));
      pmCard.appendChild(row);
    }
    el.appendChild(pmCard);
  }

  window._results = results;
  window._threshold = threshold;
  if (results.length) setActiveResult(0);
  if (scroll) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function printSchedule(idx) {
  const r = window._results[idx], threshold = window._threshold;
  const campLabel = camp === "west" ? "West Camp" : "East Camp";
  let rows = "";
  for (let j = 0; j < r.assignments.length; j++) {
    const a = r.assignments[j];
    rows += `<tr><td>${slotLabel(a)}</td><td><strong>${a.name}</strong></td><td>${a.area}</td></tr>`;
    if (j < r.assignments.length - 1) {
      const t = travelTime(a.area, r.assignments[j + 1].area), isWarn = t > threshold;
      const isShuttle = a.area === "Triangle M Ranch" || r.assignments[j + 1].area === "Triangle M Ranch";
      const shuttleNote = isShuttle ? ' \u00b7 shuttle required' : '';
      rows += `<tr class="tr${isWarn ? 'w' : 'o'}"><td></td><td colspan="2">${isWarn ? '&#9888; ' : '&rarr; '}${t} min${shuttleNote} to ${r.assignments[j + 1].area}</td></tr>`;
    }
  }

  let pmRows = "";
  if (selectedPM.length) {
    pmRows = `<h2 style="font-size:18px;margin-top:28px;margin-bottom:8px;">Afternoon &amp; Evening</h2>
<table><thead><tr><th>Time</th><th>Merit Badge</th><th>Notes</th></tr></thead><tbody>`;
    for (const name of selectedPM) {
      const mb = pmOf(name);
      pmRows += `<tr><td>${pmTime(mb)}</td><td><strong>${name}</strong></td><td>${mb.days || "Daily"}</td></tr>`;
    }
    pmRows += `</tbody></table>`;
  }

  // Build map markers HTML for print
  let printMarkers = "";
  const coords = coordsForCamp();
  if (Object.keys(coords).length) {
    const seen = new Set();
    const areas = [];
    for (const a of r.assignments) {
      if (coords[a.area] && !seen.has(a.area)) {
        seen.add(a.area);
        areas.push(a.area);
      }
    }
    for (let i = 0; i < areas.length; i++) {
      const c = coords[areas[i]];
      const label = PERIODS[r.assignments.find(a => a.area === areas[i])?.startSlot]?.start || (i + 1);
      printMarkers += `<div style="position:absolute;left:${c.x}%;top:${c.y}%;min-width:22px;height:22px;padding:0 4px;border-radius:11px;background:#1b4f29;color:#fff;border:2px solid #fff;font-size:11px;font-weight:700;font-family:sans-serif;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);box-shadow:0 1px 4px rgba(0,0,0,.4);-webkit-print-color-adjust:exact;print-color-adjust:exact;">${label}</div>`;
    }
    // PM badge markers (amber dots)
    const pmSeen = new Set(seen);
    for (const name of selectedPM) {
      const mb = pmOf(name);
      if (mb && mb.area && coords[mb.area] && !pmSeen.has(mb.area)) {
        pmSeen.add(mb.area);
        const c = coords[mb.area];
        printMarkers += `<div style="position:absolute;left:${c.x}%;top:${(c.y + 4)}%;width:14px;height:14px;border-radius:7px;background:#e8a824;border:2px solid #fff;transform:translate(-50%,-50%);box-shadow:0 1px 4px rgba(0,0,0,.4);-webkit-print-color-adjust:exact;print-color-adjust:exact;" title="${name}"></div>`;
      }
    }
  }

  let mapSrc = MAP_URL;
  try {
    const resp = await fetch(MAP_URL);
    const blob2 = await resp.blob();
    mapSrc = await new Promise(res => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.readAsDataURL(blob2);
    });
  } catch (e) {}

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<title>MB Schedule \u2013 Ma-Ka-Ja-Wan</title>
<style>
body{font-family:Georgia,serif;max-width:680px;margin:40px auto;color:#222;padding:0 24px;}
h1{font-size:22px;margin-bottom:4px;}
.meta{font-size:13px;color:#666;margin-bottom:6px;}
.summary{font-size:12px;color:#888;margin-bottom:24px;}
table{width:100%;border-collapse:collapse;margin-bottom:28px;}
th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#888;padding:6px 8px;border-bottom:1px solid #ddd;}
td{padding:9px 8px;font-size:14px;border-bottom:.5px solid #eee;vertical-align:middle;}
td:first-child{font-size:12px;color:#888;white-space:nowrap;width:110px;}
tr.trw td,tr.tro td{font-size:12px;padding:2px 8px 8px;border-bottom:none;}
tr.tro td{color:#999;}
tr.trw td{color:#a05a00;}
.map h2{font-size:16px;margin-bottom:10px;}
.map img{width:100%;border:1px solid #ccc;border-radius:4px;}
.map-wrap{position:relative;width:100%;}
*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
footer{margin-top:32px;font-size:11px;color:#bbb;border-top:.5px solid #eee;padding-top:12px;}
@media print{button{display:none;}}
</style></head><body>
<h1>Merit Badge Schedule</h1>
<div class="meta">Ma-Ka-Ja-Wan Scout Reservation &mdash; ${campLabel} &mdash; Option ${idx + 1}</div>
<div class="summary">Periods 1&ndash;4 &bull; 8:30&ndash;12:20 &bull; Max travel: ${r.maxTravel} min &bull; Warning threshold: ${threshold} min</div>
<table>
<thead><tr><th>Time</th><th>Merit Badge</th><th>Location</th></tr></thead>
<tbody>${rows}</tbody>
</table>
${pmRows}
<div class="map">
<h2>Camp Map &mdash; ${campLabel}</h2>
<div class="map-wrap">
<img src="${mapSrc}" alt="Ma-Ka-Ja-Wan camp map" style="width:100%;display:block;">
${printMarkers}
</div>
</div>
<footer>Troop 924 &bull; Ma-Ka-Ja-Wan MB Planner &bull; Printed ${new Date().toLocaleDateString()}</footer>
<script>window.onload=()=>window.print();<\/script>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  window.open(URL.createObjectURL(blob), "_blank");
}

document.getElementById("threshold").oninput = function () {
  document.getElementById("threshold-val").textContent = this.value + " min";
  if (slotsUsed() === 4) solve();
};

/* ── Map markers ──────────────────────────────────────────────────── */
const mapEl = document.getElementById("camp-map");
const mapMarkersEl = document.getElementById("map-markers");
const mapCoordsLog = document.getElementById("map-coords-log");

/* Build a { areaName: {x,y} } lookup from the locations array for the current camp */
function coordsForCamp() {
  const out = {};
  for (const loc of SCHEDULE.locations) {
    if (!loc.coords) continue;
    if (loc.side === camp || loc.side === null) out[loc.name] = loc.coords;
  }
  return out;
}


function updateMapMarkers(assignments) {
  mapMarkersEl.innerHTML = "";
  const coords = coordsForCamp();
  if (!Object.keys(coords).length) { mapCoordsLog.textContent = ""; return; }

  const seen = new Set();
  const areas = [];

  if (assignments) {
    // After solve: use schedule order, label with start time
    for (const a of assignments) {
      if (coords[a.area] && !seen.has(a.area)) {
        seen.add(a.area);
        areas.push({ area: a.area, label: PERIODS[a.startSlot].start });
      }
    }
  } else {
    // Before solve: show unlabelled dots for selected badge areas
    for (const name of selected) {
      const mb = mbOf(name);
      if (mb && coords[mb.area] && !seen.has(mb.area)) {
        seen.add(mb.area);
        areas.push({ area: mb.area, label: null });
      }
    }
  }

  // PM badge areas (amber dots)
  const pmSeen = new Set(seen);
  const pmAreas = [];
  for (const name of selectedPM) {
    const mb = pmOf(name);
    if (mb && mb.area && coords[mb.area] && !pmSeen.has(mb.area)) {
      pmSeen.add(mb.area);
      pmAreas.push({ area: mb.area, name: mb.name });
    }
  }

  for (const { area, label } of areas) {
    const c = coords[area];
    const marker = document.createElement("div");
    marker.className = "map-marker" + (label ? "" : " map-marker-dot");
    marker.style.left = c.x + "%";
    marker.style.top = c.y + "%";
    if (label) marker.textContent = label;
    marker.title = area;
    mapMarkersEl.appendChild(marker);
  }

  for (const { area, name } of pmAreas) {
    const c = coords[area];
    const marker = document.createElement("div");
    marker.className = "map-marker map-marker-dot map-marker-pm";
    marker.style.left = c.x + "%";
    marker.style.top = (c.y + 4) + "%";
    marker.title = name + " — " + area;
    mapMarkersEl.appendChild(marker);
  }

  mapCoordsLog.textContent = assignments && areas.length
    ? areas.map(a => `${a.label} \u2014 ${a.area}`).join("  \u00b7  ")
    : "";
}

function setActiveResult(idx) {
  document.querySelectorAll(".morning-result").forEach(c => c.classList.remove("active-result"));
  const cards = document.querySelectorAll(".morning-result");
  if (cards[idx]) cards[idx].classList.add("active-result");
  if (window._results && window._results[idx]) {
    updateMapMarkers(window._results[idx].assignments);
  }
}

renderMBList();
renderPMList();

/* ── Calibration mode (?calibrate or ?calibrate=east) ──────────────── */
(function() {
  const params = new URLSearchParams(location.search);
  if (!params.has("calibrate")) return;

  const side = params.get("calibrate") || null;  // "east", "west", or "" (all)
  const locs = SCHEDULE.locations.filter(loc =>
    !side || loc.side === side || loc.side === null
  );
  if (!locs.length) return;

  let idx = 0;
  const results = {};

  // UI overlay
  const overlay = document.createElement("div");
  overlay.id = "calibrate-overlay";
  overlay.innerHTML = `
    <div id="cal-banner">
      <strong>Calibration mode</strong> —
      <span id="cal-prompt"></span>
      <span id="cal-progress"></span>
      <br><small>Click the location on the map. Press <kbd>S</kbd> to skip, <kbd>Z</kbd> to undo.</small>
    </div>`;
  document.body.appendChild(overlay);

  const banner = document.getElementById("cal-banner");
  const prompt = document.getElementById("cal-prompt");
  const progress = document.getElementById("cal-progress");

  // Style the banner
  banner.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:#222;color:#fff;padding:12px 20px;font-family:sans-serif;font-size:14px;text-align:center;";

  // Make map image clickable with crosshair
  const mapImg = mapEl.querySelector("img");
  mapImg.style.cursor = "crosshair";

  function showCurrent() {
    if (idx >= locs.length) { finish(); return; }
    const loc = locs[idx];
    const typeLabel = loc.type === "campsite" ? "campsite" : loc.type === "facility" ? "facility" : "activity";
    const sideLabel = loc.side ? ` (${loc.side})` : " (shared)";
    prompt.textContent = `Click: "${loc.name}" — ${typeLabel}${sideLabel}`;
    progress.textContent = ` [${idx + 1} / ${locs.length}]`;
  }

  mapImg.addEventListener("click", function(e) {
    if (idx >= locs.length) return;
    const rect = this.getBoundingClientRect();
    const x = +((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = +((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    results[locs[idx].id] = { x, y };

    // Show temporary marker
    const marker = document.createElement("div");
    marker.className = "map-marker map-marker-dot";
    marker.style.cssText = `left:${x}%;top:${y}%;background:#e44;`;
    marker.title = locs[idx].name;
    marker.dataset.calIdx = idx;
    mapMarkersEl.appendChild(marker);

    idx++;
    showCurrent();
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "s" || e.key === "S") {
      // Skip — leave coords as-is (keep existing or null)
      idx++;
      showCurrent();
    } else if (e.key === "z" || e.key === "Z") {
      // Undo last
      if (idx > 0) {
        idx--;
        delete results[locs[idx].id];
        const prev = mapMarkersEl.querySelector(`[data-cal-idx="${idx}"]`);
        if (prev) prev.remove();
        showCurrent();
      }
    }
  });

  function finish() {
    prompt.textContent = "Done! ";
    progress.textContent = "";

    // Build output
    const output = {};
    for (const loc of locs) {
      if (results[loc.id]) {
        output[loc.id] = results[loc.id];
      } else if (loc.coords) {
        output[loc.id] = loc.coords;  // keep existing
      }
    }

    const pre = document.createElement("pre");
    pre.style.cssText = "background:#111;color:#0f0;padding:16px;margin:12px 20px;border-radius:8px;font-size:12px;max-height:60vh;overflow:auto;text-align:left;";
    pre.textContent = JSON.stringify(output, null, 2);
    banner.appendChild(pre);

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy to clipboard";
    copyBtn.style.cssText = "margin:8px;padding:8px 16px;font-size:14px;cursor:pointer;";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(pre.textContent);
      copyBtn.textContent = "Copied!";
    };
    banner.appendChild(copyBtn);

    mapImg.style.cursor = "";
  }

  showCurrent();
})();
