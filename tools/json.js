// tools/jsoneditor.js
export function renderJSONEditorTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `<h2 class="collapsible">JSON Viewer / Editor</h2>`;

    content.innerHTML = `
    <div>
      <input type="file" id="jsonFile" accept="application/json" />
      <input type="text" id="jsonUrl" placeholder="Import from URL..." style="width: calc(100% - 12px); margin-top: 0.5rem;"/>
      <div style="margin-top: 0.5rem;">
        <label><input type="checkbox" id="autoFix" /> Attempt auto repair if invalid</label>
      </div>
      <button id="loadJson">Load</button>
      <button id="formatJson">Prettify</button>
      <button id="repairJson">Auto Repair</button>
      <button id="toggleView">Toggle View</button>
    </div>
    <textarea id="jsonInput" rows="10" placeholder="Paste or edit JSON here..."></textarea>
    <div id="jsonDisplay" class="output" style="margin-top: 1rem;"></div>
  `;

    wrapper.appendChild(content);
    container.appendChild(wrapper);

    const header = wrapper.querySelector('.collapsible');
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    const textarea = content.querySelector('#jsonInput');
    const output = content.querySelector('#jsonDisplay');
    const fileInput = content.querySelector('#jsonFile');
    const urlInput = content.querySelector('#jsonUrl');
    const autoFix = content.querySelector('#autoFix');
    const loadBtn = content.querySelector('#loadJson');
    const formatBtn = content.querySelector('#formatJson');
    const toggleBtn = content.querySelector('#toggleView');
    const repairBtn = content.querySelector('#repairJson');

    let showTable = false;

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            textarea.value = reader.result;
            renderJSON();
        };
        reader.readAsText(file);
    });

    loadBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!url) return;
        try {
            const res = await fetch(url);
            const data = await res.json();
            textarea.value = JSON.stringify(data, null, 2);
            renderJSON();
        } catch (e) {
            output.textContent = '❌ Failed to load JSON from URL';
        }
    });

    formatBtn.addEventListener('click', () => {
        try {
            const obj = JSON.parse(textarea.value);
            textarea.value = JSON.stringify(obj, null, 2);
            renderJSON();
        } catch (e) {
            const err = e.message;
            output.textContent = `❌ Invalid JSON: ${err}`;
        }
    });

    repairBtn.addEventListener('click', () => {
        const fixed = tryAutoRepair(textarea.value);
        textarea.value = fixed;
        renderJSON();
    });

    toggleBtn.addEventListener('click', () => {
        showTable = !showTable;
        renderJSON();
    });

    function tryAutoRepair(jsonText) {
        return jsonText
            .replace(/\,(\s*[}\]])/g, '$1')
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
            .replace(/'/g, '"');
    }

    function renderJSON() {
        output.innerHTML = '';
        let jsonText = textarea.value;
        try {
            let json;
            try {
                json = JSON.parse(jsonText);
            } catch (e) {
                if (autoFix.checked) {
                    jsonText = tryAutoRepair(jsonText);
                    textarea.value = jsonText;
                    json = JSON.parse(jsonText);
                } else {
                    throw e;
                }
            }

            if (showTable && typeof json === 'object' && !Array.isArray(json)) {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                for (const key in json) {
                    const row = document.createElement('tr');
                    const keyCell = document.createElement('td');
                    keyCell.textContent = key;
                    keyCell.style.fontWeight = 'bold';
                    keyCell.style.border = '1px solid #ccc';
                    keyCell.style.padding = '4px';
                    const valCell = document.createElement('td');
                    valCell.textContent = JSON.stringify(json[key]);
                    valCell.style.border = '1px solid #ccc';
                    valCell.style.padding = '4px';
                    row.appendChild(keyCell);
                    row.appendChild(valCell);
                    table.appendChild(row);
                }
                output.appendChild(table);
            } else {
                output.textContent = JSON.stringify(json, null, 2);
            }
        } catch (e) {
            const errorLine = getErrorLine(e);
            output.textContent = `❌ Invalid JSON: ${e.message}${errorLine ? `\n${errorLine}` : ''}`;
        }
    }

    function getErrorLine(err) {
        const msg = err.message || '';
        const lineMatch = msg.match(/at position (\d+)/);
        if (!lineMatch) return '';
        const pos = parseInt(lineMatch[1], 10);
        const lines = textarea.value.substring(0, pos).split(/\n/);
        return `⚠️ Near line ${lines.length}: ${lines[lines.length - 1].trim()}`;
    }
}
