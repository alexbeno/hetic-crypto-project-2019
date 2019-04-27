import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import Index from '../Index'

import './styles.css'

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <a className="navbar-brand" href="#">
          Crypto Watcher
        </a>
      </nav>

      <div className="AppLayout">
        <Navigation />

        <div className="PageContent">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route component={Index} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default Layout
