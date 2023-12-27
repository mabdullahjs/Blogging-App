'use client'

import { auth } from '@/utils/firebaseconfig';
import axios from 'axios';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const Profile = () => {
    let [img, setImg] = useState('');
    let [isuser, setisuser] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                axios.get(`/api/users/${uid}`)
                    .then((res) => {
                        setImg(res.data[0].profileUrl);
                        localStorage.setItem('profileUrl', res.data[0].profileUrl)
                        localStorage.setItem('uid', uid)
                        setisuser(false)
                    }).catch((err) => {
                        console.log(err);
                    })

                return
            }

        });
    }, [isuser])
    const router = useRouter();
    //logout user
    function logoutUser() {
        signOut(auth).then(() => {
            router.push('/login');
            localStorage.removeItem('uid')
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
