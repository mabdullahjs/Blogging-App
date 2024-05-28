'use client'

import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebaseconfig'
import { useDispatch } from 'react-redux'
import { addUser } from '@/lib/reducers/userSlice'
import axios from 'axios'

const Login = () => {
  //check user
 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) { 
      axios.get(`/api/users/${user.uid}`)
        .then((res) => {
          dispatch(addUser({
            uid: user.uid,
            profileUrl: res.data[0].profileUrl
          }))
          router.push('/')
        }).catch((err) => {
          console.log('yahi check krna ha.',err);
        })
    }
  })
 } , [])
  //states
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [alert, setalert] = useState<boolean>(false);
  const [alertext, setalertext] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);


  //useDispatch
  const dispatch = useDispatch()

  //router
  const router = useRouter();

  //login user
  const loginUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {

      })
      .catch((error) => {
        console.log(error.message);
        setalertext(error.message);
        setalert(true);
        setTimeout(() => {
          setalert(false)
        }, 2000)
        setloading(false);
      });
  }
  return (
    <>
      {alert ? <div role="alert" className="alert alert-error absolute">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{alertext}</span>
      </div> : null}
      <div className='flex items-center h-[90vh]'>
        <form onSubmit={loginUser} className='container mx-auto mb-5 lg:w-[50%] w-[90%] p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
          <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="email" className="input input-bordered w-full max-w-xs" />
          <input onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
          {loading ? <button className="btn btn-primary">
            <span className="loading loading-sm loading-spinner"></span>
          </button> : <button type='submit' className="btn btn-primary">Login</button>}
          <Link href='/register' className='text-primary'>Not a user? Please register first!</Link>
        </form>
      </div>
    </>
  )
}

export default Login