import { configureStore } from '@reduxjs/toolkit'
import LogginUser from './UserSlice'
import PostSlice from './PostsSlice'

export default configureStore({
  reducer: {
    user: LogginUser,
    post: PostSlice,
  }
})