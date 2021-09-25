import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "react-big-calendar/lib/css/react-big-calendar.css";
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
// import '@elastic/eui/dist/eui_theme_amsterdam_dark.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
