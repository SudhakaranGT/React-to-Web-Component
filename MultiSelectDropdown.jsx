import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const MultiSelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const styles = {
    selectDropdown: {
      fontFamily: 'Arial, sans-serif',
      width: '300px',
      margin: '20px auto',
      position: 'relative',
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
      marginBottom: '10px',
      cursor: 'pointer',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: isOpen ? 'block' : 'none',
    },
    dropdownItem: {
      padding: '10px',
      cursor: 'pointer',
      borderBottom: '1px solid #f0f0f0',
    },
    selectedItemTag: {
      backgroundColor: '#f0f0f0',
      padding: '5px',
      margin: '2px',
      borderRadius: '4px',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    removeButton: {
      marginLeft: '5px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    // Example options (can be fetched or static)
    setOptions([
      { label: 'Volvo', value: 'volvo' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Mercedes', value: 'mercedes' },
      { label: 'Audi', value: 'audi' },
    ]);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleMenuClick = (option) => {
    if (!selectedOptions.includes(option.value)) {
      setSelectedOptions([...selectedOptions, option.value]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.value));
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="multi-select-dropdown" style={styles.selectDropdown}>
      <label htmlFor="multi-dropdown" style={styles.label}>
        Options:
      </label>
      <div
        id="multi-dropdown"
        style={styles.select}
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        {selectedOptions.length === 0 ? 'Click to open' : selectedOptions.join(', ')}
      </div>
      <div style={styles.dropdownMenu}>
        {options.map((option) => (
          <div
            key={option.value}
            style={styles.dropdownItem}
            onClick={() => handleMenuClick(option)}
          >
            {option.label}
            {selectedOptions.includes(option.value) && (
              <span style={{ float: 'right' }}>&#10003;</span>
            )}
          </div>
        ))}
      </div>
      <div style={styles.selectedItems}>
        {selectedOptions.map((option) => (
          <div key={option} style={styles.selectedItemTag} onClick={() => handleRemoveOption(option)}>
            {option}
            <span style={styles.removeButton}>&#10005;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

customElements.define('multi-select-dropdown', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

    ReactDOM.render(<MultiSelectDropdown />, mountPoint);
  }
});

export default MultiSelectDropdown;
