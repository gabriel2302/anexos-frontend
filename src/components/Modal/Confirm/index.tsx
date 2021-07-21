import React, { memo, useState, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import ReactModal from 'react-modal'

import './styles.scss'

interface ModalProps {
  visible?: boolean
  onRequestClose?: () => void
}

const Confirm: React.FC<ModalProps> = ({ visible = false, onRequestClose }) => {
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
        <h2>Deseja confirmar essa acao?</h2>
        <div className="button-group">
          <button
            onClick={() => setIsOpen(false)}
            className="modal_button modal_button-cancel"
          >
            Cancelar
          </button>
          <button
            onClick={handleModalClose}
            className="modal_button modal_button-confirm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

export default memo(Confirm)
