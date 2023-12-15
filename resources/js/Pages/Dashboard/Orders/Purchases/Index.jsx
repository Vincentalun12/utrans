import PurchasingLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import Linkactive from "@/Components/Linkactive";
import { Head } from "@inertiajs/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PencilIcon,
  UserPlusIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon,
  PlusIcon,
  InformationCircleIcon,
  EyeIcon,
  PlusCircleIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  CreditCardIcon,
  
} from "@heroicons/react/24/outline";

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

const TABLE_ROWS = [
  {
    reference: "BW-PU-A-001",
    creation: "03/13/2017",
    vendor: "PANAXIA SDN. BHD",
    totalitem: "146 Units",
    total: "Rp. 34,573,000.00",
    paid: "Rp. 34,573,000.00",
    status: false,
    payment: false,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-002",
    creation: "03/14/2017",
    vendor: "CV. TIR",
    totalitem: "1.511 Units",
    total: "Rp. 643,351,000.00",
    paid: "Rp. 643,351,000.00",
    status: false,
    payment: false,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-003",
    creation: "03/14/2017",
    vendor: "CV. MZU",
    totalitem: "49 Units",
    total: "Rp. 64,752,000.00",
    paid: "Rp. 64,752,000.00",
    status: false,
    payment: false,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-004",
    creation: "03/20/2017",
    vendor: "CV. Global Plastik",
    totalitem: "93 Units",
    total: "Rp. 5.413.000,00",
    paid: "Rp. 5.000.000,00",
    status: true,
    payment: false,
    due: "Rp. 413,000.00"
  },
  {
    reference: "BW-PU-A-005",
    creation: "03/20/2017",
    vendor: "PT. ALNCO",
    totalitem: "491 Units",
    total: "Rp. 195,752,000.00",
    paid: "Rp. 195,752,000.00",
    status: true,
    payment: true,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-006",
    creation: "03/29/2017",
    vendor: "PT. TRI MITRA GALON",
    totalitem: "1.401 Units",
    total: "Rp. 903,414,000.00",
    paid: "Rp. 903,414,000.00",
    status: true,
    payment: true,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-007",
    creation: "03/29/2017",
    vendor: "CV. JAYA ANLY",
    totalitem: "401 Units",
    total: "Rp. 514,000,000.00",
    paid: "Rp. 514,000,000.00",
    status: true,
    payment: true,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-008",
    creation: "03/29/2017",
    vendor: "CV. BUANA PLASTIK",
    totalitem: "1.403 Units",
    total: "Rp. 931,403,000.00",
    paid: "Rp. 931,403,000.00",
    status: true,
    payment: true,
    due: "Rp. 0,000.00"
  },
  {
    reference: "BW-PU-A-009",
    creation: "03/30/2017",
    vendor: "CV. ROFILL WATER",
    totalitem: "2 Units",
    total: "Rp. 2,166,000.00",
    paid: "Rp. 2,166,000.00",
    status: true,
    payment: true,
    due: "Rp. 0,000.00"
  },
];

export default function Purchasing({ auth }) {
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
    
        if (sorting === 'totalitem' || sorting === 'total') {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <PurchasingLayout user={auth.user}>
      <Head title="Purchases" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
          <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Purchases
                  </Typography>
                  <Typography variant="paragraph">
                    Manage your order purchases here
                  </Typography>
                </div>
              </div>
          </div>
          <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
              <div className="flex gap-3">
              <Linkactive
                href={route("purchases.create")}
              >
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
              </div>
            </div>  
            <div>
            </div>
          </div>
          <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden lg:max-h-[460px] max-h-[480px] px-0 rounded-none">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
              <thead>
                <tr className="sticky top-0 z-50">
                  {TABLE_HEAD.map(({display, field}, index) => (
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
                  ({ reference, creation, vendor, totalitem, status, total, paid, payment, due }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-blue-gray-50";

                    return (
                      <tr key={reference}
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
                                {reference}
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
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {vendor}
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
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color={due === "Rp. 0,000.00" ? "blue-gray" : "red"}
                              className="font-normal"
                            >
                              {paid}
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
                                value={status ? "Purchased" : "Cancelled"}
                                color={status ? "green" : "gray"}
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
                                value={payment ? "PAID" : "DUE"}
                                color={payment ? "green" : "red"}
                              />
                          </div>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color={due === "Rp. 0,000.00" ? "green" : "red"}
                            className="font-normal"
                          >
                            {due}
                          </Typography>
                        </td>
                        <td className="p-2 border-gray-200 pl-4">
                        <Tooltip content="Orders">
                          <Menu placement="left-start">
                          <MenuHandler>
                              <Button size="sm" variant="text" >
                                  <InformationCircleIcon className="h-5 w-5" />
                              </Button>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem className="flex items-center gap-2">
                              <EyeIcon className="w-5 h-5"/>
                              Purchase Detail
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                              <PencilIcon className="w-5 h-5"/>
                              Edit Purchase
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                              <PlusCircleIcon className="w-5 h-5"/>
                              Create Payment
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                              <CreditCardIcon className="w-5 h-5"/>
                              Show Payment
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                              <TrashIcon className="w-5 h-5"/>
                              Delete Purchase
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                              <ArrowDownTrayIcon className="w-5 h-5"/>
                              Download PDF
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
    </PurchasingLayout>
  );
}

