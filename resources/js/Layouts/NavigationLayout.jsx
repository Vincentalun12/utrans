import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ApplicationLogo2 from "@/Components/ApplicationLogo2";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/Linkactive";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
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
} from "@material-tailwind/react";

import {
  HomeIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const [open, setOpen] = React.useState(0);

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
                active={route().current("dashboard")}
              >
                <ListItem>
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
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 1 ? "rotate-180" : ""
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
                      active={route().current("inventory")}
                    >
                      <ListItem>
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className="h-3 w-5"
                          />
                        </ListItemPrefix>
                        Stock
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
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 2 ? "rotate-180" : ""
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
                      Revenue
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
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
                  <Breadcrumbs className="lg:flex hidden">
                    <a href="#" className="opacity-60">
                      Dashboard
                    </a>
                    <a href="#" className="Opacity-60">
                      Stock
                    </a>
                    <a href="#">Edit</a>
                  </Breadcrumbs>
                  <Dropdown>
                    <Dropdown.Trigger>
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
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>
            </nav>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
