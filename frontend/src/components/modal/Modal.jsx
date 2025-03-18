/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

const Modal = ({ isOpen, children, setCloseModalHandler }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const closeModalHandler = useCallback(() => {
    setModalIsOpen(false);
    setCloseModalHandler(false);
  }, []);

  // Sync modalIsOpen with isOpen when isOpen changes
  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  if (!modalIsOpen) return null;

  console.log("[!modalIsOpen after logic]", modalIsOpen);
  return (
    <div
      className="fixed inset-0 h-[100vh] w-[100vw] bg-gray-950/50 flex justify-center items-center z-50 py-[10vh]"
      onClick={closeModalHandler}
    >
      <div
        className="max-w-[95vw] max-h-[95vh]  sm:max-w-auto sm:max-h-auto p-4 overflow-auto sm:overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
