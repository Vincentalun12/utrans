import AdditemLayout from "@/Layouts/NavigationLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Language } from "@/Languages/Inventory/Brand/BrandCreate";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    Option,
    Label,
    Textarea
} from "@material-tailwind/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    PlusCircleIcon
} from "@heroicons/react/24/solid";

export default function CreateBrand({ auth }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        number: '',
        email: '',
        website: '',
    });

    const actionSubmit = (e) => {
        e.preventDefault();

        post(route('brands.store'));
    }

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
                    <Card className="h-full w-full rounded-md overflow-hidden pb-4">
                        <form onSubmit={actionSubmit}>
                            <div className="grid lg:gap-8 lg:grid-cols-1 xl:grid-cols-4 gap-4 p-4 mx-4 mt-5">
                            <div className="sm:col-span-2">
                                    <Typography>{Language.title}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.description}
                                    </div>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder={Language.brand.placeholder}
                                            value={data.name}
                                            onChange={(e) => {
                                                setData("name", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <Typography>{Language.productnumber.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.productnumber.description}
                                    </div>
                                        <Input
                                            type="number"
                                            name="number"
                                            placeholder={Language.productnumber.placeholder}
                                            value={data.number}
                                            onChange={(e) => {
                                                setData("number", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                <div className="sm:col-span-2">
                                    <Typography>{Language.emailaddress.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.emailaddress.description}
                                    </div>
                                        <Input
                                            type="text"
                                            name="email"
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
                                <div className="sm:col-span-2">
                                    <Typography>{Language.website.name}</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        {Language.website.description}
                                    </div>
                                        <Input
                                            type="text"
                                            name="Website"
                                            placeholder={Language.website.placeholder}
                                            value={data.website}
                                            onChange={(e) => {
                                                setData("website", e.target.value);
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                </div>
                                {/* <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">Product image</div>
                                    <div className="mx-2">
                                        <label className="flex justify-center items-center outline-dashed outline-2 outline-offset-2 px-4 py-4 h-48 lg:h-64 lg:w-4/6 w-full hover:outline-blue-800 hover:text-blue-800">
                                            <div className="flex flex-col items-center justify-center">
                                                <PlusCircleIcon className="h-6 w-6" />
                                                <div className="">Add image</div>
                                            </div>
                                            <input className="cursor-pointer hidden" type="file" name="logo" onChange={(e) => setData('logo', e.target.files[0])} />
                                        </label>
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *SVG, PNG, JPG or GIF (MAX. 300x300px or 1:1 ratio)
                                    </div>
                                </div> */}
                                <div className="sm:col-span-4 pt-8">
                                    <Button
                                        fullWidth
                                        type="submit"
                                        className="bg-ungukita"
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