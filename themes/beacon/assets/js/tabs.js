// Home page "What's next" tabs. Without JS both lists simply show, one after the other.
(() => {
  const list = document.querySelector('.tabs[role="tablist"]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const show = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    }
    if (focus) tab.focus();
  };
  list.hidden = false;
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t));
    t.addEventListener("keydown", e => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (step) { e.preventDefault(); show(tabs[(i + step + tabs.length) % tabs.length], true); }
    });
  });
  // #committee in the address opens the Committee tab.
  show(tabs.find(t => location.hash === "#" + t.id.replace("tab-", "")) || tabs[0]);
})();
