import React, { memo, useState, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import ReactModal from 'react-modal'

import UpdateTeacher from './UpdateTeacherModal'
import './styles'

interface ModalProps {
  visible?: boolean
  onRequestClose?: () => void
  item: ITeacher
}

type ITeacher = {
  id: string
  name: string
  enrollment: string
  office: string
  functional_situation: string
  occupation: string
}

const Modal: React.FC<ModalProps> = ({
  visible = false,
  onRequestClose,
  item,
}) => {
  const [isOpen, setIsOpen] = useState(visible)

  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  const handleModalClose = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    }

    setIsOpen(false)
  }, [onRequestClose])

  return (
    <ReactModal
      overlayClassName="modal-overlay"
      className="modal-content"
      isOpen={isOpen}
      ariaHideApp={false}
    >
      <div className="container">
        <button onClick={handleModalClose} className="exit-button">
          <FiX />
        </button>
        <UpdateTeacher onRequestClose={handleModalClose} item={item} />
      </div>
    </ReactModal>
  )
}

export default memo(Modal)
