import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { products, BACKEND_URL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
     

      const response = await axios.post(
        BACKEND_URL + "/api/orders/userorders",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item)
          });
        });
        setOrderData(allOrdersItem.reverse());
        
      }
      // setOrderData(response.data);
    } catch (error) {
      console.log(error.response.mesage);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div>
      <div className="flex items-center gap-2 text-2xl uppercase my-4">
        <h1 className="text-gray-300">
          Orders <span className="text-black"> Page</span>{" "}
        </h1>
        <hr className="w-8 sm:w-11 h-[2px] bg-black " />
      </div>
      <div>
        {orderData.length > 0 &&
          orderData.map((product) => (
            <div
              key={product.id}
              className="my-4 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            >
           <div className="flex items-center gap-4">
               <img
                src={product.images}
                alt={product.title}
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1 ">
                <h2 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
                  {product.name}
                </h2>
                <p className="mt-1 font-medium text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
                <p>Quantity: {product.quantity}</p>
                <p>Size: {product.size}</p>
                <p>Date: { new Date(product.date).toLocaleDateString() }</p>
                <p>Payment Method: {product.paymentMethod}</p>
              </div>
           </div>

              <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 sm:text-base">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-green-100" />
                <span>{product.status}</span>
              </div>

              <button onClick={loadOrderData}  className="w-full whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-black hover:bg-black hover:text-white sm:w-auto">
                Track order
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
