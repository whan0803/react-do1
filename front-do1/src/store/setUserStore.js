import { create } from "zustand";

export const setUserStore = create((set) =>({
    user: null,

    setUser: (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));

        sessionStorage.setItem("user_id", user.user_id);
        set({user});
    },

    loadUser: () => {
        const storeUser = sessionStorage.getItem("user");

        if(storeUser) {
            set({user:JSON.parse(storeUser)})
        }
    },

    logoutUser: () => {
            set({user: null});
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("user_id");
    }
}))