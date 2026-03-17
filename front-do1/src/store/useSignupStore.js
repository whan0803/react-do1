import { create }  from 'zustand';

export const useSignupStore = create((set) => ({
  signupForm: {
    user_name: "",
    user_email: "",
    user_password: "",
  },
  setSignupForm: (name, value) =>
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
    })),

  resetSignupForm: () =>
    set({
      signupForm: {
        user_name: "",
        user_email: "",
        user_password: "",
      },
    }), 
}));