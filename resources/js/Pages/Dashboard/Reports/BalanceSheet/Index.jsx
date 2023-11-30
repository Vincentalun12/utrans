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
  PlusCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

export default function Balancesheet({ auth }) {
  const [isOpenBank, setIsOpenBank] = useState(false);
  const [isOpenReceivables, setIsOpenReceivables] = useState(false);
  const [isOpenCurrentAssets, setIsOpenCurrentAssets] = useState(false);
  const [isOpenPrepayments, setIsOpenPrepayments] = useState(false);
  const [isOpenPayables, setIsOpenPayables] = useState(false);


  const toggleDetailsBank = () => {
    setIsOpenBank(!isOpenBank);
  };

  const toggleDetailsPrepayments = () => {
    setIsOpenPrepayments(!isOpenPrepayments);
  };

  const toggleDetailsReceivables = () => {
    setIsOpenReceivables(!isOpenReceivables);
  };

  const toggleDetailsCurrentAssets = () => {
    setIsOpenCurrentAssets(!isOpenCurrentAssets);
  };

  const toggleDetailsPayables = () => {
    setIsOpenPayables(!isOpenPayables);
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

          <div className="w-full mx-auto pb-5">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <Typography variant="h4" className="text-ungukita" textGradient>
                    Balance Sheet
                  </Typography>
                  <Typography variant="lead">
                    Manage your balance sheet reports here
                  </Typography>
                </div>
              </div>
          </div>
          <Card className="h-full w-full overflow-hidden rounded-none inline-flex">
            <div className="p-4 pt-5 inline-flex">
              <CalendarDaysIcon className="w-6 h-6 text-black" />
              <span className="text-black font-bold mx-1">Date :</span>
              <span className="">Thur Nov 2, 2020</span>
            </div>
          </Card>
          <Card className="h-full w-full overflow-hidden rounded-none">
            <div className="p-4">
              <div className="flex justify-between">
                <Typography variant="small" color="black" className="w-full text-right">
                  Balance
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  ASSETS
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp 2.394.000.000,00
                </Typography>
              </div>
              <div className="flex-inline justify-between">
                <p className="border-b w-full border-gray-400">Current Assets</p>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsBank}>
                    <div className="flex">
                      {isOpenBank ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Bank and Cash Accounts</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 132.047.000,00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>001.0001 Kas Besar (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 83.143.000,00</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>001.0002 Kas Piutang (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 48.904.000,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsReceivables}>
                    <div className="flex">
                      {isOpenReceivables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Receivables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 180.523.000,00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>002.0001 Piutang Usaha (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 137.523.000,00</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>002.0002 Account Receivable (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 43.000.000,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsCurrentAssets}>
                    <div className="flex">
                      {isOpenCurrentAssets ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Current Assets</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 2.467.431.839,00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>1000011 Bank Suspense Account</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 2.394.242.258,00</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>1000012 Outstanding Receipts</span>
                      <span className="flex-1 text-right text-sm text-black pt-1"></span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>1000013 Good in Transit</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp -6.286.422.524,25</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>003.0001 Persediaan Barang</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 6.213.232.943,25</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsPrepayments}>
                    <div className="flex">
                    {isOpenPrepayments ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Prepayments</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp -2.394.378.821,00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>001.3902 PPN (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp -2.394.378.821,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <p className="border-b w-full border-gray-400">Plus fixed Assets</p>
                <p className="border-b w-full border-gray-400">Plus Non-current Assets</p>


                <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  LIABILITIES
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                Rp 21.216.514,00
                </Typography>
                </div>
              <div className="flex-inline justify-between">
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Current Liabilities</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 21.216.514,00</p>
                </div>
                </div>
                <p className="border-b w-full border-gray-400 pl-6">Current Liabilities</p>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsPayables}>
                    <div className="flex">
                      {isOpenPayables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Payables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 21.216.514,00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>004.0001 Hutang usaha (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 11.314.501,00</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>004.0001 Trade Receivable</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp 9.902.013,00</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <p className="border-b w-full border-gray-400">Plus Non-current Liabilities</p>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  EQUITY
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp 245.695.940,00
                </Typography>
                </div>
              <div className="flex-inline justify-between">
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Unallocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 12.041.413,00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-6">
                <div className="flex">
                <p>Current Year Unallocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 15.423.875,00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-11">
                <div className="flex">
                <p className="text-blue-600">Current Year Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 93.133.412,00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-11">
                <div className="flex">
                <p>Current Year Allocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 15.423.875,00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-6">
                <div className="flex">
                <p>Previous Year Allocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 78.124.953,00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Retained Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp 31.548.412,00</p>
                </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  LIABILITIES + EQUITY
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp 266.912.454,00
                </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BalancesheetLayout>
  );
}


