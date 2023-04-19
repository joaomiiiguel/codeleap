import { useState, useEffect } from 'react';
import { api } from '@/actions/api';
import { Inter } from 'next/font/google'
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux'
import { logginUser, logoutUser } from '../redux/userSlice'
import { createPost, getAllPosts } from '../redux/postsSlice'
import { Box, Button, IconButton, Modal, CircularProgress } from '@mui/material';

import NewPostComp from '@/components/newPostComp';
import PostComp from '@/components/PostComp';
import LoginUserComp from '@/components/LoginUserComp';
import ModalEdit from '@/components/ModalEdit';
import ModalDelete from '@/components/ModalDelete';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const isLogged = useSelector((state) => state.user.isLogged)
  const userName = useSelector((state) => state.user.name)
  const dataPost = useSelector((state) => state.post.data)

  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingListPosts, setLoadingListPosts] = useState(false)

  const [modalDelete, setModalDelete] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [name, setName] = useState('')
  const [idPostSelected, setIDPostSelected] = useState()
  const dispatch = useDispatch()

  async function fetchData() {
    setLoadingListPosts(true)
    setTimeout(async () => {
      const response = await api.get('/')
      dispatch(getAllPosts(response.data.results))
    }, 1000);

    setLoadingListPosts(false)
  }

  async function handleDeletePost(idPost) {
    try {
      const response = await api.delete(`/${idPost}/`);
      setModalDelete(false)
    } catch (error) {
      console.log(error.message);
    }
    const response = await api.get('/')
    dispatch(getAllPosts(response.data.results))
  }

  async function handleEditPost(post) {
    try {
      const response = await api.patch(`${post.id}/`, {
        "title": post.title,
        "content": post.content
      });
      setModalEdit(false)
    } catch (error) {
      console.log(error.message);
    }
    const response = await api.get('/')
    dispatch(getAllPosts(response.data.results))
  }


  function handleLogin() {
    setLoadingLogin(true)
    setTimeout(() => {
      dispatch(logginUser(name))
      setLoadingLogin(false)
    }, 2000);
  }


  function handleGetIDModal(dataSelected, type) {
    { type === 'edit' && setModalEdit(true) }
    { type === 'delete' && setModalDelete(true) }
    setIDPostSelected(dataSelected);
  }



  useEffect(() => {
    fetchData()
    console.log(dataPost);
  }, [dispatch])


  return (
    <>
      {
        !isLogged ?
          <LoginUserComp
            nameUser={name}
            onChangeName={(e) => setName(e.target.value)}
            loadingState={loadingLogin}
            handleLogin={handleLogin}
          />
          :
          <main className="flex min-h-screen flex-col items-center space-y-6 bg-white text-black">
            <div className='flex flex-row items-center justify-between w-screen bg-blue text-white px-[8%] md:px-[15%] py-6'>
              <p className='font-bold text-xl'>CodeLeap Network</p>
              <IconButton className='text-white' aria-label="Logout User" onClick={() => dispatch(logoutUser())}>
                <LogoutIcon size={20} />
              </IconButton>
            </div>
            <div className='w-screen px-[8%] md:px-[15%] max-w-[1000px]'>
              <NewPostComp />
            </div>
            <div className='flex flex-col w-screen px-[8%] md:px-[15%] max-w-[1000px] space-y-4'>
              {
                loadingListPosts ?
                  <Box className='flex w-full justify-center mt-4'>
                    <CircularProgress />
                  </Box>
                  :
                  dataPost.map(item =>
                    <PostComp
                      key={item.id}
                      title={item.title}
                      author={item.username}
                      timestamp={item.created_datetime}
                      content={item.content}
                      userEdit={userName}
                      modalDelete={() => handleGetIDModal(item, 'delete')}
                      modalEdit={() => handleGetIDModal(item, 'edit')}
                    />
                  )
              }
            </div>
          </main>
      }
      <Modal
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='flex justify-center items-center'
      >
        <ModalDelete closeModalDelete={() => setModalDelete(false)} handleDeletePost={() => handleDeletePost(idPostSelected.id)} />
      </Modal>
      <Modal
        open={modalEdit}
        onClose={() => setModalEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='flex justify-center items-center'
      >
        <ModalEdit closeModal={() => setModalEdit(false)} dataPostSelected={idPostSelected} updatePost={() => handleEditPost(idPostSelected)} />
      </Modal>
    </>
  )
}
