import { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

import * as Yup from 'yup'
import DashboardLayout from '../../../components/Layout/Dashboard'
import Input from '../../../components/Input'
import './styles.scss'
import getValidationErrors from '../../../utils/getValidationErrors'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

interface FormData {
  name: string
  birthdate: string
}

export default function AddStudent() {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do aluno obrigatorio'),
        birthdate: Yup.date()
          .required('Data de nascimento obrigatoria')
          .max(new Date(), 'Data Invalida')
          .min('01/01/1999', 'Data Invalida'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })
      const response = await api.post('/students', {
        name: data.name,
        birthdate: data.birthdate,
      })

      formRef.current?.reset()
      addToast({
        type: 'success',
        title: `Aluno cadastrado com sucesso`,
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar',
        description:
          'Ocorreu um erro ao fazer cadastro, cheque os campos ou contate o desenvolvedor',
      })
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="student">
        <h1 className="student__header--h1">Cadastro de alunos</h1>
        <Form onSubmit={handleSubmit} ref={formRef} className="student__form">
          <div className="student__input-group">
            <label htmlFor="name">Nome completo</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="student__input"
            />
          </div>
          <div className="student__input-group">
            <label htmlFor="birthdate">Data de nascimento</label>
            <Input type="date" name="birthdate" className="student__input" />
          </div>
          <button type="submit" className="student__button">
            Cadastrar
          </button>
        </Form>
      </div>
    </DashboardLayout>
  )
}
