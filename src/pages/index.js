import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Inter } from 'next/font/google'
import { logginUser } from '../redux/UserSlice'

import LoginUserComp from '../components/LoginUserComp';
import HomeComp from './Home';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const userName = useSelector((state) => state.user.name)
  const count = useSelector((state) => state.post.count)
  
  const [loadingLogin, setLoadingLogin] = useState(false)

  const [name, setName] = useState('')
  const dispatch = useDispatch()
 
  function handleLogin() {
    setLoadingLogin(true)
    setTimeout(() => {
      dispatch(logginUser(name))
      localStorage.setItem('userNameStorage', name);
      setLoadingLogin(false)
    }, 600);
  }


  useEffect(() => {
    if (localStorage.getItem('userNameStorage')) {
      const nameStorage = localStorage.getItem('userNameStorage')
      dispatch(logginUser(nameStorage))
    }
  }, [userName, count])

  return (
    <>
      {
        userName === null || userName === '' ?
        
          <LoginUserComp
            nameUser={name}
            onChangeName={(e) => setName(e.target.value)}
            loadingState={loadingLogin}
            handleLogin={handleLogin}
          />
          :
          <HomeComp />
      }
    </>
  )
}
