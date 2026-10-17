// Parser básico de cabeçalho SWF para extrair metadados e preparar o terreno
async function initFlashEngine() {
    const urlParams = new URLSearchParams(window.location.search);
    const swfUrl = urlParams.get('swf');
    
    if (!swfUrl) {
        console.error("No SWF founded");
        return;
    }

    try {
        const response = await fetch(swfUrl);
        const buffer = await response.arrayBuffer();
        const view = new DataView(buffer);
        
        
        const sig1 = String.fromCharCode(view.getUint8(0));
        const sig2 = String.fromCharCode(view.getUint8(1));
        const sig3 = String.fromCharCode(view.getUint8(2));
        
        console.log(`Assinature Detected: ${sig1}${sig2}${sig3}`);
        
        if (sig1 !== 'F' && sig1 !== 'C') {
            alert("This not SWF");
            return;
        }

        const version = view.getUint8(3);
        const fileLength = view.getUint32(4, true);
        
        console.log(`Versão do Flash: ${version} | Tamanho: ${fileLength} bytes`);
        
        
        const canvas = document.getElementById('flashCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00ffcc";
        ctx.font = "20px monospace";
        ctx.fillText(`SWF Loaded with sucess! (v${version})`, 50, 100);
        ctx.fillText("Executing the native motor...", 50, 140);

    } catch (e) {
        console.error("Error in process a SWF:", e);
    }
}

window.onload = initFlashEngine;
