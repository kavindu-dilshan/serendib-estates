import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { updateUserSuccess, updateUserFailure, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updtaeSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
        snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL})
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto mb-20'>
      <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="Profile" />
        <p className='text-sm self-center'>
          {fileUploadError ? (<span className='text-red-600 font-medium'>This image can't be uploaded (Image must be less than 2MB)</span>) :
          filePercentage > 0 && filePercentage < 100 ? (<span className='text-slate-700 font-medium'>{`Uploading ${filePercentage}%`}</span>) :
          filePercentage === 100 ? (<span className='text-green-600 font-medium'>Image Uploaded Successfully!</span>) : ("")
          }
        </p>
        <input type='text' placeholder='Username' defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Email' defaultValue={currentUser.email} className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 hover:bg-slate-800 disabled:opacity-80 text-white p-3 rounded-lg'>{loading ? 'Loading...' : 'Update'}</button>
        <Link to={"/create-listing"} className='bg-green-700 hover:bg-green-800 disabled:opacity-80 text-white p-3 rounded-lg text-center'>{loading ? 'Loading...' : 'Create Listing'}</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer font-medium'>Sign Out</span>
      </div>
      <button onClick={handleShowListings} className='text-green-700 font-semibold w-full mt-5'>Show Listings</button>
      <p className='text-red-700 mt-5 font-medium text-center'>{error ? error : ''}</p>
      <p className='text-green-600 mt-5 font-medium text-center'>{updtaeSuccess? 'User details updated successfully.' : ''}</p>
      <p className='text-red-700 mt-5 font-medium text-center'>{showListingsError ? 'Apologies, we are unable to display listings right now.' : ''}</p>

      {userListings && userListings.length > 0 &&
      <div className='flex flex-col gap-4'>
        <h1 className='text-slate-700 text-center mt-10 text-3xl font-bold'>Your Listings</h1>
      {userListings.map((listing) => (
        <div key={listing._id} className='border border-slate-300 rounded-lg p-3 flex justify-between items-center gap-4'>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURL[0]} alt="listing cover" className='h-16 w-16 object-contain rounded-lg'/>
          </Link>
          <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hove:undeline truncate'>
            <p>{listing.name}</p>
          </Link>

          <div className='flex flex-col items-center'>
            <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 font-medium'>Delete</button>
            <Link to={`/update-listing/${listing._id}`}>
            <button className='text-green-700 font-medium'>Edit</button>
            </Link>
          </div>
        </div>
        ))}
      </div>}
      </div>
  )
}