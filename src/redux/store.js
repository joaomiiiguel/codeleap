import { configureStore } from '@reduxjs/toolkit'
import LogginUser from './UserSlice'
import postSlice from './postsSlice'

export default configureStore({
  reducer: {
    user: LogginUser,
    post: postSlice,
  }
})