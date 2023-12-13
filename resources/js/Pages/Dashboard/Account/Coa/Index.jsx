import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import Linkactive from "@/Components/Linkactive";
import { Head, Link } from "@inertiajs/react";
import { Global, css } from '@emotion/react';
import {
  Card,
  Typography,
  Input,
  Button,
  IconButton,
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
  ArchiveBoxIcon
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from 'tailwind-merge'
import { Backdrop } from "@mui/material";

const TABLE_HEAD = [
  { display: "Code", field: "code" },
  { display: "Accout Name", field: "name" },
  { display: "Type", field: "type" },
  { display: "View", field: "null" },
];

const TABLE_ROWS = [
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
  {
    code: "1",
    name: "Kas Kecil",
    type: "Bank and Cash",
  },
];

export default function Inventory({ auth }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginated, setpaginated] = useState([]);
  const [sorting, setsorting] = useState(null);
  const [sortdirection, setsortdirection] = useState(null);
  const [searchbar, setsearchbar] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

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
      <Head title="COA" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
          <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Chart of Accounts
                  </Typography>
                  <Typography variant="paragraph">
                    Manage your Chart of Accounts here
                  </Typography>
                </div>
              </div>
          </div>
          <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
              <Linkactive
                href={route("coa.create")}
              >
                <Button className={twMerge('px-2 py-1 bg-red hover:bg-dark-red md:flex hidden', 'p-3 bg-ungukita')}>
                  Create
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
                    className: "before:content-none after:content-none",
                  }}
                />
                <div>
                  <IconButton className=" bg-ungukita mx-3">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </IconButton>
                </div>
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
                  ({ code, name, type }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={code} className="even:bg-gray-100">
                        <td className="p-2 border-b border-gray-200 pl-4">
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
                              {type}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="black"
                            className="font-medium inline-flex space-x-1"
                          >
                            <EyeIcon onClick={handleOpen} className="w-5 h-5 text-gray-500" />
                            <PencilSquareIcon className="w-5 h-5 text-green-500" />
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </Typography>
                        </td>
                        <Global
                          styles={css`
                            .bg-opacity-60 {
                              --tw-bg-opacity: 0.15;
                          }
                          .backdrop-blur-sm {
                            --tw-backdrop-blur: blur(1px);
                            -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
                            backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
                          }
                          .shadow-2xl {
                            --tw-shadow: 0 10px 25px -12px rgb(0 0 0 / 0.25);
                            --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
                            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                        }
                          `}
                        />
                        <Dialog 
                        open={open} handler={handleOpen}>
                            <DialogHeader>Judul</DialogHeader>
                            <DialogBody>
                              Bisa muncul jir
                            </DialogBody>
                            <DialogFooter>
                              <Button
                                variant="text"
                                onClick={handleOpen}
                                className="mr-1"
                              >
                                <span>Close</span>
                              </Button>
                              <Button variant="gradient" onClick={handleOpen}>
                                <span>EDIT</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </Card>
          <Card className="flex border-t bg-gray-100 border-gray-200 p-4 rounded-none">
            <div className="flex justify-between">
              <div className="pt-2">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Page {currentPage} of {Math.ceil(TABLE_ROWS.length / itemsPerPage)}
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
    </InventoryLayout>
  );
}
