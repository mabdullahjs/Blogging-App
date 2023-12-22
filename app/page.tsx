import React from 'react'
import BlogBox from './components/BlogBox'
import axios from 'axios';

const Home = async () => {
  const res = await axios.get('http://localhost:3000/api/blogs');
  const data = res.data

  const currentHour = new Date().getHours();
   // change data format function
   function formatMongoDBTimestamp(mongoTimestamp: string): string {
    const date = new Date(mongoTimestamp);
  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }

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
        {data.map((item:{createdAt:string , id:string , title:string, description:string , profileUrl:string , _id:string, uid:string})=>{
          return <BlogBox key={item._id} date={`Elon Musk - ${formatMongoDBTimestamp(item.createdAt)}`} title={item.title} descriptipn={item.description} src={item.profileUrl} seeHidden={false} deleteHidden={true} uid={item.uid} />
        })}
      </div>
    </>
  )
}

export default Home