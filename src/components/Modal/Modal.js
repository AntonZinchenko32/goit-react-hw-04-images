import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalImage, onClose }) => {
  const handleKeyDown = useCallback(
    e => {
      e.code === 'Escape' && onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = e => {
    e.target === e.currentTarget && onClose();
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <img src={modalImage} alt="tag" />
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};
