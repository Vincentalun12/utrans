import AdditemLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import { Head } from "@inertiajs/react";
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

export default function Additem({ auth }) {
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
          <div className="bg-white overflow-hidden shadow-md h-auto">
            <div className="lg:flex w-full gap-2 md:justify-between px-4 py-4">
              <div className="flex lg:gap-3 gap-6 flex-col lg:flex-row">
              <div className="mx-2 lg:w-4/6 w-full">
              <label className="flex">Vendor</label>
              <div className="inline-flex items-center w-full">
              <Input
                  type="search"
                  placeholder="Vendor name"

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div>
                <IconButton className=" bg-ungukita ml-2">
                    <PlusIcon className="w-5 h-5" />
                  </IconButton>
                </div>
                </div>
                </div>
                <div className="mx-2 lg:w-4/6 w-full">
              <label className="">Creation date</label>
              <Input
                  type="search"
                  placeholder="12/5/2023"
                  icon={<CalendarDaysIcon/>}

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
                <div className="mx-2 lg:w-4/6 w-full">
              <label className="">Expected Arrival</label>
              <Input
                  type="search"
                  placeholder="14/5/2023"
                  icon={<CalendarDaysIcon/>}

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
                <div className="mx-2 lg:w-4/6 w-full">
              <label className="">Reference</label>
              <Input
                  type="input"
                  placeholder="Reference"

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
              </div>
            </div>
            <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-1 pb-4">
            <div className="mx-2 w-full flex flex-col">
              <label className="">Product Name</label>
              <Input
                  type="search"
                  placeholder="Search"
                  icon={<QrCodeIcon/>}

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                </div>
                </div>
            <div>
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
              <div className="mx-2 lg:w-4/6 w-full">
                <label className="">Discount</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
              </div>
              <div className="mx-2 lg:w-4/6 w-full">
                <label className="">Shipping</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
              </div>
              <div className="mx-2 lg:w-4/6 w-full">
                <label className="">Status</label>
                <Input
                    type="search"
                    className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
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