import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import {
    Alert,
    Card,
    Typography,
    Input,
    Button,
    IconButton,
    Tooltip,
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
    ArchiveBoxIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from "tailwind-merge";

import { TitleCase } from "@/Utilities";

const TABLE_HEAD = [
    { display: "Short Code", field: "code" },
    { display: "Journal Name", field: "journal_name" },
    { display: "Type", field: "journal_type" },
    { display: "Account Name", field: "chart_of_account_id" },
    { display: "View", field: "null" },
];

export default function Inventory({ auth, journals }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [paginated, setpaginated] = useState([]);
    const [sorting, setsorting] = useState(null);
    const [sortdirection, setsortdirection] = useState(null);
    const [searchbar, setsearchbar] = useState("");

    const { flash } = usePage().props;

    const { delete: destroy } = useForm({});

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

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let sortedItems = [...journals];

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

                if (sorting === "retail" || sorting === "wholesale") {
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
    }, [currentPage, sorting, sortdirection, searchbar, journals]);

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
            currentPage < Math.ceil(journals.length / itemsPerPage)
        ) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <InventoryLayout user={auth.user}>
            <Head title="Journals" />
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
                                    Journals
                                </Typography>
                                <Typography variant="paragraph">
                                    Manage your Journals
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <Linkactive href={route("journals.create")}>
                                <Button className="bg-ungukita md:flex hidden">
                                    Add
                                </Button>
                            </Linkactive>
                            <Linkactive href={route("journals.create")}>
                                <IconButton className="bg-ungukita flex md:hidden">
                                    <PlusIcon className="w-5 h-5" />
                                </IconButton>
                            </Linkactive>
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
                    <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden lg:max-h-[460px] max-h-[480px] px-0 rounded-none">
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
                                                        TABLE_HEAD.length - 1 &&
                                                        field && (
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
                                            journal_name,
                                            journal_type,
                                            code,
                                            chart_of_account,
                                        },
                                        index
                                    ) => {
                                        const isLast =
                                            index === journals.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr
                                                key={id}
                                                className="even:bg-gray-100"
                                            >
                                                <td className="p-2 pl-4">
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
                                                <td className="p-2 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {journal_name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {TitleCase(
                                                                journal_type
                                                            )}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2 pl-4">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {`${chart_of_account?.code} ${chart_of_account?.account_name}`}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <Tooltip content="View">
                                                        <a>
                                                            <IconButton variant="text">
                                                                <EyeIcon className="h-5 w-5 text-blue-800" />
                                                            </IconButton>
                                                        </a>
                                                    </Tooltip>
                                                    <Tooltip content="Edit">
                                                        <a
                                                            href={route(
                                                                "journals.edit",
                                                                id
                                                            )}
                                                        >
                                                            <IconButton variant="text">
                                                                <PencilSquareIcon className="h-5 w-5 text-green-500" />
                                                            </IconButton>
                                                        </a>
                                                    </Tooltip>
                                                    <Tooltip content="Delete">
                                                        <a>
                                                            <IconButton variant="text">
                                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                                            </IconButton>
                                                        </a>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <Card className="flex border-t rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg border-gray-200 p-4">
                        <div className="flex justify-between">
                            <div className="pt-2">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    Page {currentPage} of{" "}
                                    {Math.ceil(journals.length / itemsPerPage)}
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handlePrevious}
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
        </InventoryLayout>
    );
}
