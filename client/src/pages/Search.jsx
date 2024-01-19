import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const offerFromUrl = urlParams.get('offer');
        const furnishedFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if( searchTermFromUrl || parkingFromUrl || typeFromUrl || offerFromUrl || furnishedFromUrl || sortFromUrl || orderFromUrl){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if(data.length > 7) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        }

        fetchListings();

    }, [location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') {
            setSidebardata({...sidebardata, type: e.target.id})
        }

        if(e.target.id === 'searchTerm') {
            setSidebardata({...sidebardata, searchTerm: e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({...sidebardata, sort, order});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length < 8) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input value={sidebardata.searchTerm} onChange={handleChange} type="text" id="searchTerm" placeholder='Search' className='border rounded-lg p-3 w-full'/>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'all'} type="checkbox" id="all" className='w-5'/>
                        <span>Rent & Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'rent'} type="checkbox" id="rent" className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'sell'} type="checkbox" id="sell" className='w-5'/>
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.offer} type="checkbox" id="offer" className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Amenities:</label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.parking} type="checkbox" id="parking" className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.furnished} type="checkbox" id="furnished" className='w-5'/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Sort By:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-2'>
                        <option value='regularPrice_desc'>Price High to Low</option>
                        <option value='regularPrice_asc'>Price Low to High</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 hover:bg-slate-800 disabled:opacity-80 text-white p-3 rounded-lg'>Search</button>
            </form>
        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-bold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'>No listings found!</p>
                )}
                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )}

                {!loading && listings && listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing}/>
                ))}

                {showMore && (
                    <button onClick={onShowMoreClick} className='text-green-700 p-7 hover:text-green-900 font-bold text-center w-full'>Show more</button>
                )}
            </div>
        </div>
    </div>
  )
}