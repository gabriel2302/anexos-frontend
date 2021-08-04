import React, { useCallback, useEffect, useRef } from 'react'
import './styles.scss'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../../.././Input'
import { useToast } from '../../../../hooks/toast'
import getValidationErrors from '../../../../utils/getValidationErrors'

import api from '../../../../services/api'
import Select from '../../../Select'


type Person = {
  id: string
  name: string
  enrollment: string
  office: string
  functional_situation: string
}

type IClassroom = {
  id: string
  name: string
  year: string
  shift: string
  people: Person[]
}

interface ModalProps {
  onRequestClose: () => void
  item: IClassroom
}

const UpdateClassroom: React.FC<ModalProps> = ({ onRequestClose, item }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  function closeModal() {
    onRequestClose()
  }

  const handleSubmit = useCallback(async (data: IClassroom) => {
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

      // await api.put(`/students/${item.id}`, {
        // name: data.name,
        // birthdate: data.birthdate,
      // })

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
          <h1 className="ustudent__header--h1">Alterar dados da turma</h1>
          <div className="ustudent__input-group">
            <label htmlFor="name">Nome da turma</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="ustudent__input"
              defaultValue={item.name}
            />
          </div>
          <div className="ustudent__input-group">
            <label htmlFor="birthdate">Ano</label>
            <Input
              type="text"
              name="year"
              className="ustudent__input"
              defaultValue={item.year}
            />
          </div>
          <div className="ustudent__input-group">
            <label htmlFor="birthdate">Período</label>
            <Input
              type="text"
              name="shift"
              className="ustudent__input"
              defaultValue={item.shift}
            />
          </div>

          <div className="ustudent__input-group">
          <label htmlFor="people">Professores</label>
            <Select
              placeholder="Selecione uma opção"
              isMulti
              name="people"
              options={
                item.people.map(person => ({
                  label: person.name,
                  value: person.id
                }))
              }
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

export default UpdateClassroom