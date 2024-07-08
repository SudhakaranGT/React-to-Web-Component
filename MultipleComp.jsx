import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'


import * as Components from './Components';

Object.keys(Components).forEach((componentName) => {
  const Component = Components[componentName];

  class CustomElement extends HTMLElement {
    connectedCallback() {
      const mountPoint = document.createElement('div');
      this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

      const root = createRoot(mountPoint);
      const props = this.getProps();

      root.render(
        <React.StrictMode>
          <Component {...props} />
        </React.StrictMode>
      );
    }

    getProps() {
      const props = {};
      Array.from(this.attributes).forEach(attr => {
        props[attr.name] = attr.value;
      });
      return props;
    }

    static get observedAttributes() {
      return Object.keys(Components[componentName].propTypes || {});
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.connectedCallback(); 
      }
    }
  }

  customElements.define(
    `${componentName.toLowerCase()}-comp`,
    CustomElement
  );
});
