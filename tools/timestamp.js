export function renderTimestampTool(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card';

  const content = document.createElement('div');
  content.style.display = 'none';

  wrapper.innerHTML = `
    <h2 class="collapsible">Timestamp ↔ Date</h2>
  `;

  content.innerHTML = `
    <button id="newDate">Now</button>
    <input type="text" id="tsInput" placeholder="Timestamp or ISO date" />
    <button id="tsConvert">Convert</button>
    <div class="output" id="tsOut"></div>
  `;

  wrapper.appendChild(content);
  container.appendChild(wrapper);

  // Collapse toggle
  const header = wrapper.querySelector('.collapsible');
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });

  const input = wrapper.querySelector('#tsInput');
  const output = wrapper.querySelector('#tsOut');

  wrapper.querySelector('#newDate').addEventListener('click', () => {
    const now = new Date();
    input.value = now.toISOString();
    output.textContent = Math.floor(now.getTime() / 1000).toString();
  });
  wrapper.querySelector('#tsConvert').addEventListener('click', () => {
    const val = input.value.trim();
    let result = '';
    if (/^\d+$/.test(val)) {
      result = new Date(parseInt(val) * 1000).toISOString();
    } else {
      const ts = Date.parse(val);
      result = isNaN(ts) ? '❌ Invalid date' : Math.floor(ts / 1000).toString();
    }
    output.textContent = result;
  });
  output.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent)
  });
}
