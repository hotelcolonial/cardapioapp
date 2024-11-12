import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean; // Para controlar si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  children: React.ReactNode; // Contenido del modal
  title: string; // Título del modal
}

const Modal = ({ isOpen, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Abrir el modal cuando 'isOpen' sea true
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box rounded-sm w-11/12 max-w-4xl">
        <h3 className="font-semibold text-lg pb-4">{title}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
