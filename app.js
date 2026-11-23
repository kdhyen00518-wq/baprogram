(() => {
  const gridEl = document.getElementById("project-grid");
  const tabsEl = document.getElementById("category-tabs");
  const searchEl = document.getElementById("search-input");
  const countEl = document.getElementById("project-count");
  const emptyEl = document.getElementById("empty-state");

  let activeCategory = "전체";
  let query = "";

  const categories = ["전체", ...new Set(PROJECTS.map((p) => p.category))];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTabs() {
    tabsEl.innerHTML = categories
      .map(
        (cat) => `
        <button
          type="button"
          class="tab-btn ${cat === activeCategory ? "active" : ""}"
          data-category="${escapeHtml(cat)}"
        >
          ${escapeHtml(cat)}
        </button>
      `
      )
      .join("");
  }

  function matchesFilter(project) {
    const inCategory =
      activeCategory === "전체" || project.category === activeCategory;
    if (!inCategory) return false;

    if (!query) return true;
    const haystack = [
      project.title,
      project.description,
      project.category,
      ...(project.tags || [])
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  }

  function createCardHtml(p) {
    const isWeb = p.type === "web";
    const typeLabel = isWeb ? "WEB" : "LOCAL";
    const typeClass = isWeb ? "type-web" : "type-local";
    const ctaLabel = isWeb ? "실행하기" : "다운로드 / 안내";
    const fallbackChar = escapeHtml((p.title || "?").trim().charAt(0));

    const tagsHtml = (p.tags || [])
      .map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`)
      .join("");

    const repoBtn = p.repo
      ? `<a class="btn btn-ghost" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer">Code</a>`
      : "";

    const thumbHtml = p.thumb
      ? `<img src="${escapeHtml(p.thumb)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.remove(); this.parentElement.textContent='${fallbackChar}'" />`
      : fallbackChar;

    return `
      <article class="card">
        <div class="card-head">
          <div class="thumb-box">${thumbHtml}</div>
          <div class="card-meta">
            <div class="badge-row">
              <span class="type-badge ${typeClass}">${typeLabel}</span>
              ${p.updated ? `<span class="updated">${escapeHtml(p.updated)}</span>` : ""}
            </div>
            <h2 class="card-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</h2>
          </div>
        </div>
        <p class="card-desc">${escapeHtml(p.description)}</p>
        ${tagsHtml ? `<div class="tag-list">${tagsHtml}</div>` : ""}
        <div class="card-actions">
          <a class="btn btn-primary" href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
          ${repoBtn}
        </div>
      </article>
    `;
  }

  function renderGrid() {
    const filtered = PROJECTS.filter(matchesFilter);
    countEl.textContent = `${filtered.length} / ${PROJECTS.length} Projects`;

    if (filtered.length === 0) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    gridEl.innerHTML = filtered.map(createCardHtml).join("");
  }

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    renderTabs();
    renderGrid();
  });

  searchEl.addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    renderGrid();
  });

  renderTabs();
  renderGrid();
})();