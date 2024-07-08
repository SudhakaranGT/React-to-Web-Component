customElements.define('form-input', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const input = document.createElement('input');
      input.setAttribute('type', this.getAttribute('type') || 'text');
      input.setAttribute('placeholder', this.getAttribute('placeholder') || '');

      const label = document.createElement('label');
      label.textContent = this.getAttribute('label') || '';
  
      const style = document.createElement('style');
      style.textContent = `
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
      `;
  
      shadow.appendChild(style);
      shadow.appendChild(label);
      shadow.appendChild(input);
  
      input.addEventListener('input', () => {
        const changeEvent = new CustomEvent('change', { detail: input.value });
        this.dispatchEvent(changeEvent);
      });
    }
  });
  