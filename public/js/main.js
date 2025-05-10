const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/";

const urlBar = document.getElementById("urlBar");
const goBtn = document.getElementById("goBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const erudaBtn = document.getElementById("erudaBtn");
const proxyFrame = document.getElementById("proxyFrame");

goBtn.addEventListener("click", async () => {
  let url = urlBar.value.trim();
  if (!url.includes(".")) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  if (!await connection.getTransport()) {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
  proxyFrame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

urlBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    goBtn.click();
  }
});

backBtn.addEventListener("click", () => {
  proxyFrame.contentWindow.history.back();
});

forwardBtn.addEventListener("click", () => {
  proxyFrame.contentWindow.history.forward();
});

erudaBtn.addEventListener("click", () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => {
    eruda.init();
  };
  document.body.appendChild(script);
});
