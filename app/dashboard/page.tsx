'use client'

import React, { FormEvent, use, useEffect, useState } from 'react';
import BlogBox from '../components/BlogBox';
import { useSelector } from 'react-redux';
import instance from '@/utils/apihandeling';

interface User {
    _id: string;
    firstname: string;
    lastname: string;
    profileUrl: string;
    title: string;
    description: string
}

const Dashboard = () => {

    //use selector 
    const selector = useSelector((state:{user:{uid:string , profileUrl:string}}) => state.user);

    //states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateFrom, setUpdateForm] = useState('');
    const [loading, setloading] = useState<boolean>(false);
    const [alert, setalert] = useState<boolean>(false);
    const [alertext, setalertext] = useState<string>('');
    const [data, setData] = useState([]);
    const [handleData, sethandleData] = useState(true);
    const [index, setIndex] = useState(0);
    const [uid, setUid] = useState<string | null>(selector.uid);
    const [user, setUser] = useState<User>({ _id: '', firstname: '', lastname: '', profileUrl: '', title: '', description: '' });
    const profileUrl = user.profileUrl;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsResponse = await instance.get(`/api/blogs/${uid}`);
                console.log(blogsResponse.data);
                setData(blogsResponse.data);

                const usersResponse = await instance.get(`/api/users/${uid}`);
                setUser(usersResponse.data[0]);
                console.log(usersResponse.data[0]);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (handleData) {
            fetchData();
            sethandleData(false);
        }
    }, [handleData]);


    // create blog
    const createBlog = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user.firstname);

        setloading(true)
        instance.post('/api/blogs', {
            title, description,
            profileUrl: profileUrl,
            uid,
            username: `${user.firstname} ${user.lastname}`
        }).then((res) => {
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

    //change date format 
    function formatMongoDBTimestamp(mongoTimestamp: string): string {
        const date = new Date(mongoTimestamp);

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate: string = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    //delete blog function
    function deleteBlog(index: number) {
        instance.delete(`/api/blogs/${data[index]._id}`);
        data.splice(index, 1);
        setData([...data]);
    }
    //update blog function
    function updateBlog(index: number) {
        instance.put(`/api/blogs/${data[index]._id}`, {
            title: updateFrom
        })
        data[index].title = updateFrom
        setData([...data])
        console.log('blog updated', index);
    }

    //open delete modal
    const openModal = (index: number) => {
        setIndex(index);
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
    const openUpdateModal = (index: number) => {
        setIndex(index);
        const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
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
                <textarea placeholder="What is in your mind" className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={(e) => setDescription(e.target.value)} minLength={5} maxLength={300}></textarea>
                {/* <button type='submit' className="btn btn-primary" >Publish Blog</button> */}
                {loading ? <button className="btn btn-primary">
                    <span className="loading loading-sm loading-spinner"></span>
                </button> : <button type='submit' className="btn btn-primary" >Publish Blog</button>}
            </form>
            <div className='p-5'>
                <h1 className='text-2xl font-bold pl-8'>My Blog</h1>
            </div>
            <div>
                {data && data.length > 0 ? data.map((item: { title: string; description: string; profileUrl: string, _id: string, createdAt: string, username: string }, index: number) => {
                    return <BlogBox key={item._id} date={`${item.username} - ${formatMongoDBTimestamp(item.createdAt)}`} title={item.title} descriptipn={item.description} src={item.profileUrl} seeHidden={true} deleteHidden={false} deleteBlog={() => openModal(index)} updateBlog={() => openUpdateModal(index)} />
                }) : <div className='text-center text-xl '>No Blogs found...</div>}
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <p className="py-4">Are you sure to delete this blog?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                        <form method="dialog">
                            <button className="btn btn-error text-white" onClick={() => deleteBlog(index)}>delete</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update!</h3>
                    {/* <p className="py-4">Are you sure to delete this blog?</p> */}
                    <input type="text" placeholder="Add updated title here" onChange={(e) => setUpdateForm(e.target.value)} className="input input-bordered input-success w-full max-w-xs mt-5" />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                        <form method="dialog">
                            <button className="btn btn-success text-white" onClick={() => updateBlog(index)}>update</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Dashboard