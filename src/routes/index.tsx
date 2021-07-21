import React from 'react'
import { HashRouter } from 'react-router-dom'

import Route from './Route'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import AddTeacher from '../pages/Teacher/AddTeacher'
import AddStudent from '../pages/Student/AddStudent'
import Teacher from '../pages/Teacher'
import Student from '../pages/Student'

const Routes: React.FC = () => (
  <HashRouter>
    <div>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/add-teacher" component={AddTeacher} isPrivate />
      <Route path="/add-student" component={AddStudent} isPrivate />
      <Route path="/teachers" component={Teacher} isPrivate />
      <Route path="/students" component={Student} isPrivate />
    </div>
  </HashRouter>
)

export default Routes
