import { Box, Button } from '@mui/material'
import React from 'react'

export default function ModalEdit({closeModal, dataPostSelected, updatePost}) {
    return (
        <Box className='flex flex-col bg-white w-5/6 py-8 px-10 rounded-2xl space-y-8 items-center mx-[5%] md:w-5/6 lg:w-3/6 shadow-lg justify-center' >
            <p className='font-semibold text-2xl'>Edit item</p>
            <div className='w-full'>
                <p className='mb-2'>Title</p>
                <input
                    id="title-post"
                    placeholder='Hello world'
                    className='border-blue bg-transparent border-2 w-full rounded p-2'
                />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Content</p>
                <textarea
                    id="title-post"
                    placeholder='Content here'
                    rows="4"
                    className='border-blue bg-transparent border-2 w-full rounded p-2'
                />
            </div>
            <div className='flex flex-row w-full md:w-1/2 space-x-6'>
                <Button variant='outlined' className='font-semibold py-2 px-6 text-black rounded-md border' fullWidth onClick={closeModal}>Cancel</Button>
                <Button variant='contained' className='font-semibold py-2 px-6 bg-green rounded-md border' fullWidth onClick={updatePost}>Save</Button>
            </div>
        </Box>
    )
}
