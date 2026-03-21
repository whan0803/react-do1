import { create } from "zustand";

export const useModal = create((set) => ({
  selectedEmotion: "",

  failForm: {
    failure_reason: ""
  },

  modalType: null,

  setFailForm: (name, value) => set((state) => ({
    failForm: {
        [name]: value,
    }
  })),

  setSelectedEmotion: (value) =>
    set((state) => ({
      selectedEmotion: value,
    })),

    setModalType: (value) => set((state) => ({
        modalType: value,
    }))


}));