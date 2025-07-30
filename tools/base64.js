export function renderBase64Tool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
    <h2 class="collapsible">Base64 Encode / Decode</h2>
  `;

    content.innerHTML = `
    <textarea rows="3" id="base64Input" placeholder="Enter text here"></textarea>
    <div>
      <button id="base64Encode">Encode</button>
      <button id="base64Decode">Decode</button>
    </div>
    <div class="output-wrapper">
      <div class="output" id="base64Out"></div>
    </div>
    <button id="base64Clear">Clear</button>
  `;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // Collapse toggle
    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });


    const input = wrapper.querySelector('#base64Input');
    const output = wrapper.querySelector('#base64Out');

    wrapper.querySelector('#base64Encode').addEventListener('click', () => {
        try {
            output.textContent = btoa(unescape(encodeURIComponent(input.value)));
        } catch {
            output.textContent = '❌ Encode error';
        }
    });

    wrapper.querySelector('#base64Decode').addEventListener('click', () => {
        try {
            output.textContent = decodeURIComponent(escape(atob(input.value)));
        } catch {
            output.textContent = '❌ Invalid Base64';
        }
    });
    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });
    content.querySelector('#base64Clear').addEventListener('click', () => {
        input.value = '';
        output.textContent = '';
    });
}
