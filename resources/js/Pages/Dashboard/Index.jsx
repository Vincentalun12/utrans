import DashboardLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import Chart from "react-apexcharts";
import { React, useEffect, useState } from "react";
import Linkactive from "@/Components/Linkactive";

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
} from "@heroicons/react/24/outline";

import { twMerge } from "tailwind-merge";

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Button,
    IconButton,
} from "@material-tailwind/react";

const chartConfig = {
    type: "bar",
    height: "450",
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#020617"],
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
};

const TABLE_HEAD = ["No", "Nama Produk", "Stok", "Harga Retail", ""];

const TABLE_ROWS = [
    {
        no: "1", //Testing aj ntar hapus
        name: "Filter Kolon 10 Mikron 10 inch",
        email: "SKU-TEST-001",
        stok: "100",
        retail: "Rp10.000",
    },
    {
        no: "2", //Testing aj ntar hapus
        name: "Filter Kolon 10 Mikron 10 inch",
        email: "SKU-TEST-001",
        stok: "100",
        retail: "Rp10.000",
    },
    {
        no: "3", //Testing aj ntar hapus
        name: "Filter Kolon 10 Mikron 10 inch",
        email: "SKU-TEST-001",
        stok: "100",
        retail: "Rp10.000",
    },
    {
        no: "4", //Testing aj ntar hapus
        name: "Filter Kolon 10 Mikron 10 inch",
        email: "SKU-TEST-001",
        stok: "100",
        retail: "Rp10.000",
    },
    {
        no: "5", //Testing aj ntar hapus
        name: "Filter Kolon 10 Mikron 10 inch",
        email: "SKU-TEST-001",
        stok: "100",
        retail: "Rp100.000",
    },
];

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    {/*  
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                    */}
                    <div className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-2 gap-4 mt-4">
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-orange-900 p-4 text-white cursor-pointer">
                                    <ShoppingBagIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        Rp122.000.000
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Purchases Due
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-green-500 p-4 text-white cursor-pointer">
                                    <BanknotesIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        Rp122.000.000
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Sales Due
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-blue-600 p-4 text-white cursor-pointer">
                                    <ArrowDownOnSquareStackIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        Rp45.000.000
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Sales Amount
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-red-900 p-4 text-white cursor-pointer">
                                    <ArrowUpOnSquareStackIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        Rp2.000.000
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Sales Amount
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-orange-900 p-4 text-white cursor-pointer">
                                    <UserIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        242
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Customers
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-blue-700 p-4 text-white cursor-pointer">
                                    <BuildingOfficeIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        242
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Vendors
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-blue-900 p-4 text-white cursor-pointer">
                                    <DocumentIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        1.093
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        Purchase Invoices
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0"></CardBody>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center md:justify-between"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center cursor-pointer">
                                    <div className="w-max rounded-lg bg-green-500 p-4 text-white">
                                        <DocumentTextIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                    </div>
                                    <div>
                                        <Typography
                                            className="text-md font-bold"
                                            color="blue-gray"
                                        >
                                            1.136
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            Sales Invoices
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <ArrowUpIcon className="h-5 w-5 text-green-500" />
                                        <Typography
                                            variant="body2"
                                            color="green"
                                        >
                                            95.4%
                                        </Typography>
                                    </div>
                                    {/* 
                                        <div className="flex items-center">
                                            <ArrowDownIcon className="h-5 w-5 text-red-500" />
                                            <Typography variant="body2" color="red">
                                            20%
                                            </Typography>
                                        </div>
                                        */}
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 3xl:grid-cols-2 2xl:grid-cols-2 gap-4 mt-4">
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-green-900 p-4 text-white cursor-pointer">
                                    <DocumentTextIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="xl font-bold sm:text-sm"
                                        color="blue-gray"
                                    >
                                        Purchases & Sales
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className=" font-normal"
                                    >
                                        In this page, you'll able to see how many purchases & sales you've made.
                                    </Typography>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0">
                                <Chart {...chartConfig} />
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center md:justify-between"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <div className="w-max rounded-lg bg-orange-500 p-4 text-white cursor-pointer">
                                        <PencilSquareIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                    </div>
                                    <div>
                                        <Typography
                                            className="xl font-bold sm:text-sm"
                                            color="blue-gray"
                                        >
                                            Recently added Products
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            Newest products
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                <a href="/products">
                                    <Button
                                        className="flex-grow"
                                        variant="outlined"
                                    >
                                        View
                                    </Button>
                                </a>
                                </div>
                            </CardHeader>
                            <CardBody className="px-2 pb-0 overflow-x-auto">
                                <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TABLE_ROWS.map(
                                            (
                                                {   
                                                    no,
                                                    name,
                                                    email,
                                                    stok,
                                                    retail,
                                                },
                                                index
                                            ) => {
                                                const isLast =
                                                    index ===
                                                    TABLE_ROWS.length - 1;
                                                const classes = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={name}>
                                                        <td
                                                            className={classes}
                                                        >
                                                            {no}
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {name}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                    >
                                                                        {email}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {stok}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {retail}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Tooltip content="Edit Item">
                                                                <IconButton variant="text">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    Page 1 of 10
                                </Typography>
                                <div className="flex gap-2">
                                    <Button variant="outlined" size="sm">
                                        Previous
                                    </Button>
                                    <Button variant="outlined" size="sm">
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
