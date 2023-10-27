import PurchasingLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
  } from "@heroicons/react/24/outline";

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
  } from "@material-tailwind/react";
   
   
  const TABLE_HEAD = ["Reference", "Creation date", "Vendor", "Total item", "Total","Status",""];
  const TABLE_ROWS = [
    {
      Reference: "BW-PU-A-001",
      creation: "03/13/2017",
      vendor: "PANAXIA SDN. BHD",
      totalitem: "146 Units",
      total: "Rp. 34,573,000.00",
      status: true,
    },
    {
      Reference: "BW-PU-A-002",
      creation: "03/14/2017",
      vendor: "CV. TIR",
      totalitem: "1.511 Units",
      total: "Rp. 643,351,000.00",
      status: true,
    },
    {
      Reference: "BW-PU-A-003",
      creation: "03/14/2017",
      vendor: "CV. MZU",
      totalitem: "49 Units",
      total: "Rp. 64,752,000.00",
      status: true,
    },
    {
      Reference: "BW-PU-A-004",
      creation: "03/20/2017",
      vendor: "CV. Global Plastik",
      totalitem: "93 Units",
      total: "Rp. 5.413.000,00",
      status: true,
    },
    {
      Reference: "BW-PU-A-005",
      creation: "03/20/2017",
      vendor: "PT. ALNCO",
      totalitem: "491 Units",
      total: "Rp. 195,752,000.00",
      status: true,
    },
    {
        Reference: "BW-PU-A-006",
        creation: "03/29/2017",
        vendor: "PT. TRI MITRA GALON",
        totalitem: "1.401 Units",
        total: "Rp. 903,414,000.00",
        status: true,
      },
      {
        Reference: "BW-PU-A-007",
        creation: "03/29/2017",
        vendor: "CV. JAYA ANLY",
        totalitem: "401 Units",
        total: "Rp. 514,000,000.00",
        status: true,
      },
      {
        Reference: "BW-PU-A-008",
        creation: "03/29/2017",
        vendor: "CV. BUANA PLASTIK",
        totalitem: "1.403 Units",
        total: "Rp. 931,403,000.00",
        status: true,
      },
      {
        Reference: "BW-PU-A-009",
        creation: "03/30/2017",
        vendor: "CV. ROFILL WATER",
        totalitem: "2 Units",
        total: "Rp. 2,166,000.00",
        status: false,
      },
  ];

export default function Purchasing({ auth }) {

  return (
    <PurchasingLayout user={auth.user}>
      <Head title="Sales" />
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
          <div className="bg-gray-100 overflow-hidden shadow-md h-20 py-2 border-b border-gray-200">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
            <div className="flex gap-3">
              <Button className="bg-ungukita">
                Create
              </Button>
              <IconButton className="bg-ungukita">
                <DocumentTextIcon className="w-5 h-5" />
            </IconButton>
            </div>

              <div className="inline-flex items-center">
                <Input
                  type="search"
                  placeholder="Search"

                  className="  placeholder:text-ungukita focus:!border-ungukita focus:ring-ungukita"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div>
                <IconButton className=" bg-ungukita mx-3">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </IconButton>
              </div>
              </div>
            </div>
            <div>
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
                ({ Reference, creation, vendor, totalitem, status, total }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={Reference}>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Reference}
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
                            {creation}
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
                            {vendor}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {totalitem}
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
                        <div className="w-max">
                            <div>
                          <Chip
                            className="static"
                            variant="ghost"
                            size="sm"
                            value={status ? "Purchased" : "Cancelled"}
                            color={status ? "green" : "gray"}
                          />
                        </div>
                        </div>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Tooltip content="Orders">
                          <Button size="sm" variant="text" >
                            <InformationCircleIcon className="h-5 w-5" />
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
        <Card className="flex border-t bg-gray-100 border-gray-200 p-4 rounded-none">
        <div className="flex justify-between">
          <div className="pt-2">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 39
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
    </PurchasingLayout>
  );
}

