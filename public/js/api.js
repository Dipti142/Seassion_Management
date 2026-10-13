function getToken() {
  return localStorage.getItem("token") || "";
}

function setSession(token, user) {
  localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function log(msg, cls) {
  const logEl = document.getElementById("log");
  if (!logEl) return;
  const line = document.createElement("div");
  line.className = cls || "";
  line.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
  logEl.prepend(line);
}

async function api(path, options) {
  options = options || {};
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = "Bearer " + token;
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(function () { return {}; });
  log((options.method || "GET") + " " + path + " -> " + res.status, res.ok ? "ok" : "err");
  return { res: res, data: data };
}
