import { FaTimes } from 'react-icons/fa'
import './styles.scss'

type FilterProps = {
  filterText: string
  onFilter: (e: any) => void
  onClear: () => void
}

const Filter = ({ filterText, onFilter, onClear }: FilterProps) => (
  <>
    <input
      className="filter-input"
      id="search"
      type="text"
      placeholder="Filtre com base em qualquer campo"
      value={filterText}
      onChange={onFilter}
    />
    <button className="close-icon">
      <FaTimes onClick={onClear} />
    </button>
  </>
)

export default Filter
