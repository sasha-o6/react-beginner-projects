import React, { useState } from 'react';
import './index.scss';

function App() {
  const [counter, setCounter] = useState(0)

  const minusCounter = () =>
    setCounter((prevCounter) => (prevCounter - 1))


  const plusCounter = () =>
    setCounter((prevCounter) => (prevCounter + 1))

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{counter}</h1>
        <button onClick={minusCounter} className="minus">- Минус</button>
        <button onClick={plusCounter} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
