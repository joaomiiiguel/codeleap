import { createSlice } from "@reduxjs/toolkit";

export const LogginUser = createSlice({
    name: 'user',
    initialState: {
        name: null,
        isLogged: false
    },

    reducers: {
        logginUser(state, {payload}){
            return { ...state, isLogged: true, name: payload}
        },
        logoutUser(state){
            return { ...state, isLogged: false, name: null}
        }
    }
})

export const { logginUser, logoutUser } = LogginUser.actions

export const selectUser = state => state.user

export default LogginUser.reducer