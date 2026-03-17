import {create} from 'zustand';

export const useLoginStore = create((set) => ({
    loginForm: {
        user_email: "",
        user_password: ""
    },

    setLoginForm: (name, value) => set((state) =>({
        loginForm: {
            ...state.loginForm,
            [name]: value
        }
    })),

    resetLoginForm: () => set({
        loginForm: {
            user_email: "",
            user_password: ""
        }
    })
}))