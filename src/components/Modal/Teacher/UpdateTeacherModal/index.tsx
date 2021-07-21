import React, { useCallback, useRef } from 'react'
import './styles.scss'

import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../../.././Input'
import { useToast } from '../../../../hooks/toast'
import getValidationErrors from '../../../../utils/getValidationErrors'
import Select from '../../../Select'
import api from '../../../../services/api'

interface Request {
  name: string
  enrollment: string
  office: string
  occupation: string
  functional_situation: string
}

type ITeacher = {
  id: string
  name: string
  enrollment: string
  office: string
  functional_situation: string
  occupation: string
}

interface ModalProps {
  onRequestClose: () => void
  item: ITeacher
}

const UpdateTeacher: React.FC<ModalProps> = ({ onRequestClose, item }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  function closeModal() {
    onRequestClose()
  }

  const handleSubmit = useCallback(async (data: Request) => {
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

      await api.patch(`/people/update/${item.id}`, {
        name: data.name,
        enrollment: data.enrollment,
        occupation: data.occupation,
        office: data.office,
        functional_situation: data.functional_situation,
      })

      onRequestClose()

      addToast({
        type: 'success',
        title: `Professor foi alterado com sucesso`,
        description: 'Alterado com sucesso',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        console.log(errors)
        formRef.current?.setErrors(errors)
        return
      }
      if (err.response.data.message === 'User enrollment already in use') {
        formRef.current?.setFieldError('enrollment', 'matricula em uso')
        return
      }

      addToast({
        type: 'error',
        title: 'Erro no editar o professor',
        description: 'Ocorreu um erro ao editar o professor, tente novamente.',
      })
    }
  }, [])

  return (
    <div className="container">
      <div className="content">
        <Form onSubmit={handleSubmit} ref={formRef} className="uteacher__form">
          <h1 className="uteacher__header--h1">Alterar dados do professor</h1>
          <div className="uteacher__input-group">
            <label htmlFor="name">Nome completo</label>
            <Input
              type="text"
              name="name"
              autoFocus
              className="uteacher__input"
              defaultValue={item.name}
            />
          </div>
          <div className="uteacher__input-group">
            <label htmlFor="enrollment">Número da matrícula</label>
            <Input
              type="text"
              name="enrollment"
              className="uteacher__input"
              defaultValue={item.enrollment}
            />
          </div>
          <div className="uteacher__input-group">
            <label htmlFor="office">Cargo</label>
            <Input
              type="text"
              name="office"
              className="uteacher__input"
              defaultValue={item.office}
            />
          </div>
          <div className="uteacher__input-group">
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
          <div className="uteacher__input-group">
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

          <button type="submit" className="uteacher__button">
            Salvar
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="uteacher__button uteacher__button-cancel"
          >
            Cancelar
          </button>
        </Form>
      </div>
    </div>
  )
}

export default UpdateTeacher
