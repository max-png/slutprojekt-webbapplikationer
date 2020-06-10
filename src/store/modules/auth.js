export default {
    state: {
        currentUser: "",
        userToken: "",
    },
    
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.userToken = token
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
            state.showLogin = false
            localStorage.currentUser = user
        },
        logout(state) {
            state.currentUser = "",
                state.userToken = "",
                localStorage.clear
        },
    },

    getters: {
        getCurrentUser: (state) => {
            return state.currentUser
        }
    },
}