const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
test("parses quotes, export, comments", () => {
  const { vars, issues } = C.parse(`# c\nexport A=1\nB="hello world" # x\nC='raw $x'\nD=plain # comment\nE="line1\\nline2"`);
  assert.deepEqual(Object.fromEntries(vars), { A: "1", B: "hello world", C: "raw $x", D: "plain", E: "line1\nline2" });
  assert.equal(issues.length, 0);
});
test("lint issues", () => {
  const { issues } = C.parse("A=1\nA=2\nbad line\nlow=x\nS=a b");
  assert.deepEqual(issues.map((i) => i.type), ["duplicate", "syntax", "case", "spaces"]);
});
test("diff statuses", () => {
  const d = C.diff("A=\nB=\nC=1\nD=x", "B=\nC=2\nD=x\nE=9");
  assert.deepEqual(d.summary, { missing: 1, extra: 1, changed: 1, empty: 0, same: 2, total: 5 });
  assert.equal(d.rows[0].key, "A");
});
test("example generation hides secrets", () => {
  const ex = C.toExample("# db\nPORT=3000\nAPI_KEY=abc\nDATABASE_URL=postgres://u:p@h/d\nNAME=prism");
  assert.equal(ex, "# db\nPORT=3000\nAPI_KEY=\nDATABASE_URL=postgres://user:password@localhost/db\nNAME=your_name");
});
test("mask", () => { assert.equal(C.mask("abcdefgh"), "ab••••gh"); assert.equal(C.mask("abc"), "•••"); });
