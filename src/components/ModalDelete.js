import React from 'react'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/PostsSlice'
import { setShowModalDelete, setShowModalAlert, setAlertContent } from '../redux/UserSlice';
import { api } from '../actions/api';


export default function ModalDelete({ idSelected }) {
    const dispatch = useDispatch()

    async function handleDeletePost(idPost) {
        try {
            const response = await api.delete(`/${idPost}/`);
            const newData = await api.get('/')
            dispatch(getAllPosts(newData.data))
            dispatch(setShowModalDelete(false))
            dispatch(setShowModalAlert(true))
            dispatch(setAlertContent({
                title: 'Post Deleted',
                severity: 'success'
            }))
            return
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <Box className='flex flex-col bg-white py-8 px-10 rounded-2xl space-y-8 items-center mx-[5%] md:w-fit lg:w-[25%] shadow-lg justify-center' >
            <p className='text-xl font-semibold py-4'>
                Are you sure you want to delete this item?
            </p>

            <div className='flex flex-row w-full md:w-full space-x-6'>
                <Button variant='outlined' className='font-semibold py-2 px-6 text-black rounded-md border' fullWidth onClick={() => dispatch(setShowModalDelete(false))}>Cancel</Button>
                <Button variant='contained' className='font-semibold py-2 px-6 bg-red rounded-md border' fullWidth onClick={() => handleDeletePost(idSelected)}>delete</Button>
            </div>
        </Box>
    )
}
