import { configureStore } from '@reduxjs/toolkit'
import LogginUser from './userSlice'
import PostSlice from './postsSlice'

export default configureStore({
  reducer: {
    user: LogginUser,
    post: PostSlice,
  }
})