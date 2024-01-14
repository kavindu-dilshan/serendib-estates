import {useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7 text-slate-700'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="Profile" />
        <p className='text-sm self-center'>
          {fileUploadError ? (<span className='text-red-600 font-medium'>This image can't be uploaded (Image must be less than 2MB)</span>) :
          filePercentage > 0 && filePercentage < 100 ? (<span className='text-slate-700 font-medium'>{`Uploading ${filePercentage}%`}</span>) :
          filePercentage === 100 ? (<span className='text-green-600 font-medium'>Image Uploaded Successfully!</span>) : ("")
          }
        </p>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 hover:bg-slate-800 disabled:opacity-80 text-white p-3 rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-medium'>Sign Out</span>
      </div>
    </div>
  )
}