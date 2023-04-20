import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux'

export default function PostComp({ title, author, timestamp, content, modalDelete, modalEdit }) {
    const [timePost, setTimePost] = useState('')
    const userName = useSelector((state) => state.user.name)


    async function convertTime(time) {
        const current = Date.now()
        const newTime = new Date(time)
        setTimePost(((current - newTime.getTime()) / 100000).toFixed());
    }

    useEffect(() => {
        convertTime(timestamp)
    }, [])
    return (
        <Box className='flex flex-col border-solid border-2 bg-white border-blue rounded-lg overflow-hidden snap-start'>
            <Box className='flex flex-row items-center justify-between bg-blue text-white px-4 md:px-8 py-4'>
                <p className='font-bold text-xl truncate w-2/3'>{title}</p>
                {userName === author &&
                    <div>
                        <IconButton className='text-white' aria-label="Logout User" onClick={modalDelete}>
                            <DeleteForeverIcon className='text-[20px]' />
                        </IconButton>
                        <IconButton className='text-white ' aria-label="Logout User" onClick={modalEdit}>
                            <BorderColorIcon className='text-[20px]' />
                        </IconButton>
                    </div>
                }
            </Box>
            <Box className='px-8 pt-2'>
                <Box className='flex flex-row justify-between items-center'>
                    <p className='font-bold opacity-40 text-sm truncate w-1/2'>@{author}</p>
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
                <Box className='my-6 text-justify line-clamp-3 break-all'>
                    {content}
                </Box>
            </Box>
        </Box>
        
    )
}
