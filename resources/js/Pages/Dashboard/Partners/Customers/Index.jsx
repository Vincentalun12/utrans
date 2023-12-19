import NavigationLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    IconButton,
    Tooltip,
    Chip,
    Alert,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from "tailwind-merge";

const TABLE_HEAD = [
    { display: "No", field: "No" },
    { display: "Name", field: "Name" },
    { display: "Address", field: "Address" },
    { display: "Phone", field: "Phone" },
    { display: "Action", field: "Action" },
  ];

export default function Customer({ auth, customers }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginated, setpaginated] = useState([]);
  const [sorting, setsorting] = useState(null);
  const [sortdirection, setsortdirection] = useState(null);
  const [searchbar, setsearchbar] = useState('');

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let sortedItems = [...customers];

    if (searchbar) {
      const terms = searchbar.toLowerCase().split(' ');
      sortedItems = sortedItems.filter(item =>
        terms.every(term =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(term)
          )
        )
      );
    }

    if (sorting && sortdirection) {
      sortedItems.sort((a, b) => {
        let aValue = a[sorting];
        let bValue = b[sorting];
    
        if (sorting === 'asc' || sorting === 'desc') {
          aValue = Number(aValue.replace(/\D/g, ''));
          bValue = Number(bValue.replace(/\D/g, ''));
        }
    
        if (aValue < bValue) {
          return sortdirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortdirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setpaginated(sortedItems.slice(start, end));
  }, [currentPage, sorting, sortdirection, searchbar, customers]);

  const handleSort = (field) => {
    if (field === sorting) {
      setsortdirection(sortdirection === 'asc' ? 'desc' : 'asc');
    } else {
      setsorting(field);
      setsortdirection('asc');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (paginated.length === itemsPerPage && currentPage < Math.ceil(customers.length / itemsPerPage)) {
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

    const [isShowAlert, setIsShowAlert] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setIsShowAlert(true);
            setTimeout(() => {
                setIsShowAlert(false);
                flash.message = null;
            }, 3000);
        }
    }, [isShowAlert]);

    const [deletecustomers, setDeletecustomers] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleOpen = (id) => {
      setDeletecustomers(id);
      setOpen(!open);
    };
  
    const [selectedcustomers, setSelectedcustomers] = useState(null);
    const [opendetail, setOpendetail] = React.useState(false);
    const handleOpendetail = (id) => {
      setOpendetail(!opendetail);
      const customersData = customers.find((customers) => customers.id === id);
      setSelectedcustomers(customersData);
      console.log(customers);
      console.log(customersData);
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Customers" />
            <Dialog open={opendetail} handler={handleOpendetail} className="overflow-auto max-h-[80vh]">
                <DialogHeader>
                    <Typography variant="h5">Chart of Account Detail</Typography>
                </DialogHeader>
                <DialogBody divider>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                        Code
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedcustomers && <div>{selectedcustomers.code}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                        Name
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedcustomers && <div>{selectedcustomers.name}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                        Name
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedcustomers && <div>{selectedcustomers.phone}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                        Email
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedcustomers && <div>{selectedcustomers.email}</div>}
                    </Typography>
                    </div>
                    <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray">
                        Address
                    </Typography>
                    <Typography variant="body" color="blue-gray">
                        {selectedcustomers && <div>{selectedcustomers.address},<br/>
                                                 {selectedcustomers.district},<br/>
                                                 {selectedcustomers.city}.</div>}
                    </Typography>
                    </div>
                </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                <Button variant="gradient" color="green"
                onClick={() => window.location.href = route("customers.edit", selectedcustomers.id)}>
                    Edit Detail
                </Button>
                <Button variant="outlined" onClick={handleOpendetail}>
                    <span>Close</span>
                </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={open} size="sm" onClose={handleOpen}>
                <DialogHeader>
                <Typography variant="h5">Notification</Typography>
                </DialogHeader>
                <DialogBody divider className="grid place-items-center gap-4">
                <InformationCircleIcon className="w-20 h-20 text-red-400" />
                <Typography className="text-red-900" variant="h4">
                    You're about to delete this item!
                </Typography>
                <Typography className="text-center font-normal">
                    This action cannot be undone. However, we will keep your data for
                    audit purposes.
                </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                <Button
                    variant="gradient"
                    color="red"
                    onClick={async () => {
                    if (deletecustomers) {
                        await destroy(route("customers.destroy", deletecustomers), {
                        onSuccess: () => {
                            setIsShowAlert(true);
                            setDeletecustomers(null);
                        },
                        });
                    }
                    handleOpen(null);
                    }}
                >
                    Delete
                </Button>
                <Button variant="outlined" onClick={handleOpen}>
                    Cancel
                </Button>
                </DialogFooter>
            </Dialog>
            <Alert
                className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
                color={flash.message?.type == "success" ? "green" : "red"}
                open={isShowAlert}
                // icon={<Icon />}
            >
                {flash.message?.content}
            </Alert>
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
                                    Customers
                                </Typography>
                                <Typography variant="paragraph">
                                    Manage your Customers information here
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                        <Linkactive href={route("customers.create")}>
                            <Button className="bg-ungukita md:flex hidden">
                                Add
                            </Button>
                            </Linkactive>
                            <Linkactive href={route("customers.create")}>
                            <IconButton className="bg-ungukita flex md:hidden">
                                <PlusIcon className="w-5 h-5" />
                            </IconButton>
                            </Linkactive>
                            <div className="inline-flex items-center">
                                <Input
                                type="search"
                                placeholder="Search"
                                value={searchbar}
                                onChange={e => setsearchbar(e.target.value)}

                                className=" focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                />

                            </div>
                        </div>
                    </div>
                    <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden px-0 rounded-none">
                        <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                            <thead>
                                <tr className="sticky top-0 z-50">
                                    {TABLE_HEAD.map(({ display, field }, index) => (
                                        <th
                                            key={display}
                                            className="cursor-pointer border-b border-gray-300 bg-gray-100 p-4 transition-colors hover:bg-gray-400"
                                            onClick={() => field && handleSort(field)}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {display}{" "}
                                                {index !==
                                                    TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon
                                                        strokeWidth={2}
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(
                                    ({ id, name, phone, address}, index) => {
                                        const isLast = index === customers.length - 1;
                                        const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

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
                                                                {index + 1}
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
                                                            {name}
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
                                                            {address}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {phone}
                                                    </Typography>
                                                </td>
                                                <td className="p-2 flex">
                                                <Tooltip content="View">
                                                    <IconButton variant="text" onClick={() => handleOpendetail(id)}>
                                                    <EyeIcon className="h-5 w-5 text-blue-800" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Edit">
                                                    <a href={route("customers.edit",id)}>
                                                    <IconButton variant="text">
                                                    <PencilSquareIcon className="h-5 w-5 text-green-500" />
                                                    </IconButton>
                                                    </a>
                                                </Tooltip>
                                                <Tooltip content="Delete Item">
                                                <IconButton variant="text" onClick={() => handleOpen(id)}>
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                    </IconButton>
                                                </Tooltip>
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
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {currentPage} of {Math.ceil(customers.length / itemsPerPage)}
                            </Typography>
                            </div>
                            <div className="flex gap-3">
                            <Button variant="outlined" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm" onClick={handleNext} disabled={paginated.length < itemsPerPage}>
                                Next
                            </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </NavigationLayout>
    );
}
