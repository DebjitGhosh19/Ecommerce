import { assets } from "../assets/frontend_assets/assets"

const About = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-900">About Us</h1>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img
            src={assets.us}
            alt="A modern shopping store"
            className="h-80 w-full rounded-lg object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Story</h2>
          <p className="leading-7 text-gray-600">
            We make online shopping simple, reliable, and enjoyable. Our collection is
            carefully selected to bring quality products and great value to your everyday life.
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            With friendly service and a focus on customer satisfaction, we are here to make
            every order a pleasant experience.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="border border-gray-200 p-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-900">Quality Products</h3>
          <p className="text-gray-600">We choose products with care so you can shop with confidence.</p>
        </div>
        <div className="border border-gray-200 p-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-900">Customer First</h3>
          <p className="text-gray-600">Your satisfaction matters to us at every step of your journey.</p>
        </div>
        <div className="border border-gray-200 p-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-900">Trusted Service</h3>
          <p className="text-gray-600">Enjoy a smooth, secure, and dependable shopping experience.</p>
        </div>
      </div>
    </main>
  )
}

export default About