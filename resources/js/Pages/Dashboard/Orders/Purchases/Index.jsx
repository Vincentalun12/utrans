import PurchasingLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from 'react';
import Linkactive from "@/Components/Linkactive";
import { Head } from "@inertiajs/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
  PencilIcon,
  UserPlusIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon
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
} from "@material-tailwind/react";

const TABLE_HEAD = [
  { display: "Reference", field: "reference" },
  { display: "Creation date", field: "creation" },
  { display: "Vendor", field: "vendor" },
  { display: "Total item", field: "totalitem" },
  { display: "Total", field: "total" },
  { display: "Status", field: "status" },
  { display: "", field: null },
];

const TABLE_ROWS = [
  {
    reference: "BW-PU-A-001",
    creation: "03/13/2017",
    vendor: "PANAXIA SDN. BHD",
    totalitem: "146 Units",
    total: "Rp. 34,573,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-002",
    creation: "03/14/2017",
    vendor: "CV. TIR",
    totalitem: "1.511 Units",
    total: "Rp. 643,351,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-003",
    creation: "03/14/2017",
    vendor: "CV. MZU",
    totalitem: "49 Units",
    total: "Rp. 64,752,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-004",
    creation: "03/20/2017",
    vendor: "CV. Global Plastik",
    totalitem: "93 Units",
    total: "Rp. 5.413.000,00",
    status: true,
  },
  {
    reference: "BW-PU-A-005",
    creation: "03/20/2017",
    vendor: "PT. ALNCO",
    totalitem: "491 Units",
    total: "Rp. 195,752,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-006",
    creation: "03/29/2017",
    vendor: "PT. TRI MITRA GALON",
    totalitem: "1.401 Units",
    total: "Rp. 903,414,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-007",
    creation: "03/29/2017",
    vendor: "CV. JAYA ANLY",
    totalitem: "401 Units",
    total: "Rp. 514,000,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-008",
    creation: "03/29/2017",
    vendor: "CV. BUANA PLASTIK",
    totalitem: "1.403 Units",
    total: "Rp. 931,403,000.00",
    status: true,
  },
  {
    reference: "BW-PU-A-009",
    creation: "03/30/2017",
    vendor: "CV. ROFILL WATER",
    totalitem: "2 Units",
    total: "Rp. 2,166,000.00",
    status: false,
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
  return (
    <PurchasingLayout user={auth.user}>
      <Head title="Purchases" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
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
          <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
              <div className="flex gap-3">
              <Linkactive
                href={route("purchases.create")}
              >
                <Button className="bg-ungukita">
                  Create
                </Button>
                </Linkactive>
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
            <div>
            </div>
          </div>
          <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden lg:max-h-[460px] max-h-[480px] px-0 rounded-none">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
              <thead>
                <tr className="sticky top-0">
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
                  ({ reference, creation, vendor, totalitem, status, total }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={reference}>
                        <td className="p-2 border-b border-gray-200 pl-4">
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
                        <td className="p-2 border-b border-gray-200 pl-4">
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
                        <td className="p-2 border-b border-gray-200 pl-4">
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
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {totalitem}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {total}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-gray-200 pl-4">
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
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Tooltip content="Orders">
                            <Linkactive
                              href={route("purchases.detail")}
                            >
                              <Button size="sm" variant="text" >
                                <InformationCircleIcon className="h-5 w-5" />
                              </Button>
                            </Linkactive>
                          </Tooltip>
                        </td>
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
    </PurchasingLayout>
  );
}

