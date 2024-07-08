import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const SelectableItem = ({items}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  

  const handleSelect = (item) => {
    setSelectedItem(item);
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
      border: '1px solid #ccc',
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
      <h1>Selectable List</h1>
      {items.map((item) => (
        <div
          key={item.value}
          style={{
            ...styles.item,
            ...(item === selectedItem ? styles.selectedItem : {}),
          }}
          onClick={() => handleSelect(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

customElements.define('selectable-item', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let items = JSON.parse(this.getAttribute('items') || '[]');
    const mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);
    // items = [
    //   { label: 'Item 1', value: 'item1' },
    //   { label: 'Item 2', value: 'item2' },
    //   { label: 'Item 3', value: 'item3' },]
    ReactDOM.render(<SelectableItem items={items} />, mountPoint);
  }
});

export default SelectableItem;
