export function renderUUIDTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
        <h2 class="collapsible">UUID Generator</h2>`;

    content.innerHTML = `
        <button id="genUUID">Generate UUID</button>
        <div class="output" id="uuidOut"></div>`;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    // Collapse toggle
    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    const output = wrapper.querySelector('#uuidOut');

    wrapper.querySelector('#genUUID').addEventListener('click', () => {
        const uuid = crypto.randomUUID();
        wrapper.querySelector('#uuidOut').textContent = uuid;
    });

    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });

}