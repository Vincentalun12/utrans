import AuthenticatedLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect, useContext } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import Select from "react-select";

import { LanguageContext } from "@/Languages/LanguageContext";
import { Language } from "@/Languages/Settings/Settings";
import LanguageSwitcher from "@/Languages/LanguageSwitcher";

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/solid";

import {
    Alert,
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

export default function Settings({ auth, accounts, journals, setting }) {
    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            Language.setLanguage(storedLanguage);
        }
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        sales_account_id: setting?.sales_account_id,
        purchase_account_id: setting?.purchase_account_id,
        current_assets_account_id: setting?.current_assets_account_id,
        fixed_assets_account_id: setting?.fixed_assets_account_id,
        cost_of_goods_sold_account_id: setting?.cost_of_goods_sold_account_id,
        stock_valuation_journal_id: setting?.stock_valuation_journal_id,
        sales_journal_id: setting?.sales_journal_id,
        purchase_journal_id: setting?.purchase_journal_id,
    });

    const { flash } = usePage().props;

    const { setLanguage } = useContext(LanguageContext);
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    const handleLanguageChange = (value) => {
        console.log("Selected language:", value);
        setSelectedLanguage(value);
        localStorage.setItem("language", value);
        window.location.reload();
    };

    const handleSave = (event) => {
        console.log("handleSave is called");
        event.preventDefault();
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
    };

    const [accountOptions, setAccountOptions] = useState([]);
    const [journalOptions, setJournalOptions] = useState([]);

    useEffect(() => {
        setAccountOptions(
            accounts.map((account) => ({
                value: account.id,
                label: `${account.code} ${account.account_name}`,
            }))
        );
        setJournalOptions(
            journals.map((journal) => ({
                value: journal.id,
                label: `${journal.journal_name}`,
            }))
        );
    }, []);

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

    const modeoptions = [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
    ];

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("settings.save"), {
            onSuccess: () => {
                setIsShowAlert(true);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />
            <Alert
                className="fixed top-4 right-4 z-50 lg:w-1/4 w-1/2"
                color={flash.message?.type == "success" ? "green" : "red"}
                open={isShowAlert}
                // icon={<Icon />}
            >
                {flash.message?.content}
            </Alert>
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto sm:px-6 lg:px-6 w-full sm:mt-28">
                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography
                                    variant="h4"
                                    className="text-ungukita"
                                    textGradient
                                >
                                    {Language.title}
                                </Typography>
                                <Typography variant="paragraph">
                                    {Language.subtitle}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-md rounded-md h-full py-2 border-b border-gray-200">
                        <div className="px-6  m-3">
                            <Typography className="col-span-2" variant="h4">
                                Account Settings
                            </Typography>
                            <form
                                onSubmit={actionSubmit}
                                className="grid grid-cols-2 gap-5"
                            >
                                <div className="grid-span-1">
                                    <Typography>Sales Account</Typography>
                                    <Select
                                        value={{
                                            value: data.sales_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.sales_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.sales_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData("sales_account_id", e.value)
                                        }
                                        options={accountOptions}
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
                                        options={accountOptions}
                                        value={{
                                            value: data.purchase_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.purchase_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.purchase_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "purchase_account_id",
                                                e.value
                                            )
                                        }
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
                                        options={accountOptions}
                                        value={{
                                            value: data.current_assets_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.current_assets_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.current_assets_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "current_assets_account_id",
                                                e.value
                                            )
                                        }
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
                                        options={accountOptions}
                                        value={{
                                            value: data.fixed_assets_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.fixed_assets_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.fixed_assets_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "fixed_assets_account_id",
                                                e.value
                                            )
                                        }
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
                                        options={accountOptions}
                                        value={{
                                            value: data.cost_of_goods_sold_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.cost_of_goods_sold_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.cost_of_goods_sold_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "cost_of_goods_sold_account_id",
                                                e.value
                                            )
                                        }
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
                                        options={journalOptions}
                                        value={{
                                            value: data.stock_valuation_journal_id,
                                            label: `${
                                                journals?.find(
                                                    (journal) =>
                                                        journal.id ===
                                                        data.stock_valuation_journal_id
                                                )?.journal_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "stock_valuation_journal_id",
                                                e.value
                                            )
                                        }
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
                                        options={journalOptions}
                                        value={{
                                            value: data.sales_journal_id,
                                            label: `${
                                                journals?.find(
                                                    (journal) =>
                                                        journal.id ===
                                                        data.sales_journal_id
                                                )?.journal_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData("sales_journal_id", e.value)
                                        }
                                        placeholder={"Select..."}
                                        menuPosition={"fixed"}
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
                                        options={journalOptions}
                                        value={{
                                            value: data.purchase_journal_id,
                                            label: `${
                                                journals?.find(
                                                    (journal) =>
                                                        journal.id ===
                                                        data.purchase_journal_id
                                                )?.journal_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "purchase_journal_id",
                                                e.value
                                            )
                                        }
                                        placeholder={"Select..."}
                                        menuPosition={"fixed"}
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
                            </form>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-md rounded-md h-full py-2 mt-8 border-b border-gray-200">
                        <form>
                            <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <Typography className="col-span-2" variant="h4">
                                    Appearance Settings
                                </Typography>
                                <div className="grid-span-1">
                                    <Typography>Language</Typography>
                                    <LanguageSwitcher
                                        onLanguageChange={handleLanguageChange}
                                    />
                                </div>
                                <div className="grid-span-1">
                                    <Typography>Theme</Typography>
                                    <Select
                                        options={modeoptions}
                                        placeholder={"Select..."}
                                        menuPosition={"fixed"}
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
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
