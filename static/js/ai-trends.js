(() => {
  "use strict";

  const root = document.getElementById("ai-trends");
  if (!root) return;

  const REFRESH_MS = 5 * 60 * 1000;
  const PER_PAGE = 25;
  // GitHub search allows at most five OR operators per query.
  const TERMS = "ai OR llm OR agent OR agents OR rag OR gpt";

  const VIEWS = {
    week:   { days: 7,  kicker: "Created in the last seven days, most starred first",
              q: (d) => `${TERMS} created:>${d}` },
    month:  { days: 30, kicker: "Created in the last thirty days, most starred first",
              q: (d) => `${TERMS} created:>${d}` },
    active: { days: 7,  kicker: "Over five thousand stars and pushed to in the last week",
              q: (d) => `${TERMS} stars:>5000 pushed:>${d}` },
  };

  const LANG_COLORS = {
    Python: "#3572a5", TypeScript: "#3178c6", JavaScript: "#d4b400", Rust: "#b7835a",
    Go: "#00add8", "Jupyter Notebook": "#da5b0b", "C++": "#f34b7d", C: "#555555",
    Java: "#b07219", Kotlin: "#8a5cf5", Swift: "#f05138", Shell: "#5fa33a", HTML: "#e34c26",
  };

  const state = { view: "week", data: {}, fetchedAt: {} };

  const $main = document.getElementById("ai-trends-main");
  const $status = document.getElementById("ai-trends-status");
  const $pulse = document.getElementById("ai-trends-pulse");

  document.getElementById("ai-trends-date").textContent =
    new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());

  const fmt = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
  const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });
  const isoDaysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  const daysSince = (iso) => Math.max(1, (Date.now() - new Date(iso)) / 864e5);
  const ago = (iso) => {
    const h = (Date.now() - new Date(iso)) / 36e5;
    if (h < 1) return "within the hour";
    if (h < 24) { const n = Math.round(h); return n === 1 ? "an hour ago" : `${n} hours ago`; }
    const d = Math.round(h / 24);
    return d === 1 ? "yesterday" : `${d} days ago`;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function toRow(r) {
    return {
      owner: r.owner.login,
      name: r.name,
      url: r.html_url,
      desc: r.description || "",
      lang: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      created: r.created_at,
      pushed: r.pushed_at,
      pace: r.stargazers_count / daysSince(r.created_at),
    };
  }

  async function fetchView(view) {
    const v = VIEWS[view];
    const url = new URL("https://api.github.com/search/repositories");
    url.searchParams.set("q", v.q(isoDaysAgo(v.days)));
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", String(PER_PAGE));
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
      const wait = reset ? Math.max(10, Math.round((reset - Date.now()) / 1000)) : 60;
      throw new Error(`GitHub is rate limiting this network. Try again in about ${wait} seconds.`);
    }
    if (!res.ok) throw new Error(`GitHub answered ${res.status}. Refresh to try again.`);
    const json = await res.json();
    return json.items.map(toRow);
  }

  const langTag = (lang) => lang
    ? `<span class="lang" style="--lc:${LANG_COLORS[lang] || "var(--pencil-light)"}">${esc(lang)}</span>`
    : "";

  function render() {
    const rows = state.data[state.view];
    const v = VIEWS[state.view];
    if (!rows) { $main.innerHTML = ""; return; }
    if (rows.length === 0) {
      $main.innerHTML = `<div class="notice"><strong>Nothing matched.</strong> GitHub's search index may be catching up. It will try again in five minutes.</div>`;
      return;
    }
    const [top, ...rest] = rows;
    const lede = `
      <section class="lede">
        <div>
          <p class="kicker">${esc(v.kicker)}</p>
          <h2><a href="${esc(top.url)}" target="_blank" rel="noopener">${esc(top.name)}</a></h2>
          <p class="desc">${esc(top.desc) || "No description yet."}</p>
          <p class="meta">
            <span>by ${esc(top.owner)}</span>
            ${langTag(top.lang)}
            <span>${fmt.format(top.stars)} stars</span>
            <span>${fmt.format(top.forks)} forks</span>
            <span>pushed ${ago(top.pushed)}</span>
          </p>
        </div>
        <div class="big"><span class="n">${fmt.format(Math.round(top.pace))}</span><span class="l">stars a day since it began</span></div>
      </section>`;
    const items = rest.map((r, i) => `
      <li>
        <span class="rank">${i + 2}</span>
        <span class="name"><a href="${esc(r.url)}" target="_blank" rel="noopener"><span class="owner">${esc(r.owner)} /</span> ${esc(r.name)}</a></span>
        <span class="nums"><span class="stars">${fmt.format(r.stars)}<small>stars</small></span><span class="pace">${fmt.format(Math.round(r.pace))} a day</span></span>
        <p class="desc">${esc(r.desc)}</p>
        <p class="meta">
          ${langTag(r.lang)}
          <span>created ${ago(r.created)}</span>
          <span>pushed ${ago(r.pushed)}</span>
        </p>
      </li>`).join("");
    $main.innerHTML = lede + `<ol class="board">${items}</ol>`;
  }

  function renderError(err) {
    $main.innerHTML = `<div class="notice"><strong>Could not load this view.</strong><br>${esc(err.message)}<br><button type="button" id="ai-trends-retry">Try again now</button></div>`;
    document.getElementById("ai-trends-retry").addEventListener("click", () => load(state.view, true));
    $pulse.classList.add("stale");
    $status.textContent = "Paused";
  }

  function updateStatus() {
    const at = state.fetchedAt[state.view];
    if (!at) return;
    const mins = Math.floor((Date.now() - at) / 60000);
    const next = Math.max(1, Math.ceil((at + REFRESH_MS - Date.now()) / 60000));
    $status.textContent = `Updated ${timeFmt.format(new Date(at))}, next check in ${next} min`;
    $pulse.classList.toggle("stale", mins > 10);
  }

  async function load(view, force = false) {
    const fresh = state.fetchedAt[view] && Date.now() - state.fetchedAt[view] < REFRESH_MS;
    if (fresh && !force) { render(); updateStatus(); return; }
    if (view === state.view) $status.textContent = "Updating";
    try {
      state.data[view] = await fetchView(view);
      state.fetchedAt[view] = Date.now();
      localStorage.setItem("aitrend:" + view, JSON.stringify({ at: state.fetchedAt[view], rows: state.data[view] }));
      if (view === state.view) { render(); updateStatus(); }
    } catch (err) {
      if (view === state.view) renderError(err);
    }
  }

  function restore() {
    for (const view of Object.keys(VIEWS)) {
      try {
        const cached = JSON.parse(localStorage.getItem("aitrend:" + view) || "null");
        if (cached && Date.now() - cached.at < 6 * 36e5) { state.data[view] = cached.rows; state.fetchedAt[view] = cached.at; }
      } catch { /* ignore bad cache */ }
    }
  }

  document.getElementById("ai-trends-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;
    for (const b of e.currentTarget.querySelectorAll("button")) b.setAttribute("aria-selected", String(b === btn));
    state.view = btn.dataset.view;
    render();
    load(state.view);
  });

  restore();
  render();
  updateStatus();
  load(state.view, true);
  // Stagger the other views so three searches never land in the same second.
  setTimeout(() => load("month"), 4000);
  setTimeout(() => load("active"), 8000);
  setInterval(() => { for (const v of Object.keys(VIEWS)) load(v, true); }, REFRESH_MS);
  setInterval(updateStatus, 30000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) load(state.view); });
})();
