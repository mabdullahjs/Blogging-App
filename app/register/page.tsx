"use client"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/utils/firebaseconfig';
import Link from 'next/link';
import { ChangeEvent, useState } from "react";
import axios from "axios";


const Register = () => {
    const [firstname , setfirstname] = useState("");
    const [lastname , setlastname] = useState("");
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const [profileUrl , setprofileUrl] = useState<File | undefined | string>("");


    //register user function
    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                // axios.post('/api/users' , {
                //     firstname: firstname,
                //     lastname:lastname,
                //     email:email
                // })
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    //check file
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          setprofileUrl(e.target.files[0]);
        }
      };
    return (
        <div className='container mx-auto mb-5 w-[50%] mt-[1%] p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
            <input onChange={(e)=>setfirstname(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
            <input onChange={(e)=>setlastname(e.target.value)} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
            <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder="email" className="input input-bordered w-full max-w-xs" />
            <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
            <input onChange={handleFileChange} type="file" className="file-input file-input-primary w-full max-w-xs" />
            <button className="btn btn-primary">Register</button>
            <Link href='/login' className='text-primary'>Already a user? Please login!</Link>
        </div>
    )
}

export default Register