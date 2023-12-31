import PurchasingLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Global, css } from "@emotion/react";
import Select from "react-select";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";

import { Language } from "@/Languages/Order/Purchases/PurchaseIndex";

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
    Alert,
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
    { display: "Vendor", field: "vendor" },
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

export default function Purchasing({ auth, purchaseOrders, journals }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [paginated, setpaginated] = useState([]);
    const [sorting, setsorting] = useState(null);
    const [sortdirection, setsortdirection] = useState(null);
    const [searchbar, setsearchbar] = useState("");

    const { flash } = usePage().props;

    const [isShowAlert, setIsShowAlert] = useState(false);

    const [deleteProductId, setDeleteProductId] = useState(null);

    useEffect(() => {
        if (flash.message) {
            setIsShowAlert(true);
            setTimeout(() => {
                setIsShowAlert(false);
                flash.message = null;
            }, 3000);
        }
    }, [isShowAlert]);

    const [paymentoptions, setPaymentoptions] = useState([]);

    const handleClosePayment = () => {
        setOpenPayment(false);
    };

    useEffect(() => {
        setPaymentoptions(
            journals
                .filter(
                    (journal) =>
                        journal.chart_of_account?.account_type ==
                        "bank_and_cash"
                )
                .map((journal) => ({
                    value: journal.id,
                    label: journal.journal_name,
                }))
        );
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let sortedItems = [...purchaseOrders];

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
    }, [currentPage, sorting, sortdirection, searchbar, purchaseOrders]);

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
            currentPage < Math.ceil(purchaseOrders?.length / itemsPerPage)
        ) {
            setCurrentPage(currentPage + 1);
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const [openPayment, setOpenPayment] = React.useState(false);

    const [date, setDate] = React.useState(new Date());
    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        journal_id: null,
        date: date,
        reference: null,
        purchase_order_id: null,
        amount: null,
        notes: null,
    });

    const [deletepurchases, setDeletepurchases] = useState(null);
    const [deleteOpen, setdeleteOpen] = useState(false);

    const handleDeletePurchases = (id) => {
        if (id) {
            setDeletepurchases(id);
            setdeleteOpen(true);
        } else {
            setdeleteOpen(false);
        }
    };

    const [purchaseId, setPurchaseId] = useState(null);

    const purchaseRegisterPayment = (e) => {
        e.preventDefault();
        post(route("payment.purchase-register-payment"), {
            onSuccess: () => {
                reset();
                setOpenPayment(false);
                setPurchaseId(null);
                setIsShowAlert(true);
            },
        });
    };

    const handleOpenPayment = (id) => {
        if (id) {
            setData("purchase_order_id", id);
            setOpenPayment(true);
        } else {
            setOpenPayment(false);
        }
    };

    return (
        <PurchasingLayout user={auth.user}>
            <Head title="Purchases" />
            <Alert
                className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
                color={flash.message?.type == "success" ? "green" : "red"}
                open={isShowAlert}
                // icon={<Icon />}
            >
                {flash.message?.content}
            </Alert>
            <Dialog open={deleteOpen} size="sm" onClose={handleDeletePurchases}>
                <DialogHeader>
                    <Typography variant="h5">{Language.delete.header}</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                    <InformationCircleIcon className="w-20 h-20 text-red-400" />
                    <Typography className="text-red-900" variant="h4">
                        {Language.delete.title}
                    </Typography>
                    <Typography className="text-center font-normal">
                        {Language.delete.description}
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={async () => {
                            if (deletepurchases) {
                                await destroy(
                                    route("purchases.destroy", deletepurchases),
                                    {
                                        onSuccess: () => {
                                            setIsShowAlert(true);
                                            setDeletepurchases(null);
                                        },
                                    }
                                );
                            }
                            handleDeletePurchases(null);
                        }}
                    >
                        {Language.delete.confirmbutton}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleDeletePurchases(null)}
                    >
                        {Language.delete.cancelbutton}
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog
                open={openPayment}
                size="sm"
                onClose={handleOpenPayment}
                className="overflow-auto max-h-[80vh]"
            >
                <form onSubmit={purchaseRegisterPayment}>
                    <DialogHeader>
                        <Typography variant="h5">{Language.createpayment.header}</Typography>
                    </DialogHeader>
                    <DialogBody
                        divider
                        className="grid place-items-center gap-4"
                    >
                        <div className="w-full gap-2 md:justify-between px-4 pb-4 bg-white grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2">
                            <div className="col-span-2 lg:col-span-1">
                                <label className="">{Language.createpayment.paymenttype.title}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.createpayment.paymenttype.description}
                                </div>
                                <Select
                                    required={true}
                                    options={paymentoptions}
                                    value={{
                                        value: data.journal_id,
                                        label: journals.find(
                                            (journal) =>
                                                journal.id === data.journal_id
                                        )?.journal_name,
                                    }}
                                    onChange={(e) => {
                                        console.log(e);
                                        setData("journal_id", e.value);
                                    }}
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
                                {errors.journal_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.journal_id}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <label className="">{Language.createpayment.paymentdate.title}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.createpayment.paymentdate.description}
                                </div>
                                <Popover placement="bottom" trigger="click">
                                    <PopoverHandler>
                                        <Input
                                            required={true}
                                            type="text"
                                            placeholder="2023-05-12"
                                            icon={<CalendarDaysIcon />}
                                            value={format(
                                                data.date,
                                                "dd-MM-yyyy"
                                            )}
                                            onChange={(e) => {
                                                const newDate = parse(
                                                    e.target.value,
                                                    "dd-MM-yyyy",
                                                    new Date()
                                                );
                                                if (!isNaN(newDate)) {
                                                    setData("date", newDate);
                                                }
                                            }}
                                            className="  placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none hidden",
                                            }}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent className="z-[9999]">
                                        <DayPicker
                                            mode="single"
                                            selected={data.date}
                                            onSelect={(selectedDate) => {
                                                if (selectedDate) {
                                                    setData(
                                                        "date",
                                                        selectedDate
                                                    );
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
                                {errors.date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.date}
                                    </p>
                                )}
                            </div>
                            <div className="2xl:col-span-2 col-span-2">
                                <label className="">{Language.createpayment.payingamount.title}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.createpayment.payingamount.description}
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
                                            required={true}
                                            type="number"
                                            value={data.amount}
                                            onChange={(e) => {
                                                setData(
                                                    "amount",
                                                    e.target.value
                                                );
                                            }}
                                            className="placeholder:text-gray-600 rounded-tl-none rounded-bl-none placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none hidden",
                                            }}
                                        />
                                        {errors.amount && (
                                            <p className="text-red-500 text-sm">
                                                {errors.amount}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="2xl:col-span-2 col-span-2">
                                <label className="">{Language.createpayment.reference.title}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.createpayment.reference.description}
                                </div>
                                <Input
                                    type="input"
                                    value={data.reference}
                                    onChange={(e) => {
                                        setData("reference", e.target.value);
                                    }}
                                    placeholder="Reference"
                                    className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <div className="col-span-2 lg:col-span-2">
                                <label className="">{Language.createpayment.additionalnote.title}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.createpayment.additionalnote.description}
                                </div>
                                <div className="flex">
                                    <Textarea
                                        type="input"
                                        value={data.notes}
                                        onChange={(e) => {
                                            setData("notes", e.target.value);
                                        }}
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
                        <Button type="submit" variant="gradient" color="green">
                            {Language.createpayment.submitbutton}
                        </Button>
                        <Button variant="outlined" onClick={handleClosePayment}>
                            {Language.createpayment.closebutton}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            <Dialog open={open} size="md" onClose={handleOpen}>
                <DialogHeader>
                    <Typography variant="h5">{Language.showpayment.header}</Typography>
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
                        {Language.showpayment.closebutton}
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
                                    {Language.title}
                                </Typography>
                                <Typography variant="paragraph">
                                    {Language.subtitle}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <div className="flex gap-3">
                                <Linkactive href={route("purchases.create")}>
                                    <Button className="bg-ungukita md:flex hidden">
                                        {Language.addbutton}
                                    </Button>
                                </Linkactive>
                                <div className="md:flex hidden">
                                    {/* <Menu placement="right-start">
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
                                    </Menu> */}
                                </div>
                                <IconButton className="bg-ungukita flex md:hidden">
                                    <PlusIcon className="w-5 h-5" />
                                </IconButton>
                            </div>

                            <div className="inline-flex items-center">
                                <Input
                                    type="search"
                                    placeholder={Language.searchplaceholder}
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
                                            vendor,
                                            create_date,
                                            total_item,
                                            total_paid,
                                            total_price,
                                            total_due,
                                            status,
                                            payment_status,
                                        },
                                        index
                                    ) => {
                                        const isLast =
                                            index ===
                                            purchaseOrders?.length - 1;
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
                                                            {vendor.name}
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
                                                        Rp{Number(total_price).toLocaleString("id-ID")}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color={
                                                            total_paid === total_price
                                                            ? "blue-gray"
                                                            : "red"
                                                        }
                                                        className="font-normal"
                                                        >
                                                        Rp{Number(total_paid).toLocaleString("id-ID")}
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
                                                    <div className="w-max">
                                                        <div>
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
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                <Typography
                                                    variant="small"
                                                    color={
                                                        `Rp ${total_due && Intl.NumberFormat("id").format(total_due)}` === "Rp 0"
                                                        ? "green"
                                                        : "red"
                                                    }
                                                    className="font-normal"
                                                    >
                                                    {`
                                                        Rp ${
                                                        total_due &&
                                                        Intl.NumberFormat("id").format(total_due)
                                                        }
                                                    `}
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
                                                                                "purchases.detail",
                                                                                id
                                                                            ))
                                                                    }
                                                                >
                                                                    <EyeIcon className="w-5 h-5" />
                                                                    {Language.action.purchasedetail}
                                                                </MenuItem>
                                                                <MenuItem
                                                                    className="flex items-center gap-2"
                                                                    onClick={() =>
                                                                        (window.location.href =
                                                                            route(
                                                                                "purchases.edit",
                                                                                id
                                                                            ))
                                                                    }
                                                                >
                                                                    <PencilIcon className="w-5 h-5" />
                                                                    {Language.action.editpurchase}
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        handleOpenPayment(
                                                                            id
                                                                        );
                                                                    }}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <PlusCircleIcon className="w-5 h-5" />
                                                                    {Language.action.createpayment}
                                                                </MenuItem>
                                                                {/* <MenuItem
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
                                                                </MenuItem> */}
                                                                <MenuItem
                                                                    className="flex items-center gap-2 !text-white hover:!text-white !bg-red-500 hover:!bg-red-900"
                                                                    onClick={() =>
                                                                        handleDeletePurchases(
                                                                            id
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashIcon className="w-5 h-5 text-white" />
                                                                    {Language.action.deletepurchase}
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
                                    {Language.pagination.page} {currentPage} {Language.pagination.of}{" "}
                                    {Math.ceil(
                                        purchaseOrders?.length / itemsPerPage
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
                                    {Language.pagination.previous}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={paginated.length < itemsPerPage}
                                >
                                    {Language.pagination.next}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </PurchasingLayout>
    );
}
