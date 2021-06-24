import React from 'react';
import { HashRouter } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';


const Routes: React.FC = () => (
  <HashRouter>
    <>
      <Route path="/" exact component={SignIn} />
    </>
  </HashRouter>
);

export default Routes;