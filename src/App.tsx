import {useEffect} from 'react'
import { GlobalStyle } from './styles/GlobalStyle'

import { Greetings } from './components/Greetings'
import api from './services/api'

interface Student {
  id: string;
  name: string;
}
export function App() {
  const [student, setStudent] = useEffect([]) 
  useEffect(()=> {
    api.get('students').then(response => setStudent(response.data))
  },[]);
  return (
    <>
      <GlobalStyle />
      <Greetings />
    </>
  )
}