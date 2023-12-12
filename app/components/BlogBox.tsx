import Link from 'next/link';
import React from 'react'

interface Props {
  title: string;
  src: string;
  descriptipn: string;
  date: string;
  deleteHidden: boolean;
  seeHidden: boolean
}
const BlogBox = ({ date, descriptipn, title, src, deleteHidden, seeHidden }: Props) => {
  return (
    <div className='container mx-auto mt-5 mb-5 w-[90%] p-10 rounded-lg bg-base-200'>
      <div className="top-container flex gap-5 flex-wrap items-center">
        <div>
          <img className='w-[80px] h-[80px] rounded-xl' src={src} alt="profile-pic" />
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
        <Link  className='mt-5 text-[#7749F8]' href="/user/459634756347895687">see all from this user</Link>
      </div>
      <div className={deleteHidden ? 'hidden' : 'flex gap-5'}>
        <a className='mt-5 text-[#7749F8]' href="">Delete</a>
        <a className='mt-5 text-[#7749F8]' href="">Edit</a>

      </div>

    </div>
  )
}

export default BlogBox