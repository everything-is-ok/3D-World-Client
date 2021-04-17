import { useState } from "react";

export default function useModal(initialMode = false) {
  const [modalOpen, setModalOpen] = useState(initialMode);

  function toggle() {
    setModalOpen((prev) => !prev);
  }

  return {
    modalOpen,
    toggle,
    setModalOpen,
  };
}
