// tools/password.js
export function renderPasswordTool(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card';

    const content = document.createElement('div');
    content.style.display = 'none';

    wrapper.innerHTML = `
    <h2 class="collapsible">Password Generator</h2>
  `;

    content.innerHTML = `
    <label>Password Length: <span id="pwLengthVal">16</span></label>
    <input type="range" min="1" max="50" value="16" id="pwLength" />

    <div>
      <label><input type="checkbox" id="optUpper" checked /> Uppercase</label>
      <label><input type="checkbox" id="optLower" checked /> Lowercase</label>
      <label><input type="checkbox" id="optNumber" checked /> Numbers</label>
      <label><input type="checkbox" id="optSymbol" checked /> Symbols</label>
    </div>

    <button id="genPassword">Generate Password</button>
    <div class="output-wrapper">
      <div class="output" id="pwOut"></div>
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

    const pwOut = content.querySelector('#pwOut');
    const lengthInput = content.querySelector('#pwLength');
    const lengthVal = content.querySelector('#pwLengthVal');
    const output = content.querySelector('.output');

    lengthInput.addEventListener('input', () => {
        lengthVal.textContent = lengthInput.value;
    });

    function generatePassword() {
        const length = +lengthInput.value;
        const upper = content.querySelector('#optUpper').checked;
        const lower = content.querySelector('#optLower').checked;
        const number = content.querySelector('#optNumber').checked;
        const symbol = content.querySelector('#optSymbol').checked;

        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()-_=+[]{};:,.<>?';

        let charset = '';
        if (upper) charset += upperChars;
        if (lower) charset += lowerChars;
        if (number) charset += numberChars;
        if (symbol) charset += symbolChars;

        if (!charset) {
            pwOut.textContent = '❌ Please select at least 1 option';
            return;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset[Math.floor(Math.random() * charset.length)];
        }
        pwOut.textContent = result;
    }

    content.querySelector('#genPassword').addEventListener('click', generatePassword);

    output.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent)
    });

}