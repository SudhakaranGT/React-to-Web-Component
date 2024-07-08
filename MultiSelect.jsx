import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MultiSelect = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    item: {
      padding: '10px 20px',
      margin: '5px',
      border: '1px solid #904949',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    selectedItem: {
      backgroundColor: '#007bff',
      color: 'white',
      borderColor: '#007bff',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Multi-Select List</h1>
      {items.map((item) => (
        <div
          key={item.value}
          style={{
            ...styles.item,
            ...(selectedItems.includes(item) ? styles.selectedItem : {}),
          }}
          onClick={() => handleSelect(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

class MultiSelectElement extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['items'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const items = JSON.parse(this.getAttribute('items') || '[]');
    ReactDOM.render(<MultiSelect items={items} />, this.mountPoint);
  }
}

customElements.define('multi-select', MultiSelectElement);

export default MultiSelect;
