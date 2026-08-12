import React from "react";
import { assets } from "../assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div>
      <div className="my-10 grid gap-4 sm:grid-cols-[3fr_1fr_1fr]  text-gray-400">
        <div className="flex flex-col gap-4 ">
          <img src={assets.logo} alt="" className="w-36" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur voluptatum, cupiditate quaerat doloribus nihil laborum
            perspiciatis, molestiae dignissimos molestias exercitationem maxime
            dolor animi temporibus facilis? Natus deserunt laudantium aperiam
            veritatis?
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl uppercase font-semibold text-black ">Company</p>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className="uppercase text-2xl font-semibold  text-black">Get in touch</p>
          <p>+91 7449705009</p>
          <p>ghoshdebjit.2002@gmail.com</p>
        </div>

        
      </div>
      <div className="my-4">
          <hr  className="text-gray-400"/>
          <p className="text-center text-gray-400">Copyright 2026@Forever.com All Right Reserved</p>
        </div>
    </div>
  );
};

export default Footer;
