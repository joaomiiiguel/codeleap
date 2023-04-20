import { configureStore } from '@reduxjs/toolkit'
import logginUser from './userSlice'
import postSlice from './postsSlice'

export default configureStore({
  reducer: {
    user: logginUser,
    post: postSlice,
  }
})