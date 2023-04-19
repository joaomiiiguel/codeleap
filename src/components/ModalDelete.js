import React from 'react'
import { Box, Button } from '@mui/material'

export default function ModalDelete({closeModalDelete, handleDeletePost}) {
    return (
        <Box className='flex flex-col bg-white py-8 px-10 rounded-2xl space-y-8 items-center mx-[5%] md:w-4/6 lg:w-2/6 shadow-lg justify-center' >
            <p>
                Are you sure you want to delete this item?
            </p>
            <div className='flex flex-row justify-end w-full'>
                <button className='font-semibold py-2 px-6 mr-4 text-black rounded-md border' onClick={closeModalDelete}>Cancel</button>
                <button className='bg-red border border-red text-white font-semibold py-2 px-6 rounded-md' onClick={handleDeletePost}>Delete</button>
            </div>
        </Box>
    )
}
