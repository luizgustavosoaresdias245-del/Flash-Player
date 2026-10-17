console.log("[Flash Player] Embed script carregado no contexto da página.");

// Ouve as mensagens vindas do content.js
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "INICIALIZAR_SWF") {
    const { swfUrl, canvasId } = event.data;
    const canvas = document.getElementById(canvasId);

    if (!canvas) return;

    console.log("[Flash Player] Baixando bytes do SWF via JS puro...");

    fetch(swfUrl)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        // Se sua engine.js tiver uma função global para iniciar
        if (typeof window.rodarEngineFlash === "function") {
          window.rodarEngineFlash(buffer, canvas);
        } else {
          console.warn("[Flash Player] Engine carregada, mas 'rodarEngineFlash' não foi encontrada!");
        }
      })
      .catch(err => console.error("[Flash Player] Erro no fetch do SWF:", err));
  }
});
