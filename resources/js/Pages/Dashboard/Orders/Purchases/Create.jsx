import AdditemLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { Head, useForm } from "@inertiajs/react";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import {
    Select,
    Option,
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Popover,
    PopoverContent,
    PopoverHandler,
    Avatar,
    IconButton,
    Tooltip,
    Breadcrumbs,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
    DocumentArrowDownIcon,
    DocumentChartBarIcon,
    CalendarDaysIcon,
    QrCodeIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { data } from "autoprefixer";

const TABLE_HEAD = [
    "SKU",
    "Item",
    "Quantity",
    "Unit price",
    "Disc",
    "Total",
    "",
];
const TABLE_ROWS = [
    {
        SKU: "BW-CB-001",
        item: "Carbon Block CTO Kirei 10 inch",
        quantity: "50",
        unitprice: "25,000.00",
        disc: "0",
        total: "1,250,000.00",
    },
];

export default function CreatePurchaseOrder({ auth, products, vendors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vendor_id: null,
        reference: "",
        status: "posted",
        create_date: format(new Date(), "dd-MM-yyyy"),
    });

    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [date, setDate] = useState(new Date());
    const [vendorOptions, setVendorOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    useEffect(() => {
        setVendorOptions(
            vendors.map((vendor) => ({
                value: vendor.id,
                label: vendor.name,
                code: vendor.code,
                quantity: 0,
                price: vendor.price,
            }))
        );

        setProductOptions(
            products.map((product) => ({
                value: product.id,
                label: product.name,
            }))
        );
    }, []);

    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        if (selectedProduct) {
            setListProduct([
                ...listProduct,
                {
                    id: null,
                    code: selectedProduct.code,
                    order: listProduct.length,
                    product_id: selectedProduct.value,
                    product_name: selectedProduct.label,
                    quantity: 0,
                    price: 0,
                    discount: 0,
                },
            ]);
        }
        setSelectedProduct(null);
    }, [selectedProduct]);

    useEffect(() => {
        setData("products", listProduct);
    }, [listProduct]);

    let ProductList = [];

    products.forEach((product) => {
        ProductList.push({
            code: product.code,
            value: product.id,
            label: product.name,
        });
    });

    const mainTotal = listProduct.reduce((sum, product) => {
        const total = product.stock * product.price - product.discount;
        return sum + total;
    }, 0);
    const formattedMainTotal = isNaN(mainTotal)
        ? "0"
        : mainTotal.toLocaleString("de-DE");

    const actionSubmit = (e) => {
        e.preventDefault();
        post(route("purchases.store"));
    };

    return (
        <AdditemLayout user={auth.user}>
            <Head title="Add item" />
            <div className="sm:min-h-screen sm:mt-18 sm:mb-20 mt-12 mb-0  justify-center ml-0 lg:ml-[300px] sm:mr-1">
                <div className="mx-auto px-4 sm:px-6 lg:px-6 w-full sm:mt-28">
                    <div className="w-full mx-auto pb-5">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <Typography
                                    variant="h4"
                                    className="text-ungukita"
                                    textGradient
                                >
                                    Add Purchases
                                </Typography>
                                <Typography variant="paragraph">
                                    Add order purchases here
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={actionSubmit}>
                        <div className="w-full gap-2 md:justify-between shadow-md px-4 pt-6 pb-4 bg-white grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label className="">Vendor</label>
                                <ReactSelect
                                    options={vendorOptions}
                                    value={data.vendor_id}
                                    onChange={(value) => {
                                        setData("vendor_id", value);
                                    }}
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    }}
                                    placeholder={"Search"}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            boxShadow: state.isFocused ? 0 : 0,
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
                                <div></div>
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">Reference</label>
                                <Input
                                    type="input"
                                    value={data.reference}
                                    onChange={(e) => {
                                        setData("reference", e.target.value);
                                    }}
                                    placeholder="Reference"
                                    className="  placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">Creation Date</label>
                                <Input
                                    type="search"
                                    value={data.create_date}
                                    onChange={(value) => {
                                        setData("create_date", value);
                                    }}
                                    placeholder="14-5-2023"
                                    disabled
                                    className=" placeholder:text-gray-600 focus:!border-ungukita focus:ring-ungukita placeholder:opacity-100 !border-t-blue-gray-200"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="">Status</label>
                                <div className="w-full">
                                    <Select
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        value={data.status}
                                        onChange={(value) =>
                                            setData("status", value)
                                        }
                                        className="placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita  focus:ring-ungukita"
                                    >
                                        <Option value="draft">Draft</Option>
                                        <Option value="posted">Posted</Option>
                                        <Option value="pending">Pending</Option>
                                        <Option value="canceled">
                                            Canceled
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex w-full gap-2 md:justify-between px-4 pt-1 pb-4 bg-white shadow-md">
                            <div className="sm:col-span-2 w-full">
                                <label className="">Product Name</label>
                                <ReactSelect
                                    options={ProductList}
                                    value={selectedProduct}
                                    onChange={(e) => {
                                        setSelectedProduct({
                                            value: e.value,
                                            label: e.label,
                                        });
                                    }}
                                    components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    }}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            boxShadow: state.isFocused ? 0 : 0,
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
                            </div>
                        </div>
                        <Card className="lg:overflow-auto overflow-x-scroll rounded-none px-6">
                            <table className="w-full min-w-max lg:min-w-full table-auto text-left">
                                <thead className="max-w-[20rem]">
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-gray-50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProduct.map(
                                        (
                                            {
                                                id,
                                                code,
                                                order,
                                                product_id,
                                                product_name,
                                                quantity,
                                                stock,
                                                price,
                                                discount,
                                            },
                                            index
                                        ) => {
                                            const correspondingProduct =
                                                ProductList.find(
                                                    (product) =>
                                                        product.value ===
                                                        product_id
                                                );
                                            const itemcode =
                                                correspondingProduct.code;

                                            const totalValue =
                                                stock * price - discount;
                                            const total = isNaN(totalValue)
                                                ? "0"
                                                : totalValue.toLocaleString(
                                                      "de-DE"
                                                  );

                                            const isLast =
                                                index === TABLE_ROWS.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {itemcode}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {product_name}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                <input
                                                                    type="number"
                                                                    id="Quantity"
                                                                    class="h-10 w-16 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        const newListProduct =
                                                                            [
                                                                                ...listProduct,
                                                                            ];
                                                                        newListProduct[
                                                                            index
                                                                        ].quantity =
                                                                            Number(
                                                                                event
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        setListProduct(
                                                                            newListProduct
                                                                        );
                                                                    }}
                                                                />
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <input
                                                                type="number"
                                                                id="UnitPrice"
                                                                class="h-10 w-25 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newListProduct =
                                                                        [
                                                                            ...listProduct,
                                                                        ];
                                                                    newListProduct[
                                                                        index
                                                                    ].price =
                                                                        Number(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        );
                                                                    setListProduct(
                                                                        newListProduct
                                                                    );
                                                                }}
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <input
                                                                type="number"
                                                                id="Discount"
                                                                class="h-10 w-16 rounded border-gray-200 text-center sm:text-sm focus:border-ungukita"
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    const newListProduct =
                                                                        [
                                                                            ...listProduct,
                                                                        ];
                                                                    newListProduct[
                                                                        index
                                                                    ].discount =
                                                                        Number(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        );
                                                                    setListProduct(
                                                                        newListProduct
                                                                    );
                                                                }}
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            Rp{total}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-2 border-b border-gray-200 pl-4">
                                                        <Tooltip content="Delete">
                                                            <Button
                                                                size="sm"
                                                                variant="text"
                                                                onClick={() => {
                                                                    const newList =
                                                                        listProduct.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.order !==
                                                                                order
                                                                        );
                                                                    setListProduct(
                                                                        newList
                                                                    );
                                                                    setSelectedProduct(
                                                                        null
                                                                    );
                                                                }}
                                                            >
                                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                                            </Button>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </Card>
                        <Card className="flex bg-white rounded-none">
                            <div className="w-full gap-2 md:justify-between shadow-md px-4 pt-6 pb-4 bg-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                                {/* <div>
                                <label className="">Discount</label>
                                <Input
                                    type="search"
                                    placeholder="Discount"
                                    className="w-full placeholder:opacity-100 placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <div>
                                <label className="">Shipping</label>
                                <Input
                                    type="search"
                                    placeholder="Shipping"
                                    className="w-full placeholder:opacity-100 placeholder:text-gray-600 !border-t-blue-gray-200 focus:!border-ungukita focus:ring-ungukita"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                />
                            </div> */}
                                {/* <div>
                                <label className="">Status</label>
                                <div className="w-full">
                                    <Select
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        className="placeholder:text-gray-600 placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-ungukita  focus:ring-ungukita"
                                    >
                                        <Option value="draft">Draft</Option>
                                        <Option value="posted">Posted</Option>
                                    </Select>
                                </div>
                            </div> */}
                            </div>
                        </Card>
                        <Card className="h-full w-full overflow-hidden rounded-none p-6 items-end">
                            <div className="flex justify-between items-center">
                                <div></div>
                                <table className="border-gray-300 border-t">
                                    {/* <tr>
                                    <td className="pl-4">Discount</td>
                                    <td className="">:</td>
                                    <td className="pl-4">0%</td>
                                </tr> */}
                                    {/* <tr>
                                    <td className="pl-4">Shipping</td>
                                    <td className="">:</td>
                                    <td className="pl-4">0</td>
                                </tr> */}
                                    <tr>
                                        <td className="pl-4">Total</td>
                                        <td className="">:</td>
                                        <td className="pl-4">
                                            Rp{formattedMainTotal}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="pt-6 pr-5">
                                <Button
                                    type="submit"
                                    color="green"
                                    ripple="light"
                                    disabled={!data.status}
                                >
                                    Submit
                                </Button>
                                <a href="/purchases">
                                    <Button
                                        color="red"
                                        ripple="dark"
                                        className="ml-4"
                                    >
                                        Cancel
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </AdditemLayout>
    );
}
