'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface UserData {
  profileUrl: string;
  email: string;
  firstname: string;
  lastname: string;
}

const ShowProfile: React.FC<{ id?: string }> = (props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/api/users/${props.id}`);
        setUserData(res.data[0]);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    }
    if (props.id) {
      getData();
    }
  }, [props.id]);

  if (error) {
    return <h1 className="text-2xl font-bold text-center">{error}</h1>;
  }

  if (userData === null) {
    return <h1 className="text-2xl font-bold text-center"></h1>;
  }

  return (
    <div className='mx-auto flex flex-col items-center mt-5'>
      <img className='w-[180px] rounded-lg' src={userData.profileUrl} alt="profile-img" />
      <h3 className='text-md mt-3'>{userData.email}</h3>
      <h3 className='text-2xl text-primary'>{`${userData.firstname} ${userData.lastname}`}</h3>
    </div>
  );
}

export default ShowProfile;
