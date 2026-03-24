import { create } from "zustand";

export const setUserStore = create((set) =>({
    user: null,

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("user_id", user.user_id);
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
            localStorage.removeItem("user_id");
    }
}))