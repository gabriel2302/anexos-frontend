import { useCallback, useEffect, useMemo, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import DataTable from 'react-data-table-component'
import { FaSortDown } from 'react-icons/fa'
import DashboardLayout from '../../components/Layout/Dashboard'
import Filter from '../../components/Filter'
import api from '../../services/api'
import './styles.scss'
import { useToast } from '../../hooks/toast'
import UpdateStudent from '../../components/Modal/Student'
import Confirm from '../../components/Modal/Confirm'

type Student = {
  id: string
  name: string
  birthdate: string
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [editItem, setEditItem] = useState({} as Student)
  const [deleteItem, setDeleteItem] = useState('')
  const { addToast } = useToast()
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false)
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false)

  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  const formatDate = useCallback((date: Date) => {
    const formatted = format(date, 'dd/MM/yyyy')
    return formatted
  }, [])

  // Define as colunas da tabela
  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
      editable: true,
    },
    {
      name: 'Data de nascimento',
      selector: 'birthdate',
      sortable: true,
    },
    {
      name: '',
      button: true,
      cell: (row: any) => (
        <>
          <button
            type="button"
            onClick={() => {
              setEditItem({
                id: row.id,
                name: row.name,
                birthdate: row.birthdate,
              })
              setIsOpenStudentModal(prevstate => !prevstate)
            }}
            className="button button-edit"
          >
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => {
              setDeleteItem(row.id)
              setIsOpenConfirmDeleteModal(prevstate => !prevstate)
            }}
            className="button button-remove"
          >
            <FiTrash2 />
          </button>
        </>
      ),
    },
  ]

  // Busca os dados no banco
  useEffect(() => {
    api
      .get<Student[]>('/students')
      .then(response => {
        const formattedData = response.data.map(student => {
          console.log(student.birthdate)
          return {
            ...student,
            birthdate: formatDate(parseISO(String(student.birthdate))),
          }
        }, [])
        setStudents(formattedData)
      })
      .catch(err => {
        console.log(err)
        addToast({
          type: 'error',
          title: 'Erro ao carregar os alunos',
          description: 'Verifique sua conexao ou contate o admnistrador',
        })
      })
  }, [])

  // Filtra os itens com base no input
  const filteredItems = students.filter(
    item =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  )

  // Responsavel pelo filtro e renderizacao dos dados
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }
    return (
      <Filter
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  async function handleStudentModalClose() {
    window.location.reload()
  }

  const handleDeleteStudent = useCallback(async () => {
    try {
      await api.delete(`/students/${deleteItem}`)
      addToast({
        type: 'success',
        title: 'Aluno excluido com sucesso!',
      })
      window.location.reload()
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description:
          'Nao foi possivel excluir o aluno, entre em contato com o admistrador do sistema!',
      })
    }
  }, [deleteItem])
  return (
    <DashboardLayout>
      <div className="teacher">
        <DataTable
          title="Alunos"
          columns={columns}
          data={filteredItems}
          sortIcon={<FaSortDown />}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          highlightOnHover
        />
      </div>

      <UpdateStudent
        visible={isOpenStudentModal}
        onRequestClose={handleStudentModalClose}
        item={editItem}
      />
      <Confirm
        visible={isOpenConfirmDeleteModal}
        onRequestClose={handleDeleteStudent}
      />
    </DashboardLayout>
  )
}
