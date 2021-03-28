import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App, { history } from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { auth } from './firebase/firebase';

const store = configureStore()

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>  
  </React.StrictMode>
)

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true
    }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user));
    console.log(user)
    renderApp();
    // if (history.location.pathname === '/') {
    //   history.push('/');
    // };
  } else {
    store.dispatch(logout());
    console.log(user)

    renderApp();
    history.push('/');
  };
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
