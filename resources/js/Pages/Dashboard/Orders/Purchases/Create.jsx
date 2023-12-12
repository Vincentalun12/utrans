import AdditemLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import React from 'react'
import Select from 'react-select'
import { Head } from "@inertiajs/react";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
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
  Popover,
  PopoverContent,
  PopoverHandler,
  Avatar,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
  PencilIcon,
  UserPlusIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  QrCodeIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["SKU", "Item", "Quantity", "Unit price", "Disc", "Total",""];
const TABLE_ROWS = [
  {
    SKU: "BW-CB-001",
    item : "Carbon Block CTO Kirei 10 inch",
    quantity: "50",
    unitprice: "25,000.00",
    disc: "0",
    total: "1,250,000.00",
  },
  {
    SKU: "BW-CB-002",
    item : "Carbon Block CTO Kirei 20 inch",
    quantity: "50",
    unitprice: "25,000.00",
    disc: "0",
    total: "1,250,000.00",
  },
  {
    SKU: "BW-CF-003",
    item : "Catridge Filter Kolon 10 inch 05 mikron",
    quantity: "41",
    unitprice: "25,000.00",
    disc: "0",
    total: "1,025,000.00",
  },
];

const options = [
  { value: '1', label: 'Test1' },
  { value: '2', label: 'Test2' },
  { value: '3', label: 'Test3' },
  { value: '4', label: 'Test4' },
  { value: '5', label: 'Test5' },
  { value: '6', label: 'Test6' },
]


export default function Additem({ auth }) {
  const [date, setDate] = React.useState(new Date());

  const style = {
    control: base => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: 'none'
    })
  };
  return (
    <AdditemLayout user={auth.user}>
      <Head title="Add item" />
      <div className="lg:py-4 py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-6">
          <div className="lg:hidden flex justify-between">
            <Breadcrumbs>
              <a href="#" className="opacity-60">
                Dashboard
              </a>
              <a href="#" className="Opacity-60">
                Stock
              </a>
              <a href="#">Edit</a>
            </Breadcrumbs>
          </div>
          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Add Purchases
                  </Typography>
                  <Typography variant="paragraph">
                    Add order purchases here
                  </Typography>
                </div>
              </div>
          </div>
          <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-6 pb-4 bg-white shadow-md">
            <div className="lg:mx-2 w-full min-w-xl py-2 lg:py-0">
            <label className="">Vendor</label>
              <Select options={options}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                      placeholder={'Search'}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          boxShadow: state.isFocused ? 0 : 0,
                          borderColor: state.isFocused ? '#1A202C' : base.borderColor,
                          borderWidth: state.isFocused ? '2px' : '1px',
                          "&:hover": {
                            borderColor: state.isFocused ? '#1A202C' : base.borderColor
                          },
                          borderRadius: '6px',
                        }),
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        })
                      }}
                />
                <div>
                </div>
                </div>
                <div className="lg:mx-2 lg:w-4/6 w-full py-2 lg:py-0">
                <label className="">Creation Date</label>
                  <Input
                      type="search"
                      placeholder="14-5-2023"
                      disabled
                      className=" placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                </div>
                <div className="lg:mx-2 lg:w-4/6 w-full py-2 lg:py-0">
                <label className="">Expected Arrival</label>
                    <Popover placement="bottom" trigger="click">
                        <PopoverHandler>
                        <Input
                          type="text"
                          placeholder="2023-05-12"
                          icon={<CalendarDaysIcon/>}
                          value={format(date, 'dd-MM-yyyy')}
                          onChange={(e) => {
                            const newDate = parse(e.target.value, "dd-MM-yyyy", new Date());
                            if (!isNaN(newDate)) {
                              setDate(newDate);
                            }
                          }}
                          className="  placeholder:text-ungukita !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          
                        />
                        </PopoverHandler>
                        <PopoverContent>
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                setDate(selectedDate);
                              }
                            }}
                            showOutsideDays
                            className="border-0"
                            classNames={{
                              caption: "flex justify-center py-2 mb-4 relative items-center",
                              caption_label: "text-sm font-medium text-gray-900",
                              nav: "flex items-center",
                              nav_button:
                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                              nav_button_previous: "absolute left-1.5",
                              nav_button_next: "absolute right-1.5",
                              table: "w-full border-collapse",
                              head_row: "flex font-medium text-gray-900",
                              head_cell: "m-0.5 w-9 font-normal text-sm",
                              row: "flex w-full mt-2",
                              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal",
                              day_range_end: "day-range-end",
                              day_selected:
                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                              day_today: "rounded-md bg-gray-200 text-gray-900",
                              day_outside:
                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                              day_disabled: "text-gray-500 opacity-50",
                              day_hidden: "invisible",
                            }}
                            components={{
                              IconLeft: ({ ...props }) => (
                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                              ),
                              IconRight: ({ ...props }) => (
                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                              ),
                            }}
                          />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="lg:mx-2 lg:w-4/6 w-full pt-2 lg:py-0">
              <label className="">Reference</label>
              <Input
                  type="input"
                  placeholder="Reference"

                  className="  placeholder:text-ungukita !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
                </div>
          <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-1 pb-4 bg-white shadow-md">
            <div className="lg:mx-2 w-full flex flex-col z-100">
              
              <label className="">Product Name</label>
              <Select options={options}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          boxShadow: state.isFocused ? 0 : 0,
                          borderColor: state.isFocused ? '#1A202C' : base.borderColor,
                          borderWidth: state.isFocused ? '2px' : '1px',
                          "&:hover": {
                            borderColor: state.isFocused ? '#1A202C' : base.borderColor
                          },
                          borderRadius: '6px',
                        }),
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        })
                      }}
                  />
                </div>
                </div>
          <Card className="lg:overflow-auto overflow-x-scroll rounded-none px-6">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
            <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-gray-50 p-4"
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
                {TABLE_ROWS.map(
                  ({ SKU, item, quantity, unitprice , disc, total }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={SKU}>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {SKU}
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
                              {item}
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
                              <input type="number" id="Quantity" class="h-10 w-16 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"/>
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {unitprice}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {disc}
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
                          <Tooltip content="Orders">
                              <Button size="sm" variant="text" >
                                <TrashIcon className="h-5 w-5 text-red-500" />
                              </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </Card>
          <Card className="flex bg-white rounded-none">
          <div className="w-full gap-2 md:justify-between px-4 py-4">
            <div className="flex lg:gap-3 gap-6 flex-col lg:flex-row">
              <div className="lg:mx-2 lg:w-4/6 w-full">
                <label className="">Discount</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
              </div>
              <div className="lg:mx-2 lg:w-4/6 w-full">
                <label className="">Shipping</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
              </div>
              <div className="lg:mx-2 lg:w-4/6 w-full">
                <label className="">Status</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
              </div>
            </div>
          </div>
        </Card>
        <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
          <div className="flex justify-between items-center">

            <div></div>
            <table className="border-gray-300 border-t">
              <tr>
                <td className="pl-4">Discount</td>
                <td className="">:</td>
                <td className="pl-4">0%</td>
              </tr>
              <tr>
                <td className="pl-4">Shipping</td>
                <td className="">:</td>
                <td className="pl-4">0</td>
              </tr>
              <tr>
                <td className="pl-4">Total</td>
                <td className="">:</td>
                <td className="pl-4">Rp. 3,525,000.00</td>
              </tr>
            </table>
          </div>
          <div className="pt-6 pr-5">
              <Button color="green" ripple="light">
                Submit
              </Button>
              <Button color="red" ripple="dark" className="ml-4">
                Cancel
              </Button>
            </div>
        </Card>
        </div>
      </div>
    </AdditemLayout>
  );
}