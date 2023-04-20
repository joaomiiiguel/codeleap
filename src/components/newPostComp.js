/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material';
import { setShowModalAlert, setAlertContent } from '../redux/userSlice';
// import { getAllPosts } from '../redux/PostsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../actions/api';

export default function newPostComp() {
  const [titlePost, setTitlePost] = useState('');
  const [contentPost, setContentPost] = useState('');
  const userName = useSelector((state) => state.user.name)
  const dispatch = useDispatch()
  const [loadingCreate, setLoadingCreate] = useState(false)

  async function createNewPost() {
    setLoadingCreate(true)

    const newPost = {
      "username": userName,
      "title": titlePost,
      "content": contentPost
    }
    try {
      const response = await api.post('/', newPost)
      dispatch(setShowModalAlert(true))
      dispatch(setAlertContent({
        title: `New post created: ${newPost.title}`,
        severity: 'success'
      }))
      setTimeout(async () => {
        setTitlePost('')
        setContentPost('')
        setLoadingCreate(false)
        // const newresponse = await api.get('/')
        // dispatch(getAllPosts(newresponse.data))
        dispatch(setShowModalAlert(false))
        return
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box className='flex flex-col w-full border-solid border-2 bg-white border-blue rounded-lg p-6 space-y-4'>
      <p className='font-semibold text-2xl'>What&apos;s on your mind?</p>

      <div>
        <p className='mb-2'>Title</p>
        <input
          id="title-post"
          placeholder='Hello world'
          className='border-blue bg-transparent border-2 w-full rounded p-2 '
          value={titlePost}
          onChange={(e) => setTitlePost(e.target.value)}
        />
      </div>
      <div>
        <p className='mb-2'>Content</p>
        <textarea
          id="title-post"
          placeholder='Content here'
          rows="4"
          className='border-blue bg-transparent border-2 w-full rounded p-2'
          value={contentPost}
          onChange={(e) => setContentPost(e.target.value)}
        />
      </div>
      <Button variant='contained' className='bg-blue'
        onClick={() => createNewPost()}
        disabled={titlePost === '' || contentPost === '' ? true : false}>
        {loadingCreate ?
          <CircularProgress className='text-white' size={25} />
          :
          <p>Enter</p>
        }
      </Button>
    </Box>
  )
}
