/* Prism Env Diff · core logic */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  function parse(src) {
    const vars = new Map(), issues = [];
    const lines = String(src).replace(/\r\n?/g, "\n").split("\n");
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.startsWith("#")) continue;
      line = line.replace(/^export\s+/, "");
      const m = /^([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)$/.exec(line);
      if (!m) { issues.push({ line: i + 1, type: "syntax", msg: `Cannot parse: ${lines[i].trim().slice(0, 40)}` }); continue; }
      let [, key, val] = m;
      if (/^["']/.test(val)) {
        const q = val[0]; let end = val.indexOf(q, 1);
        while (end === -1 && i + 1 < lines.length && q === '"') { val += "\n" + lines[++i]; end = val.indexOf(q, 1); }
        if (end === -1) issues.push({ line: i + 1, type: "quote", msg: `${key}: unclosed quote` });
        val = end === -1 ? val.slice(1) : val.slice(1, end);
        if (q === '"') val = val.replace(/\\n/g, "\n");
      } else val = val.replace(/\s+#.*$/, "").trim();
      if (vars.has(key)) issues.push({ line: i + 1, type: "duplicate", msg: `${key} is defined more than once` });
      if (/\s/.test(m[2]) && !/^["']/.test(m[2]) && /\S\s+\S/.test(val)) issues.push({ line: i + 1, type: "spaces", msg: `${key}: unquoted value contains spaces` });
      if (key !== key.toUpperCase()) issues.push({ line: i + 1, type: "case", msg: `${key}: keys are usually UPPER_SNAKE_CASE` });
      vars.set(key, val);
    }
    return { vars, issues };
  }
  function diff(a, b) {
    const A = parse(a).vars, B = parse(b).vars, rows = [];
    for (const k of new Set([...A.keys(), ...B.keys()])) {
      const inA = A.has(k), inB = B.has(k);
      const status = !inB ? "missing" : !inA ? "extra" : A.get(k) === B.get(k) ? "same" : B.get(k) === "" ? "empty" : "changed";
      rows.push({ key: k, a: A.get(k), b: B.get(k), status });
    }
    const order = { missing: 0, empty: 1, extra: 2, changed: 3, same: 4 };
    rows.sort((x, y) => order[x.status] - order[y.status] || x.key.localeCompare(y.key));
    const count = (s) => rows.filter((r) => r.status === s).length;
    return { rows, summary: { missing: count("missing"), extra: count("extra"), changed: count("changed"), empty: count("empty"), same: count("same"), total: rows.length } };
  }
  const SECRET = /(SECRET|TOKEN|PASSWORD|PASS|PRIVATE|API_?KEY|KEY$|DSN|CREDENTIAL|AUTH)/i;
  function placeholder(key, val) {
    if (/^(true|false)$/i.test(val)) return val;
    if (/^\d+$/.test(val) && !SECRET.test(key)) return val;
    if (/^https?:\/\//.test(val) && !SECRET.test(key) && !/@/.test(val)) return val.replace(/\/\/[^/]+/, "//example.com");
    if (/^(postgres|mysql|mongodb(\+srv)?|redis):\/\//.test(val)) return val.split("://")[0] + "://user:password@localhost/db";
    return SECRET.test(key) ? "" : `your_${key.toLowerCase()}`;
  }
  function toExample(src) {
    const out = [];
    for (const raw of String(src).replace(/\r\n?/g, "\n").split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) { out.push(raw); continue; }
      const m = /^(export\s+)?([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)$/.exec(line);
      if (!m) continue;
      const v = parse(`${m[2]}=${m[3]}`).vars.get(m[2]) ?? "";
      out.push(`${m[1] || ""}${m[2]}=${placeholder(m[2], v)}`);
    }
    return out.join("\n");
  }
  const mask = (v) => (v == null ? "" : v.length <= 4 ? "•".repeat(v.length) : v.slice(0, 2) + "•".repeat(Math.min(v.length - 4, 12)) + v.slice(-2));
  return { parse, diff, toExample, mask, isSecret: (k) => SECRET.test(k) };
});
