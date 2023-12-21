import InventoryLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import Linkactive from "@/Components/Linkactive";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Global, css } from "@emotion/react";
import { Language } from "@/Languages/Accounting/COA/COAIndex";
import {
  Card,
  Typography,
  Input,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Alert,
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
  ArchiveBoxIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from "tailwind-merge";
import { Backdrop } from "@mui/material";
import { TitleCase } from "@/Utilities/titleCase";

const TABLE_HEAD = [
  { display: "Code", field: "code" },
  { display: "Account Name", field: "account_name" },
  { display: "Type", field: "account_type" },
  { display: "Balance", field: "balance" },
  { display: "View", field: "null" },
];

export default function Inventory({ auth, coa }) {

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginated, setpaginated] = useState([]);
  const [sorting, setsorting] = useState(null);
  const [sortdirection, setsortdirection] = useState(null);
  const [searchbar, setsearchbar] = useState("");

  const [deletecoaId, setDeletecoaId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setDeletecoaId(id);
    setOpen(!open);
  };

  const [selectedCoa, setSelectedCoa] = useState(null);
  const [opendetail, setOpendetail] = React.useState(false);
  const handleOpendetail = (id) => {
    setOpendetail(!opendetail);
    const coaData = coa.find((coa) => coa.id === id);
    setSelectedCoa(coaData);
    console.log(coa);
    console.log(coaData);
  };

  const { delete: destroy } = useForm({});

  const { flash } = usePage().props;

  const [isShowAlert, setIsShowAlert] = useState(false);

  useEffect(() => {
    if (flash.message) {
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
        flash.message = null;
      }, 3000);
    }
  }, [isShowAlert]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let sortedItems = [...coa];

    if (searchbar) {
      const terms = searchbar.toLowerCase().split(" ");
      sortedItems = sortedItems.filter((item) =>
        terms.every((term) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(term)
          )
        )
      );
    }

    if (sorting && sortdirection) {
      sortedItems.sort((a, b) => {
        let aValue = a[sorting];
        let bValue = b[sorting];

        if (sorting === "retail" || sorting === "wholesale") {
          aValue = Number(aValue.replace(/\D/g, ""));
          bValue = Number(bValue.replace(/\D/g, ""));
        }

        if (aValue < bValue) {
          return sortdirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortdirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setpaginated(sortedItems.slice(start, end));
  }, [currentPage, sorting, sortdirection, searchbar, coa]);

  const handleSort = (field) => {
    if (field === sorting) {
      setsortdirection(sortdirection === "asc" ? "desc" : "asc");
    } else {
      setsorting(field);
      setsortdirection("asc");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (
      paginated.length === itemsPerPage &&
      currentPage < Math.ceil(coa.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <InventoryLayout user={auth.user}>
      <Head title="COA" />
      <Dialog open={opendetail} handler={handleOpendetail} className="overflow-auto max-h-[80vh]">
        <DialogHeader>
            <Typography variant="h5">{Language.detail.header}</Typography>
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray">
                {Language.detail.code}
              </Typography>
              <Typography variant="body" color="blue-gray">
                {selectedCoa && <div>{selectedCoa.code}</div>}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray">
                {Language.detail.account_name}
              </Typography>
              <Typography variant="body" color="blue-gray">
                {selectedCoa && <div>{selectedCoa.account_name}</div>}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray">
                {Language.detail.account_type}
              </Typography>
              <Typography variant="body" color="blue-gray">
                {selectedCoa && (
                  <div>{TitleCase(selectedCoa.account_type)}</div>
                )}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray">
                {Language.detail.balance}
              </Typography>
              <Typography variant="body" color="blue-gray">
                Rp {selectedCoa && Intl.NumberFormat("id").format(selectedCoa.balance)}
              </Typography>
            </div>
            <div className="flex flex-col">
                <Typography variant="small" color="blue-gray">
                    {Language.detail.createdat}
                </Typography>
                 <Typography variant="body" color="blue-gray">
              {selectedCoa && (<div>{new Date(selectedCoa.created_at).toLocaleString()}</div>)}
           </Typography>
          </div>
          <div className="flex flex-col">
                <Typography variant="small" color="blue-gray">
                    {Language.detail.editedat}
                </Typography>
                 <Typography variant="body" color="blue-gray">
              {selectedCoa && (<div>{new Date(selectedCoa.edited_at).toLocaleString()}</div>)}
           </Typography>
          </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
        <Button variant="gradient" color="green"
        onClick={() => window.location.href = route("coa.edit", selectedCoa.id)}>
            {Language.detail.editbutton}
          </Button>
          <Button variant="outlined" onClick={handleOpendetail}>
            {Language.detail.closebutton}
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={open} size="sm" onClose={handleOpen}>
        <DialogHeader>
          <Typography variant="h5">{Language.delete.header}</Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <InformationCircleIcon className="w-20 h-20 text-red-400" />
          <Typography className="text-red-900" variant="h4">
            {Language.delete.title}
          </Typography>
          <Typography className="text-center font-normal">
            {Language.delete.description}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="red"
            onClick={async () => {
              if (deletecoaId) {
                await destroy(route("coa.destroy", deletecoaId), {
                  onSuccess: () => {
                    setIsShowAlert(true);
                    setDeletecoaId(null);
                  },
                });
              }
              handleOpen(null);
            }}
          >
            {Language.delete.confirmbutton}
          </Button>
          <Button variant="outlined" onClick={handleOpen}>
            {Language.delete.cancelbutton}
          </Button>
        </DialogFooter>
      </Dialog>
      <Alert
        className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
        color={flash.message?.type == "success" ? "green" : "red"}
        open={isShowAlert}
        // icon={<Icon />}
      >
        {flash.message?.content}
      </Alert>
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
          <div className="w-full mx-auto pb-5">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
              <div className="p-6 text-gray-900">
                <Typography variant="h4" className="text-ungukita" textGradient>
                  {Language.header.title}
                </Typography>
                <Typography variant="paragraph">
                  {Language.header.subtitle}
                </Typography>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md h-20 py-2">
            <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
              <Linkactive href={route("coa.create")}>
                <Button className="bg-ungukita md:flex hidden">{Language.addbutton}</Button>
              </Linkactive>
              <Linkactive href={route("coa.create")}>
                <IconButton className="bg-ungukita flex md:hidden">
                  <PlusIcon className="w-5 h-5" />
                </IconButton>
              </Linkactive>
              <div className="inline-flex items-center">
                <Input
                  type="search"
                  placeholder={Language.searchplaceholder}
                  value={searchbar}
                  onChange={(e) => setsearchbar(e.target.value)}
                  className=" focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
          </div>
          <Card className="lg:overflow-auto overflow-x-scroll overflow-y-hidden px-0 rounded-none">
            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
              <thead>
                <tr className="sticky top-0 z-50">
                  {TABLE_HEAD.map(({ display, field }, index) => (
                    <th
                      key={display}
                      className="cursor-pointer border-b border-gray-300 bg-gray-100 p-4 transition-colors hover:bg-gray-400"
                      onClick={() => field && handleSort(field)}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {display}{" "}
                        {index !== TABLE_HEAD.length - 1 && field && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(
                  (
                    { id, code, account_name, account_type, balance },
                    index
                  ) => {
                    const isLast = index === coa.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={code} className="even:bg-gray-100">
                        <td className="p-2 border-b border-gray-200 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {code}
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
                              {account_name}
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
                              {TitleCase(account_type)}
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
                              Rp {Intl.NumberFormat("id").format(balance)}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2">
                          <Tooltip content="View">
                            <IconButton
                              variant="text"
                              onClick={() => handleOpendetail(id)}
                            >
                              <EyeIcon className="h-5 w-5 text-blue-800" />
                            </IconButton>
                          </Tooltip>
                          <a href={route("coa.edit", id)}>
                            <Tooltip content="Edit">
                              <IconButton variant="text">
                                <PencilSquareIcon className="h-5 w-5 text-green-500" />
                              </IconButton>
                            </Tooltip>
                          </a>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              onClick={() => handleOpen(id)}
                            >
                              <TrashIcon className="h-5 w-5 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </td>
                        <Global
                          styles={css`
                                                        .bg-opacity-60 {
                                                            --tw-bg-opacity: 0.15;
                                                        }
                                                        .backdrop-blur-sm {
                                                            --tw-backdrop-blur: blur(
                                                                1px
                                                            );
                                                            -webkit-backdrop-filter: var(
                                                                    --tw-backdrop-blur
                                                                )
                                                                var(
                                                                    --tw-backdrop-brightness
                                                                )
                                                                var(
                                                                    --tw-backdrop-contrast
                                                                )
                                                                var(
                                                                    --tw-backdrop-grayscale
                                                                )
                                                                var(
                                                                    --tw-backdrop-hue-rotate
                                                                )
                                                                var(
                                                                    --tw-backdrop-invert
                                                                )
                                                                var(
                                                                    --tw-backdrop-opacity
                                                                )
                                                                var(
                                                                    --tw-backdrop-saturate
                                                                )
                                                                var(
                                                                    --tw-backdrop-sepia
                                                                );
                                                            backdrop-filter: var(
                                                                    --tw-backdrop-blur
                                                                )
                                                                var(
                                                                    --tw-backdrop-brightness
                                                                )
                                                                var(
                                                                    --tw-backdrop-contrast
                                                                )
                                                                var(
                                                                    --tw-backdrop-grayscale
                                                                )
                                                                var(
                                                                    --tw-backdrop-hue-rotate
                                                                )
                                                                var(
                                                                    --tw-backdrop-invert
                                                                )
                                                                var(
                                                                    --tw-backdrop-opacity
                                                                )
                                                                var(
                                                                    --tw-backdrop-saturate
                                                                )
                                                                var(
                                                                    --tw-backdrop-sepia
                                                                );
                                                        }
                                                        .shadow-2xl {
                                                            --tw-shadow: 0 10px
                                                                25px -12px rgb(0
                                                                        0 0 /
                                                                        0.25);
                                                            --tw-shadow-colored: 0
                                                                25px 50px -12px var(--tw-shadow-color);
                                                            box-shadow: var(
                                                                    --tw-ring-offset-shadow,
                                                                    0 0 #0000
                                                                ),
                                                                var(
                                                                    --tw-ring-shadow,
                                                                    0 0 #0000
                                                                ),
                                                                var(--tw-shadow);
                                                        }
                                                    `}
                        />
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
          <Card className="flex border-t rounded-tr-none rounded-tl-none rounded-bl-lg rounded-br-lg border-gray-200 p-4">
            <div className="flex justify-between">
              <div className="pt-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {Language.pagination.page} {currentPage} {Language.pagination.of} {Math.ceil(coa.length / itemsPerPage)}
                </Typography>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  {Language.pagination.previous}
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={handleNext}
                  disabled={paginated.length < itemsPerPage}
                >
                  {Language.pagination.next}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </InventoryLayout>
  );
}