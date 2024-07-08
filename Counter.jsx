import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const styles = {
    counterApp: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      margin: '20px auto',
      width: '300px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      color: '#007bff',
      fontSize: '24px',
      marginBottom: '15px',
    },
    counterDisplay: {
      marginBottom: '20px',
    },
    countText: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      fontSize: '16px',
      padding: '10px 20px',
      margin: '0 5px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      outline: 'none',
    },
  };

  return (
    <div className="counter-app" style={styles.counterApp}>
      <h1 style={styles.heading}>Counter App</h1>
      <div style={styles.counterDisplay}>
        <p style={styles.countText}>Count: {count}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={decrement}>-</button>
          <button style={styles.button} onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
};


// if (!customElements.get('counter-app')) {
//   ReactDOM.render(<CounterApp />, document.getElementById('root'));
// }

customElements.define('counter-app', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

    ReactDOM.render(<CounterApp />, mountPoint);
  }
});

export default CounterApp;