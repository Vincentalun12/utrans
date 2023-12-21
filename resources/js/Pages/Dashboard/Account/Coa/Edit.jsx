import AdditemLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import { Language } from "@/Languages/Accounting/COA/COACreate";
import { Head, useForm } from "@inertiajs/react";
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

export default function EditCoa({ auth, coa }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const { data, setData, patch, processing, errors, reset } = useForm({
        code: coa.code,
        account_name: coa.account_name,
        account_type: coa.account_type,
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        patch(route("coa.update", coa.id));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Create Coa" />
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
                                <div className="col-span-2 lg:col-span-2">
                                    <Typography>{Language.journaltype.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.journaltype.description}
                                    </div>
                                    <Select
                                            variant="outlined"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                            className="placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita  focus:ring-ungukita"
                                            value={data.account_type}
                                            onChange={(value) =>
                                                setData("account_type", value)
                                            }
                                        >
                                            <Option value="bank_and_cash">
                                                Bank and Cash
                                            </Option>
                                            <Option value="liabilites">
                                                Liabilities
                                            </Option>
                                            <Option value="current_assets">
                                                Current Assets
                                            </Option>
                                            <Option value="fixed_assets">
                                                Fixed Assets
                                            </Option>
                                            <Option value="income">
                                                Income
                                            </Option>
                                            <Option value="expense">
                                                Expense
                                            </Option>
                                            <Option value="cost_of_revenue">
                                                Cost Of Revenue
                                            </Option>
                                        </Select>
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
                                            value={data.account_name}
                                            onChange={(e) =>
                                                setData(
                                                    "account_name",
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
                                        disabled={!data.account_type || !data.account_name}
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
