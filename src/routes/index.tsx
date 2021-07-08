import React from 'react'
import { HashRouter } from 'react-router-dom'

import Route from './Route'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import AddTeacher from '../pages/AddTeacher'

const Routes: React.FC = () => (
  <HashRouter>
    <div>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/add-teacher" component={AddTeacher} isPrivate />
    </div>
  </HashRouter>
)

export default Routes
