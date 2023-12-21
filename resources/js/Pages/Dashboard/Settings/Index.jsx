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
        inventory_account_id: setting?.inventory_account_id,
        fixed_assets_account_id: setting?.fixed_assets_account_id,
        cost_of_goods_sold_account_id: setting?.cost_of_goods_sold_account_id,
        account_receivable_id: setting?.account_receivable_id,
        account_payable_id: setting?.account_payable_id,
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
                                    {Language.header.title}
                                </Typography>
                                <Typography variant="paragraph">
                                    {Language.header.subtitle}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-md rounded-md h-full py-2 border-b border-gray-200">
                        <div className="px-6 gap-5 m-3">
                            <Typography className="col-span-2 pb-5" variant="h4">
                                {Language.titles.accountsettings}
                            </Typography>
                            <form
                                onSubmit={actionSubmit}
                                className="grid grid-cols-2 gap-5"
                            >
                                <div className="grid-span-1">
                                    <Typography>{Language.salesaccount.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.salesaccount.description}
                                    </div>
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
                                    <Typography>{Language.purchaseaccount.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.purchaseaccount.description}
                                    </div>
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
                                    <Typography>{Language.inventoryaccount.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.inventoryaccount.description}
                                    </div>
                                    <Select
                                        options={accountOptions}
                                        value={{
                                            value: data.inventory_account_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.inventory_account_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.inventory_account_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "inventory_account_id",
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
                                    {Language.fixedassetsaccount.title}
                                    </Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.fixedassetsaccount.description}
                                    </div>
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
                                    {Language.costofgoodsoldaccount.title}
                                    </Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.costofgoodsoldaccount.description}
                                    </div>
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
                                <div className="col-span-1">
                                    <Typography>{Language.accountreceivable.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.accountreceivable.description}
                                    </div>
                                    <Select
                                        options={accountOptions}
                                        value={{
                                            value: data.account_receivable_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.account_receivable_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.account_receivable_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "account_receivable_id",
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
                                    <Typography>{Language.accountpayable.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.accountpayable.description}
                                    </div>
                                    <Select
                                        options={accountOptions}
                                        value={{
                                            value: data.account_payable_id,
                                            label: `${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.account_payable_id
                                                )?.code || ""
                                            } ${
                                                accounts?.find(
                                                    (account) =>
                                                        account.id ===
                                                        data.account_payable_id
                                                )?.account_name || ""
                                            }`,
                                        }}
                                        onChange={(e) =>
                                            setData(
                                                "account_payable_id",
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
                                {Language.titles.journalsettings}
                                </Typography>
                                <div className="col-span-2">
                                    <Typography>
                                    {Language.stockvaluationjournal.title}
                                    </Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.stockvaluationjournal.description}
                                    </div>
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
                                    <Typography>{Language["Sales Journal"].title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language["Sales Journal"].description}
                                    </div>
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
                                    <Typography>{Language["Purchase Journal"].title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language["Purchase Journal"].description}
                                    </div>
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
                                        {Language.savebutton}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-md rounded-md h-full py-2 mt-8 border-b border-gray-200">
                        <form>
                            <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <Typography className="col-span-2" variant="h4">
                                {Language.titles.appearancesettings}
                                </Typography>
                                <div className="grid-span-1">
                                    <Typography>{Language.language.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.language.description}
                                    </div>
                                    <LanguageSwitcher
                                        onLanguageChange={handleLanguageChange}
                                    />
                                </div>
                                <div className="grid-span-1">
                                    <Typography>{Language.theme.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                            {Language.theme.description}
                                    </div>
                                    <Select
                                        isDisabled={true}
                                        options={modeoptions}
                                        placeholder={Language.theme.light}
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
