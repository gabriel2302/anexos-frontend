import React from 'react'
import { GlobalStyle } from './styles/GlobalStyle'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes/>
    </Router>
  )
}

export default App