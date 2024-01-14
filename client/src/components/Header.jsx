import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state => state.user)

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-500'>Serendib</span>
            <span className='text-slate-600'>Estates</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 font-semibold items-center'>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-600 hover:text-slate-900'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-600 hover:text-slate-900'>About</li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (<img className='rounded-full h-10 w-10 object-cover' src={currentUser.avatar} alt="Profile" />) : <li className=' text-slate-600 hover:text-slate-900'>Sign In</li>}
            </Link>
        </ul>
        </div>
    </header>
  )
}
