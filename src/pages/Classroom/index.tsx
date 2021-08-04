import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaSortDown } from 'react-icons/fa'
import DashboardLayout from '../../components/Layout/Dashboard'
import Filter from '../../components/Filter'
import api from '../../services/api'
import './styles.scss'
import { useToast } from '../../hooks/toast'
import UpdateClassroom from '../../components/Modal/Classroom'

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
  id?: string
  person: Person
}

type IClassroom = {
  id: string;
  name: string;
  shift: string;
  year: string;
  classroom_people: IClassroomPeople[]
  teacher: string
}



export default function Classroom() {
  const [classroom, setClassroom] = useState<IClassroom[]>([])
  const [editItem, setEditItem] = useState({} as IClassroom)
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
      selector: 'teacher',
      sortable: true,
    },
    {
      name: '',
      button: true,
      cell: (row: any) => (
        <button
          type="button"
          onClick={() => {
            console.log(row)
            setEditItem({
              id: row.id,
              name: row.name,
              shift: row.shift,
              teacher: row.teacher,
              classroom_people: row.classroom_people,
              year: row.year
            })
            console.log(editItem)
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
        const formattedData = response.data.map(item => {
          const teachers = item.classroom_people.map(item => item.person.name)
          return {
            ...item,
            teacher: teachers.join(', ')
          }
        })
        setClassroom(formattedData)
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

      <UpdateClassroom
        visible={isOpenTeacherModal}
        onRequestClose={handleTeacherModalClose}
        item={editItem}
      />
    </DashboardLayout>
  )
}
