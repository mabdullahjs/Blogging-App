'use client'

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, UserCredential } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, StorageReference } from "firebase/storage";
import { auth, storage } from '@/utils/firebaseconfig';
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';



const Register = () => {
    //check user
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/')
        }
    })

    //dispatch
    const dispatch = useDispatch()
    const [firstname, setfirstname] = useState<string>("");
    const [lastname, setlastname] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [profileUrl, setprofileUrl] = useState<File | null>(null);
    const [loading, setloading] = useState<boolean>(false);
    const [alert, setalert] = useState<boolean>(false);
    const [alertext, setalertext] = useState<string>('');

    //use router config
    const router = useRouter()
    // register user function
    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setloading(true)
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user.uid);

            const storageRef: StorageReference = ref(storage, email);

            if (profileUrl) {
                await uploadBytes(storageRef, profileUrl);
                const url: string = await getDownloadURL(storageRef);

                try {
                    const res = await axios.post('/api/users', {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        uid: user.uid,
                        profileUrl: url
                    });
                    console.log('jo chahya wohi===>',res.data);
                    router.push('/');
                } catch (err) {
                    console.log(err);
                } finally {
                    setloading(false);
                }
            }
        } catch (error: any) {
            console.error(error);
            setalertext(error.message);
            setalert(true);
            setTimeout(() => {
                setalert(false)
            }, 2000);
        }
    };

    // check file
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setprofileUrl(e.target.files[0]);
        }
    };

    return (
        <>
            {alert ? <div role="alert" className="alert alert-error absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alertext}</span>
            </div> : null}
            <div className='flex items-center h-[90vh]'>
                <form onSubmit={registerUser} className='container mx-auto mb-5 lg:w-[50%] w-[90%] p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
                    <input onChange={(e) => setfirstname(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" required />
                    <input onChange={(e) => setlastname(e.target.value)} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" required />
                    <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="email" className="input input-bordered w-full max-w-xs" required />
                    <input onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" required />
                    <input onChange={handleFileChange} type="file" className="file-input file-input-primary w-full max-w-xs" required />

                    {loading ? <button className="btn btn-primary">
                        <span className="loading loading-sm loading-spinner"></span>
                    </button> : <button type='submit' className="btn btn-primary">Register</button>}
                    <Link href='/login' className='text-primary'>Already a user? Please login!</Link>
                </form>
            </div>
        </>
    );
};

export default Register;
