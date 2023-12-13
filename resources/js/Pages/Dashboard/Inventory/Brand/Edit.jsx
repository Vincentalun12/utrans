import AdditemLayout from "@/Layouts/NavigationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    Select,
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
import { useEffect } from "react";

export default function EditBrand({ auth, brand }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: brand.name,
        number: brand.number,
        email: brand.email,
        website: brand.website,
    });

    const actionSubmit = (e) => {
        e.preventDefault();

        patch(route('brands.update', brand.id));
    }

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Create Brand" />
      <div className="sm:mt-18 sm:mb-20 mt-12 mb-0 justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
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
                                    <div className="p-2 text-black font-bold text-xl mb-2">Brands</div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input variant="static" type="text" label="Name" className='border-none focus:shadow-none' placeholder="Input your product name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required="true" />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is suitable for the
                                        item you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input variant="static" type="number" label="Number" className='border-none focus:shadow-none' placeholder="Input your product number" name="number" value={data.number} onChange={(e) => setData('number', e.target.value)} />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is suitable for the
                                        item you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input variant="static" type="email" label="Email" className='border-none focus:shadow-none' placeholder="Input your product email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is suitable for the
                                        item you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input variant="static" type="text" label="Website" className='border-none focus:shadow-none' placeholder="Input your product website" name="website" value={data.website} onChange={(e) => setData('website', e.target.value)} />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is suitable for the
                                        item you are selling.
                                    </div>
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
                                <div>
                                    <Button className="w-full lg:w-4/6 h-12 bg-ungukita" type="submit">Save</Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}