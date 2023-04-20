import { useState, useEffect } from 'react';
import { api } from '@/actions/api';
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, setShowModalAlert, setShowModalDelete, setShowModalEdit } from '../redux/UserSlice'
import { getAllPosts, setLimitPost, countTotalPost } from '../redux/PostsSlice'
import { Box, IconButton, Modal, CircularProgress, Alert, Grow, LinearProgress, Button } from '@mui/material';
import NewPostComp from '@/components/newPostComp';
import PostComp from '@/components/PostComp';
import ModalEdit from '@/components/ModalEdit';
import ModalDelete from '@/components/ModalDelete';

import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
    const dataPost = useSelector((state) => state.post.data)
    const userName = useSelector((state) => state.user.name)
    const count = useSelector((state) => state.post.count)
    const showModalEdit = useSelector((state) => state.user.showModalEdit)
    const showModalDelete = useSelector((state) => state.user.showModalDelete)
    const showModalAlert = useSelector((state) => state.user.showModalAlert)
    const ModalAlertContent = useSelector((state) => state.user.alertContent)
    const limitPost = useSelector((state) => state.post.limitPost)

    const [loadingListPosts, setLoadingListPosts] = useState(false)
    const [loadingPaginationPosts, setLoadingPaginationPosts] = useState(false)
    const dispatch = useDispatch()

    const [idPostSelected, setIDPostSelected] = useState()

    async function fetchData() {
        console.log(dataPost);
        console.log(count);
        setLoadingListPosts(true)
        const response = await api.get(`/?limit=${limitPost}`)
        dispatch(getAllPosts(response.data))
        dispatch(countTotalPost(response.data.count))
        setLoadingListPosts(false)
    }

    async function getPostWithPagination() {
        setLoadingPaginationPosts(true)
        const newLimit = limitPost + 10;
        const response = await api.get(`/?limit=${newLimit}`)
        setTimeout(() => {
            dispatch(getAllPosts(response.data))
            dispatch(setLimitPost(newLimit))
            setLoadingPaginationPosts(false)
        }, 1000);
    }


    function handleGetIDModal(dataSelected, type) {
        { type === 'edit' && dispatch(setShowModalEdit(true)) }
        { type === 'delete' && dispatch(setShowModalDelete(true)) }
        setIDPostSelected(dataSelected);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center space-y-6 bg-background text-black pb-8">
            <div className='flex flex-row items-center justify-between w-full bg-blue text-white py-6 px-[8%] md:px-[20%]'>
                <p className='font-bold text-lg md:text-xl'>CodeLeap Network</p>

                <div className='flex flex-row items-center'>
                    <p>Hi, <strong>{userName}</strong>!</p>
                    <IconButton className='text-white  md:ml-8' aria-label="Logout User" onClick={() => dispatch(logoutUser(), localStorage.clear())}>
                        <LogoutIcon size={20} />
                    </IconButton>
                </div>
            </div>
            <div className='flex flex-col w-5/6 md:w-4/6 lg:w-2/6 max-w-[1000px] space-y-4 mb-10'>
                <NewPostComp />
            </div>
            <div className='flex flex-col w-5/6 md:w-4/6 lg:w-2/6 max-w-[1000px] space-y-4 mb-10 scroll-pl-6 snap-y'>
                {
                    loadingListPosts ?
                        <Box className='flex w-full justify-center mt-4'>
                            <CircularProgress />
                        </Box>
                        :
                        <>
                            {
                                dataPost.count >= 0 &&
                                dataPost.results.map(item => (
                                    <div key={item.id}>
                                        <PostComp
                                            title={item.title}
                                            author={item.username}
                                            timestamp={item.created_datetime}
                                            content={item.content}
                                            modalDelete={() => handleGetIDModal(item, 'delete')}
                                            modalEdit={() => handleGetIDModal(item, 'edit')}
                                        />
                                    </div>
                                ))
                            }
                        </>
                }
                <div className='flex w-full justify-center z-50' id="check">
                    {loadingPaginationPosts ?
                        <div className='flex flex-col w-full justify-center text-center opacity-40'>
                            <LinearProgress size={25} color="inherit" />
                        </div>
                        :
                        <div className='flex flex-col w-full justify-center text-center opacity-60'>
                            {dataPost.count > 10 &&
                                <Button variant="text" color="inherit" size='small' fullWidth
                                    onClick={() => getPostWithPagination()}>
                                    See more...
                                </Button>
                            }
                        </div>
                    }
                </div>
            </div>

            <Modal
                open={showModalDelete}
                onClose={() => dispatch(setShowModalDelete(false))}
                aria-labelledby="modal-Delete"
                aria-describedby="modal-delet-post"
                className='flex justify-center items-center'
            >
                <ModalDelete idSelected={idPostSelected?.id} />
            </Modal>


            <Modal
                open={showModalEdit}
                onClose={() => dispatch(setShowModalEdit(false))}
                aria-labelledby="modal-Edit"
                aria-describedby="modal-edit-post"
                className='flex justify-center items-center'
            >
                <ModalEdit
                    dataPostSelected={idPostSelected}
                    updatePost={() => handleEditPost(idPostSelected)}
                />
            </Modal>


            <div className='fixed flex w-full justify-center left-auto bottom-6'>
                <Grow in={showModalAlert}>
                    <Alert
                        className='shadow-lg'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => dispatch(setShowModalAlert(false))}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity={ModalAlertContent.severity}>
                        {ModalAlertContent.title}
                    </Alert>
                </Grow>
            </div>
        </main>

    )
}
