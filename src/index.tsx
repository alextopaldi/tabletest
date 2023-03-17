import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { setupStore } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
  <BrowserRouter basename='/tabletest'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

