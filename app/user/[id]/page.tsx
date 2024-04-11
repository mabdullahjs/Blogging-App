import BlogBox from '@/app/components/BlogBox';
import instance from '@/utils/apihandeling';
import Link from 'next/link';
import React from 'react'


interface Props {
  params: { id: string; }
}
const DynamicHome = async ({ params: { id } }: Props) => {


    const response = await instance.get(`/api/users/${id}`);
    const blogData = await instance.get(`/api/blogs/${id}`);
    const data = blogData.data
    const userData = response.data[0]
    console.log(data);
    // console.log('blogData ===> ' , blogData);

    function formatMongoDBTimestamp(mongoTimestamp: string): string {
      const date = new Date(mongoTimestamp);
    
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate: string = date.toLocaleDateString('en-US', options);
    
      return formattedDate;
    }
  

  return (
    <>
      <div className='p-5 bg-base-200'>
        <Link href='/' className='text-2xl font-bold pl-5 text-primary'> {'<'} Back To all blogs</Link>
      </div>
      <div >
        <div className='mx-auto flex flex-col items-center mt-5'>
          <img className='w-[180px] rounded-lg' src={userData.profileUrl} alt="profile-img" />
          <h3 className='text-md mt-3'>{userData.email}</h3>
          <h3 className='text-2xl text-primary'>{`${userData.firstname} ${userData.lastname}`}</h3>
        </div>
        <div>
          {data.map((item: { title: string; description: string; profileUrl: string, _id: string, createdAt:string })=>{
            return <BlogBox key={item._id} date={`${userData.firstname} - ${formatMongoDBTimestamp(item.createdAt)}`} title={item.title} descriptipn={item.description} src={item.profileUrl} seeHidden={true} deleteHidden={true} />
          })}
        </div>
      </div>
    </>
  )
}

export default DynamicHome