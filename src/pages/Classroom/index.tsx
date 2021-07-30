import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaSortDown } from 'react-icons/fa'
import DashboardLayout from '../../components/Layout/Dashboard'
import Filter from '../../components/Filter'
import api from '../../services/api'
import './styles.scss'
import { useToast } from '../../hooks/toast'
import UpdateTeacher from '../../components/Modal/Teacher/'

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

type IClassroomPeople = {
  person: Person
}

type IClassroom = {
  name: string;
  shift: string;
  year: string;
  classroom_people: IClassroomPeople[]
}

type ITeacher = {
  name: string;
}

export default function Classroom() {
  const [classroom, setClassroom] = useState<IClassroom[]>([])
  const [teachers, setTeachers] = useState<ITeacher[]>([])
  const [editItem, setEditItem] = useState({} as Person)
  const { addToast } = useToast()
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false)

  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  // Define as colunas da tabela
  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Ano',
      selector: 'year',
      sortable: true,
    },
    {
      name: 'Perído',
      selector: 'shift',
      sortable: true,
    },
    {
      name: 'Professores',
      selector: 'teachers',
      sortable: true,
    },
    {
      name: '',
      button: true,
      cell: (row: any) => (
        <button
          type="button"
          onClick={() => {
            setEditItem({
              id: row.id,
              name: row.name,
              enrollment: row.enrollment,
              office: row.office,
              functional_situation: row.functional_situation,
              institution: row.institution,
              occupation: row.occupation,
            })
            setIsOpenTeacherModal(prevstate => !prevstate)
          }}
          className="button button-edit"
        >
          Editar
        </button>
      ),
    },
  ]

  // Busca os dados no banco
  useEffect(() => {
    api
      .get<IClassroom[]>('/classrooms')
      .then(response => {
        const formattedTeachers = response.data.map(item => item.classroom_people.map(item => {
         return  item.person.name
        }))
        setClassroom(response.data)
      })
      .catch(err => {
        console.log(err)
        addToast({
          type: 'error',
          title: 'Erro ao carregar as turmas',
          description: 'Verifique sua conexao ou contate o admnistrador',
        })
      })
  }, [])

  // Filtra os itens com base no input
  const filteredItems = classroom.filter(
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

  async function handleTeacherModalClose() {}
  return (
    <DashboardLayout>
      <div className="teacher">
        <DataTable
          title="Turmas"
          columns={columns}
          data={filteredItems}
          sortIcon={<FaSortDown />}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          highlightOnHover
        />
      </div>

      <UpdateTeacher
        visible={isOpenTeacherModal}
        onRequestClose={handleTeacherModalClose}
        item={editItem}
      />
    </DashboardLayout>
  )
}
