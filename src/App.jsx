import { useState } from 'react';
import './index.scss';

function App() {
  const [isShowModal, setIsShowModal] = useState(false)

  const toggleIsShowModal = () =>
    setIsShowModal((prevState) => (!prevState))

  return (
    <div className="App">
      <button onClick={toggleIsShowModal} className="open-modal-btn">✨ Открыть окно</button>
      <div className={`overlay animated ${isShowModal ? "show" : ''}`}>
        <button onClick={toggleIsShowModal} type="button" className="overlay-bg"></button>
        <div className="modal">
          <button onClick={toggleIsShowModal} type="button" className="svg-button">
            <svg height="200" viewBox="0 0 200 200" width="200">
              <title />
              <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
          </button>
          <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
        </div>
      </div>
    </div>
  );
}

export default App;