import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Select from "react-select";
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
    Label,
} from "@material-tailwind/react";
import Linkactive from "@/Components/Linkactive";

export default function Settings({ auth, accounts }) {
    let options = [];

    accounts.forEach((account) => {
        options.push({ value: account.id, label: account.account_name });
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto sm:px-6 lg:px-6 w-full sm:mt-28">
                    <form>
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
                        <div className="bg-white overflow-hidden shadow-md rounded-md h-full py-2 border-b border-gray-200">
                            <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <Typography className="col-span-2" variant="h4">
                                    Account Settings
                                </Typography>
                                <div className="grid-span-1">
                                    <Typography>Sales Account</Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="grid-span-1">
                                    <Typography>Purchase Account</Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Typography>Assets Account</Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Typography>
                                        Current Assets Account
                                    </Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Typography>
                                        Fixed Assets Account
                                    </Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Typography>
                                        Cost Of Goods Sold Account
                                    </Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <hr className="w-full col-span-2"></hr>
                                <Typography className="col-span-2" variant="h4">
                                    Journal Settings
                                </Typography>
                                <div className="col-span-2">
                                    <Typography>
                                        Stock Valuation Journal
                                    </Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Typography>Sales Journal</Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-span-1 mb-4">
                                    <Typography>Purchase Journal</Typography>
                                    <Select
                                        options={options}
                                        placeholder={"Select..."}
                                        required={true}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                boxShadow: state.isFocused
                                                    ? 0
                                                    : 0,
                                                borderColor: state.isFocused
                                                    ? "#1A202C"
                                                    : base.borderColor,
                                                borderWidth: state.isFocused
                                                    ? "2px"
                                                    : "1px",
                                                "&:hover": {
                                                    borderColor: state.isFocused
                                                        ? "#1A202C"
                                                        : base.borderColor,
                                                },
                                                borderRadius: "6px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                "input:focus": {
                                                    boxShadow: "none",
                                                },
                                            }),
                                        }}
                                    />
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
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
