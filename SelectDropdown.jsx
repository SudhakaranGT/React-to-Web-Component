import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const SelectDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);

  const styles = {
    selectDropdown: {
      fontFamily: 'Arial, sans-serif',
      width: '300px',
      margin: '20px auto',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    selectedItem: {
      marginTop: '10px',
      color: '#007bff',
    },
  };
  

  useEffect(() => {
    setOptions([
      { label: 'Volvo', value: 'volvo' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Mercedes', value: 'mercedes' },
      { label: 'Audi', value: 'audi' },
    ]);
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const changeEvent = new CustomEvent('change', {
      detail: event.target.value,
      bubbles: true,
    });
    event.target.dispatchEvent(changeEvent);
  };

  return (
    <div className="select-dropdown" style={styles.selectDropdown}>
      <label htmlFor="dropdown" style={styles.label}>Options:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange} style={styles.select}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && <p style={styles.selectedItem}>Selected item: {selectedOption}</p>}
    </div>
  );
};


// if (!customElements.get('select-dropdown')) {
//   ReactDOM.render(<SelectDropdown />, document.getElementById('root'));
// }

customElements.define('select-dropdown', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

    ReactDOM.render(<SelectDropdown />, mountPoint);

    shadowRoot.querySelector('#dropdown').addEventListener('change', (event) => {
      const changeEvent = new CustomEvent('change', {
        detail: event.detail,
        bubbles: true,
      });
      this.dispatchEvent(changeEvent);
    });
  }
});


export default SelectDropdown;