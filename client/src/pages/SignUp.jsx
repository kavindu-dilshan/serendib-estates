import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 hover:bg-slate-800 disabled:opacity-80 text-white p-3 rounded-lg'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5 font-medium'>
        <p className='text-slate-700'>Have an account?</p>
        <Link to='/sign-in' className='text-blue-700'>Sign In</Link>
      </div>
    </div>
  )
}
