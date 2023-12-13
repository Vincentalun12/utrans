import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import {
  Card,
  Typography,
  Input,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";

import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon,
  ArrowDownRightIcon
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["SKU", "Item", "Quantity", "Unit price", "Disc", "Total"];

const TABLE_ROWS = [
  {
    SKU: "BW-CB-001",
    item: "Carbon Block CTO Kirei 10 inch",
    quantity: "50",
    unitprice: "25000",
    disc: "0",
    total: "1250000",
  },
  {
    SKU: "BW-CB-002",
    item: "Carbon Block CTO Kirei 20 inch",
    quantity: "50",
    unitprice: "25000",
    disc: "0",
    total: "1250000",
  },
  {
    SKU: "BW-CF-003",
    item: "Catridge Filter Kolon 10 inch 05 mikron",
    quantity: "41",
    unitprice: "25000",
    disc: "0",
    total: "1250000",
  },
];

export default function Salesorder({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Add item" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
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
          <Card className="h-full w-full overflow-hidden rounded-none border-b items-end flex">
            <div className="inline-flex">
              <div>
                <Button variant="outlined" className="w-full h-10 rounded-none border-r-0">Add Product</Button>
              </div>
              <div>
                <Button variant="outlined" className="w-full h-10 rounded-none">Create Invoice</Button>
              </div>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none p-6">
            <Typography
              variant="h6"
              color="black"
            >
              Sales order
            </Typography>
            <div className="inline-flex mx-4">
              <Typography
                variant="h4"
                color="black"
              >
                BWSL4032
              </Typography>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="grid lg:gap-8 grid-cols-1 lg:grid-cols-2 gap-4 p-6">
              <div className="grid grid-cols-1">
                <div className="inline-flex w-full order-1">
                  <Typography>
                    Customer:
                  </Typography>
                  <Typography className="ml-6">
                    Acuang pinang<br />
                    Jln Hang nadim 3, blok 1<br />
                    Jakarta Selatan, 12345<br />
                    Indonesia
                  </Typography>
                </div>
                <div className="inline-flex w-full order-2">
                  <Typography className="font-bold">
                    Order Date:
                  </Typography>
                  <Typography className="ml-6">
                    10/30/2023
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="inline-flex w-full order-3">
                  <Typography color="black" className="font-bold">
                    Delivery Address:
                  </Typography >
                  <Typography className="ml-4">
                    Acuang pinang
                  </Typography>
                </div>
                <div className="inline-flex w-full order-4">
                  <Typography color="black" className="font-bold">
                    Invoice Address:
                  </Typography>
                  <Typography className="ml-6">
                    Acuang pinang
                  </Typography>
                </div>
                <div className="inline-flex w-full order-5">
                  <Typography color="black">
                    Customer reference:
                  </Typography >
                  <Typography className="ml-4">
                    BWSL4032
                  </Typography>
                </div>
                <div className="inline-flex w-full order-6">
                  <Typography>
                    Total item:
                  </Typography>
                  <Typography className="ml-6">
                    146 Units
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
          <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden rounded-none px-0">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-y border-gray-400 bg-white pl-4 py-2">
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
                {TABLE_ROWS.map(({ SKU, item, quantity, unitprice, disc, total }) => (
                  <tr key={SKU} className="even:bg-gray-100 border-y border-gray-400">
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {SKU}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {quantity}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {unitprice}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {disc}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {total}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
            <table className="border-gray-300 border-t">
              <tr>
                <td className="pl-4">Discount</td>
                <td className="">:</td>
                <td className="pl-4">0%</td>
              </tr>
              <tr>
                <td className="pl-4">Change</td>
                <td className="">:</td>
                <td className="pl-4">0</td>
              </tr>
              <tr>
                <td className="pl-4">Total</td>
                <td className="">:</td>
                <td className="pl-4">Rp. 34,573,000.00</td>
              </tr>

            </table>

          </Card>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}