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

const TABLE_HEAD = ["Account","Label","Debit","Credit",""];
const TABLE_ROWS = [
  {
    account: "BW-CB-001",
    label : "Carbon Block CTO Kirei 10 inch",
    debit: "50",
    credit: "25,000.00",
  },
  {
    account: "BW-CB-001",
    label : "Carbon Block CTO Kirei 10 inch",
    debit: "50",
    credit: "25,000.00",
  },
  {
    account: "BW-CB-001",
    label : "Carbon Block CTO Kirei 10 inch",
    debit: "50",
    credit: "25,000.00",
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

  return (
    <AdditemLayout user={auth.user}>
      <Head title="Journal Entries" />
      <div className="sm:min-h-screen sm:mt-18 sm:mb-20 mt-12 mb-0  justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Journal Entries
                  </Typography>
                  <Typography variant="paragraph">
                    Add Journal Entries here
                  </Typography>
                </div>
              </div>
          </div>

          <div className="w-full gap-2 md:justify-between shadow-md px-4 pt-6 pb-4 bg-white grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
            <div className="sm:col-span-1">
            <label className="">Journal</label>
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
                <div className="sm:col-span-1">
              <label className="">Reference</label>
              <Input
                  type="input"
                  placeholder="Reference"

                  className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
                <div className="sm:col-span-1">
                <label className="">Creation Date</label>
                  <Input
                      type="search"
                      placeholder="14-5-2023"
                      disabled
                      className=" placeholder:text-gray-600 focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200" 
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                </div>
                <div className="sm:col-span-1">
                <label className="">Accounting Date</label>
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
                          className="  placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
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
                </div>
          <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-1 pb-4 bg-white shadow-md">
            <div className="sm:col-span-2 w-full">
              <label className="">Account</label>
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
            <thead className="max-w-[20rem]">
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
                  ({ account, label, debit, credit}, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={account}>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {account}
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
                              <input type="text" id="label" class="h-10 w-48 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"/>
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
                              <input type="number" id="debit" class="h-10 w-16 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"/>
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <input type="number" id="credit" class="h-10 w-16 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"/>
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
        <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
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