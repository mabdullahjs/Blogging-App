import React from 'react'
import BlogBox from './components/BlogBox'

const Home = () => {
  const currentHour = new Date().getHours();
  return (
    <>
    <div className='p-5 bg-base-200'>
      <h1 className='text-3xl font-bold pl-5'>{currentHour >= 5 && currentHour < 12
      ? 'Good Morning'
      : currentHour >= 12 && currentHour < 18
      ? 'Good Afternoon'
      : currentHour >= 18 && currentHour < 21
      ? 'Good Evening'
      : 'Good Night'} Readers!</h1>
    </div>
    <div className='mt-[4rem]'>
    <BlogBox date='Elon Musk - August 17th, 2023' title='Introducing Whisper' descriptipn='lorem ipsum 123' src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg' seeHidden={false} deleteHidden={true}/>
    </div>
    </>
  )
}

export default Home