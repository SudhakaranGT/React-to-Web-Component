customElements.define('form-submit', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const button = document.createElement('button');
      button.setAttribute('type', 'submit');
      button.textContent = this.getAttribute('label') || 'Submit';
      const style = document.createElement('style');
      style.textContent = `
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
      `;
      
      shadow.appendChild(style);
      shadow.appendChild(button);
    }
  });
  