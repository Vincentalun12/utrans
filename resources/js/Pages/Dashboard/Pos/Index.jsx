import DashboardLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import Chart from "react-apexcharts";
import React from 'react';
import { useEffect, useState } from 'react';
import Linkactive from "@/Components/Linkactive";
import { noimage, utranslogoaja } from "@/Assets";
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
  HomeIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QrCodeIcon
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
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActions,
  Input,

} from "@material-tailwind/react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { set } from "date-fns";

export default function Dashboard({ auth, products }) {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowBarcodeScanner, setIsShowBarcodeScanner] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const [purchaseList, setPurchaseList] = useState([])

  useEffect(() => {
    if (barcode) {
      setPurchaseList([...purchaseList, { name: "SANFORD 300 ML", price: "Rp100.000", qty: 2 }])
    }
  }, [barcode])


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (

    <div className="h-screen">

      <div className="px-3 gap-2 py-2 shadow-sm bg-white sticky top-0 z-50">
        <div className="flex justify-start">
          <img src={utranslogoaja} alt="Logo" className="h-8 w-auto mr-2 pl-2.5 mt-1" />
          <div className="w-full pl-7">
            <input
              className="mr-2 rounded-md w-1/2 focus:outline-none focus:border-ungukita "
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <QrCodeIcon className="h-10 w-10 cursor-pointer text-ungukita" onClick={() => {
            setIsShowBarcodeScanner(!isShowBarcodeScanner);
          }} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-gray-200 h-full">
        <div className="w-24 bg-white p-3 lg:flex hidden">
          <div className="flex-grow flex flex-col items-center justify-start">
            <IconButton size="lg" className="bg-ungukita mb-4 rounded-full" onClick={() => window.location.href = '/home'}>
              <HomeIcon className="h-5 w-5 text-white" />
            </IconButton>
            <IconButton size="lg" className="bg-ungukita mb-4 rounded-full">
              <ArrowPathIcon className="h-5 w-5 text-white" />
            </IconButton>
          </div>
        </div>
        <div className="w-full overflow-auto lg:h-auto min-h-[800px]">
          <div className="flex justify-end px-4 py-2">
            <IconButton className="rounded-full bg-ungukita" onClick={() => handlePageChange("prev")}>
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
            <span className="px-4 my-2">{currentPage}</span>
            <IconButton className="rounded-full bg-ungukita" onClick={() => handlePageChange("next")}>
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="grid px-4 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => {
                  setPurchaseList([...purchaseList, { name: item.name, price: item.sales_price, qty: 1 }])
                }}
              >
                <a href="#">
                  <img
                    src={noimage}
                    alt=""
                    className="block ml-auto mr-auto"
                  />
                </a>
                <div class="px-5 pb-5">
                  <a href="#">
                    <h3 class="text-gray-900 font-light text-[18px] tracking-tighter dark:text-white">
                      {item.name}
                    </h3>
                  </a>
                  <div class="flex items-center justify-between">
                    <span class="text-[18px] font-semibold text-gray-900 dark:text-white">
                      {item.sales_price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Dialog open={open} handler={handleOpen}>
          <div class="flex items-center mt-4 ml-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
            Order Confirmation
          </div>
          <div class="flex items-center ml-4 mb-4 font-sans text-sm antialiased font-italic leading-snug shrink-0 text-blue-gray-900">
            Please confirm your order before checkout
          </div>
          <div class="flex items-center ml-4 font-sans text-sm antialiased font-italic leading-snug shrink-0 text-blue-gray-900">
            Invoice Number: TWPOS-KS-1714050380
          </div>
          <div class="flex items-center ml-4 font-sans text-sm antialiased font-italic leading-snug shrink-0 text-blue-gray-900">
            Date: April 30 2024, 20.06
          </div>
          <div class="flex items-center ml-4 mb-4 font-sans text-sm antialiased font-italic leading-snug shrink-0 text-blue-gray-900">
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              Make sure your order is correct. Any changes after checkout are not allowed.
            </Typography>
          </div>
          <DialogBody>
            <div class="relative font-sans text-base antialiased font-semilight leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
              <div className="grid lg:grid-cols-3 grid-cols-1 divide-x-2">
                <div className="col-span-2 items-center justify-center overflow-auto" style={{ maxHeight: '300px' }}>
                  <table class="w-full text-sm">
                    <thead class="sticky top-0 bg-white">
                      <tr>
                        <th className="py-1 w-1/12 text-center">#</th>
                        <th className="py-1 text-left">Nama Barang</th>
                        <th className="py-1 w-2/12 text-center">Jumlah</th>
                        <th className="py-1 w-3/12 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td class="py-2 text-center">{index + 1}</td>
                          <td class="py-2 text-left text-sm">
                            <span>{item.name}</span>
                            <br />
                            <small>{item.price}</small>
                          </td>
                          <td class="py-2 text-center text-sm">{item.qty}</td>
                          <td class="py-2 text-right text-sm">
                            Rp. {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ml-4">
                  <div class="py-4 rounded-md">
                    <div class="ml-3 px-4 flex justify-between ">
                      <span class="font-semibold text-md">Subtotal</span>
                      <span class="font-bold">Rp100.000</span>
                    </div>
                    <div class="ml-3 px-4 flex justify-between ">
                      <span class="font-semibold text-md">Diskon</span>
                      <div class="text-md">
                        Rp
                        <input type="text" class="text-right h-4 w-24 bg-white shadow rounded-lg focus:bg-white focus:shadow-lg px-2 focus:outline-none" wfd-id="id1" />
                      </div>
                    </div>
                    <div class="ml-3 px-4 flex justify-between ">
                      <span class="font-semibold text-md">PPN</span>
                      <span class="font-bold">11%</span>
                    </div>
                    <div class="border-t-2 ml-3 mt-3 py-2 px-4 flex items-center justify-between">
                      <span class="text-xl">Total</span>
                      <span class="font-bold text-xl">Rp100.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button className="mr-1" variant="gradient" color="blue" onClick={handleOpen}>
              <span>Print</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <div className="w-full lg:w-[700px] bg-white p-3">
          <div class="flex flex-row items-center justify-stretch px-5 mt-5">
            <div class="font-bold text-xl">Current Order</div>
          </div>
          {
            isShowBarcodeScanner && (
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  if (result) setBarcode(result.text);
                  else setBarcode(null);
                }}
              />
            )
          }

          <div class="px-2 py-4 mt-5 overflow-y-auto h-72 pl-4">
            {
              purchaseList.map((item, index) => (
                <div class="flex flex-row justify-stretch items-center mb-4" key={index}>
                  <div class="flex flex-row items-center w-2/5">
                    <img
                      img
                      src={noimage}
                      class="w-10 h-10 object-cover rounded-md"
                      alt=""
                    />
                    <span class="ml-4 font-semibold text-sm">{item.name}</span>
                  </div>
                  <div class="w-32 flex justify-stretch">
                    <span class="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                    <span class="font-semibold mx-4">{item.qty}</span>
                    <span class="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                  </div>
                  <div class="font-semibold text-md w-16">Rp {item.price}</div>
                </div>
              ))
            }

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
            <button onClick={handleOpen} class="px-4 py-4 rounded-md shadow-lg text-center bg-ungukita text-white font-semibold w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
