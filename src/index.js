import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './context/Provider'
import App from './components/App'
import './index.css'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
