import AdditemLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import React, { useState, useEffect } from "react";
import { Language } from "@/Languages/Accounting/JournalEntries/JournalEntriesEdit";
import ReactSelect from "react-select";
import { Head, Link, useForm } from "@inertiajs/react";
import { format, parse, set } from "date-fns";
import { DayPicker } from "react-day-picker";
import {
    Select,
    Option,
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Popover,
    PopoverContent,
    PopoverHandler,
    Avatar,
    IconButton,
    Tooltip,
    Breadcrumbs,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
    CalendarDaysIcon,
    QrCodeIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Account", "Label", "Debit", "Credit", ""];

export default function EditJournalEntries({ auth, accounts, journals, journalentry, }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [journalItems, setJournalItems] = useState([]);

    useEffect(() => {
        let newJournalItems = [];

        journalentry?.journalitems.forEach((item) => {
            newJournalItems.push({
                ...journalItems,
                order: newJournalItems.length,
                id: item.id,
                chart_of_account_id: item.chart_of_account_id,
                chart_of_account_name: `${item.chart_of_account?.code} ${item.chart_of_account?.account_name}`,
                label: item.label,
                debit: item.debit,
                credit: item.credit,
            });
        });

        setJournalItems(newJournalItems);
    }, []);

    console.log(journalItems);

    const { data, setData, patch, processing, errors, reset } = useForm({
        journal_id: journalentry.journal_id,
        reference: journalentry.reference,
        accounting_date: new Date(journalentry.accounting_date),
        status: journalentry.status,
        journal_items: journalentry?.journalitems,
    });

    useEffect(() => {
        if (selectedAccount) {
            setJournalItems([
                ...journalItems,
                {
                    order: journalItems.length,
                    id: null,
                    chart_of_account_id: selectedAccount.value,
                    chart_of_account_name: selectedAccount.label,
                    label: "",
                    debit: 0,
                    credit: 0,
                },
            ]);
        }
        setSelectedAccount(null);
    }, [selectedAccount]);

    useEffect(() => {
        setData("journal_items", journalItems);
    }, [journalItems]);

    let journalOptions = [];
    let accountOptions = [];

    journals.forEach((journal) => {
        journalOptions.push({
            value: journal.id,
            label: `${journal.journal_name}`,
        });
    });

    accounts.forEach((account) => {
        accountOptions.push({
            value: account.id,
            label: `${account?.code} ${account?.account_name}`,
        });
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        patch(route("journalentries.update", journalentry.id));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Journal Entries" />
            <div className="sm:min-h-screen sm:mt-18 sm:mb-20 mt-12 mb-0  justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    <form onSubmit={actionSubmit}>
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

                        <div className="w-full gap-2 md:justify-between shadow-md px-4 pt-6 pb-4 bg-white grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label className="">{Language.journal.name}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.journal.description}
                                </div>
                                <ReactSelect
                                    options={journalOptions}
                                    value={{
                                        value: data.journal_id,
                                        label: `${data.journal_id
                                            ? journals.find(
                                                (journal) =>
                                                    journal.id ===
                                                    data.journal_id
                                            )?.journal_name
                                            : ""
                                            }`,
                                    }}
                                    onChange={(e) =>
                                        setData("journal_id", e.value)
                                    }
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    }}
                                    placeholder={"Search"}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            boxShadow: state.isFocused ? 0 : 0,
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
                                <div></div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">{Language.reference.name}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.reference.description}
                                </div>
                                <Input
                                    type="input"
                                    value={data.reference}
                                    onChange={() =>
                                        setData("reference", e.target.value)
                                    }
                                    placeholder="Reference"
                                    className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">{Language.status.name}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.status.description}
                                </div>
                                <div className="w-full">
                                    <Select
                                        value={data.status}
                                        onChange={(value) =>
                                            setData("status", value)
                                        }
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        className="placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita  focus:ring-ungukita"
                                    >
                                        <Option value="draft">Draft</Option>
                                        <Option value="posted">Posted</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">{Language.date.name}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.date.description}
                                </div>
                                <Popover placement="bottom" trigger="click">
                                    <PopoverHandler>
                                        <Input
                                            type="text"
                                            placeholder="2023-05-12"
                                            icon={<CalendarDaysIcon />}
                                            value={
                                                data.accounting_date
                                                    ? format(
                                                        data.accounting_date,
                                                        "dd-MM-yyyy"
                                                    )
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const newDate = parse(
                                                    e.target.value,
                                                    "dd-MM-yyyy",
                                                    new Date()
                                                );

                                                if (!isNaN(newDate)) {
                                                    setData(
                                                        "accounting_date",
                                                        newDate
                                                    );
                                                }
                                            }}
                                            className="  placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={
                                                data.accounting_date
                                                    ? data.accounting_date
                                                    : new Date()
                                            }
                                            onSelect={(selectedDate) => {
                                                if (selectedDate) {
                                                    setData(
                                                        "accounting_date",
                                                        selectedDate
                                                    );
                                                }
                                            }}
                                            showOutsideDays
                                            className="border-0"
                                            classNames={{
                                                caption:
                                                    "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label:
                                                    "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous:
                                                    "absolute left-1.5",
                                                nav_button_next:
                                                    "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row:
                                                    "flex font-medium text-gray-900",
                                                head_cell:
                                                    "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today:
                                                    "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled:
                                                    "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-1 pb-4 bg-white shadow-md">
                            <div className="sm:col-span-2 w-full">
                                <label className="">{Language.account.name}</label>
                                <div className="w-full text-xs mb-2 text-gray-500">
                                    {Language.account.description}
                                </div>
                                <ReactSelect
                                    options={accountOptions}
                                    value={selectedAccount}
                                    onChange={(e) => {
                                        setSelectedAccount({
                                            value: e.value,
                                            label: e.label,
                                        });
                                    }}
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    }}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            boxShadow: state.isFocused ? 0 : 0,
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
                        <Card className="lg:overflow-auto overflow-x-scroll rounded-none px-6">
                            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                                <thead className="max-w-[20rem]">
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-gray-50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {journalItems.map(
                                        (
                                            {
                                                id,
                                                chart_of_account_name,
                                                order,
                                                label,
                                                debit,
                                                credit,
                                            },
                                            index
                                        ) => {
                                            const isLast =
                                                index ===
                                                journalItems.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {`${chart_of_account_name}`}
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
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        label
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        let newJournalItems =
                                                                            journalItems.filter(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    if (
                                                                                        item.order ===
                                                                                        order
                                                                                    ) {
                                                                                        item.label =
                                                                                            e.target.value;
                                                                                    }
                                                                                    return item;
                                                                                }
                                                                            );
                                                                        setJournalItems(
                                                                            newJournalItems
                                                                        );
                                                                    }}
                                                                    id="label"
                                                                    className="h-10 w-48 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                                />
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
                                                                <input
                                                                    type="number"
                                                                    value={
                                                                        debit
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        let newJournalItems =
                                                                            journalItems.filter(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    if (
                                                                                        item.order ===
                                                                                        order
                                                                                    ) {
                                                                                        item.debit =
                                                                                            parseInt(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            );
                                                                                    }
                                                                                    return item;
                                                                                }
                                                                            );
                                                                        setJournalItems(
                                                                            newJournalItems
                                                                        );
                                                                    }}
                                                                    id="debit"
                                                                    className="h-10 w-36 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                                />
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <input
                                                                type="number"
                                                                value={credit}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    let newJournalItems =
                                                                        journalItems.filter(
                                                                            (
                                                                                item
                                                                            ) => {
                                                                                if (
                                                                                    item.order ===
                                                                                    order
                                                                                ) {
                                                                                    item.credit =
                                                                                        parseInt(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        );
                                                                                }
                                                                                return item;
                                                                            }
                                                                        );
                                                                    setJournalItems(
                                                                        newJournalItems
                                                                    );
                                                                }}
                                                                id="credit"
                                                                className="h-10 w-36 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Tooltip content={Language.table.deletetooltip}>
                                                            <Button
                                                                size="sm"
                                                                variant="text"
                                                                onClick={() => {
                                                                    let newJournalItems =
                                                                        journalItems.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.order !==
                                                                                order
                                                                        );
                                                                    setJournalItems(
                                                                        newJournalItems
                                                                    );
                                                                }}
                                                            >
                                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                                            </Button>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </Card>
                        <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
                            <div className="pt-6 pr-5">
                                <Button
                                    type="submit"
                                    color="green"
                                    ripple="light"
                                >
                                    {Language.submitbutton}
                                </Button>
                                <Link
                                    color="red"
                                    ripple="dark"
                                    className="ml-4"
                                    href={route("journalentries")}
                                >
                                    {Language.cancelbutton}
                                </Link>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </AdditemLayout>
    );
}
