/* 코드런 Python 실행 워커 — Pyodide를 CDN에서 로드해 사용자 코드를 실행한다. */
/* global importScripts, loadPyodide */

importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");

let py = null;
const pyReady = (async () => {
  py = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  });
  self.postMessage({ type: "ready" });
})();

// stdout은 채점용으로 깨끗이, stderr/트레이스백은 따로 모은다.
const HARNESS = `
import sys, io, traceback
__buf = io.StringIO()
__errbuf = io.StringIO()
__tb = ""
__o, __e, __i = sys.stdout, sys.stderr, sys.stdin
sys.stdout = __buf
sys.stderr = __errbuf
sys.stdin = io.StringIO(__stdin_data)
try:
    exec(compile(__user_code, "<solution>", "exec"), {"__name__": "__main__"})
except SystemExit:
    pass
except BaseException:
    __tb = traceback.format_exc(limit=3)
finally:
    sys.stdout, sys.stderr, sys.stdin = __o, __e, __i
__out = __buf.getvalue()
__err = (__errbuf.getvalue() + __tb).strip()
`;

self.onmessage = async (e) => {
  const { id, code, stdin } = e.data || {};
  if (id == null) return;
  try {
    await pyReady;
    py.globals.set("__user_code", code || "");
    py.globals.set("__stdin_data", stdin || "");
    await py.runPythonAsync(HARNESS);
    const out = py.globals.get("__out");
    const err = py.globals.get("__err");
    self.postMessage({ id, stdout: out ?? "", stderr: err ?? "" });
  } catch (err) {
    self.postMessage({ id, stdout: "", stderr: String(err) });
  }
};
