import { useState } from "react";
import BalancesheetLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import {
  Card,
  Typography,
  Input,
  Button,
  Breadcrumbs,
  CardHeader,
} from "@material-tailwind/react";

import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid";


export default function Balancesheet({ auth }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BalancesheetLayout user={auth.user}>
      <Head title="Balance sheet" />
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
          <Card className="h-full w-full overflow-hidden rounded-none mt-2">
            <div className="p-4"></div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="p-4">
              <div className="flex justify-between">
                <Typography variant="small" color="black" className="w-full text-right">
                  Balance
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="h4" color="black" className="border-b border-black w-full">
                  Total
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp.6.000.000
                </Typography>
              </div>
              <div className="flex-inline justify-between">
                <p className="border-b w-full border-gray-400">Current Asssets</p>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetails}>
                    <div className="flex">
                      {isOpen ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Bank and Cash Accounts</span>
                      <span className="flex-1 text-right text-sm text-black">Rp.3.000.000</span>
                    </div>
                  </summary>
                  <details className="pl-4">
                    <summary className="border-b w-full border-gray-400">Kas kecil</summary>
                  </details>
                  <details className="pl-4">
                    <summary className="border-b w-full border-gray-400">Kas besar</summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetails}>
                    <div className="flex">
                      {isOpen ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Prepayments</span>
                      <span className="flex-1 text-right text-sm text-black">Rp.3.000.000</span>
                    </div>
                  </summary>
                  <details className="pl-4">
                    <summary className="border-b w-full border-gray-400">Kas kecil</summary>
                  </details>
                  <details className="pl-4">
                    <summary className="border-b w-full border-gray-400">Kas besar</summary>
                  </details>
                </details>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BalancesheetLayout>
  );
}

