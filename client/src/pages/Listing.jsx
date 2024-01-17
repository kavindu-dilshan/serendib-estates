import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux'
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaLink } from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);
  return (
    <main>
        {loading && <p className='text-slate-600 text-center my-10 font-semibold text-3xl'>Loading...</p>}
        {error && <p className='text-red-600 text-center my-10 font-semibold text-3xl'>Something went wrong!</p>}
        {listing && !loading && !error && (
            <div>
            <Swiper navigation loop={true}>
                {listing.imageURL.map((url) => (
                    <SwiperSlide key={url}>
                        <div className='h-[250px] md:h-[550px] ' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaLink className='text-slate-500' onClick={() => {navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
              }}/>
            </div>
            {copied && (<p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link copied!</p>)}
            <div className='flex flex-col max-w-6xl mx-auto p-3 my-7 gap-4'>
                <p className='text-3xl font-bold text-slate-700'>{listing.name}</p>
                <p className='flex items-center gap-2 text-slate-600 text-sm'><FaMapMarkerAlt className='text-green-700'/>{listing.address}</p>

                <div className='flex gap-4'>
                    <p className='bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listing.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                    {listing.offer && (<p className='bg-slate-500 w-full max-w-[200px] text-white text-center p-1 rounded-md line-through'>LKR {listing.regularPrice} {listing.type === 'rent' && '/ Month'}</p>)}
                    {listing.offer && (<p className='bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md'>LKR {+listing.regularPrice - +listing.discountPrice} {listing.type === 'rent' && '/ Month'}</p>)}
                    {!listing.offer && (<p className='bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md'>LKR {listing.regularPrice} {listing.type === 'rent' && '/ Month'}</p>)}
                </div>
                
                <p className='text-slate-600'><span className='font-semibold text-slate-800'>Description : </span>{listing.description}</p>
                
                <ul className='text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaBed className='text-lg'/>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms ` : `${listing.bedrooms} Bedroom `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaBath className='text-lg'/>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms ` : `${listing.bathrooms} Bathroom `}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaParking className='text-lg'/>
                        {listing.parking ? 'Parking Spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <FaChair className='text-lg'/>
                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                    </li>
                </ul>

                <div className='max-w-2xl mx-left'>
                <Swiper navigation loop={true}>
                    {listing.imageURL.map((url) => (
                    <SwiperSlide key={url}>
                        <div className='h-[450px] hidden md:block w-full mx-auto' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
                    </SwiperSlide>
                ))}
                </Swiper>
                </div>
                
                {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button onClick={() => setContact(true)} className='bg-slate-700 text-white rounded-lg hover:bg-slate-900 p-3 md:w-80 mt-2'>Contact Landlord</button>
                )}

                {contact && <Contact listing={listing}/>}
            </div>
            </div>
        )}
    </main>
  )
}