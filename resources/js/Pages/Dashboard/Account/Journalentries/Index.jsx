import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import Linkactive from "@/Components/Linkactive";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  Typography,
  Input,
  Button,
  Tooltip,
  IconButton,
  Chip,
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

import { twMerge } from 'tailwind-merge'

const TABLE_HEAD = [
  { display: "Date", field: "date" },
  { display: "Number", field: "number" },
  { display: "Customer Name", field: "customername" },
  { display: "reference", field: "reference" },
  { display: "journal", field: "journal" },
  { display: "total", field: "total" },
  { display: "status", field: "status" },
  { display: "", field: null },
];

const TABLE_ROWS = [
  { date: "2021-09-01", 
    number: "1", 
    customername: "John Doe", 
    reference: "1", 
    journal: "1", 
    total: "1", 
    status: "purchased" 
  },
];

export default function Inventory({ auth }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginated, setpaginated] = useState([]);
  const [sorting, setsorting] = useState(null);
  const [sortdirection, setsortdirection] = useState(null);
  const [searchbar, setsearchbar] = useState('');

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let sortedItems = [...TABLE_ROWS];

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
    
        if (sorting === 'retail' || sorting === 'wholesale') {
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
    if (paginated.length === itemsPerPage && currentPage < Math.ceil(TABLE_ROWS.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <InventoryLayout user={auth.user}>
      <Head title="Journal Entries" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Journal Entries
                  </Typography>
                  <Typography variant="paragraph">
                    Manage your Journal Entries
                  </Typography>
                </div>
              </div>
          </div>
          <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                        <Linkactive href={route("journalentries.create")}>
                            <Button className="bg-ungukita md:flex hidden">
                                Add
                            </Button>
                            </Linkactive>
                            <Linkactive href={route("journalentries.create")}>
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
                    {index !== TABLE_HEAD.length - 1 && field && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(
                  ({ date, number, customername, reference, journal, total, status }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={date} className="even:bg-gray-100">
                        <td className="p-2 border-gray-200 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {date}
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
                              {number}
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
                              {customername}
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
                              {reference}
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
                              {journal}
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
                              {total}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                          <div className="flex w-full">
                          <Chip
                              className="static"
                              variant="ghost"
                              size="sm"
                              value={status ? "Purchased" : "Cancelled"}
                              color={status ? "green" : "gray"}
                          />
                          </div>
                        </td>
                        <td className="p-2 flex">
                        <Tooltip content="View">
                        <Linkactive href={route("journalentries.detail")}>
                            <IconButton variant="text">
                            <EyeIcon className="h-5 w-5 text-blue-800" />
                            </IconButton>
                            </Linkactive>
                          </Tooltip>
                          <Tooltip content="Edit">
                              <a>
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
                  },
                )}
              </tbody>
            </table>
          </Card>
          <Card className="flex border-t rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg border-gray-200 p-4">
            <div className="flex justify-between">
              <div className="pt-2">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Page {currentPage} of {Math.ceil(TABLE_ROWS.length / itemsPerPage)}
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
    </InventoryLayout>
  );
}
