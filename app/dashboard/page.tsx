'use client'

import React, { FormEvent, use, useEffect, useState } from 'react'
import BlogBox from '../components/BlogBox'
import axios, { AxiosResponse } from 'axios';


const Dashboard = () => {

    //states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setloading] = useState<boolean>(false);
    const [alert, setalert] = useState<boolean>(false);
    const [alertext, setalertext] = useState<string>('');
    const [data, setData] = useState([])
    const profileUrl = localStorage.getItem('profileUrl');


    const uid = localStorage.getItem('uid');
    useEffect(() => {
        axios.get(`/api/blogs/${uid}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            }).catch((err) => {
                console.log(err);

            })
    }, [])





    // create blog
    const createBlog = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setloading(true)
        axios.post('/api/blogs', {
            title, description,
            profileUrl: profileUrl,
            uid
        }).then((res) => {
            console.log(res.data);
            setalertext('Blog Published Succesfully');
            setData([res.data.blog, ...data]);
            setalert(true);
            setTimeout(() => {
                setalert(false)
            }, 2000);

        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setloading(false)
        })
    }
    return (
        <>
            {alert ? <div role="alert" className="alert alert-success absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{alertext}</span>
            </div> : null}
            <div className='p-5 bg-base-200'>
                <h1 className='text-3xl font-bold pl-5'>Dashboard</h1>
            </div>
            <form onSubmit={createBlog} className='container mx-auto mt-5 mb-5 w-[90%] p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
                <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" onChange={(e) => setTitle(e.target.value)} min={3} max={20} />
                <textarea placeholder="What is in your mind" className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={(e) => setDescription(e.target.value)} minLength={5} maxLength={30}></textarea>
                {/* <button type='submit' className="btn btn-primary" >Publish Blog</button> */}
                {loading ? <button className="btn btn-primary">
                    <span className="loading loading-sm loading-spinner"></span>
                </button> : <button type='submit' className="btn btn-primary" >Publish Blog</button>}
            </form>
            <div className='p-5'>
                <h1 className='text-2xl font-bold pl-8'>My Blog</h1>
            </div>
            <div>
                {data ? data.map((item: { title: string; description: string; profileUrl: string, _id: string }) => {
                    return <BlogBox key={item._id} date='Elon Musk - August 17th, 2023' title={item.title} descriptipn={item.description} src={item.profileUrl} seeHidden={true} deleteHidden={false} />
                }) : <div>Loading...</div>}
            </div>
        </>
    )
}

export default Dashboard