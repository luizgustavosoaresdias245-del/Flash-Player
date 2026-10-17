chrome.runtime.onInstalled.addListener(() => {
  console.log("Flash Player Activated");
});

// Listener para interceptar requisições de arquivos SWF e garantir a execução nativa
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Aqui a gente pode redirecionar para a nossa página de player embutido se for um link direto de SWF
    if (details.url.endsWith(".swf") && !details.url.includes(chrome.runtime.id)) {
      const viewerUrl = chrome.runtime.getURL(`viewer.html?swf=${encodeURIComponent(details.url)}`);
      return { redirectUrl: viewerUrl };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
