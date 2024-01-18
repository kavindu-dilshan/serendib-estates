import {FaSearch} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-500'>Serendib</span>
            <span className='text-slate-600'>Estates</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type='text' placeholder='Search' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <button><FaSearch className='text-slate-600'/></button>
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
