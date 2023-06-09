import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        limitPost: 10,
        count: 0,
    },

    reducers: {
        getAllPosts(state, { payload }) {
            return { ...state, data: payload}
        },
        setLimitPost(state, { payload }) {
            return { ...state, limitPost: payload}
        },
        countTotalPost(state, { payload }) {
            return { ...state, count: payload}
        },
    }
})
export const { getAllPosts, setLimitPost, countTotalPost } = postsSlice.actions;

export const selectUser = state => state.posts

export default postsSlice.reducer