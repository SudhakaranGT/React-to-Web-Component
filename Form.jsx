customElements.define('form-component', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Handle form submission
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
        const submitEvent = new CustomEvent('submit', { detail: data });
        this.dispatchEvent(submitEvent);
      };
  
      // Create form element
      const form = document.createElement('form');
      form.addEventListener('submit', handleSubmit);
  
      // Append elements to shadow DOM
      shadow.appendChild(form);
    }
  });
  