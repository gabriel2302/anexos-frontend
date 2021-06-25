import React from 'react'

import Toast from './Toast'
import styles from './styles.module.scss'
import { ToastMessage } from '../../hooks/toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <div className={styles.container}>
      {messages.map(({ id, title, description, type }) => (
        <Toast key={id} message={{ id, title, description, type }} />
      ))}
    </div>
  )
}

export default ToastContainer
