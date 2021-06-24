import React from 'react'
import { Container, LoginContainer, Image, Form } from './styles'

import logo from '../../assets/logo-educacao.png'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image src={logo} alt="Logo secretaria da educacao"/>
      <LoginContainer>
        <h2>Faça login</h2>
        <Form>
          <input type="text" placeholder="Digite seu nome de usuario"/>
          <input type="password" placeholder="Digite sua senha"/>
          <button>Entrar</button>
        </Form>
      </LoginContainer>
    </Container>
  )
}

export default SignIn