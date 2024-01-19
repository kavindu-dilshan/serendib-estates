import React from 'react'

export default function About() {
  return (
    <div className='flex flex-col gap-6 p-10 md:py-20 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl'>About Serendib Estates</h1>
      <p className=' text-slate-600 text-sm md:text-base'>At Serendib Estates, we believe in creating a vibrant and inclusive marketplace that connects buyers and sellers in the world of real estate. Our platform is designed to be a haven for anyone looking to buy, sell, or invest in properties, with a special emphasis on fostering a diverse community of individuals and businesses.</p>
      <h2 className='text-slate-700 font-bold text-2xl lg:text-3xl'>Why choose Serendib Estates?</h2>
      <ul className='gap-6 text-slate-600 text-sm md:text-base'>
        <li className='mb-3'><span className='font-semibold'>Open Marketplace:</span> We embrace diversity and welcome property listings from individuals, real estate agents, and developers alike. Whether you're a homeowner looking to sell your property, a real estate professional showcasing your portfolio, or a developer with a new project, Serendib Estates is your platform.</li>
        <li className='mb-3'><span className='font-semibold'>Comprehensive Listings:</span> Our platform boasts a wide range of properties, from cozy residential homes to expansive commercial spaces. You'll find listings that cater to different preferences, budgets, and aspirations, ensuring there's something for everyone.</li>
        <li className='mb-3'><span className='font-semibold'>Ease of Use:</span> Navigating through Serendib Estates is a breeze. Our user-friendly interface allows you to effortlessly search for properties, list your own, and connect with potential buyers or sellers. We've streamlined the process to make your real estate journey smooth and enjoyable.</li>
        <li className='mb-3'><span className='font-semibold'>Your Property, Your Control:</span> Take charge of your listings with our intuitive tools. Customize your property descriptions, add high-quality images, and manage your listings with ease. We empower you to present your property in the best light possible.</li>
      </ul>
      <p className=' text-slate-600 text-sm md:text-base'>At Serendib Estates, we are committed to redefining the real estate experience. Whether you're a buyer searching for your dream home, a seller looking to make a lucrative deal or an investor seeking the next big opportunity, we invite you to explore Serendib Estates and embark on a journey of endless possibilities.</p>
      <p className=' text-slate-700 text-sm md:text-base font-semibold'>Join us today and let Serendib Estates be the bridge to your real estate aspirations!</p>
    </div>
  )
}