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

export default function CreateCoa({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: "",
        account_name: "",
        account_type: "bank_and_cash",
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("coa.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Create Coa" />
            <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    <Card className="h-full w-full overflow-hidden rounded-none">
                        <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
                            <form onSubmit={actionSubmit}>
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Create Charts of Account
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Code"
                                            className="border-none focus:shadow-none"
                                            placeholder="Account Code"
                                            required={true}
                                            value={data.code}
                                            onChange={(e) =>
                                                setData("code", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please enter account name.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Account name"
                                            className="border-none focus:shadow-none"
                                            placeholder="Account Name"
                                            required={true}
                                            value={data.account_name}
                                            onChange={(e) =>
                                                setData(
                                                    "account_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please enter account name.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <label className="">Type</label>
                                        <Select
                                            variant="static"
                                            value={data.account_type}
                                            onChange={(value) =>
                                                setData("account_type", value)
                                            }
                                        >
                                            <Option value="bank_and_cash">
                                                Bank and Cash
                                            </Option>
                                            <Option value="receivable">
                                                Receivable
                                            </Option>
                                            <Option value="payable">
                                                Payable
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
                                        </Select>
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
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}
