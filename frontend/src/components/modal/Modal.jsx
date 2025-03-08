import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 h-[100vh] w-[100vw]  bg-gray-950/50 flex justify-center items-center z-50 py-[10vh]"
      onClick={closeModal}
    >
      <div
        className="p-4 overflow-auto rounded-2xl "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
