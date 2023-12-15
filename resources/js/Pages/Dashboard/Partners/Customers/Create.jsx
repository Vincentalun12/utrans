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

export default function AddCustomer({ auth }) {
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
        post(route("customers.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Create Customer" />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                <div className="w-full mx-auto pb-5">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <Typography variant="h4" className="text-ungukita" textGradient>
                            Create Data Customer
                        </Typography>
                        <Typography variant="paragraph">
                            Create your loyal customers data to be used for sales.
                        </Typography>
                        </div>
                    </div>
                </div>
                
                    <Card className="h-full w-full overflow-hidden rounded-none pb-4">
                        <form onSubmit={actionSubmit}>
                        <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <Typography className="col-span-2" variant="h4">Customer Information</Typography>
                                <div className="sm:col-span-2">
                                    <Typography>Customer Name</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Provide the name customer name
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder="Name"
                                            value={data.name}
                                            onChange={(e) => {
                                                setData("name", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <div className="sm:col-span-1">
                                    <Typography>Phone Number</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Please use 08xxxxxxxxxx format. Leave blank if unknown.
                                    </div>
                                        <Input
                                            type="number"
                                            placeholder="08xxxxxxxxxx"
                                            value={data.phone}
                                            onChange={(e) => {
                                                setData("phone", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <div className="sm:col-span-1">
                                    <Typography>Email Address</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Provide the customer's email address. Leave blank if unknown.
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder="name@mail.com"
                                            value={data.email}
                                            onChange={(e) => {
                                                setData("email", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <hr className="w-full col-span-2"></hr>
                                <Typography className="col-span-2" variant="h4">Address Information</Typography>
                                <div className="sm:col-span-2">
                                    <Typography>Address</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Provide the customer's address. Leave blank if unknown.
                                    </div>
                                    <Textarea
                                            type="input"
                                            size="md"
                                            placeholder="Address"
                                            value={data.address}
                                            onChange={(e) => {
                                                setData("address", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <div className="sm:col-span-1">
                                    <Typography>District</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Could be city, regency, or district, Leave blank if unknown.
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder="District"
                                            value={data.district}
                                            onChange={(e) => {
                                                setData("district", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <div className="sm:col-span-1">
                                    <Typography>City</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        * Blankable
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder="Province"
                                            value={data.city}
                                            onChange={(e) => {
                                                setData("city", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
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
                        </form>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}
