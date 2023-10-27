import InventoryLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  Typography,
  Input,
  Button,
  Breadcrumbs,
  IconButton,
  Tooltip,
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
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from 'tailwind-merge'

const TABLE_HEAD = [
  "SKU",
  "Name",
  "Merek",
  "retail",
  "wholesale",
  "stock",
  "Action",
];

const TABLE_ROWS = [
  {
    SKU: "SKU001",
    name: "Piston kit - Grand",
    brand: "Honda",
    retail: "10000",
    wholesale: "9000",
    stock: "10",
  },
  {
    SKU: "SKU002",
    name: "Piston kit - Supra",
    brand: "Honda",
    retail: "15000",
    wholesale: "14000",
    stock: "15",
  },
  {
    SKU: "SKU003",
    name: "Sepatu",
    brand: "Pakaian",
    retail: "20000",
    wholesale: "19000",
    stock: "20",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
  {
    SKU: "SKU004",
    name: "Tas",
    brand: "Pakaian",
    retail: "25000",
    wholesale: "24000",
    stock: "25",
  },
];

export default function Inventory({ auth }) {
  return (
    <InventoryLayout user={auth.user}>
      <Head title="Inventory"/>
      <div className="lg:py-4 py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-6">
          <div className="lg:hidden flex justify-between">
            <Breadcrumbs>
              <a href="#" className="opacity-60">
                Dashboard
              </a>
              <a href="#" className="Opacity-60">
                stock
              </a>
              <a href="#">Edit</a>
            </Breadcrumbs>
          </div>
          <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
            <Linkactive
                href={route("additem")}
              >
              <Button className={twMerge('px-2 py-1 bg-red hover:bg-dark-red md:flex hidden', 'p-3 bg-[#B91C1C]')}>
                Add Items
              </Button>
            </Linkactive>
              <div className="inline-flex items-center">
                <Input
                  type="search"
                  placeholder="Search"

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Button size="md" className="rounded-lg bg-ungukita mx-3">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden lg:max-h-[460px] max-h-[480px] px-0 rounded-none">
          <table className="w-full min-w-max lg:min-w-full table-auto text-left">
            <thead>
              <tr className="sticky top-0">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-b border-gray-300 bg-gray-100 p-4 transition-colors hover:bg-gray-400"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ SKU, name, brand, retail, wholesale, stock }, index) => {
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
                            {brand}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {retail}
                        </Typography>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {wholesale}
                        </Typography>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {stock}
                        </Typography>
                      </td>

                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="black"
                          className="font-medium inline-flex space-x-1"
                        >
                          <EyeIcon className="w-5 h-5 text-gray-500" />
                          <PencilSquareIcon className="w-5 h-5 text-green-500" />
                          <TrashIcon className="w-5 h-5 text-red-500" />

                        </Typography>
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
          Page 1 of 10
        </Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
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
