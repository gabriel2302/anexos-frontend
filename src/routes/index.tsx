import React from 'react'
import { HashRouter } from 'react-router-dom'

import Route from './Route'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'

const Routes: React.FC = () => (
  <HashRouter>
    <div>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </div>
  </HashRouter>
)

export default Routes
