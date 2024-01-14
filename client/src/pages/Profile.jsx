import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { updateUserSuccess, updateUserFailure, updateUserStart } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updtaeSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
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
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-medium'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5 font-medium'>{error ? error : ''}</p>
      <p className='text-green-600 mt-5 font-medium'>{updtaeSuccess? 'User details updated successfully.' : ''}</p>
    </div>
  )
}