import AdditemLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Language } from "@/Languages/Partners/Vendors/VendorCreate";
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

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

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
            <Head title={Language.title} />
      <div className="sm:mt-18 sm:mb-20 mt-4 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                <div className="w-full mx-auto pb-5">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <Typography variant="h4" className="text-ungukita" textGradient>
                            {Language.title}
                        </Typography>
                        <Typography variant="paragraph">
                            {Language.description}
                        </Typography>
                        </div>
                    </div>
                </div>
                
                    <Card className="h-full w-full overflow-hidden rounded-none pb-4">
                        <form onSubmit={actionSubmit}>
                        <div className="grid grid-cols-2 gap-5 m-3 px-6">
                                <Typography className="col-span-2" variant="h4">{Language.vendor.generalinformation}</Typography>
                                <div className="col-span-2 lg:col-span-2">
                                    <Typography>{Language.vendor.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.vendor.description}
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder={Language.vendor.placeholder}
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
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.phonenumber.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.phonenumber.description}
                                    </div>
                                        <Input
                                            type="number"
                                            placeholder={Language.phonenumber.placeholder}
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
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.emailaddress.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.emailaddress.description}
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder={Language.emailaddress.placeholder}
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
                                <Typography className="col-span-2" variant="h4">{Language.vendor.generalinformation}</Typography>
                                <div className="sm:col-span-2">
                                    <Typography>{Language.address.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.address.description}
                                    </div>
                                    <Textarea
                                            type="input"
                                            size="md"
                                            placeholder={Language.address.placeholder}
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
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.district.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.district.description}
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder={Language.district.placeholder}
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
                                <div className="col-span-2 lg:col-span-1">
                                    <Typography>{Language.city.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.city.description}
                                    </div>
                                        <Input
                                            type="input"
                                            placeholder={Language.city.placeholder}
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
                                        disabled={!data.name}
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
