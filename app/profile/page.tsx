'use client'


import { auth } from '@/utils/firebaseconfig'
import axios from 'axios'
import { updatePassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const selector = useSelector((state:{user:{uid:string , profileUrl:string}}) => state.user);
    useEffect(() => {
        axios.get(`/api/users/${selector.uid}`)
            .then((res) => {
                console.log(typeof res.data[0].profileUrl);

                setprofilePic(res.data[0].profileUrl);
                setUsername(`${res.data[0].firstname} ${res.data[0].lastname}`)
            })
    }, [])
    const [profilePic, setprofilePic] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const router = useRouter();

    function updateUserPassword() {
        const user = auth.currentUser;
        updatePassword(user!, newPassword).then(() => {
            console.log('update successfull');
            router.push('/')

        }).catch((error) => {
            console.log(error);

        });
    }



    return (
        <>
            <div className='p-5 bg-base-200'>
                <h1 className='text-3xl font-bold pl-5'>Profile</h1>
            </div>
            <div className='flex flex-col items-start gap-5 p-[4rem]'>
                <img className='w-[20rem] rounded-xl' src={profilePic} alt="Profile-image" />
                <div className='flex gap-2 items-center'>
                    <h1 className='text-2xl font-semibold'>{username}</h1>

                </div>
                    <input onChange={(e) => setNewPassword(e.target.value)} type="text" placeholder="new password" className="input input-bordered w-full max-w-xs" />
                    <input onChange={(e) => setRepeatPassword(e.target.value)} type="text" placeholder="repeat password" className="input input-bordered w-full max-w-xs" />
                    <button className="btn btn-primary" onClick={updateUserPassword}>Update Password</button>
            </div>
        </>
    )
}

export default Profile