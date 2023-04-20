import React, { useState } from 'react'
import { api } from '../actions/api';
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/postsSlice'
import { setAlertContent, setShowModalAlert, setShowModalEdit } from '../redux/userSlice';

export default function ModalEdit({ dataPostSelected }) {
    const [newValuePost, setNewValuePost] = useState({
        title: dataPostSelected?.title,
        content: dataPostSelected?.content
    })
    const dispatch = useDispatch()


    async function updatePost(dataNewPost, idPost) {
        try {
            const response = await api.patch(`${idPost}/`, {
                "title": dataNewPost.title,
                "content": dataNewPost.content
            });
            const newData = await api.get('/')
            dispatch(getAllPosts(newData.data))
            dispatch(setShowModalEdit(false))
            dispatch(setShowModalAlert(true))
            dispatch(setAlertContent({
                title: 'Post modified',
                severity: 'success'
            }))
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <Box className='flex flex-col bg-white w-5/6 py-8 px-10 rounded-2xl space-y-8 items-center mx-[5%] md:w-5/6 lg:w-3/6 shadow-lg justify-center' >
            <p className='font-semibold text-2xl'>Edit item</p>
            <div className='w-full'>
                <p className='mb-2'>Title</p>
                <input
                    id="title-post"
                    placeholder='Hello world'
                    className='border-blue bg-transparent border-2 w-full rounded p-2'
                    value={newValuePost.title}
                    onChange={(e) => setNewValuePost({ title: e.target.value })}
                />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Content</p>
                <textarea
                    id="title-post"
                    placeholder='Content here'
                    rows="4"
                    className='border-blue bg-transparent border-2 w-full rounded p-2'
                    value={newValuePost.content}
                    onChange={(e) => setNewValuePost({ content: e.target.value })}
                />
            </div>
            <div className='flex flex-row w-full space-x-6'>
                <Button variant='outlined' className='font-semibold py-2 px-6 text-black rounded-md border' fullWidth onClick={() => dispatch(setShowModalEdit(false))}>Cancel</Button>
                <Button variant='contained' className='font-semibold py-2 px-6 bg-green rounded-md border' fullWidth
                    onClick={() => updatePost(newValuePost, dataPostSelected?.id)}
                    disabled={dataPostSelected.title === newValuePost.title || dataPostSelected.content === newValuePost.content ? true : false}
                >Save</Button>
            </div>
        </Box>
    )
}
