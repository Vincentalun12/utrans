import DashboardLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import Chart from "react-apexcharts";
import { React, useEffect, useState } from "react";
import Linkactive from "@/Components/Linkactive";
import {noimage} from "@/Assets";
import {
Square3Stack3DIcon,
ShoppingBagIcon,
BanknotesIcon,
ArrowDownOnSquareStackIcon,
ArrowUpOnSquareStackIcon,
ArrowDownIcon,
ArrowUpIcon,
PencilIcon,
PencilSquareIcon,
} from "@heroicons/react/24/solid";
import {
UserIcon,
BuildingOfficeIcon,
DocumentIcon,
DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import {
Card,
CardHeader,
CardBody,
CardFooter,
Typography,
Avatar,
Tooltip,
Button,
Checkbox,
} from "@material-tailwind/react";
export default function Dashboard({ auth }) {
const itemsPerPage = 10;
const [currentPage, setCurrentPage] = useState(1);
const items = [
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 1,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
{
id: 2,
name: 'SANFORD 300 ML',
price: 'Rp100.000',
quantity: 30,
image: noimage
},
];
const pages = Math.ceil(items.length / itemsPerPage);
const handlePageChange = (direction) => {
if (direction === "next" && currentPage < pages) {
setCurrentPage((prevPage) => prevPage + 1);
} else if (direction === "prev" && currentPage > 1) {
setCurrentPage((prevPage) => prevPage - 1);
}
};
const currentItems = items.slice(
(currentPage - 1) * itemsPerPage,
currentPage * itemsPerPage
);
return (
<div className="h-screen">
  <div className="px-3 gap-2 py-2 shadow-sm bg-white sticky top-0 2xl:pl-48">
    <div className="flex justify-between">
      <input className="mr-2 rounded-md w-4/6" type="text" placeholder="Search" />
    </div>
  </div>
  <div className="flex h-screen bg-gray-200 h-full">
    <div className="w-24 bg-white p-3 lg:flex hidden">
      <div className="mb-4">
        <i className="fas fa-home">a</i>
      </div>
      <div className="mb-4">
        <i className="fas fa-shopping-cart"></i>
      </div>
      <div className="mb-4">
        <i className="fas fa-cash-register"></i>
      </div>
    </div>
    <div className="w-full overflow-auto">
      <div className="grid px-4 py-4 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {currentItems.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
          <img src={item.image} alt="" className="block ml-auto mr-auto"/>
          </a>
          <div class="px-5 pb-5">
            <a href="#">
              <h3 class="text-gray-900 font-light text-[18px] tracking-tighter dark:text-white">{item.name}</h3>
            </a>
            <div class="flex items-center justify-between">
              <span class="text-[18px] font-semibold text-gray-900 dark:text-white">{item.price}</span>
              <span class="text-sm font-bold text-gray-900 dark:text-white">Qty: {item.quantity}</span>
            </div>
          </div>
        </div>
        ))}
        <div>
          <Button className="" onClick={() => handlePageChange("prev")}>Previous</Button>
          <span>{currentPage}</span>
          <Button className="" onClick={() => handlePageChange("next")}>Next</Button>
        </div>
      </div>
    </div>
    <div className="w-[700px] bg-white p-3">
      <div class="flex flex-row items-center justify-stretch px-5 mt-5">
        <div class="font-bold text-xl">Current Order</div>
      </div>
      <div class="px-2 py-4 mt-5 overflow-y-auto h-72 pl-4">
        <div class="flex flex-row justify-stretch items-center mb-4">
          <div class="flex flex-row items-center w-2/5">
            <img img src={noimage} class="w-10 h-10 object-cover rounded-md" alt=""/>
            <span class="ml-4 font-semibold text-sm">Sanford 300ml</span>
          </div>
          <div class="w-32 flex justify-stretch">
            <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
            <span class="font-semibold mx-4">2</span>
            <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
          </div>
          <div class="font-semibold text-md w-16">
            Rp100.000
          </div>
        </div>
      </div>
      <div class="px-5 mt-5">
        <div class="py-4 rounded-md shadow-lg">
          <div class=" px-4 flex justify-between ">
            <span class="font-semibold text-sm">Subtotal</span>
            <span class="font-bold">Rp100.000</span>
          </div>
          <div class=" px-4 flex justify-between ">
            <span class="font-semibold text-sm">Diskon</span>
            <span class="font-bold">Rp0</span>
          </div>
          <div class=" px-4 flex justify-between ">
            <span class="font-semibold text-sm">PPN</span>
            <span class="font-bold">11%</span>
          </div>
          <div class="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
            <span class="font-semibold text-2xl">Total</span>
            <span class="font-bold text-2xl">Rp100.000</span>
          </div>
        </div>
      </div>
      <div class="px-5 mt-5">
        <button class="px-4 py-4 rounded-md shadow-lg text-center bg-ungukita text-white font-semibold w-full">
        Checkout
        </button>
      </div>
    </div>
  </div>
</div>
);
}