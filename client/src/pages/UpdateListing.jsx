import React, { useEffect, useState } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../firebase.js';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const [formData, setFormData] = useState({
        imageURL: [],
        name: '',
        description: '',
        address: '',
        type: 'sell',
        bedrooms: 0,
        bathrooms: 0,
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setFormData(data);
        }

        fetchListing();
    }, []);

    const handleImageSubmit = (e) => {
        if(files.length > 0 && files.length + formData.imageURL.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for(let i=0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageURL: formData.imageURL.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                setImageUploadError('Image upload failed (Max size: 2MB per image)');
                setUploading(false);
            });
        }else{
            setImageUploadError('You can only upload 6 images per listing.');
            setUploading(false);
        }
    }; 

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        });
    };

    const handleRemoveImage = (index) => {
        const imageURLs = [...formData.imageURL];
        const removedImageURL = imageURLs.splice(index, 1)[0];
    
        setFormData({ ...formData, imageURL: imageURLs });
    
        const storage = getStorage(app);
        const imageRef = ref(storage, removedImageURL);
        
        deleteObject(imageRef)
            .then(() => {
                console.log('Image deleted successfully from Firebase Storage');
            })
            .catch((error) => {
                console.error('Error deleting image from Firebase Storage:', error.code, error.message);
            });
    };

    const handleChange = (e) => {
        if(e.target.id === 'sell' || e.target.id === 'rent'){
            setFormData({
                ...formData, type: e.target.id
            })
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData, [e.target.id]: e.target.checked
            })
        }

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData, [e.target.id]: e.target.value
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageURL.length < 1 ) return setError('You must upload at least one image.');
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discounted price must be lower than regular price.')
            setLoading(true);
            setError(false);
            const res = await fetch (`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false){
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    
  return (
    <main className='p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Update Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
            <div className='flex flex-col gap-4 flex-1'>
                <input onChange={handleChange} value={formData.name} type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
                <textarea onChange={handleChange} value={formData.description} type='text' placeholder='Description' className='border p-3 rounded-lg h-60' id='description' required/>
                <input onChange={handleChange} value={formData.address} type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={formData.type === 'sell'} type="checkbox" name="sell" id="sell" className='w-5'/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={formData.type === 'rent'} type="checkbox" name="rent" id="rent" className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={formData.parking} type="checkbox" name="parking" id="parking" className='w-5'/>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={formData.furnished} type="checkbox" name="furnished" id="furnished" className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input onChange={handleChange} checked={formData.offer} type="checkbox" name="offer" id="offer" className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input onChange={handleChange} value={formData.bedrooms} type="number" name="bedrooms" id="bedrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
                        <p>Bedrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input onChange={handleChange} value={formData.bathrooms} type="number" name="bathrooms" id="bathrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
                        <p>Bathrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input onChange={handleChange} value={formData.regularPrice} type="number" name="regularPrice" id="regularPrice" min='1' className='p-3 border border-gray-300 rounded-lg'required/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            {formData.type === 'rent' && (<span className='text-xs'>(LKR/ Month)</span>)}
                        </div>
                    </div>
                    {formData.offer &&(
                        <div className='flex items-center gap-2'>
                            <input onChange={handleChange} value={formData.discountPrice} type="number" name="discountPrice" id="discountPrice" min='0' className='p-3 border border-gray-300 rounded-lg'required/>
                            <div className='flex flex-col items-center'>
                                <p>Discount Price</p>
                                {formData.type === 'rent' && (<span className='text-xs'>(LKR/ Month)</span>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-bold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (Max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=> setFiles(e.target.files)} type="file" name="images" id="images" accept='image/*' className='p-3 border border-gray-300 rounded-lg w-full cursor-pointer' multiple/>
                    <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                <p className='text-red-600 text-sm font-medium'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageURL.length > 0 && formData.imageURL.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                            <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg hover:text-red-950'>Delete</button>
                        </div>
                    ))
                }
                <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-80'>{loading ? 'Updating...' : 'Update Listing'}</button>
                {error && <p className='text-red-600 text-sm font-medium'>{error}</p>}
            </div>
        </form>
    </main>
  )
}