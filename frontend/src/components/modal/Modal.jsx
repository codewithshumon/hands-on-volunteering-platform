import { useState, useEffect, useCallback } from "react";

const Modal = ({ isOpen, children, onModalClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  // Close modal handler
  const closeModalHandler = useCallback(() => {
    setModalIsOpen(false);
    onModalClose(); // Call the onClose function passed from the parent
  }, [onModalClose]);

  // Sync modalIsOpen with isOpen when isOpen changes
  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  if (!modalIsOpen) return null;

  return (
    <div
      className="fixed inset-0 h-[100vh] w-[100vw] bg-gray-950/50 flex justify-center items-center z-50 py-5 md:py-0"
      onClick={closeModalHandler}
    >
      <div
        className="w-auto h-auto max-w-full max-h-full p-4 overflow-auto sm:overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
