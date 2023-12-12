import React from 'react'

const Profile = () => {
    return (
        <>
            <div className='p-5 bg-base-200'>
                <h1 className='text-3xl font-bold pl-5'>Profile</h1>
            </div>
            <div className='flex flex-col items-start gap-5 p-[4rem]'>
                <img className='w-[20rem] rounded-xl' src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg" alt="Profile-image" />
                <div className='flex gap-2 items-center'>
                <h1 className='text-2xl font-semibold'>Elon Musk </h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                </svg>
                </div>
                <input type="text" placeholder="old password" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="new password" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="repeat password" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-primary">Update Password</button>
            </div>
        </>
    )
}

export default Profile