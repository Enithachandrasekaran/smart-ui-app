import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[white] text-[black] pt-12 pb-6 text-[15px]">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Opening Hours */}
        <div>
          <h3 className="font-bold text-red-600 text-1xl tracking-wider mb-4">Opening Hours</h3>
          <div className="space-y-1">
  <div className="flex justify-between text-base text-black">
    <span>Monday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Tuesday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Wenesday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Thursday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Friday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Saturday</span>
    <span>9:00AM – 5:00PM</span>
  </div>
  <div className="flex justify-between text-base text-black">
    <span>Sunday</span>
    <span className="text-red-500">Closed</span>
  </div>
</div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-red-600 text-2sm tracking-wider mb-4">Services</h3>
          <p className="text-base text-black mb-1">Cosmetic & Root Canal Treatment</p>
          <p className="text-base text-black mb-1">Laser treatment</p>
          <p className="text-base text-black mb-1">Preventive & Restorative Dentistry</p>
          <p className="text-base text-black mb-1">Pediatric Dentistry</p>
          <p className="text-base text-black mb-1">Prosthetic Dentistry</p>
          <p className="text-base text-black mb-1">Implant & Orthodontic Smile Design</p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-bold text-red-600 text-2sm tracking-wider mb-4">Menu</h3>
          <p className="text-base text-black mb-1" >Home</p>
          <p className="text-base text-black mb-1">About Us</p>
          <p className="text-base text-black mb-1">Services</p>
          <p className="text-base text-black mb-1">Contact us</p>

          <p className="text-base text-black mb-1">Connect with us on social media</p>

          <div className="flex gap-3 mt-3">
            <div className="w-9 h-9 bg-[#3b5998] flex items-center justify-center text-white rounded">
              <FaFacebookF size={14} />
            </div>
            <div className="w-9 h-9 bg-black flex items-center justify-center text-white rounded">
              <FaXTwitter size={14} />
            </div>
            <div className="w-9 h-9 bg-[#e1306c] flex items-center justify-center text-white rounded">
              <FaInstagram size={14} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-6">

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="bg-[red] text-white p-2 rounded-full">
              <MdEmail size={18} />
            </div>
            <div>
              <p className="font-bold tracking-wide text-red-600">EMAIL US</p>
              <p className="text-base text-black mb-1">wpdc_hemadavid@yahoo.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="bg-[red] text-white p-2 rounded-full">
              <MdPhone size={18} />
            </div>
            <div>
              <p className="font-semibold tracking-wide">PHONE NUMBER</p>
              <p className="text-base text-black mb-1" >+91 94892 50702</p>
              <p className="text-base text-black mb-1">+91 97902 99787</p>
            </div>
          </div>

          {/* Office */}
          <div className="flex items-start gap-3">
            <div className="bg-[red] text-white p-2 rounded-full">
              <MdLocationOn size={18} />
            </div>
            <div>
              <p className="font-semibold tracking-wide">OFFICE</p>
              <p className="text-base text-black mb-1">No.71/142, P.T.Rajan Road</p>
              <p className="text-base text-black mb-1"> Narimedu, Madurai-2</p>
              <p className="text-base text-black mb-1">Landmark (opp.Kendriya Vidyalaya School)</p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0f4c5c]/40 mt-10 pt-4 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-base text-black mb-1">Terms and Conditions</p>
          <p className="text-base text-black mb-1">Copyright © 2025 White Pearl Dentistry | All Rights Reserved</p>
          <p className="text-base text-black mb-1">Privacy Policy</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;