import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './app/store.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App />
        <ToastContainer autoClose={2000} />
      </ThemeProvider>
    </Router>
  </Provider>,
)
