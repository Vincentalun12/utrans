import DashboardLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import Chart from "react-apexcharts";
import { React, useEffect, useState } from "react";
import { Language } from "@/Languages/Home/Dashboard";
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
    CubeIcon,
} from "@heroicons/react/24/solid";

import {
    UserIcon,
    BuildingOfficeIcon,
    DocumentIcon,
    DocumentTextIcon,
    FolderArrowDownIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";

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

const TABLE_HEAD = [Language.tableheader.no, Language.tableheader.name, Language.tableheader.stock, Language.tableheader.price, ""];

export default function Dashboard({ auth, customers, vendors, products, brands, purchase_orders, sale_orders, users, chart_of_accounts}) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');
    
    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    console.log(sale_orders)

    const sortedProducts = products.sort((a, b) => b.id - a.id);
    const newestProducts = sortedProducts.slice(0, 5);

    const today = new Date();
    const yesterday = new Date(today);
    today.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    const todaySales = sale_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === today.getTime());
    const yesterdaySales = sale_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === yesterday.getTime());

    const todayTotalSales = todaySales.reduce((total, order) => total + parseFloat(order.total_price), 0);
    const yesterdayTotalSales = yesterdaySales.reduce((total, order) => total + parseFloat(order.total_price), 0);

    let salesPercentage = 0;
        if (yesterdayTotalSales > 0) {
            salesPercentage = ((todayTotalSales - yesterdayTotalSales) / yesterdayTotalSales) * 100;
        } else if (todayTotalSales > 0) {
            salesPercentage = 100;
        }

    const productsToday = products.filter(product => new Date(product.created_at).setHours(0,0,0,0) === today.getTime());

    const todayPurchases = purchase_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === today.setHours(0,0,0,0));
    const yesterdayPurchases = purchase_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === yesterday.setHours(0,0,0,0));

    const todayTotalPurchases = todayPurchases.reduce((total, order) => total + parseFloat(order.total_price), 0);
    const yesterdayTotalPurchases = yesterdayPurchases.reduce((total, order) => total + parseFloat(order.total_price), 0);

    let purchasePercentage = 0;
    if (yesterdayTotalPurchases > 0) {
        purchasePercentage = ((todayTotalPurchases - yesterdayTotalPurchases) / yesterdayTotalPurchases) * 100;
            } else if (todayTotalPurchases > 0) {
                purchasePercentage = 100;
        }

    const todayOrders = sale_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === today.setHours(0,0,0,0));
    const yesterdayOrders = sale_orders.filter(order => new Date(order.create_date).setHours(0,0,0,0) === yesterday.setHours(0,0,0,0));

    const todayTotal = todayOrders.reduce((total, order) => total + parseFloat(order.total_price), 0);
    const yesterdayTotal = yesterdayOrders.reduce((total, order) => total + parseFloat(order.total_price), 0);

    const profitPercentage = ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;

    const totalSalesDue = Array.isArray(sale_orders) 
    ? sale_orders.reduce((total, order) => total + parseFloat(order.total_due), 0): 0;

    const formattedTotalSalesDue = totalSalesDue.toLocaleString('id-ID');

    const totalPurchasesDue = Array.isArray(purchase_orders) 
    ? purchase_orders.reduce((total, order) => total + parseFloat(order.total_due), 0): 0;

    const formattedTotalPurchasesDue = totalPurchasesDue.toLocaleString('id-ID');

    const inventoryAccount = Array.isArray(chart_of_accounts) 
    ? chart_of_accounts.find(account => account.account_name === 'Inventory Account')
    : null;

    const inventoryBalance = inventoryAccount ? parseFloat(inventoryAccount.balance): 0;
    const formattedInventoryBalance = inventoryBalance.toLocaleString('id-ID');

    const sales = Array.isArray(chart_of_accounts) 
    ? chart_of_accounts.find(account => account.account_name === 'Sales')
    : null;

    const salesBalance = sales ? parseFloat(sales.balance) : 0;
    const formattedSalesBalance = salesBalance.toLocaleString('id-ID');

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
                                        color="red"
                                    >
                                        Rp{formattedTotalPurchasesDue}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        {Language.purchasesdue}
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
                                        color="red"
                                    >
                                        Rp{formattedTotalSalesDue}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        {Language.salesdue}
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
                                    <div className="w-max rounded-lg bg-red-900 p-4 text-white">
                                        <DocumentIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                    </div>
                                    <div>
                                        <Typography
                                            className="text-md font-bold"
                                            color="blue-gray"
                                        >
                                            Rp{formattedSalesBalance}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            {Language.salesvalue}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {salesPercentage < 0 ? (
                                        <>
                                            <ArrowDownIcon className="h-5 w-5 text-red-500" />
                                            <Typography variant="body2" color="red">
                                                {Math.abs(salesPercentage)}%
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowUpIcon className="h-5 w-5 text-green-500" />
                                            <Typography variant="body2" color="green">
                                                {salesPercentage}%
                                            </Typography>
                                        </>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                                <div className="w-max rounded-lg bg-blue-600 p-4 text-white cursor-pointer">
                                    <CubeIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="text-md font-bold"
                                        color="blue-gray"
                                    >
                                        Rp{formattedInventoryBalance}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        {Language.inventoryvalue}
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
                                        {Array.isArray(customers) ? customers.length : 0}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        {Language.customers}
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
                                        {Array.isArray(vendors) ? vendors.length : 0}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="max-w-sm font-normal"
                                    >
                                        {Language.vendors}
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
                                    <div className="w-max rounded-lg bg-blue-900 p-4 text-white">
                                        <FolderArrowDownIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                    </div>
                                    <div>
                                        <Typography
                                            className="text-md font-bold"
                                            color="blue-gray"
                                        >
                                            {Array.isArray(purchase_orders) ? purchase_orders.length : 0}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            {Language.purchaseinvoices}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {purchasePercentage < 0 ? (
                                        <>
                                            <ArrowDownIcon className="h-5 w-5 text-red-500" />
                                            <Typography variant="body2" color="red">
                                                {Math.abs(purchasePercentage)}%
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowUpIcon className="h-5 w-5 text-green-500" />
                                            <Typography variant="body2" color="green">
                                                {purchasePercentage}%
                                            </Typography>
                                        </>
                                    )}
                                </div>
                            </CardHeader>
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
                                            {Array.isArray(sale_orders) ? sale_orders.length : 0}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            {Language.salesinvoices}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {profitPercentage < 0 ? (
                                        <>
                                            <ArrowDownIcon className="h-5 w-5 text-red-500" />
                                            <Typography variant="body2" color="red">
                                                {Math.abs(profitPercentage)}%
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowUpIcon className="h-5 w-5 text-green-500" />
                                            <Typography variant="body2" color="green">
                                                {profitPercentage}%
                                            </Typography>
                                        </>
                                    )}
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
                                    <ChartBarIcon className="h-6 w-6 hover:scale-150 duration-300" />
                                </div>
                                <div>
                                    <Typography
                                        className="xl font-bold sm:text-sm"
                                        color="blue-gray"
                                    >
                                        {Language.graph.title}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className=" font-normal"
                                    >
                                        {Language.graph.description}
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
                                            {Language.products.title}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="max-w-sm font-normal"
                                        >
                                            {Language.products.description}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                <a href="/products">
                                    <Button
                                        className="flex-grow"
                                        variant="outlined"
                                    >
                                        {Language.products.view}
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
                                            {newestProducts.map((product, index) => {
                                               const isLast = index === newestProducts.length - 1;
                                               const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={product.id}>
                                                        <td className={classes}>{index + 1}</td>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {product.name}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                    >
                                                                        {product.code}
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
                                                                {product.stock}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                Rp{product.sales_price}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <a href={route("products.edit", product.id)}>
                                                            <Tooltip content="Edit Item">
                                                                <IconButton variant="text">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            </a>
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
                                    {Language.products.totalproduct} <b>{products.length}</b>
                                </Typography>
                                <div className="flex gap-2">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                   {Language.products.newproduct} <b>{productsToday.length}</b>
                                </Typography>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
