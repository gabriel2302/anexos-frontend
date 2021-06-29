import './styles.scss'

export function DropdownMenu() {
  return (
    <ul className="dropdown">
      <div className="dropdown__left">
        <li className="dropdown__item">
          <span className="dropdown__item-title">Alunos</span>
          <ul className="dropdown__submenu">
            <li className="dropdown__submenu-item">
              <a href="#" className="dropdown__submenu-link">
                Cadastrar
              </a>
            </li>
            <li className="dropdown__submenu-item">
              <a href="#" className="dropdown__submenu-link">
                Visualizar
              </a>
            </li>
          </ul>
        </li>
        <li className="dropdown__item">
          <span className="dropdown__item-title">Turmas</span>
          <ul className="dropdown__submenu">
            <li className="dropdown__submenu-item">
              <a href="#" className="dropdown__submenu-link">
                Cadastrar
              </a>
            </li>
            <li className="dropdown__submenu-item">
              <a href="#" className="dropdown__submenu-link">
                Visualizar
              </a>
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
            <button className="dropdown__submenu-button">Sair</button>
          </li>
        </ul>
      </li>
    </ul>
  )
}