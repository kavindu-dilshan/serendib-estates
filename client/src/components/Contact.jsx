import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    useState(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch (`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef])

  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-4'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
            <textarea className='w-full border p-3 rounded-lg' name="message" id="message" rows="2" placeholder='Enter your message here.' value={message} onChange={onChange}></textarea>

            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 hover:bg-slate-900 text-white p-3 text-center rounded-lg md:w-80'>Send Message</Link>
        </div>
    )}
    </>
  )
}