import ReactDOM from 'react-dom/client';
import './style/style.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './components/redux/reducer';

import App from './components/App/App';

console.log('')
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  console.log('store', store)
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);