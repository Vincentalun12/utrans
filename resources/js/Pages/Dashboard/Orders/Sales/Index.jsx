import PurchasingLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Global, css } from "@emotion/react";
import Select from "react-select";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";

import {
    CalendarDaysIcon,
    ChevronUpDownIcon,
    PencilIcon,
    DocumentTextIcon,
    PlusIcon,
    InformationCircleIcon,
    EyeIcon,
    PlusCircleIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";

import {
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import {
    TrashIcon as TrashIconSolid,
    PencilIcon as PencilIconSolid,
    PrinterIcon as PrinterIconSolid,
} from "@heroicons/react/24/solid";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Popover,
    PopoverContent,
    PopoverHandler,
    Textarea,
    IconButton,
    Tooltip,
    Breadcrumbs,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = [
    { display: "Reference", field: "reference" },
    { display: "Creation date", field: "creation" },
    { display: "Customer", field: "customer" },
    { display: "Total item", field: "totalitem" },
    { display: "Total", field: "total" },
    { display: "Paid", field: "paid" },
    { display: "Status", field: "status" },
    { display: "Payment", field: "payment" },
    { display: "Due", field: "Due" },
    { display: "", field: null },
];

const TABLE_HEAD_SHOW_PAYMENT = ["Date", "Reference", "Amount", "Paid By", ""];

const TABLE_ROWS_SHOW_PAYMENT = [
    {
        date: "11-11-2023",
        reference: "INV/2023/11/001",
        amount: "Rp. 1,000,000.00",
        paid_by: "Cash",
    },
    {
        date: "16-12-2023",
        reference: "INV/2023/12/001",
        amount: "Rp. 1,000,000.00",
        paid_by: "Cash",
    },
];

const paymentoptions = [
    { value: "Cash", label: "Cash" },
    { value: "Online", label: "Online" },
    { value: "Inprogress", label: "In Progress" },
];

export default function Purchasing({ auth, saleOrders }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [paginated, setpaginated] = useState([]);
    const [sorting, setsorting] = useState(null);
    const [sortdirection, setsortdirection] = useState(null);
    const [searchbar, setsearchbar] = useState("");

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let sortedItems = [...saleOrders];

        if (searchbar) {
            const terms = searchbar.toLowerCase().split(" ");
            sortedItems = sortedItems.filter((item) =>
                terms.every((term) =>
                    Object.values(item).some((val) =>
                        String(val).toLowerCase().includes(term)
                    )
                )
            );
        }

        if (sorting && sortdirection) {
            sortedItems.sort((a, b) => {
                let aValue = a[sorting];
                let bValue = b[sorting];

                if (sorting === "totalitem" || sorting === "total") {
                    aValue = Number(aValue.replace(/\D/g, ""));
                    bValue = Number(bValue.replace(/\D/g, ""));
                }

                if (aValue < bValue) {
                    return sortdirection === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortdirection === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        setpaginated(sortedItems.slice(start, end));
    }, [currentPage, sorting, sortdirection, searchbar, saleOrders]);

    const handleSort = (field) => {
        if (field === sorting) {
            setsortdirection(sortdirection === "asc" ? "desc" : "asc");
        } else {
            setsorting(field);
            setsortdirection("asc");
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (
            paginated.length === itemsPerPage &&
            currentPage < Math.ceil(saleOrders?.length / itemsPerPage)
        ) {
            setCurrentPage(currentPage + 1);
        }
    };

    const { flash } = usePage().props;
    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const [openPayment, setOpenPayment] = React.useState(false);
    const handleOpenPayment = () => setOpenPayment(!openPayment);

    const [date, setDate] = React.useState(new Date());

    const [deletesales, setDeletesales] = useState(null);
    const [deleteOpen, setdeleteOpen] = useState(false);

    const handleDeleteSales = (id) => {
        if (id) {
            setDeletesales(id);
            setdeleteOpen(true);
        } else {
            setdeleteOpen(false);
        }
    };

    return (
        <PurchasingLayout user={auth.user}>
            <Head title="Sales" />
            <Dialog open={deleteOpen} size="sm" onClose={handleDeleteSales}>
                <DialogHeader>
                    <Typography variant="h5">Notifikasi</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <InformationCircleIcon className="w-20 h-20 text-red-400" />
                    <Typography className="text-red-900" variant="h4">
                        Anda akan menghapus pelanggan ini!
                    </Typography>
                    <Typography className="text-center font-normal">
                        Aksi ini tidak dapat dibatalkan. Namun, kami akan tetap
                        simpan untuk keperluan audit.
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={async () => {
                            if (deletesales) {
                                await destroy(
                                    route("sales.destroy", deletesales),
                                    {
                                        onSuccess: () => {
                                            setIsShowAlert(true);
                                            setDeletesales(null);
                                        },
                                    }
                                );
                            }
                            handleDeleteSales(null);
                        }}
                    >
                        Konfirmasi
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleDeleteSales(null)}
                    >
                        Batal
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog
                open={openPayment}
                size="sm"
                onClose={handleOpenPayment}
                className="overflow-auto max-h-[80vh]"
            >
                <DialogHeader>
                    <Typography variant="h5">Create Payment</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <div className="w-full gap-2 md:justify-between px-4 pb-4 bg-white grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2">
                        <div className="col-span-2 lg:col-span-1">
                            <label className="">Payment Type</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Select your payment type
                            </div>
                            <Select
                                options={paymentoptions}
                                placeholder={"Select..."}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        boxShadow: state.isFocused ? 0 : 0,
                                        borderColor: state.isFocused
                                            ? "#1A202C"
                                            : base.borderColor,
                                        borderWidth: state.isFocused
                                            ? "2px"
                                            : "1px",
                                        "&:hover": {
                                            borderColor: state.isFocused
                                                ? "#1A202C"
                                                : base.borderColor,
                                        },
                                        borderRadius: "6px",
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        "input:focus": {
                                            boxShadow: "none",
                                        },
                                    }),
                                }}
                            />
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <label className="">Payment Date</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Pick your payment date
                            </div>
                            <Popover placement="bottom" trigger="click">
                                <PopoverHandler>
                                    <Input
                                        type="text"
                                        placeholder="2023-05-12"
                                        icon={<CalendarDaysIcon />}
                                        value={format(date, "dd-MM-yyyy")}
                                        onChange={(e) => {
                                            const newDate = parse(
                                                e.target.value,
                                                "dd-MM-yyyy",
                                                new Date()
                                            );
                                            if (!isNaN(newDate)) {
                                                setDate(newDate);
                                            }
                                        }}
                                        className="  placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </PopoverHandler>
                                <PopoverContent className="z-[9999]">
                                    <DayPicker
                                        mode="single"
                                        selected={date}
                                        onSelect={(selectedDate) => {
                                            if (selectedDate) {
                                                setDate(selectedDate);
                                            }
                                        }}
                                        showOutsideDays
                                        className="border-0 !z-[9999]"
                                        classNames={{
                                            caption:
                                                "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label:
                                                "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous:
                                                "absolute left-1.5",
                                            nav_button_next:
                                                "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row:
                                                "flex font-medium text-gray-900",
                                            head_cell:
                                                "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today:
                                                "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled:
                                                "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon
                                                    {...props}
                                                    className="h-4 w-4 stroke-2"
                                                />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon
                                                    {...props}
                                                    className="h-4 w-4 stroke-2"
                                                />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="2xl:col-span-2 col-span-2">
                            <label className="">Paying Amount</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Input your payment amount
                            </div>
                            <div className="flex">
                                <Button
                                    ripple={false}
                                    variant="text"
                                    color="blue-gray"
                                    className="normal-case text-bold h-10 flex items-center rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-3"
                                >
                                    Rp
                                </Button>
                                <div className="relative flex-grow">
                                    <Input
                                        type="number"
                                        className="placeholder:text-gray-600 rounded-tl-none rounded-bl-none placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="2xl:col-span-2 col-span-2">
                            <label className="">Received Amount</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Input your received amount
                            </div>
                            <div className="flex">
                                <Button
                                    ripple={false}
                                    variant="text"
                                    color="blue-gray"
                                    className="normal-case text-bold h-10 flex items-center rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-3"
                                >
                                    Rp
                                </Button>
                                <div className="relative flex-grow">
                                    <Input
                                        type="number"
                                        className="placeholder:text-gray-600 rounded-tl-none rounded-bl-none placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="2xl:col-span-2 col-span-2">
                            <label className="">Reference</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Create your own reference. Ex: INV/2023/11/001
                            </div>
                            <Input
                                type="input"
                                placeholder="Reference"
                                className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                            />
                        </div>
                        <div className="col-span-2 lg:col-span-2">
                            <label className="">Additional Notes</label>
                            <div className="w-full text-xs mb-2 text-gray-500">
                                * Set your some notes
                            </div>
                            <div className="flex">
                                <Textarea
                                    type="input"
                                    size="md"
                                    placeholder="Notes"
                                    className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="gradient" color="green">
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={handleOpenPayment}>
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={open} size="md" onClose={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5">Show Payments</Typography>
                </DialogHeader>
                <DialogBody
                    divider
                    className="grid place-items-center px-2 pb-0 gap-4 overflow-x-scroll lg:overflow-x-hidden overflow-y-auto"
                >
                    <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD_SHOW_PAYMENT.map((head) => (
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
                            {TABLE_ROWS_SHOW_PAYMENT.map(
                                (
                                    { date, reference, amount, paid_by },
                                    index
                                ) => {
                                    const isLast =
                                        index ===
                                        TABLE_ROWS_SHOW_PAYMENT.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={date}>
                                            <td className={classes}>{date}</td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {reference}
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
                                                    {amount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {paid_by}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex">
                                                    <Tooltip content="Print">
                                                        <IconButton variant="text">
                                                            <PrinterIconSolid className="h-4 w-4 text-blue-400" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Edit">
                                                        <IconButton variant="text">
                                                            <PencilIconSolid className="h-4 w-4 text-green-500" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete">
                                                        <IconButton variant="text">
                                                            <TrashIconSolid className="h-4 w-4 text-red-500" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" onClick={handleOpen}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography
                                    variant="h4"
                                    className="text-ungukita"
                                    textGradient
                                >
                                    Sales
                                </Typography>
                                <Typography variant="paragraph">
                                    Manage your order sales here
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <div className="flex gap-3">
                                <Linkactive href={route("sales.create")}>
                                    <Button className="bg-ungukita md:flex hidden">
                                        Create
                                    </Button>
                                </Linkactive>
                                <div className="md:flex hidden">
                                    <Menu placement="right-start">
                                        <MenuHandler>
                                            <IconButton className="bg-ungukita">
                                                <DocumentTextIcon className="w-5 h-5" />
                                            </IconButton>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem className="flex items-center gap-2">
                                                <DocumentArrowDownIcon
                                                    className="w-5 h-5"
                                                    stroke="red"
                                                />
                                                Export as PDF
                                            </MenuItem>
                                            <MenuItem className="flex items-center gap-2">
                                                <DocumentChartBarIcon
                                                    className="w-5 h-5"
                                                    stroke="green"
                                                />
                                                Export as CSV
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <IconButton className="bg-ungukita flex md:hidden">
                                    <PlusIcon className="w-5 h-5" />
                                </IconButton>
                            </div>

                            <div className="inline-flex items-center">
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    value={searchbar}
                                    onChange={(e) =>
                                        setsearchbar(e.target.value)
                                    }
                                    className=" focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden px-0 rounded-none">
                        <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                            <thead>
                                <tr className="sticky top-0 z-50">
                                    {TABLE_HEAD.map(
                                        ({ display, field }, index) => (
                                            <th
                                                key={display}
                                                className="cursor-pointer border-b border-gray-300 bg-gray-100 p-4 transition-colors hover:bg-gray-400"
                                                onClick={() =>
                                                    field && handleSort(field)
                                                }
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {display}{" "}
                                                    {index !==
                                                        TABLE_HEAD.length -
                                                            1 && (
                                                        <ChevronUpDownIcon
                                                            strokeWidth={2}
                                                            className="h-4 w-4"
                                                        />
                                                    )}
                                                </Typography>
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(
                                    (
                                        {
                                            id,
                                            code,
                                            customer,
                                            create_date,
                                            total_item,
                                            total_paid,
                                            total_due,
                                            status,
                                            payment_status,
                                        },
                                        index
                                    ) => {
                                        const isLast =
                                            index === saleOrders?.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-blue-gray-50";
                                        const statusColors = {
                                            draft: "grey",
                                            posted: "green",
                                            pending: "light-blue",
                                            canceled: "red",
                                        };

                                        return (
                                            <tr
                                                key={id}
                                                className="even:bg-gray-100"
                                            >
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {code}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {create_date}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {customer.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {total_item}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        Rp{total_paid}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color={
                                                                total_due ===
                                                                "Rp. 0,000.00"
                                                                    ? "blue-gray"
                                                                    : "red"
                                                            }
                                                            className="font-normal"
                                                        >
                                                            Rp{total_due}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="w-max">
                                                        <div>
                                                            <Chip
                                                                className="static"
                                                                variant="ghost"
                                                                size="sm"
                                                                value={status}
                                                                color={
                                                                    statusColors[
                                                                        status
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex items-center">
                                                        <Chip
                                                            className="static"
                                                            variant="ghost"
                                                            size="sm"
                                                            value={
                                                                payment_status
                                                            }
                                                            color={
                                                                payment_status ===
                                                                "paid"
                                                                    ? "green"
                                                                    : "red"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color={
                                                            total_due ===
                                                            "Rp. 0,000.00"
                                                                ? "green"
                                                                : "red"
                                                        }
                                                        className="font-normal"
                                                    >
                                                        Rp{total_due}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Tooltip content="More Detail">
                                                        <Menu placement="left-start">
                                                            <MenuHandler>
                                                                <Button
                                                                    size="sm"
                                                                    variant="text"
                                                                >
                                                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                                                </Button>
                                                            </MenuHandler>
                                                            <MenuList>
                                                                <MenuItem
                                                                    className="flex items-center gap-2"
                                                                    onClick={() =>
                                                                        (window.location.href =
                                                                            route(
                                                                                "sales.detail",
                                                                                id
                                                                            ))
                                                                    }
                                                                >
                                                                    <EyeIcon className="w-5 h-5" />
                                                                    Sales Detail
                                                                </MenuItem>
                                                                <MenuItem
                                                                    className="flex items-center gap-2"
                                                                    onClick={() =>
                                                                        (window.location.href =
                                                                            route(
                                                                                "sales.edit",
                                                                                id
                                                                            ))
                                                                    }
                                                                >
                                                                    <PencilIcon className="w-5 h-5" />
                                                                    Edit Sales
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={
                                                                        handleOpenPayment
                                                                    }
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <PlusCircleIcon className="w-5 h-5" />
                                                                    Create
                                                                    Payment
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={
                                                                        handleOpen
                                                                    }
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <CreditCardIcon className="w-5 h-5" />
                                                                    Show Payment
                                                                </MenuItem>
                                                                <MenuItem className="flex items-center gap-2">
                                                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                                                    Download PDF
                                                                </MenuItem>
                                                                <MenuItem
                                                                    className="flex items-center gap-2 !text-white hover:!text-white !bg-red-500 hover:!bg-red-900"
                                                                    onClick={() =>
                                                                        handleDeleteSales(
                                                                            id
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashIcon className="w-5 h-5 text-white" />
                                                                    Delete
                                                                    Purchase
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Tooltip>
                                                    <Global
                                                        styles={css`
                                                            .bg-opacity-60 {
                                                                --tw-bg-opacity: 0.01;
                                                            }
                                                            .backdrop-blur-sm {
                                                                --tw-backdrop-blur: blur(
                                                                    1px
                                                                );
                                                                -webkit-backdrop-filter: var(
                                                                        --tw-backdrop-blur
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-brightness
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-contrast
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-grayscale
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-hue-rotate
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-invert
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-opacity
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-saturate
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-sepia
                                                                    );
                                                                backdrop-filter: var(
                                                                        --tw-backdrop-blur
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-brightness
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-contrast
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-grayscale
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-hue-rotate
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-invert
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-opacity
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-saturate
                                                                    )
                                                                    var(
                                                                        --tw-backdrop-sepia
                                                                    );
                                                            }
                                                            .shadow-2xl {
                                                                --tw-shadow: 0
                                                                    10px 25px -12px
                                                                    rgb(
                                                                        0 0 0 /
                                                                            0.25
                                                                    );
                                                                --tw-shadow-colored: 0
                                                                    25px 50px -12px
                                                                    var(
                                                                        --tw-shadow-color
                                                                    );
                                                                box-shadow: var(
                                                                        --tw-ring-offset-shadow,
                                                                        0 0
                                                                            #0000
                                                                    ),
                                                                    var(
                                                                        --tw-ring-shadow,
                                                                        0 0
                                                                            #0000
                                                                    ),
                                                                    var(
                                                                        --tw-shadow
                                                                    );
                                                            }
                                                        `}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className="flex border-t rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg bg-white border-gray-200 p-4">
                        <div className="flex justify-between">
                            <div className="pt-2">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    Page {currentPage} of{" "}
                                    {Math.ceil(
                                        saleOrders?.length / itemsPerPage
                                    )}
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={paginated.length < itemsPerPage}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </PurchasingLayout>
    );
}
