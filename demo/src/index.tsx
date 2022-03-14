import '@eleven.fe/reset.css';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
// import Emitter from '../../src/index';
import Emitter from '@e.fe/emitter';

const emitter = new Emitter();

const App = () => {
  useEffect(() => {
    emitter.on('custom-event', (msg, num) => {
      console.log('num: ', num);
      alert(`fire custom-event, and say ${msg}`);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          emitter.emit('custom-event', 'hello~', 123);
        }}
      >
        Click Here
      </button>
    </div>
  );
};

render(<App />, document.getElementById('root'));
