import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  src: string;
  descriptipn: string;
  date: string;
  deleteHidden: boolean;
  seeHidden: boolean;
  uid?:string;
  deleteBlog?:()=>void;
  updateBlog?:()=>void
}
const BlogBox = ({ date, descriptipn, title, src, deleteHidden, seeHidden, uid, deleteBlog, updateBlog }: Props) => {
  return (
    <div className='container mx-auto mt-5 mb-5 w-[90%] p-10 rounded-lg bg-base-200'>
      <div className="top-container flex gap-5 flex-wrap items-center">
        <div>
          <img className='w-[60px] rounded-full' src={src} alt="profile-pic" />
        </div>
        <div className="title">
          <h1 className='text-xl'>{title}</h1>
          <p className='text-[#6C757D]'>{date}</p>
        </div>
      </div>
      <div className="mt-5">
        {descriptipn}
      </div>
      <div className={seeHidden ? 'hidden' : 'mt-5'}>
        <Link className='mt-5 text-[#7749F8]' href={`/user/${uid}`}>see all from this user</Link>
      </div>
      <div className={deleteHidden ? 'hidden' : 'flex gap-5'}>
        <p className='mt-5 text-[#7749F8] cursor-pointer' onClick={deleteBlog}>Delete</p>
        <p className='mt-5 text-[#7749F8] cursor-pointer' onClick={updateBlog}>Edit</p>
      </div>
    </div>
  )
}

export default BlogBox