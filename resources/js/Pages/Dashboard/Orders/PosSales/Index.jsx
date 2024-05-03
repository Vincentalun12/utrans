import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import { Head } from "@inertiajs/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
  PencilIcon,
  UserPlusIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon,
  ArrowDownTrayIcon, 
  CreditCardIcon, 
  EyeIcon, 
  PlusCircleIcon, 
  PlusIcon, 
  TrashIcon,
  EllipsisVerticalIcon,

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
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Linkactive from "@/Components/Linkactive";

const TABLE_HEAD = [
  { display: "Number", field: "number" },
  { display: "Creation date", field: "creation" },
  { display: "Total item", field: "totalitem" },
  { display: "Total", field: "total" },
  { display: "", field: null },
];

// const TABLE_HEAD = ["Number", "Creation date", "Customer", "Reference", "Total", "Status", ""];
const TABLE_ROWS = [
  {
    number: "CUSTOMER-1",
    creation: "10/30/2023",
    totalitem: "100",
    total: "Rp. 2,300,000.00",
  },

];

export default function Sales({ auth }) {
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
    <AuthenticatedLayout user={auth.user}>
      <Head title="Sales" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg flex">
                  <div className="p-6 items-center">
                  <div>
                    <Typography variant="h4" className="text-ungukita" textGradient>
                      Pos Sale
                    </Typography>
                    <Typography variant="paragraph">
                      Manage your History Pos sales here
                    </Typography>
                  </div>
                </div>
              </div>
          </div>
          <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
              <div className="flex gap-3">

              <div className="hidden">
                <Menu placement="right-start">
                  <MenuHandler>
                    <IconButton className="bg-ungukita">
                      <DocumentTextIcon className="w-5 h-5" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="flex items-center gap-2">
                      <DocumentArrowDownIcon className="w-5 h-5" stroke="red" />
                      Export as PDF
                    </MenuItem>
                    <MenuItem className="flex items-center gap-2">
                      <DocumentChartBarIcon className="w-5 h-5" stroke="green" />
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
                  onChange={e => setsearchbar(e.target.value)}

                  className=" focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div>
                </div>
              </div>
            </div>
            <div>
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
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(
                  ({ number, creation, totalitem, total}, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={number} className="even:bg-gray-100">
                        <td className="p-2 border-gray-200 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {number}
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
                              {creation}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {totalitem}
                          </Typography>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {total}
                          </Typography>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                        <Tooltip content="More Detail">
                          <Menu placement="left-start">
                          <MenuHandler>
                              <Button size="sm" variant="text" >
                                  <EllipsisVerticalIcon className="h-5 w-5"/>
                              </Button>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem className="flex items-center gap-2" 
                              onClick={() => (window.location.href ="/possales/detail")}>
                              <EyeIcon className="w-5 h-5"/>
                              Pos sale Detail
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 !text-white hover:!text-white !bg-red-500 hover:!bg-red-900">
                              <TrashIcon className="w-5 h-5"/>
                              Delete Pos sale
                            </MenuItem>
                          </MenuList>
                        </Menu>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </Card>
          <Card className="flex border-t rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg bg-white border-gray-200 p-4">
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
    </AuthenticatedLayout>
  );
}