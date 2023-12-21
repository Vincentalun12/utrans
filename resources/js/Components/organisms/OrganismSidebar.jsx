import React, { useState, useEffect } from "react";
import { ApplicationLogo2 } from "@/Components";
import { LinkActiveTheme } from "@/Themes";
import Linkactive from "@/Components/Linkactive";

import { Language } from "@/Languages/Organism/Sidebar";

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import {
    HomeIcon,
    ArchiveBoxIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    ComputerDesktopIcon,
    ClipboardIcon,
    ShoppingCartIcon,
    CalculatorIcon,
    TagIcon,
} from "@heroicons/react/24/solid";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export function OrganismSidebar() {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const [open, setOpen] = useState(
        route().current("products") ? 1 : 0 || route().current("brands") ? 1 : 0
    );

    const [openReport, setOpenReport] = useState(
        route().current("balancesheet") ? 1 : 0
    );

    const [openOrder, setOpenOrder] = useState(
        route().current("sales") ? 1 : 0 || route().current("purchases") ? 1 : 0
    );

    const [openPartners, setOpenPartners] = useState(
        route().current("vendors")
            ? 1
            : 0 || route().current("customers")
            ? 1
            : 0
    );

    const [openAccount, setOpenAccount] = useState(
        route().current("coa")
            ? 1
            : 0 || route().current("journals")
            ? 1
            : 0 || route().current("journalentries")
            ? 1
            : 0 || route().current("journalitems")
            ? 1
            : 0
    );

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
        setOpenReport(0);
        setOpenOrder(0);
        setOpenPartners(0);
        setOpenAccount(0);
    };

    const handleOpenReport = (value) => {
        setOpenReport(openReport === value ? 0 : value);
        setOpen(0);
        setOpenPartners(0);
        setOpenOrder(0);
        setOpenAccount(0);
    };

    const handleOpenOrder = (value) => {
        setOpenOrder(openOrder === value ? 0 : value);
        setOpenReport(0);
        setOpenPartners(0);
        setOpen(0);
        setOpenAccount(0);
    };

    const handleOpenPartners = (value) => {
        setOpenPartners(openPartners === value ? 0 : value);
        setOpenReport(0);
        setOpenOrder(0);
        setOpen(0);
        setOpenAccount(0);
    };

    const handleOpenAccount = (value) => {
        setOpenAccount(openAccount === value ? 0 : value);
        setOpenReport(0);
        setOpenOrder(0);
        setOpen(0);
        setOpenPartners(0);
    };

    return (
        <Card className="h-screen fixed top-0 w-full max-w-full 2xl:max-w-[18rem] lg:max-w-[19rem] shadow-md shadow-blue-gray-900/5 rounded-none p-1 z-30 lg:flex hidden overflow-y-auto">
            <div className="my-2 p-2 w-full flex justify-center">
                <ApplicationLogo2 />
            </div>
            <hr className="my-2 border-gray-200" />
            <List>
                <Linkactive href={route("dashboard")}>
                    <ListItem
                        className={`${
                            route().current("dashboard")
                                ? "!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white"
                                : ""
                        }`}
                    >
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        {Language.Dashboard}
                    </ListItem>
                </Linkactive>
                {/* <Linkactive
                    href={route("pos")}
                >
                    <ListItem className={`${route().current("pos") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                        <ListItemPrefix>
                            <ComputerDesktopIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Point of Sale
                    </ListItem>
                </Linkactive> */}
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
                                {Language.Inventory}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive href={route("products")}>
                                <ListItem
                                    className={`${
                                        route().current("products")
                                            ? "!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white"
                                            : ""
                                    }`}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Products}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("brands")}>
                                <ListItem
                                    className={`${
                                        route().current("brands")
                                            ? "!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white"
                                            : ""
                                    }`}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Brand}
                                </ListItem>
                            </Linkactive>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={openOrder === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openOrder === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={openOrder === 1}>
                        <AccordionHeader
                            onClick={() => handleOpenOrder(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <ShoppingCartIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                {Language.Order}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive href={route("purchases")}>
                                <ListItem
                                    className={LinkActiveTheme("purchases")}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Purchases}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("sales")}>
                                <ListItem className={LinkActiveTheme("sales")}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Sales}
                                </ListItem>
                            </Linkactive>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={openPartners === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openPartners === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={openPartners === 1}>
                        <AccordionHeader
                            onClick={() => handleOpenPartners(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                {Language.Partners}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive href={route("customers")}>
                                <ListItem
                                    className={LinkActiveTheme("customers")}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Customers}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("vendors")}>
                                <ListItem
                                    className={LinkActiveTheme("vendors")}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Vendors}
                                </ListItem>
                            </Linkactive>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={openReport === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openReport === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={openReport === 1}>
                        <AccordionHeader
                            onClick={() => handleOpenReport(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <ClipboardIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                {Language.Reports}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive href={route("balancesheet")}>
                                <ListItem
                                    className={LinkActiveTheme("balancesheet")}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.BalanceSheet}
                                </ListItem>
                            </Linkactive>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                {Language.ProfitandLoss}
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={openAccount === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                openAccount === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={openAccount === 1}>
                        <AccordionHeader
                            onClick={() => handleOpenAccount(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <CalculatorIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                {Language.Accounting}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive href={route("coa")}>
                                <ListItem className={LinkActiveTheme("coa")}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.COA}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("journals")}>
                                <ListItem
                                    className={LinkActiveTheme("journals")}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.Journals}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("journalentries")}>
                                <ListItem
                                    className={LinkActiveTheme(
                                        "journalentries"
                                    )}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.JournalEntries}
                                </ListItem>
                            </Linkactive>
                            <Linkactive href={route("journalitems")}>
                                <ListItem
                                    className={LinkActiveTheme(
                                        "journalitems"
                                    )}
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    {Language.JournalItems}
                                </ListItem>
                            </Linkactive>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Linkactive href={route("settings")}>
                <ListItem 
                    className={LinkActiveTheme("settings")} 
                    >
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {Language.Settings}
                </ListItem>
            </Linkactive>
            </List>
        </Card>
    );
}
