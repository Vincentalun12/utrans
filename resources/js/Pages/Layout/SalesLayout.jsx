import SalesLayout from "@/Layouts/NavigationLayout";
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
   
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
   
  const TABLE_HEAD = ["Number", "Creation date", "Customer", "Reference", "Total","status",""];
  const TABLE_ROWS = [
    {
      number: "AA0001",
      creation: "10/27/2023",
      customer: "PT. Aspero Mitra mandiri",
      reference: "AD-001",
      total: "Rp. 174,000,000.00",
      status: true,
    },
    {
      number: "AA0002",
      creation: "10/27/2023",
      customer: "PT.Mustika anugrah sejati",
      reference: "AD-002",
      total: "Rp. 140,000,000.00",
      status: false,
    },
    {
      number: "AA0003",
      creation: "10/27/2023",
      customer: "PT. Prima jaya mandiri",
      reference: "AD-003",
      total: "Rp. 18,000,000.00",
      status: false,
    },
    {
      number: "AA0004",
      creation: "10/27/2023",
      customer: "PT. mitra langgeng makmur",
      reference: "AD-004",
      total: "Rp. 474,000,000.00",
      status: true,
    },
    {
      number: "AA0005",
      creation: "10/27/2023",
      customer: "PT. Usaha sukses mandiri",
      reference: "AD-005",
      total: "Rp. 514,000,000.00",
      status: false,
    },
    {
        number: "AA0005",
        creation: "10/27/2023",
        customer: "PT. Usaha sukses mandiri",
        reference: "AD-005",
        total: "Rp. 514,000,000.00",
        status: false,
      },
      {
        number: "AA0005",
        creation: "10/27/2023",
        customer: "PT. Usaha sukses mandiri",
        reference: "AD-005",
        total: "Rp. 514,000,000.00",
        status: false,
      },
      {
        number: "AA0005",
        creation: "10/27/2023",
        customer: "PT. Usaha sukses mandiri",
        reference: "AD-005",
        total: "Rp. 514,000,000.00",
        status: false,
      },
      {
        number: "AA0005",
        creation: "10/27/2023",
        customer: "PT. Usaha sukses mandiri",
        reference: "AD-005",
        total: "Rp. 514,000,000.00",
        status: false,
      },
  ];

export default function Sales({ auth }) {

  return (
    <SalesLayout user={auth.user}>
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
                ({ number, creation, customer, reference, status, total }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={number}>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {number}
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
                            {customer}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-2 border-b border-gray-200 pl-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {reference}
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
                            value={status ? "sucess" : "pending"}
                            color={status ? "green" : "red"}
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
    </SalesLayout>
  );
}

