// tools/qrcode.js
import QRCode from 'https://esm.sh/qrcode@1.5.3';

export function renderQRCodeTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `<h2 class="collapsible">QR Code Generator</h2>`;

    content.innerHTML = `
    <input type="text" id="qrInput" placeholder="Enter text or URL..." />
    <button id="genQR">Generate QR</button>
    <button id="downloadQR" class="copy-btn">Download PNG</button>
    <div style="text-align: center; margin-top: 1rem;">
      <canvas id="qrcode"></canvas>
    </div>
  `;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    const input = content.querySelector('#qrInput');
    const canvas = content.querySelector('#qrcode');
    const button = content.querySelector('#genQR');
    const downloadBtn = content.querySelector('#downloadQR');

    button.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;
        QRCode.toCanvas(canvas, text, { width: 200 }, (err) => {
            if (err) console.error(err);
        });
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
