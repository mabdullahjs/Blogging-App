import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
      <div className='container mx-auto mb-5 w-[50%] mt-[5%] my-auto p-10 rounded-lg bg-base-200 flex flex-col gap-5 items-center'>
        <input type="email" placeholder="email" className="input input-bordered w-full max-w-xs" />
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-primary">Login</button>
        <Link href='/register' className='text-primary'>Not a user? Please register first!</Link>
      </div>
  )
}

export default Login