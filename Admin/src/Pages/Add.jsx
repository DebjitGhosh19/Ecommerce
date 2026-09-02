import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
// import { BACKEND_URL } from "";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../App";
const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });
  const [isBestSeller, setIsBestSeller] = useState(false);

  const handleSizeChange = (size) => {
    setSizes((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  const handleImageChange = (event, setter) => {
    const file = event.target.files[0];
    setter(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("sizes", JSON.stringify(Object.keys(sizes).filter((size) => sizes[size])));
    formData.append("bestseller", isBestSeller);

    [image1, image2, image3, image4].forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

   try{
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token provided. Please login again.");
      return;
    }

    const response = await axios.post(`${BACKEND_URL}/api/products/addProduct`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    toast.success(response.data.message || "Product added successfully");

    // Reset form fields after successful submission
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setSizes({
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
    });
    setIsBestSeller(false);

   }
    catch(err){
      toast.error(err.response?.data?.message || "Failed to add product");
    }
    
 
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 p-6 ">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 sm:p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-500">
              Inventory
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
              Add Product
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">Upload Image</p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
              {[1, 2, 3, 4].map((num) => {
                const imageState = {
                  1: image1,
                  2: image2,
                  3: image3,
                  4: image4,
                }[num];

                return (
                  <label
                    key={num}
                    htmlFor={`image${num}`}
                    className="group relative flex h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50 sm:h-28 sm:w-28"
                  >
                    {imageState ? (
                      <img
                        src={URL.createObjectURL(imageState)}
                        alt={`Upload preview ${num}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={assets.upload_area}
                        alt="Upload area"
                        className="h-12 w-12 object-contain opacity-70 transition group-hover:opacity-100 sm:h-14 sm:w-14"
                      />
                    )}
                    <input
                      type="file"
                      name={`image${num}`}
                      id={`image${num}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        if (num === 1) handleImageChange(event, setImage1);
                        if (num === 2) handleImageChange(event, setImage2);
                        if (num === 3) handleImageChange(event, setImage3);
                        if (num === 4) handleImageChange(event, setImage4);
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-base"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write content here"
                rows="4"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-base"
              ></textarea>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Product category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-base"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subcategory
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-base"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:text-base"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">Available sizes</p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(sizes).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`flex h-10 w-12 items-center justify-center rounded-xl border text-sm font-medium transition ${
                    sizes[size]
                      ? "border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-200"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:border-indigo-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              id="bestseller"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="bestseller" className="cursor-pointer text-sm font-medium text-slate-700">
              Add bestseller
            </label>
          </div>

          <div className="pt-1 sm:pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-px hover:shadow-xl sm:w-auto"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
