'use client'

import { addUser, removeUser } from '@/lib/reducers/userSlice';
import { auth } from '@/utils/firebaseconfig';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    let [img, setImg] = useState('');
    let [isuser, setisuser] = useState(true);

    //get data from selector
    const selector = useSelector((state: { user: { uid: string, profileUrl: string } }) => state.user);

    useEffect(() => {
        setImg(selector.profileUrl)
        if(selector.profileUrl){
            setisuser(false);
        }
    }, [selector])
    const router = useRouter();

    //use dispatch
    const dispatch = useDispatch();

    //logout user
    function logoutUser() {
        signOut(auth).then(() => {
            router.push('/login');
            dispatch(removeUser());
            // localStorage.removeItem('uid')
            setisuser(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            {isuser ? (
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <Link className="font-bold mx-3" href="/login">
                            Login
                        </Link>
                    </ul>
                </div>
            ) : (
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 mt-2 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={img} />
                        </div>
                    </div>
                    <ul role="button" tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52">
                        <Link className="px-2 py-1 rounded-xl" href="/profile">
                            Profile
                        </Link>
                        <Link className="px-2 py-1 rounded-xl" href="/dashboard">
                            Dashboard
                        </Link>
                        <div onClick={logoutUser} className="px-2 py-1 rounded-xl">
                            Logout
                        </div>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Profile;
