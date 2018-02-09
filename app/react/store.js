import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {isClient} from 'app/utils';
import {composeWithDevTools} from 'redux-devtools-extension';

let data = isClient && window.__reduxData__ ? window.__reduxData__ : {};

let store;

export default function create(initialData = data) {
  store = createStore(
    reducer,
    initialData,
    composeWithDevTools(
      // applyMiddleware(createLogger()),
      applyMiddleware(thunk)
    )
  );

  return store;
}

if (!store) {
  store = create();
}


export {store};
