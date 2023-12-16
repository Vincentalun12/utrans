import Journalentriesdetail from "@/Layouts/NavigationLayout";
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

const TABLE_HEAD = ["Account","Label","Debit","Credit"];
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

export default function Purchasingorder({ auth }) {
  return (
    <Journalentriesdetail user={auth.user}>
      <Head title="Add item" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

          <Card className="h-full w-full overflow-hidden rounded-none border-b items-end flex">
            <div className="inline-flex">
            <div>
            <Button variant="outlined"  className="w-full h-10 rounded-none">Edit</Button>
            </div>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none p-6">
            <Typography
            variant="h6"
            color="black"
            >
            Journal Entries Detail
            </Typography>
            <div className="inline-flex mx-4">
            <Typography
            variant="h4"
            color="black"
            >
            BW-PU-A-001
            </Typography>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="grid lg:gap-8 grid-cols-1 lg:grid-cols-2 gap-4 p-6">
            <div className="inline-flex w-full lg:order-1 order-1">
            <Typography color="black" className="font-bold">
                Reference: 
            </Typography>
            <Typography className="ml-6">
                PT. PANAXIA SDN. BHD
            </Typography>
            </div>
            <div className="inline-flex w-full lg:order-3 order-3">
            <Typography color="black" className="font-bold">
                Journal: 
            </Typography>
            <Typography className="ml-6">
                10/30/2023
            </Typography>
            </div>
            <div className="inline-flex w-full lg:order-2 order-2">
            <Typography color="black" className="font-bold">
                Accounting date: 
            </Typography>
            <Typography className="ml-6">
                10/27/2023
            </Typography>
            </div>
            <div className="inline-flex w-full lg:order-4 order-4">
            <Typography color="black" className="font-bold">
                Created on: 
            </Typography>
            <Typography className="ml-6">
                BW-PU-A-001
            </Typography>
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
          {TABLE_ROWS.map(({ account, label, debit, credit }) => (
            <tr key={account} className="even:bg-gray-100 border-y border-gray-400">
              <td className="pl-4 py-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {account}
                </Typography>
              </td>
              <td className="pl-4 py-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {label}
                </Typography>
              </td>
              <td className="pl-4 py-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {debit}
                </Typography>
              </td>
              <td className="pl-4 py-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {credit}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
</Card>

        </div>
      </div>
    </Journalentriesdetail>
  );
}