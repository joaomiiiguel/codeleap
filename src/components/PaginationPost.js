import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/actions/api';
import { getAllPosts } from '@/redux/PostsSlice';

export default function PaginationPost({ dataPost }) {

    const dispatch = useDispatch()

    async function NextPagination() {
        const newPage = pageCurrent === 0 ? 10 : pageCurrent + 10;
        const response = await api.get(`/?limit=10&offset=${newPage}`)
    }

    useEffect(() => {

    }, [])

    return (
        <div className='flex w-full justify-center z-50' id="check">
            <a className='px-4 bg-white' onClick={() => NextPagination()}>More</a>
            <p>Loading...</p>
        </div>
    )
}