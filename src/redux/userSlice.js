import { createSlice } from "@reduxjs/toolkit";

export const LogginUser = createSlice({
    name: 'user',
    initialState: {
        name: null,
        isLogged: false,
        showModalDelete: false,
        showModalEdit: false,
        showModalAlert: false,
        alertContent: {
            title: '',
            severity: 'success' // 'success', 'info' or 'error'
        }
    },

    reducers: {
        logginUser(state, { payload }) {
            return { ...state, isLogged: true, name: payload }
        },
        logoutUser(state) {
            return { ...state, isLogged: false, name: null }
        },
        setShowModalDelete: (state, { payload }) => {
            state.showModalDelete = payload;
        },
        setShowModalEdit: (state, { payload }) => {
            state.showModalEdit = payload;
        },
        setShowModalAlert: (state, { payload }) => {
            state.showModalAlert = payload;
        },
        setAlertContent: (state, { payload }) => {
            state.alertContent = payload;
        }
    }
})

export const { logginUser, logoutUser, setShowModalDelete, setShowModalEdit, setShowModalAlert, setAlertContent } = LogginUser.actions

export const selectUser = state => state.user

export default LogginUser.reducer