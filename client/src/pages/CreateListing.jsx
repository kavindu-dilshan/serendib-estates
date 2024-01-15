import React, { useState } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../firebase.js';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageURL: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

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
    
  return (
    <main className='p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Create Listing</h1>
        <form action="" className='flex flex-col sm:flex-row gap-10'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required/>
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required/>
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="sell" id="sell" className='w-5'/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="rent" id="rent" className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="parking" id="parking" className='w-5'/>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="furnished" id="furnished" className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="offer" id="offer" className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type="number" name="bedrooms" id="bedrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" name="bathrooms" id="bathrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
                        <p>Bathrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" name="regularPrice" id="regularPrice" min='1' className='p-3 border border-gray-300 rounded-lg'required/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>(LKR/ Month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" name="discountPrice" id="discountPrice" min='1' className='p-3 border border-gray-300 rounded-lg'required/>
                        <div className='flex flex-col items-center'>
                            <p>Discount Price</p>
                            <span className='text-xs'>(LKR/ Month)</span>
                        </div>
                    </div>
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
                <button className='p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}