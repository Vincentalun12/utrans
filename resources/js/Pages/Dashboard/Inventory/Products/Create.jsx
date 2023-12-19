import AdditemLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";
import Select from "react-select";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
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
        sales_price: "",
    });

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Add Product" />
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
                                    Create Products
                                </Typography>
                                <Typography variant="paragraph">
                                    Create your Products to be sold on your
                                    store
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <Card className="h-full w-full rounded-md overflow-hidden pb-4">
                        <form onSubmit={actionSubmit}>
                            <div className="grid lg:gap-8 grid-cols-1 gap-4 p-4 mx-4 mt-5">
                                <div className="sm:col-span-1">
                                    <Typography>Product Name</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        *Provide the name of your brands that is
                                        suitable for the item you are selling.
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
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="sm:col-span-1">
                                    <Typography>Brand</Typography>
                                    <div className="w-full text-xs mb-2 text-gray-500">
                                        *Pick up the brand of your product, if
                                        you haven't added any brand, you can add
                                        it{" "}
                                        <a
                                            href="/brand/"
                                            className="text-blue-500"
                                        >
                                            here
                                        </a>
                                    </div>
                                    <Select
                                        value={
                                            brands.find(
                                                (brand) =>
                                                    brand.id === data.brand_id
                                            )
                                                ? {
                                                      value: data.brand_id,
                                                      label: brands.find(
                                                          (brand) =>
                                                              brand.id ===
                                                              data.brand_id
                                                      ).name,
                                                  }
                                                : null
                                        }
                                        onChange={(selectedOption) => {
                                            setData(
                                                "brand_id",
                                                selectedOption.value
                                            );
                                        }}
                                        options={brands.map((brand) => ({
                                            value: brand.id,
                                            label: brand.name,
                                        }))}
                                        placeholder={
                                            "Select brands from the following.."
                                        }
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
                                    {errors.brand_id && (
                                        <p className="text-red-500 text-sm">
                                            {errors.brand_id}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <div className="sm:col-span-1">
                                        <Typography>Description</Typography>
                                        <div className="w-full text-xs mb-2 text-gray-500">
                                            *Provide the description or notes
                                            you want to added on the product
                                        </div>
                                        <Textarea
                                            type="input"
                                            size="md"
                                            placeholder="Description"
                                            value={data.description}
                                            onChange={(e) => {
                                                setData(
                                                    "description",
                                                    e.target.value
                                                );
                                            }}
                                            className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                            labelProps={{
                                                className:
                                                    "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="col-span-2 lg:col-span-2">
                                        <Typography>Sales Price</Typography>
                                        <div className="w-full text-xs mb-2 text-gray-500">
                                            * Input your Sales Price
                                        </div>
                                        <div className="flex">
                                            <Button
                                                ripple={false}
                                                variant="text"
                                                color="blue-gray"
                                                className="normal-case text-bold h-10 flex items-center rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-3"
                                            >
                                                Rp
                                            </Button>
                                            <div className="relative flex-grow">
                                                <Input
                                                    type="number"
                                                    value={data.sales_price}
                                                    onChange={(e) => {
                                                        setData(
                                                            "sales_price",
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="placeholder:text-gray-600 rounded-tl-none rounded-bl-none placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                                    labelProps={{
                                                        className:
                                                            "before:content-none after:content-none",
                                                    }}
                                                />
                                                {errors.sales_price && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors.sales_price}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 pt-8">
                                        <Button
                                            fullWidth
                                            type="submit"
                                            className="bg-ungukita"
                                            disabled={!data.name}
                                        >
                                            Save
                                        </Button>
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
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AdditemLayout>
    );
}
