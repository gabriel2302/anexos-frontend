import { useCallback, useEffect, useRef, useState } from 'react'
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


interface IPerson {
  id: string
}

interface FormData {
  name: string
  shift: string
  year: string
  people: IPerson[]
}

type Institution = {
  name: string
  learning_kind: string
  director: string
}

type Person = {
  id: string
  name: string
  enrollment: string
  office: string
  functional_situation: string
  occupation: string
  institution: Institution
}

export default function AddClassroom() {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const [people, setPeople] = useState<Person[]>([])

    // Busca os professores no banco
    useEffect(() => {
      api
        .get<Person[]>('/people/all')
        .then(response => {
          setPeople(response.data)
        })
        .catch(err => {
          console.log(err)
          addToast({
            type: 'error',
            title: 'Erro ao carregar professores',
            description: 'Verifique sua conexao ou contate o admnistrador',
          })
        })
    }, [])

  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do aluno obrigatorio'),
        shift: Yup.string().required('Período obrigatório'),
        year: Yup.string().required('Ano obrigatório'),
        people: Yup.array().required('Professor obrigatório').min(1, 'Deve conter ao menos 1 professor')
      })
      await schema.validate(data, {
        abortEarly: false,
      })
      const peopleFormatted: any = []

      data.people.map(person => 
        peopleFormatted.push({id: person}))
        
      const response = await api.post('/classrooms', {
        shift: data.shift,
        year: data.year,
        people: peopleFormatted,
        name: data.name
      })

      console.log(response.data)

      formRef.current?.reset()
      addToast({
        type: 'success',
        title: `Turma criada com sucesso`,
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
      <div className="classroom">
        <h1 className="classroom__header--h1">Cadastro de turmas</h1>
        <Form onSubmit={handleSubmit} ref={formRef} className="classroom__form">
          <div className="classroom__input-group">
            <label htmlFor="name">Nome da turma</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="classroom__input"
            />
          </div>
          <div className="classroom__input-group">
            <label htmlFor="year">Ano</label>
            <Input type="text" name="year" className="classroom__input" />
          </div>

          <div className="classroom__input-group">
            <label htmlFor="shift">Período</label>
            <Input type="text" name="shift" className="classroom__input" />
          </div>

          <div className="classroom__input-group">
            <label htmlFor="people">Professores</label>
            <Select
              placeholder="Selecione uma opção"
              isMulti
              name="people"
              options={
                people.map(person => ({
                  label: person.name,
                  value: person.id
                }))
              }
            />
          </div>

          <button type="submit" className="classroom__button">
            Cadastrar
          </button>
        </Form>
      </div>
    </DashboardLayout>
  )
}
