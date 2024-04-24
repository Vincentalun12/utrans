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
} from "@material-tailwind/react";
export default function Dashboard({ auth }) {
return (
<div className="flex h-screen bg-gray-200">
	<div className="w-20 bg-white p-3">
		<div className="mb-4">
			<i className="fas fa-home"></i>
		</div>
		<div className="mb-4">
			<i className="fas fa-shopping-cart"></i>
		</div>
		<div className="mb-4">
			<i className="fas fa-cash-register"></i>
		</div>
	</div>
	<div className="flex-1 p-10 m-2 text-2xl font-bold overflow-auto">
		<div className="mb-4">
			<input className="px-3 py-2 border border-gray-400" type="text" placeholder="Search" />
		</div>
		<div className="grid xl:grid-cols-3 2xl:grid-cols-6 gap-4">
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tighter dark:text-white">SANFORD 300 ML</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
			<div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
				<img src={noimage} alt="Utrans logo" className="block ml-auto mr-auto"/>
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h3 class="text-gray-900 font-light text-[18px] tracking-tight dark:text-white">Keran 2G22</h3>
					</a>
					<div class="flex items-center justify-between">
						<span class="text-[18px] font-semibold text-gray-900 dark:text-white">Rp100.000</span>
						<span class="text-sm font-bold text-gray-900 dark:text-white">Qty: 30</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="w-80 bg-white p-3">
		<h2 className="text-lg font-bold mb-4">Selected Items</h2>
		<div className="border border-gray-400 p-4 mb-4">Item 1</div>
		<div className="border border-gray-400 p-4 mb-4">Item 2</div>
		<div className="border border-gray-400 p-4 mb-4">Item 3</div>
		<h2 className="text-lg font-bold mb-4">Total: $0.00</h2>
		<button className="w-full bg-blue-500 text-white p-2 rounded">Checkout</button>
	</div>
</div>
);
}