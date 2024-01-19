import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('api/listing/get?type=sell&limit=3');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  return (
    <div className="">
      {/* top */}
      <div className="flex flex-col gap-6 p-10 md:py-20 px-3 max-w-6xl mx-auto">
        <h1 style={{ lineHeight: '1.1' }} className='text-slate-700 font-bold text-3xl lg:text-6xl leading-8'>Welcome to <span className='text-slate-500'>Serendib Estates</span>
        <br/>Your gateway to exquisite real estate!</h1>
        <div className="text-gray-400 text-sm md:text-base max-w-4xl">Where Dreams Find Home. Explore premier real estate, meticulously curated for a life of luxury and elegance. Your perfect home awaits, ushering in a new chapter of unparalleled living in style.</div>
        <Link to={'/search'} className=' bg-blue-800 font-semibold text-white p-3 w-52 text-center mt-2 rounded-full hover:bg-blue-900 hover:scale-105 transition-all duration-200'><button>Let's get started</button></Link>
      </div>

      {/* swiper */}
      <Swiper navigation loop={true}>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) => (
            <SwiperSlide>
              <div style={{background: `url(${listing.imageURL[0]}) center no-repeat`, backgroundSize: "cover"}} className="h-[250px] md:h-[500px]" key={listing._id}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-bold text-slate-600'>Recent Offers</h2>
                <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:text-blue-900 font-medium'>Show more offers</Link>
              </div>
              <div className="flex flex-wrap gap-10 mt-5">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-bold text-slate-600'>Recent Places for Rent</h2>
                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:text-blue-900 font-medium'>Show more places</Link>
              </div>
              <div className="flex flex-wrap gap-10 mt-5">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-bold text-slate-600'>Recent Places for Sale</h2>
                <Link to={'/search?type=sell'} className='text-sm text-blue-800 hover:text-blue-900 font-medium'>Show more places</Link>
              </div>
              <div className="flex flex-wrap gap-10 mt-5">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
