import InventoryLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import { 
  Card, 
  Typography,
  Input,
  Button,
  Breadcrumbs
} from "@material-tailwind/react";

import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = [
  "SKU",
  "Name",
  "Merek",
  "Retail",
  "Wholesale",
  "Stock",
  "Action",
];

const TABLE_ROWS = [
  {
    SKU: "SKU001",
    Name: "Piston kit - Grand",
    Merek: "Honda",
    Retail: "10000",
    Wholesale: "9000",
    Stock: "10",
  },
  {
    SKU: "SKU002",
    Name: "Piston kit - Supra",
    Merek: "Honda",
    Retail: "15000",
    Wholesale: "14000",
    Stock: "15",
  },
  {
    SKU: "SKU003",
    Name: "Sepatu",
    Merek: "Pakaian",
    Retail: "20000",
    Wholesale: "19000",
    Stock: "20",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
  {
    SKU: "SKU004",
    Name: "Tas",
    Merek: "Pakaian",
    Retail: "25000",
    Wholesale: "24000",
    Stock: "25",
  },
];

export default function Inventory({ auth }) {
  return (
    <InventoryLayout user={auth.user}>
      <Head title="Inventory" />
      <div className="lg:py-4 py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2">
          <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
          <Button size="md" className="md:flex hidden rounded-lg bg-ungukita">
            Add Items
          </Button>
            <div className="inline-flex items-center">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "w-20",
              }}
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
          <Card className="h-full w-full lg:overflow-auto overflow-x-scroll overflow-y-hidden max-h-[450px] rounded-none">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
              <thead>
                <tr className="sticky top-0">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-gray-200 bg-gray-100 p-4"
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
                  (
                    { SKU, Name, Merek, Retail, Wholesale, Stock }
                  ) => (
                    <tr key={SKU} className="even:bg-blue-gray-50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {SKU}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {Name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {Merek}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {Retail}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {Wholesale}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          {Stock}
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
                          <EyeIcon className="w-5 h-5 text-gray-500"/>
                          <PencilSquareIcon className="w-5 h-5 text-green-500"/>
                          <TrashIcon className="w-5 h-5 text-red-500"/>
                          
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
          <div className="w-full h-10 sticky bottom-0 bg-gray-100 rounded-none border-t border-gray-200 shadow-md">
            <div className="flex justify-end">
            <span className="text-black inline-flex mt-2 justify-end"><ChevronLeftIcon className="w-6 h-6"/>1 of 500<ChevronRightIcon className="w-6 h-6"/></span>
          </div>
        </div>
      </div>
    </div>
    </InventoryLayout>
  );
}
