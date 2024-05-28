import BlogBox from '@/app/components/BlogBox';
import ShowBlog from '@/app/components/ShowBlog';
import ShowProfile from '@/app/components/ShowProfile';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'


interface Props {
  params: { id: string; }
}
const DynamicHome = async ({ params: { id } }: Props) => {


  return (
    <>
      <div className='p-5 bg-base-200'>
        <Link href='/' className='text-2xl font-bold pl-5 text-primary'> {'<'} Back To all blogs</Link>
      </div>
      <div >
        <ShowProfile id={id}/>
        <div>
          <ShowBlog id={id} />
        </div>
      </div>
    </>
  )
}

export default DynamicHome