console.log("[Flash Player] Content script ativado. Caçando arquivos .swf...");

function caçarEMatarFlash() {
  
  const flashElements = document.querySelectorAll('embed[type*="shockwave-flash"], object[data$=".swf"], object[type*="shockwave-flash"]');

  flashElements.forEach(el => {
    
    if (el.dataset.flashProcessado) return;
    el.dataset.flashProcessado = "true";

    const swfUrl = el.src || el.data;
    if (!swfUrl) return;

    console.log("[Flash Player] Flash founded:", swfUrl);

    
    const canvas = document.createElement('canvas');
    canvas.width = el.width || 640;
    canvas.height = el.height || 480;
    canvas.id = "flash-canvas-" + Math.random().toString(36).substr(2, 9);
    canvas.style.border = "1px solid #000";

    // Substitui o elemento nativo (que dava o erro de plugin) pelo canvas
    el.parentNode.replaceChild(canvas, el);

    // Injeta o embed.js na página para comunicar com a engine.js
    injetarScriptEmbed(swfUrl, canvas.id);
  });
}

function injetarScriptEmbed(swfUrl, canvasId) {
  // Cria uma tag de script apontando para o nosso embed.js
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('embed.js');
  script.onload = () => {
    // Envia evento pra página inicializar a engine
    window.postMessage({
      type: "INICIALIZAR_SWF",
      swfUrl: swfUrl,
      canvasId: canvasId
    }, "*");
    script.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

// Roda assim que a página carregar
caçarEMatarFlash();

// Observa se o site injeta Flash dinamicamente depois
const observer = new MutationObserver(caçarEMatarFlash);
observer.observe(document.body, { childList: true, subtree: true });

