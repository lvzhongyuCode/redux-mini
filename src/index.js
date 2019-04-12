import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { counter } from './myReducer';
import thunk from 'redux-thunk';



// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

import { createStore } from './myredux';
// import { applyMiddleware } from 'redux';
import { applyMiddleware } from './myredux';
import { Provider } from './myReactRedux';
const store = createStore(counter,applyMiddleware(thunk))
// const store = createStore(counter)

ReactDOM.render(
  <Provider store={store}> 
    <App/>
  </Provider>
 ,
 document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
