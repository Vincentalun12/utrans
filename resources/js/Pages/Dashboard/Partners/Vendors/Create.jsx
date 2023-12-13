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

export default function AddVendor({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        district: "",
        city: "",
        province: "",
        email: "",
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("vendors.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Add Vendor" />
      <div className="sm:min-h-screen sm:mt-18 sm:mb-20 mt-12 mb-0 flex justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-14">
                    <div className="lg:hidden flex justify-between">
                        <Breadcrumbs>
                            <a href="#" className="opacity-60">
                                Dashboard
                            </a>
                            <a href="#" className="Opacity-60">
                                Stock
                            </a>
                            <a href="#">Edit</a>
                        </Breadcrumbs>
                    </div>
                    <Card className="h-full w-full overflow-hidden rounded-none">
                        <form onSubmit={actionSubmit}>
                            <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Vendor Information
                                    </div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            type="text"
                                            label="Vendor Name"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's full name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required={true}
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *If doesn't know the real name, type the
                                        nickname.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            type="number"
                                            label="Phone Number"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's phone number"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Please use 08xxxxxxxxxx format.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            type="email"
                                            label="Email Address"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's email address"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Address Information
                                    </div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Address"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's address"
                                            value={data.address}
                                            name="address"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex mx-2 border-b lg:w-4/6 w-full border-black">
                                        <Input
                                            variant="static"
                                            label="District"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's district"
                                            value={data.district}
                                            name="district"
                                            onChange={(e) =>
                                                setData(
                                                    "district",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            variant="static"
                                            label="City"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input vendor's city"
                                            name="city"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div>
								<div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
									<label className="">Province</label>
									<Select variant="static" placeholder="Select brand from the following..">
										<Option>1</Option>
										<Option>2</Option>
										<Option>3</Option>
										<Option>4</Option>
										<Option>5</Option>
									</Select>
								</div>
								<div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
									*Please select any from the above.
								</div>
							</div> */}
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
