import React from 'react'
import { Link } from 'react-router-dom'
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg overflow-hidden rounded-lg w-full sm:w-[330px] hover:scale-105 transition-all duration-200'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageURL[0] || 'https://img.freepik.com/free-vector/real-estate-searching_52683-46407.jpg'} alt="listing cover" className='h-[200px] sm:h-[220px] w-full object-cover'/>
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className='text-sm text-green-700'/>
            <p className='truncate text-gray-500 text-xs w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-500 line-clamp-2 mt-2'>{listing.description}</p>
          <p>
          {listing.offer && (<p className=' text-green-700 mt-2 font-bold'>LKR {+listing.regularPrice - +listing.discountPrice} {listing.type === 'rent' && '/ Month'}</p>)}
          {!listing.offer && (<p className=' text-green-700 mt-2 font-bold'>LKR {+listing.regularPrice} {listing.type === 'rent' && '/ Month'}</p>)}
          </p>
          <ul className='text-slate-700 font-semibold text-xs flex flex-wrap items-center gap-4 sm:gap-6'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-lg'/>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms ` : `${listing.bedrooms} Bedroom `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-lg'/>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms ` : `${listing.bathrooms} Bathroom `}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  )
}