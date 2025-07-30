export function renderJWTTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
    <h2 class="collapsible">JWT Secret Generator</h2>
  `;

    content.innerHTML = `
    <label for="lengthSlider">Key Length: <span id="lengthValue">32</span> bytes</label>
    <input type="range" id="lengthSlider" min="32" max="512" value="32" step="32" />
    <button id="genJwtSecret">Generate Secret</button>
    <div class="output-wrapper">
      <div class="output" id="jwtOut" title="Click to copy"></div>
    </div>
  `;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // Collapse toggle
    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    const output = wrapper.querySelector('#jwtOut');
    const lengthSlider = wrapper.querySelector('#lengthSlider');
    const lengthValue = wrapper.querySelector('#lengthValue');

    function generateJwtSecret(length = 32) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(32).padStart(2, '0')).join('');
    }

    wrapper.querySelector('#genJwtSecret').addEventListener('click', () => {
        const len = parseInt(lengthSlider.value, 10);
        const secret = generateJwtSecret(len);
        output.textContent = secret;
    });

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });
}
