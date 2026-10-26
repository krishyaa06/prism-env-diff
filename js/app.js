(() => {
  const { $, copy, download, store, debounce, esc } = Prism;
  const EX = `# App\nNODE_ENV=development\nPORT=3000\nAPP_URL=http://localhost:3000\n\n# Database\nDATABASE_URL=postgres://user:password@localhost/db\nREDIS_URL=redis://localhost:6379\n\n# Auth\nJWT_SECRET=\nGITHUB_CLIENT_ID=\nGITHUB_CLIENT_SECRET=\n\n# AI\nGROQ_API_KEY=\nSENTRY_DSN=`;
  const ENV = `NODE_ENV=production\nPORT=8080\nAPP_URL=https://prism.example.com\nDATABASE_URL=postgres://prism:s3cr3t@db.internal/prism\nJWT_SECRET=b7f2c1e9a0d44f3c8e21\nGITHUB_CLIENT_ID=Iv1.8a7f0c2d\nGITHUB_CLIENT_SECRET=\nGROQ_API_KEY=gsk_live_9f8e7d6c5b4a\nGROQ_API_KEY=gsk_live_override\nDEBUG=prism:* extra\nanalytics_id=G-12345`;
  const cell = (k, v, reveal) => (v == null ? `<span class="muted">—</span>` : v === "" ? `<span class="muted">(empty)</span>` : esc(!reveal && Core.isSecret(k) ? Core.mask(v) : v));
  function render() {
    const a = $("#a").value, b = $("#b").value; store.set("env:a", a); store.set("env:b", b);
    const d = Core.diff(a, b), pa = Core.parse(a), pb = Core.parse(b), reveal = $("#reveal").checked;
    $("#ca").textContent = `${pa.vars.size} keys`; $("#cb").textContent = `${pb.vars.size} keys`;
    $("#sum").innerHTML = ["missing", "empty", "extra", "changed", "same"].map((s) => `<span class="st ${s}">${d.summary[s]} ${s}</span>`).join("");
    const rows = d.rows.filter((r) => $("#showSame").checked || r.status !== "same");
    $("#tbl").innerHTML = `<thead><tr><th>Key</th><th>Status</th><th>.env.example</th><th>.env</th></tr></thead><tbody>${rows.map((r) => `<tr><td><b>${esc(r.key)}</b></td><td><span class="st ${r.status}">${r.status}</span></td><td>${cell(r.key, r.a, reveal)}</td><td>${cell(r.key, r.b, reveal)}</td></tr>`).join("") || `<tr><td colspan="4" class="muted">Everything matches.</td></tr>`}</tbody>`;
    const issues = [...pa.issues.map((i) => ({ ...i, f: ".env.example" })), ...pb.issues.map((i) => ({ ...i, f: ".env" }))];
    $("#issues").innerHTML = issues.length ? issues.map((i) => `<li><b>${i.f}:${i.line}</b>${esc(i.msg)}</li>`).join("") : `<li class="muted">No problems found.</li>`;
    if (!$("#ex").textContent) $("#ex").textContent = Core.toExample(b);
  }
  $("#a").value = store.get("env:a", EX); $("#b").value = store.get("env:b", ENV);
  ["#a", "#b"].forEach((s) => $(s).addEventListener("input", debounce(render, 150)));
  $("#showSame").onchange = $("#reveal").onchange = render;
  $("#gen").onclick = () => { $("#ex").textContent = Core.toExample($("#b").value); copy($("#ex").textContent); };
  $("#dl").onclick = () => download(".env.example", Core.toExample($("#b").value) + "\n");
  render();
})();
