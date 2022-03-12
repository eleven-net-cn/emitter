import '@eleven.fe/reset.css';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Emitter from '../../src/index';

const emitter = new Emitter();

const App = () => {
  useEffect(() => {
    emitter.on('custom-event', msg => {
      alert(`fire custom-event, and say ${msg}`);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          emitter.emit('custom-event', 'hello~');
        }}
      >
        Click Here
      </button>
    </div>
  );
};

render(<App />, document.getElementById('root'));
