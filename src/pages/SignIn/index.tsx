import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'

import logo from '../../assets/logo-educacao.png'
import styles from './styles.module.scss'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import { useAuth } from '../../hooks/auth'

interface FormData {
  username: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()

  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        username: Yup.string().required('Nome de usuário obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      // Login
      await signIn({ username: data.username, password: data.password })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }
      console.log(`Usuario ou senha invalida`)
    }
  }, [])

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={logo}
        alt="Logo secretaria da educacao"
      />
      <div className={styles.loginContainer}>
        <h2>Faça login</h2>
        <Form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
          <Input
            name="username"
            type="text"
            placeholder="Digite seu nome de usuário"
            className={styles.form_input}
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            className={styles.form_input}
          />
          <button type="submit">Entrar</button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
