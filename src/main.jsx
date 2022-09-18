import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

fetch('/api')
  .then(response => response.json())
  .then(data => console.log(data));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
