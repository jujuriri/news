import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { useFirebase } from './firebase'
import App from './components/App'
import './index.css'

const FirebaseContext = createContext()
const FirebaseProvider = props => (
  <FirebaseContext.Provider value={useFirebase}>{props.children}</FirebaseContext.Provider>
)

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById('root')
)

export { FirebaseContext }
