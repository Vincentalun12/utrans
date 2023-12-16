import AdditemLayout from "@/Layouts/NavigationLayout";
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
import ReactSelect from "react-select";

export default function Createjournals({ auth, accounts }) {
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
                    <Card className="h-full w-full overflow-hidden rounded-none">
                        <form onSubmit={actionSubmit}>
                            <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Create Journals
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Short code"
                                            className="border-none focus:shadow-none"
                                            placeholder="Short code"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData("code", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please enter short code.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Journal Name"
                                            className="border-none focus:shadow-none"
                                            placeholder="Journal Name"
                                            value={data.journal_name}
                                            onChange={(e) =>
                                                setData(
                                                    "journal_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please enter journal name.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <label className="">Type</label>
                                        <Select
                                            variant="static"
                                            value={data.journal_type}
                                            onChange={(value) =>
                                                setData("journal_type", value)
                                            }
                                        >
                                            <Option value="sales">Sales</Option>
                                            <Option value="purchase">
                                                Purchase
                                            </Option>
                                            <Option value="cash">Cash</Option>
                                            <Option value="bank">Bank</Option>
                                            <Option value="general">
                                                General
                                            </Option>
                                        </Select>
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please select any from the above.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full">
                                        <label className="">
                                            Chart of Account
                                        </label>
                                        <ReactSelect
                                            options={options}
                                            placeholder={"Select..."}
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
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please select any from the above.
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full lg:w-4/6 h-12 bg-ungukita"
                                    >
                                        Save
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
