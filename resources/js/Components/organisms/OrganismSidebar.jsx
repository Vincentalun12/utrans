import { useState } from "react";
import { ApplicationLogo2 } from "@/Components";
import { LinkActiveTheme } from "@/Themes";
import Linkactive from "@/Components/Linkactive";

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

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function OrganismSidebar() {
    const [open, setOpen] = useState(
        route().current("products") ? 1 : 0
    );

    const [openReport, setOpenReport] = useState(
        route().current("balancesheet") ? 1 : 0
    );

    const [openOrder, setOpenOrder] = useState(
        route().current("sales") ? 1 : 0 || route().current("purchases") ? 1 : 0
    );


    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
        setOpenReport(0);
        setOpenOrder(0);
    };

    const handleOpenReport = (value) => {
        setOpenReport(openReport === value ? 0 : value);
        setOpen(0);
        setOpenOrder(0);
    };

    const handleOpenOrder = (value) => {
        setOpenOrder(openOrder === value ? 0 : value);
        setOpenReport(0);
        setOpen(0);
    };


    return (
        <Card className="h-screen sticky top-0 w-full max-w-[18rem] shadow-md shadow-blue-gray-900/5 rounded-none p-4 z-50 lg:flex hidden overflow-y-auto">
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
                <Linkactive
                    href={route("pos")}
                >
                    <ListItem className={`${route().current("pos") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                        <ListItemPrefix>
                            <ComputerDesktopIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Point of Sale
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
                                href={route("products")}
                            >
                                <ListItem className={`${route().current("products") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Products
                                </ListItem>
                            </Linkactive>
                            <Linkactive
                                href={route("brands")}
                            >
                                <ListItem className={`${route().current("brands") ? '!bg-ungukita hover:bg-ungukita active:bg-ungukita focus:bg-ungukita text-white hover:text-white active:text-white focus:text-white' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Brand
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
                            className={`mx-auto h-4 w-4 transition-transform ${openOrder === 1 ? "rotate-180" : ""
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
                                Order
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive
                                href={route("purchases")}
                            >
                                <ListItem className={LinkActiveTheme('purchases')}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Purchases
                                </ListItem>
                            </Linkactive>
                            <Linkactive
                                href={route("sales")}
                            >
                                <ListItem className={LinkActiveTheme('sales')}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Sales
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
                            className={`mx-auto h-4 w-4 transition-transform ${openReport === 1 ? "rotate-180" : ""
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
                                Reports
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Linkactive
                                href={route("balancesheet")}
                            >
                                <ListItem className={LinkActiveTheme('balancesheet')}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Balance sheet
                                </ListItem>
                            </Linkactive>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Profit and loss
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Linkactive
                    href={route("partners")}
                >
                    <ListItem className={LinkActiveTheme('partners')}>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Customer
                    </ListItem>
                </Linkactive>
                <ListItem>
                    <ListItemPrefix>
                        <TagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Brand
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <CalculatorIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Accounting
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
            </List>
        </Card>
    )
}