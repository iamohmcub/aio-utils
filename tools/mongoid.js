export function renderMongoIdTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
    <h2  class="collapsible">MongoDB ObjectId Generator</h2>
  `;

    content.innerHTML = `
    <button id="genMongoId">Generate ObjectId</button>
    <div class="output-wrapper">
      <div class="output" id="mongoOut"></div>
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

    const output = wrapper.querySelector('#mongoOut');

    function generateObjectId() {
        const timestamp = Math.floor(Date.now() / 1000).toString(16);
        const random = Array.from(crypto.getRandomValues(new Uint8Array(12)))
            .map(b => b.toString(16).padStart(2, '0')).join('')
            .slice(0, 16);
        return timestamp + random;
    }

    wrapper.querySelector('#genMongoId').addEventListener('click', () => {
        const oid = generateObjectId();
        output.textContent = oid;
    });

    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });
}