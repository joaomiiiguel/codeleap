import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function PostComp({ key, title, author, timestamp, content, userEdit, modalDelete, modalEdit }) {
    const [timePost, setTimePost] = useState('')

    async function convertTime(time) {
        const current = Date.now()
        const newTime = new Date(time)
        setTimePost(((current - newTime.getTime()) / 100000).toFixed());
    }

    useEffect(() => {
        convertTime(timestamp)
    }, [])
    return (
        <Box key={key} className='flex flex-col w-full border-solid border-2 border-blue rounded-lg overflow-hidden'>
            <Box className='flex flex-row items-center justify-between bg-blue text-white px-4 md:px-10 py-4'>
                <p className='font-bold text-xl'>{title}</p>
                {userEdit === author &&
                    <div>
                        <IconButton className='text-white' aria-label="Logout User" onClick={modalDelete}>
                            <DeleteForeverIcon className='text-[18px]' />
                        </IconButton>
                        <IconButton className='text-white ' aria-label="Logout User" onClick={modalEdit}>
                            <BorderColorIcon className='text-[18px]' />
                        </IconButton>
                    </div>
                }
            </Box>
            <Box className='px-4 py-6 md:p-10'>
                <Box className='flex flex-row justify-between items-center'>
                    <p className='font-bold opacity-40 text-sm'>@{author}</p>
                    {timePost <= 0 ?
                        <p className='font-semibold opacity-20 text-xs'>
                            now
                        </p>
                        :
                        <>
                            {timePost <= 59 ?
                                <p className='font-semibold opacity-20 text-xs'>
                                    {timePost} minutes ago
                                </p>
                                :
                                <p className='font-semibold opacity-20 text-xs'>
                                    {(timePost / 60).toFixed()} hours ago
                                </p>
                            }
                        </>
                    }
                </Box>
                <Box className='mt-4 text-justify'>
                    {content}
                </Box>
            </Box>
        </Box>
        
    )
}
