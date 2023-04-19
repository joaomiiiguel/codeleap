import { createSlice } from "@reduxjs/toolkit";


export const PostSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },

    reducers: {
        getAllPosts(state, { payload }) {
            return { ...state, data: payload}
        }
    }
})
export const { getAllPosts } = PostSlice.actions;

export const selectUser = state => state.posts

export default PostSlice.reducer