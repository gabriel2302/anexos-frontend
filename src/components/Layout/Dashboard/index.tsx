import React from 'react'
import { DropdownMenu } from '../DropdownMenu/DropdownMenu'
import styles from './styles.module.scss'

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <DropdownMenu />
      </header>
      {children}
    </div>
  )
}

export default DashboardLayout
