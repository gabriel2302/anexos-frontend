import React, { useCallback, useEffect, useRef } from 'react'
import './styles.scss'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../../.././Input'
import { useToast } from '../../../../hooks/toast'
import getValidationErrors from '../../../../utils/getValidationErrors'

import api from '../../../../services/api'

type IStudent = {
  id: string
  name: string
  birthdate: string
}

interface ModalProps {
  onRequestClose: () => void
  item: IStudent
}

const UpdateStudent: React.FC<ModalProps> = ({ onRequestClose, item }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  function closeModal() {
    onRequestClose()
  }

  const handleSubmit = useCallback(async (data: IStudent) => {
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

      await api.put(`/students/${item.id}`, {
        name: data.name,
        birthdate: data.birthdate,
      })

      onRequestClose()

      addToast({
        type: 'success',
        title: `Aluno foi alterado com sucesso`,
        description: 'Alterado com sucesso',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        console.log(errors)
        formRef.current?.setErrors(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro ao editar o aluno ',
        description: 'Ocorreu um erro ao editar o aluno, tente novamente.',
      })
    }
  }, [])

  return (
    <div className="container">
      <div className="content">
        <Form onSubmit={handleSubmit} ref={formRef} className="ustudent__form">
          <h1 className="ustudent__header--h1">Alterar dados do aluno</h1>
          <div className="ustudent__input-group">
            <label htmlFor="name">Nome completo</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="ustudent__input"
              defaultValue={item.name}
            />
          </div>
          <div className="ustudent__input-group">
            <label htmlFor="birthdate">Data de nascimento</label>
            <Input
              type="date"
              name="birthdate"
              className="ustudent__input"
              defaultValue={item.birthdate}
            />
          </div>
          <button type="submit" className="ustudent__button">
            Salvar
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ustudent__button ustudent__button-cancel"
          >
            Cancelar
          </button>
        </Form>
      </div>
    </div>
  )
}

export default UpdateStudent
