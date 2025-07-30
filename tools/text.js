// tools/text.js
export function renderTextTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
    <h2 class="collapsible">Text Case Converter</h2>
  `;

    content.innerHTML = `
    <textarea id="textTool" rows="3" placeholder="Enter text"></textarea>
    <div>
      <button id="toUpper">UPPERCASE</button>
      <button id="toLower">lowercase</button>
    </div>
    <div class="output" id="textOut"></div>
  `;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // Collapse toggle
    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });


    container.appendChild(wrapper);

    const textarea = wrapper.querySelector('#textTool');
    const output = wrapper.querySelector('#textOut');

    wrapper.querySelector('#toUpper').addEventListener('click', () => {
        output.textContent = textarea.value.toUpperCase();
    });

    wrapper.querySelector('#toLower').addEventListener('click', () => {
        output.textContent = textarea.value.toLowerCase();
    });
    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });
}
