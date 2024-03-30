import AdditemLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Language } from "@/Languages/Accounting/Journal/JournalCreate";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    Select,
    Option,
    Label,
    Textarea,
} from "@material-tailwind/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";
import ReactSelect from "react-select";

export default function Createjournals({ auth, accounts }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const { data, setData, post, processing, errors, reset } = useForm({
        code: null,
        journal_name: null,
        journal_type: "sale",
        chart_of_account_id: null,
    });

    let options = [];

    accounts?.forEach((account) => {
        options.push({
            value: account.id,
            label: `${account.code} ${account.account_name}`,
        });
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("journals.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Create Journals" />
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
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
                                    {Language.description}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Card className="h-full w-full overflow-hidden rounded-md pb-4 pt-4">
                        <form onSubmit={actionSubmit}>
                            <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.accounttype.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.accounttype.description}
                                    </div>
                                    <Select
                                        variant="outlined"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        className="placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita  focus:ring-ungukita"
                                        value={data.journal_type}
                                        onChange={(value) =>
                                            setData("journal_type", value)
                                        }
                                    >
                                        <Option value="sales">Sales</Option>
                                        <Option value="purchase">Purchase</Option>
                                        <Option value="cash">Cash</Option>
                                        <Option value="bank">Bank</Option>
                                        <Option value="general">General</Option>
                                    </Select>
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>Default Account</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.chartofaccounttype.description}
                                    </div>
                                    <ReactSelect
                                        options={options}
                                        placeholder={Language.chartofaccounttype.placeholder}
                                        value={data.label}
                                        onChange={(e) => {
                                            setData(
                                                "chart_of_account_id",
                                                e.value
                                            );
                                        }}
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
                                                    borderColor:
                                                        state.isFocused
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
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.journalname.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.journalname.description}
                                    </div>
                                    <Input
                                        type="input"
                                        placeholder={Language.journalname.placeholder}
                                        className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        value={data.journal_name}
                                        onChange={(e) =>
                                            setData(
                                                "journal_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.codename.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.codename.description}
                                    </div>
                                    <Input
                                        type="input"
                                        placeholder={Language.codename.placeholder}
                                        className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-2 mb-4">
                                    <Button
                                        className="bg-ungukita w-full"
                                        type="submit"
                                        disabled={!data.chart_of_account_id || !data.journal_name || !data.journal_type}
                                    >
                                        {Language.savebutton}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}
