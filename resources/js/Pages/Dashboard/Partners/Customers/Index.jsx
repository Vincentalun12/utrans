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
  }, [currentPage, sorting, sortdirection, searchbar]);

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

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Customers" />
            <Alert
                className="fixed top-4 right-4 z-50 w-1/4"
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
                    <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <Linkactive href={route("customers.create")}>
                                <Button
                                    className={twMerge(
                                        "px-2 py-1 bg-red hover:bg-dark-red md:flex hidden",
                                        "p-3 bg-ungukita"
                                    )}
                                >
                                    Add Items
                                </Button>
                            </Linkactive>
                            <div className="inline-flex items-center">
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    value={searchbar}
                                    onChange={e => setsearchbar(e.target.value)}
                                    className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                    <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden lg:max-h-[460px] max-h-[480px] px-0 rounded-none">
                        <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                            <thead>
                                <tr className="sticky top-0">
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
                                                <td className="p-2 border-b border-gray-200 pl-4">
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
                                                <td className="p-2 border-b border-gray-200 pl-4">
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
                                                <td className="p-2 border-b border-gray-200 pl-4">
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
                                                <td className="p-2 border-b border-gray-200 pl-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {phone}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 flex gap-4">
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="black"
                                                        className="font-medium inline-flex space-x-1"
                                                    >
                                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                                    </Typography>
                                                    <Typography
                                                        as="a"
                                                        href={route(
                                                            "customers.edit",
                                                            id
                                                        )}
                                                        variant="small"
                                                        color="black"
                                                        className="font-medium inline-flex space-x-1"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5 text-green-500" />
                                                    </Typography>
                                                    <Typography
                                                        as="a"
                                                        onClick={() =>
                                                            destroy(
                                                                route(
                                                                    "customers.destroy",
                                                                    id
                                                                ),
                                                                {
                                                                    onSuccess:
                                                                        () => {
                                                                            setIsShowAlert(
                                                                                true
                                                                            );
                                                                        },
                                                                }
                                                            )
                                                        }
                                                        variant="small"
                                                        color="black"
                                                        className="font-medium inline-flex space-x-1 cursor-pointer"
                                                    >
                                                        <TrashIcon className="w-5 h-5 text-red-500" />
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className="flex border-t bg-gray-100 border-gray-200 p-4 rounded-none">
                        <div className="flex justify-between">
                            <div className="pt-2">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {currentPage} of {Math.ceil(customers.length / itemsPerPage)}
                            </Typography>
                            </div>
                            <div className="flex gap-3">
                            <Button variant="outlined" size="sm" onClick={handlePrevious}>
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
