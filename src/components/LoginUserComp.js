import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

import Logo from '../../public/bg_logo.png'

export default function LoginUserComp({ nameUser, onChangeName, loadingState, handleLogin }) {

    return (
        <Box className="flex w-full min-h-screen flex-col items-center justify-center bg-background text-black">
            <Box className='flex flex-col bg-white  rounded-xl items-center mx-[5%] md:w-4/6 lg:w-2/6 shadow-xl justify-center overflow-hidden' >
                <Image src={Logo} className='w-full' alt='logo background' />
                <div className='flex flex-col items-center w-5/6 md:w-4/6 py-10 space-y-8'>
                    <p className='font-bold text-lg'>Welcome to CodeLeap network!</p>
                    <div className='w-full'>
                        <p className='mb-2 text-xs opacity-40'>Please enter your username</p>
                        <input
                            id="name"
                            placeholder='John doe'
                            className='border-blue bg-transparent border-2 w-full rounded p-2'
                            value={nameUser}
                            onChange={onChangeName}
                        />
                    </div>
                    <Button variant='contained' onClick={handleLogin} className='bg-blue mx-8' fullWidth
                        disabled={nameUser === '' ? true : false}
                    >
                        {loadingState ?
                            <CircularProgress className='text-white' size={25} />
                            :
                            <p>Enter</p>
                        }
                    </Button>
                </div>
            </Box>
        </Box>
    )
}
