import React, { memo, useState, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import ReactModal from 'react-modal'

import UpdateClassroom from './UpdateClassroomModal'
import './styles'

interface ModalProps {
  visible?: boolean
  onRequestClose?: () => void
  item: IClassroom
}

type IClassroom = {
  id: string
  name: string
  year: string
  shift: string
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
        <UpdateClassroom onRequestClose={handleModalClose} item={item} />
      </div>
    </ReactModal>
  )
}

export default memo(Modal)
