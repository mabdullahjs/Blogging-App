import React from 'react'
import BlogBox from '../components/BlogBox'

const Dashboard = () => {
    return (
        <>
            <div className='p-5 bg-base-200'>
                <h1 className='text-3xl font-bold pl-5'>Dashboard</h1>
            </div>
            <div className='container mx-auto mt-5 mb-5 w-[90%] p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
                <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
                <textarea placeholder="What is in your mind" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <button className="btn btn-primary">Publish Blog</button>
            </div>
            <div className='p-5'>
                <h1 className='text-2xl font-bold pl-8'>My Blog</h1>
            </div>
            <div>
            <BlogBox date='Elon Musk - August 17th, 2023' title='Introducing Whisper' descriptipn='lorem ipsum 123' src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg' seeHidden={true} deleteHidden={false} />
            </div>
        </>
    )
}

export default Dashboard