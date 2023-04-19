import React, { useEffect } from 'react'
import { Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

export default function LoginUserComp({nameUser, onChangeName, loadingState, handleLogin}) {
    
    return (
        <Box className="flex w-full min-h-screen flex-col items-center justify-center bg-background text-black">
            <Box className='bg-white p-8 rounded-md space-y-8 items-center mx-[5%] md:w-4/6 lg:w-2/6 shadow-lg' >
                <p className='font-bold text-lg'>Welcome to CodeLeap network!</p>
                <div>
                    <p className='mb-2 text-sm'>Please enter your username</p>
                    <input
                        id="name"
                        placeholder='John doe'
                        className='border-blue bg-transparent border-2 w-full rounded p-2'
                        value={nameUser}
                        onChange={onChangeName}
                    />
                </div>
                <Button variant='contained' onClick={handleLogin} className='bg-blue' fullWidth
                    disabled={nameUser === '' ? true : false}
                >
                    {loadingState ?
                        <CircularProgress className='text-white' size={25}/>
                        :
                        <p>Enter</p>
                    }
                </Button>
            </Box>
        </Box>
    )
}
