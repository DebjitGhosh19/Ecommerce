import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {
  return (
    <section className="px-4 py-12 md:px-8 lg:px-16">
      <h1 className="mb-8 text-3xl font-bold text-center md:text-left">Contact us</h1>

      <div className="flex flex-col gap-8 md:flex-row md:items-center mb-20">
        <div className="w-full overflow-hidden rounded-2xl shadow-lg md:w-1/2">
          <img
            src={assets.contact_img}
            alt="Store interior"
            className="sm:h-[420px] w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold">Our Store</h2>

          <p className="mb-2 text-lg text-gray-700">
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>

          <p className="mb-2 text-lg text-gray-700">
            Tel: (415) 555-0132
            <br />
            Email: admin@forever.com
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Careers at Forever</h3>
            <p className="mt-2 text-gray-600">
              Learn more about our teams and job openings.
            </p>

            <button className="mt-4 inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewLetterBox/>
    </section>
  )
}

export default Contact
