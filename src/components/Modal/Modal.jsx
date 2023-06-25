import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleModalClose = ({ code, currentTarget, target }) => {
      if (code === 'Escape' || currentTarget === target) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleModalClose);

    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
