import React from 'react'
import BlogBox from './components/BlogBox'
import axios from 'axios';
import ShowBlog from './components/ShowBlog';

const Home = async () => {

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
      <ShowBlog/>
    </>
  )
}

export default Home