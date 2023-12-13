import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Select,
    Option,
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
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import Linkactive from "@/Components/Linkactive";

export default function Settings({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">

                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography
                                    variant="h4"
                                    className="text-ungukita"
                                    textGradient
                                >
                                    Settings
                                </Typography>
                                <Typography variant="paragraph">
                                    Manage your Accounting here.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 overflow-hidden shadow-md h-full min-h-[700px] py-2 border-b border-gray-200">
                        <div className="flex w-full gap-2 justify-center md:justify-between px-10 py-2">
                            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 m-3">
                                <h2 className="col-span-2 text-2xl mb-4">
                                    Journal Settings
                                </h2>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Sales Account"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Cash Account"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Assets Account"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Fixed Assets Account"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <h2 className="col-span-2 text-2xl mb-4">
                                    Account Settings
                                </h2>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Stock Valuation Journal"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Sales Journal"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="w-72 mb-4">
                                    <Select
                                        variant="static"
                                        label="Cash Journal"
                                    >
                                        <Option>1</Option>
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>
                                        <Option>5</Option>
                                    </Select>
                                </div>
                                <div className="col-span-2 mb-4">
                                    <Button
                                        className="bg-ungukita w-full"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
