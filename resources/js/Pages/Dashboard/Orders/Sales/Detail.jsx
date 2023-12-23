import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Language } from "@/Languages/Order/Sales/SalesDetail";
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
const TABLE_HEAD = [Language.tableheader.sku, Language.tableheader.item, Language.tableheader.quantity, Language.tableheader.unitprice, Language.tableheader.discount, Language.tableheader.total];


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

export default function Salesorder({ auth, saleOrder }) {

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Add item" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
          <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
          <Card className="h-full w-full overflow-hidden rounded-none border-b items-end flex">
            <div className="inline-flex">
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none p-6">
            <Typography
              variant="h6"
              color="black"
            >
              {Language.title}
            </Typography>
            <div className="inline-flex mx-4">
              <Typography
                variant="h4"
                color="black"
              >
                {saleOrder.code}
              </Typography>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="grid lg:gap-8 grid-cols-1 lg:grid-cols-2 gap-4 p-6">
              <div className="grid grid-cols-1">
                <div className="inline-flex w-full order-1">
                  <Typography color="black" className="font-bold">
                    {Language.customer}:
                  </Typography>
                  <Typography className="ml-6">
                    {saleOrder.customer.name},<br />
                    {saleOrder.customer.address},<br />
                    {saleOrder.customer.district},<br />
                    {saleOrder.customer.city}.<br />
                  </Typography>
                </div>
                <div className="inline-flex w-full order-2">
                  <Typography color="black" className="font-bold">
                    {Language.creationdate}:
                  </Typography>
                  <Typography className="ml-6">
                    {saleOrder.create_date}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="inline-flex w-full order-3">
                  <Typography color="black" className="font-bold">
                    {Language.customerphonenumber}:
                  </Typography >
                  <Typography className="ml-4">
                    {saleOrder.customer.phone}<br />
                  </Typography>
                </div>
                <div className="inline-flex w-full order-4">
                  <Typography color="black" className="font-bold">
                    {Language.customeremail}:
                  </Typography>
                  <Typography className="ml-6">
                    {saleOrder.customer.email}
                  </Typography>
                </div>
                <div className="inline-flex w-full order-5">
                  <Typography color="black" className="font-bold">
                    {Language.customerreference}:
                  </Typography >
                  <Typography className="ml-4">
                    {saleOrder.customer.code}
                  </Typography>
                </div>
                <div className="inline-flex w-full order-6">
                  <Typography color="black" className="font-bold">
                    {Language.total}:
                  </Typography>
                  <Typography className="ml-6">
                    {saleOrder.total_item}
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
                {saleOrder.sale_order_lines.map(({ id, sale_order_line, product, quantity, total, price, discount }) => (
                  <tr key={id} className="even:bg-gray-100 border-y border-gray-400">
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product ? product.code : 'Product not found'}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product ? product.name : 'Product not found'}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {quantity}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Rp{price ? Number(price).toLocaleString('id-ID') : '0'}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Rp{discount ? Number(discount).toLocaleString('id-ID') : '0'}
                      </Typography>
                    </td>
                    <td className="pl-4 py-2">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                      Rp{total ? Number(total).toLocaleString('id-ID') : '0'}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
          <table>
                <tr>
                    <td className="pl-4">{Language.calculation.total}</td>
                    <td className="">:</td>
                    <td className="pl-4">Rp{saleOrder.total_price ? Number(saleOrder.total_price).toLocaleString('id-ID') : '0'}</td>
                </tr>
                <tr>
                    <td className="pl-4 border-b-2">{Language.calculation.paid}</td>
                    <td className="border-b-2">:</td>
                    <td className="pl-4 border-b-2">Rp{saleOrder.total_paid ? Number(saleOrder.total_paid).toLocaleString('id-ID') : '0'}</td>
                </tr>
                <tr>
                    <td className="pl-4 font-extrabold">{Language.calculation.duenow}</td>
                    <td className="">:</td>
                    <td className="pl-4 font-extrabold">Rp{saleOrder.total_price && saleOrder.total_paid  ? Number(saleOrder.total_price - saleOrder.total_paid).toLocaleString('id-ID') : '0'}
                </td>
                </tr>
          </table>

          </Card>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}