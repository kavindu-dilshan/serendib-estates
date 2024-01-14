import {useSelector} from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt="Profile" />
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 hover:bg-slate-800 disabled:opacity-80 text-white p-3 rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-medium'>Sign Out</span>
      </div>
    </div>
  )
}
