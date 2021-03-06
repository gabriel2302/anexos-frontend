import { Link } from 'react-router-dom'

import { useAuth } from '../../../hooks/auth'
import './styles.scss'

export function DropdownMenu() {
  const { signOut } = useAuth()
  return (
    <ul className="dropdown">
      <div className="dropdown__left">
        <li className="dropdown__item">
          <span className="dropdown__item-title">Alunos</span>
          <ul className="dropdown__submenu">
            <li className="dropdown__submenu-item">
              <Link to="/add-student" className="dropdown__submenu-link">
                Cadastrar
              </Link>
            </li>
            <li className="dropdown__submenu-item">
              <Link to="/students" className="dropdown__submenu-link">
                Visualizar
              </Link>
            </li>
          </ul>
        </li>
        <li className="dropdown__item">
          <span className="dropdown__item-title">Professores</span>
          <ul className="dropdown__submenu">
            <li className="dropdown__submenu-item">
              <Link to="/add-teacher" className="dropdown__submenu-link">
                Cadastrar
              </Link>
            </li>
            <li className="dropdown__submenu-item">
              <Link to="/teachers" className="dropdown__submenu-link">
                Visualizar
              </Link>
            </li>
          </ul>
        </li>
        <li className="dropdown__item">
          <span className="dropdown__item-title">Turmas</span>
          <ul className="dropdown__submenu">
            <li className="dropdown__submenu-item">
              <Link to="/add-classroom" className="dropdown__submenu-link">
                Cadastrar
              </Link>
            </li>
            <li className="dropdown__submenu-item">
              <Link to="/classrooms" className="dropdown__submenu-link">
                Visualizar
              </Link>
            </li>
            <li className="dropdown__submenu-item">
              <a href="#" className="dropdown__submenu-link">
                Incluir alunos
              </a>
            </li>
          </ul>
        </li>

        <li className="dropdown__item">
          <a href="#" className="dropdown__link">
            Relatorios
          </a>
        </li>
      </div>
      <li className="dropdown__item">
        <span className="dropdown__item-title">Perfil</span>
        <ul className="dropdown__submenu">
          <li className="dropdown__submenu-item">
            <a href="#" className="dropdown__submenu-link">
              Alterar senha
            </a>
          </li>
          <li className="dropdown__submenu-item">
            <button className="dropdown__submenu-button" onClick={signOut}>
              Sair
            </button>
          </li>
        </ul>
      </li>
    </ul>
  )
}
