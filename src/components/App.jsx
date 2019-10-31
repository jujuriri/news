import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Admin from './Admin'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
