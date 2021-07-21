import { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

import * as Yup from 'yup'
import DashboardLayout from '../../../components/Layout/Dashboard'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import './styles.scss'
import getValidationErrors from '../../../utils/getValidationErrors'
import api from '../../../services/api'
import { useToast } from '../../../hooks/toast'

interface FormData {
  name: string
  enrollment: string
  office: string
  occupation: string
  functional_situation: string
}

export default function AddTeacher() {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do professor obrigatorio'),
        enrollment: Yup.string().required('Numero de matricula obrigatoria'),
        office: Yup.string().required('Cargo obrigatorio'),
        occupation: Yup.string().required('Funcao obrigatoria'),
        functional_situation: Yup.string().required(
          'Situacao funcional obrigatoria'
        ),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/people', {
        name: data.name,
        enrollment: data.enrollment,
        occupation: data.occupation,
        office: data.office,
        functional_situation: data.functional_situation,
      })

      addToast({
        type: 'success',
        title: `Professor foi cadastrado com sucesso`,
        description:
          'Cadastrado com sucesso, o nome de usuario e senha sao os numeros da matricula',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      if (err.response.data.message === 'User enrollment already exists') {
        formRef.current?.setFieldError('enrollment', 'matricula em uso')
        addToast({
          type: 'error',
          title: 'Numero de matricula em uso',
          description: 'Esse numero de matricula ja esta em uso',
        })
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
      <div className="teacher">
        <h1 className="teacher__header--h1">Cadastro de professores</h1>
        <Form onSubmit={handleSubmit} ref={formRef} className="teacher__form">
          <div className="teacher__input-group">
            <label htmlFor="name">Nome completo</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="teacher__input"
            />
          </div>
          <div className="teacher__input-group">
            <label htmlFor="enrollment">Número da matrícula</label>
            <Input type="text" name="enrollment" className="teacher__input" />
          </div>
          <div className="teacher__input-group">
            <label htmlFor="office">Cargo</label>
            <Input type="text" name="office" className="teacher__input" />
          </div>
          <div className="teacher__input-group">
            <label htmlFor="occupation">Ocupação</label>
            <Select
              placeholder="Selecione uma opção"
              name="occupation"
              options={[
                { value: 'PEB I', label: 'Peb 1' },
                { value: 'MONITOR DE CRECHE', label: 'Monitor de creche' },
              ]}
            />
          </div>
          <div className="teacher__input-group">
            <label htmlFor="functional_situation">Situação funcional</label>
            <Select
              placeholder="Selecione uma opção"
              name="functional_situation"
              options={[
                { value: 'efetivo', label: 'Efetivo' },
                { value: 'contrato', label: 'Contrato' },
                { value: 'dobra', label: 'Dobra' },
                { value: 'substituição', label: 'Substituição' },
              ]}
            />
          </div>
          <button type="submit" className="teacher__button">
            Cadastrar
          </button>
        </Form>
      </div>
    </DashboardLayout>
  )
}
