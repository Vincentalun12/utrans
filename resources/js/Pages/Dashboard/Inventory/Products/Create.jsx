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

export default function AddProduct({ auth, brands }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        brand_id: brands[0]?.id,
        description: "",
        retail_price: "",
        whole_sale_price: "",
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Add Product" />
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
                        <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
                            <form onSubmit={actionSubmit}>
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Name and brands
                                    </div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Name"
                                            name="name"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input your product name"
                                            value={data.name}
                                            onChange={(e) => {
                                                setData("name", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is
                                        suitable for the item you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <label className="">Brand</label>
                                        <Select
                                            name="brand_id"
                                            value={data.brand_id}
                                            onChange={(e) => {
                                                setData(
                                                    "brand_id",
                                                    e.target.value
                                                );
                                            }}
                                            variant="static"
                                            placeholder="Select brand from the following.."
                                        >
                                            {brands.map(
                                                ({ id, name }, index) => (
                                                    <Option key={id} value={id}>
                                                        {name}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the name of your brands that is
                                        suitable for the item you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full">
                                        <Textarea
                                            name="description"
                                            value={data.description}
                                            onChange={(e) => {
                                                setData(
                                                    "description",
                                                    e.target.value
                                                );
                                            }}
                                            variant="static"
                                            label="Description"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input your retail price"
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *Provide the Description of your
                                        products that is suitable for the item
                                        you are selling.
                                    </div>
                                </div>
                                <div>
                                    <div className="p-2 text-black font-bold text-xl mb-2">
                                        Prices
                                    </div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            label="Retail"
                                            type="number"
                                            name="retail_price"
                                            value={data.retail_price}
                                            onChange={(e) => {
                                                setData(
                                                    "retail_price",
                                                    e.target.value
                                                );
                                            }}
                                            className="border-none focus:shadow-none"
                                            placeholder="Input your retail price"
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *For each items.
                                    </div>
                                </div>
                                <div>
                                    <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                        <Input
                                            variant="static"
                                            type="number"
                                            name="whole_sale_price"
                                            value={data.whole_sale_price}
                                            onChange={(e) => {
                                                setData(
                                                    "whole_sale_price",
                                                    e.target.value
                                                );
                                            }}
                                            label="Whole Sale"
                                            className="border-none focus:shadow-none"
                                            placeholder="Input your whole sale price"
                                        />
                                    </div>
                                    <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                        *For each items.
                                    </div>
                                </div>

                                {/* <div>
                                <div className="mx-2 border-b lg:w-4/6 w-full border-black hover:border-b-2">
                                    <Input
                                        variant="static"
                                        label="Stocks"
                                        className="border-none focus:shadow-none"
                                        placeholder="Input your stocks"
                                    />
                                </div>
                                <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                    *Put your stock x1.
                                </div>
                            </div> */}
                                {/* <div>
                                <div className="p-2 text-black font-bold text-xl mb-2">
                                    Product image
                                </div>
                                <div className="mx-2">
                                    <label className="flex justify-center items-center outline-dashed outline-2 outline-offset-2 px-4 py-4 h-48 lg:h-64 lg:w-4/6 w-full hover:outline-blue-800 hover:text-blue-800">
                                        <div className="flex flex-col items-center justify-center">
                                            <PlusCircleIcon className="h-6 w-6" />
                                            <div className="">Add image</div>
                                        </div>
                                        <input
                                            className="cursor-pointer hidden"
                                            type="file"
                                        />
                                    </label>
                                </div>
                                <div className="lg:w-4/6 w-full text-xs p-3 text-gray-500">
                                    *SVG, PNG, JPG or GIF (MAX. 300x300px or 1:1
                                    ratio)
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
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}
