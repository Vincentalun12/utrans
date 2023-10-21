import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ApplicationLogo2 from "@/Components/ApplicationLogo2";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/Linkactive";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Linkactive from "@/Components/Linkactive";

import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Breadcrumbs,
  Button,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MenuHandlerProps,
  ThemeProvider
} from "@material-tailwind/react";

import {
  HomeIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Authenticated({ user, header, children}) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const { url } = usePage();

  const [open, setOpen] = React.useState(route().current("dashboard") ? 0 : 1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="min-h-screen bg-backgroundabu">
      <div className="flex flex-col">
        <div className="flex">
          <Card className="h-screen sticky top-0 w-full max-w-[18rem] shadow-md shadow-blue-gray-900/5 rounded-none p-4 z-50 lg:flex hidden">
            <div className="mb-2 p-2 w-full flex justify-center">
              <ApplicationLogo2 />
            </div>
            <hr className="my-2 border-gray-200" />
            <List>
              <Linkactive
                href={route("dashboard")}
              >
                  <ListItem className={`${route().current("dashboard") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                  <ListItemPrefix>
                    <HomeIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </Linkactive>
              <Accordion
                open={open === 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                      }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Inventory
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Linkactive
                      href={route("inventory")}
                    >
                      <ListItem className={`${route().current("inventory") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-5"
                          />
                        </ListItemPrefix>
                        Products
                      </ListItem>
                    </Linkactive>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Idk
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Idk
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                      }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Sales
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Point of sales
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Receivings
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Report
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <ListItem>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                Customer
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
            </List>

          </Card>
          <main className="w-full">
            <nav className="w-full bg-white sticky top-0 z-10">
              <div className="mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between shrink-0 items-center">
                  <div className="mb-2 p-2 w-full flex justify-center lg:hidden">
                    <ApplicationLogo2 />
                  </div>
                  <Breadcrumbs className="lg:flex hidden bg-white">
                    <a href="#" className="opacity-60">
                      Dashboard
                    </a>
                    <a href="#" className="Opacity-60">
                      Stock
                    </a>
                    <a href="#">Edit</a>
                  </Breadcrumbs>
                  <Dropdown>
                    {/*<Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <Button
                          variant="filled"
                          className="lg:inline-flex items-center px-4 py-1.5 border border-transparent text-md font-medium rounded-2xl text-white bg-ungukita hidden"
                        >
                          <span>
                            <UserCircleIcon className="h-7 w-7 mr-2" />
                          </span>
                          {user.name}
                        </Button>
                      </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Link href={route("profile.edit")}>
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                      >
                        Log Out
                      </Dropdown.Link>
                      <Button variant="outlined" size="md" className="w-40 block p-3 m-3" color="red">
                        Log Out
                      </Button>
                    </Dropdown.Content>*/}
                    <Tooltip
                      placement="left"
                      content={"Hello, " + user.name}
                    >
                      <Menu
                        placement="bottom-end"
                        animate={{ mount: { y: 0 }, unmount: { y: -5 }, }}>
                        <MenuHandler>
                          <span className="inline-flex rounded-md">
                            <Button
                              variant="filled"
                              className="lg:inline-flex items-center px-4 py-1.5 border border-transparent text-md font-medium rounded-2xl text-white bg-ungukita hidden"
                            >
                              <span>
                                <UserCircleIcon className="h-7 w-7 mr-2" />
                              </span>
                              {user.name}
                            </Button>
                          </span>
                        </MenuHandler>
                        <MenuList>
                          <button
                            className="flex w-full px-4 py-2 bg-white shadow-none rounded-md duration-300 stroke-none align-left hover:bg-gray-100">
                            <Link className="flex gap-2 items-center"
                              href={route("profile.edit")}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

                              <Typography variant="small" className="font-bold text-gray-700" >
                                Profile
                              </Typography>
                            </Link>
                          </button>
                          <button
                            className="flex w-full px-4 py-2 bg-white shadow-none rounded-md duration-300 stroke-none align-left hover:bg-gray-100">
                            <Link className="flex gap-2 items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                              <Typography variant="small" className="font-bold text-gray-700" >
                                Help & Support
                              </Typography>
                            </Link>
                          </button>
                          <hr className="my-2 border-blue-gray-50" />
                          <button
                            className="flex w-full px-4 py-2 bg-red-500 shadow-none rounded-md duration-300 hover:bg-red-900 ">
                            <Link className="flex items-center"
                              href={"logout"}
                              method="post"
                              as="button">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                              <Typography variant="small" className="mr- pl-2 font-bold text-white" >
                                Log Out
                              </Typography>
                            </Link>
                          </button>
                        </MenuList>
                      </Menu>
                    </Tooltip>
                  </Dropdown>

                </div>
              </div>
            </nav>
            <div className="mb-5">
            {children}
            </div>
          </main>
        </div>
        <nav className="w-full bg-blue-gray-400 sticky bottom-0 lg:hidden flex">
              <div className="py-5 mx-5">baaaaaaaaaaaa
              </div>
        </nav>
      </div>
    </div>
  );
}
