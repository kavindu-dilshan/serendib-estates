import React from 'react'

export default function CreateListing() {
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
                        <input type="number" name="regularPrice" id="regularPrice" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>(LKR/ Month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" name="discountPrice" id="discountPrice" min='1' max='10' className='p-3 border border-gray-300 rounded-lg'required/>
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
                    <input type="file" name="images" id="images" accept='image/*' className='p-3 border border-gray-300 rounded-lg w-full cursor-pointer' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}