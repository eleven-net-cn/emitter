# [@e.fe/emitter](https://www.npmjs.com/package/@e.fe/emitter)

event emitter

## Usage

```ts
import Emitter from '@e.fe/emitter';

const emitter = new Emitter();

function callback(msg) {
  console.log('msg: ', msg);
}

// bind event
emitter.on('event-name', callback);

// bind event, only emit once
emitter.once('event-name', callback);

// emit event
emitter.emit('event-name', 'hello world');

// unbind event, only specified function
emitter.off('event-name', callback);

// unbind event, all functions
emitter.off('event-name');
```
