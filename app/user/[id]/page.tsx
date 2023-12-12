import BlogBox from '@/app/components/BlogBox';
import Link from 'next/link';
import React from 'react'


interface Props {
  params: { id: string; }
}
const DynamicHome = ({ params: { id } }: Props) => {
  return (
    <>
      <div className='p-5 bg-base-200'>
        <Link href='/' className='text-2xl font-bold pl-5 text-primary'> {'<'} Back To all blogs</Link>
      </div>
      <div >
        <div className='mx-auto flex flex-col items-center mt-5'>
          <img className='w-[10%] rounded-lg' src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg" alt="profile-img" />
          <h3 className='text-md'>elon@openai.com</h3>
          <h3 className='text-2xl text-primary'>Elon Musk</h3>
        </div>
        <div>
          <BlogBox date='Elon Musk - August 17th, 2023' title='Introducing Whisper' descriptipn='lorem ipsum 123' src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg' seeHidden={true} deleteHidden={true} />
        </div>
      </div>
    </>
  )
}

export default DynamicHome