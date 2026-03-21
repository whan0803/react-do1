import { create } from "zustand";

export const setUserStore = create((set) =>({
    user: null,

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({user});
    },

    loadUser: () => {
        const storeUser = localStorage.getItem("user");

        if(storeUser) {
            set({user:JSON.parse(storeUser)})
        }
    },

    logoutUser: () => {
            set({user: null});
            localStorage.removeItem("user");
    }
}))