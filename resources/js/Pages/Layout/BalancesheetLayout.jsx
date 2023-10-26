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
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  Assets
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp.6.000.000
                </Typography>
              </div>
              <div className="flex-inline justify-between">
                <p className="border-b w-full border-gray-400">Current Assets</p>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsBank}>
                    <div className="flex">
                      {isOpenBank ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Bank and Cash Accounts</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.6.000.000</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Kas Besar (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Kas Besar (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsReceivables}>
                    <div className="flex">
                      {isOpenReceivables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Receivables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Piutang Usaha (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Account Receivable (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsCurrentAssets}>
                    <div className="flex">
                      {isOpenCurrentAssets ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Current Assets</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Bank Suspense Account</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Outstanding Receipts</span>
                      <span className="flex-1 text-right text-sm text-black pt-1"></span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Good in Transit</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Persediaan Barang</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsPrepayments}>
                    <div className="flex">
                    {isOpenPrepayments ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Prepayments</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 PPN (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
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
                  Rp.6.000.000
                </Typography>
                </div>
              <div className="flex-inline justify-between">
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Current Liabilities</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <p className="border-b w-full border-gray-400 pl-6">Current Liabilities</p>
                <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block" onClick={toggleDetailsPayables}>
                    <div className="flex">
                      {isOpenPayables ? <ChevronDownIcon className="w-4 h-4 mt-1 mx-1" /> : <ChevronRightIcon className="w-4 h-4 mt-1 mx-1" />}
                      <span>Payables</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.6,313,275.00</span>
                    </div>
                  </summary>
                  <details className="w-full">
                    <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Hutang usaha (IDR)</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                  <details className="w-full">
                  <summary className="border-b w-full border-gray-400 block pl-11 text-blue-600">
                    <div className="flex">
                      <span>101010 Trade Receivable</span>
                      <span className="flex-1 text-right text-sm text-black pt-1">Rp.3.000.000</span>
                    </div>
                    </summary>
                  </details>
                </details>
                <p className="border-b w-full border-gray-400">Plus Non-current Liabilities</p>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  Equity
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp.6.000.000
                </Typography>
                </div>
              <div className="flex-inline justify-between">
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Unallocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-6">
                <div className="flex">
                <p>Current Year Unallocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-11">
                <div className="flex">
                <p className="text-blue-600">Current Year Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-11">
                <div className="flex">
                <p>Current Year Allocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400 pl-6">
                <div className="flex">
                <p>Previous Year Allocated Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
                <div className="border-b w-full border-gray-400">
                <div className="flex">
                <p>Retained Earnings</p>
                <p className="flex-1 text-right text-sm text-black pt-1">Rp.6,128,275.00</p>
                </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6" color="black" className="border-b border-black w-full pt-2">
                  LIABILITIES + Equity
                </Typography>
                <Typography variant="small" color="black" className="border-b border-black w-full text-right pt-3">
                  Rp.6.000.000
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


