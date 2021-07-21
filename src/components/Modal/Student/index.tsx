import React, { memo, useState, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import ReactModal from 'react-modal'

import UpdateStudent from './UpdateStudentModal'
import './styles'

interface ModalProps {
  visible?: boolean
  onRequestClose?: () => void
  item: IStudent
}

type IStudent = {
  id: string
  name: string
  birthdate: string
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
        <UpdateStudent onRequestClose={handleModalClose} item={item} />
      </div>
    </ReactModal>
  )
}

export default memo(Modal)
