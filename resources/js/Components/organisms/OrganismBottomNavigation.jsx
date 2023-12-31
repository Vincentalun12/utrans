import { useState } from "react";
import { ApplicationLogo2 } from "@/Components";
import { LinkActiveTheme } from "@/Themes";
import Linkactive from "@/Components/Linkactive";
import {
    Button,
} from "@material-tailwind/react";

import {
    HomeIcon,
    ArchiveBoxIcon,
    ChartBarIcon,
    UserGroupIcon,
    Squares2X2Icon,
    XMarkIcon,
    Cog6ToothIcon,
    ComputerDesktopIcon,
    ClipboardIcon,
    ShoppingCartIcon,
    CalculatorIcon,
    ShoppingBagIcon,
    TagIcon,
} from "@heroicons/react/24/solid";

export function OrganismBottomNavigation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsNavVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsNavVisible(true);
    };

    return (
        <div className="fixed bottom-0 w-full lg:hidden inline-flex justify-between bg-white z-50">
            {isNavVisible && (
                <div className="grid grid-cols-5 items-center flex-grow">
                    <Button
                        variant="text"
                        className="inline-flex flex-col items-center justify-center font-medium py-3 px-4 text-ungukita rounded-none"
                        onClick={() => window.location.href='/home'}
                    >
                        <HomeIcon className="w-7 h-7" />
                        <span className="">Home</span>
                    </Button>
                    <Button
                        variant="text"
                        size="xs"
                        className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                        onClick={() => window.location.href='/products'}
                    >
                        <ArchiveBoxIcon className="w-7 h-7" />
                        <span className="">Inven</span>
                    </Button>
                    <button onClick={handleOpenModal} className="inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 rounded-none">
                        <div className="absolute bottom-5 p-4 border-4 rounded-full bg-ungukita shadow-md shadow-blue-gray-200">
                            <Squares2X2Icon className="w-7 h-7" />
                        </div>
                    </button>
                    <Button
                        variant="text"
                        size="xs"
                        className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                        onClick={() => window.location.href='/sales'}
                    >
                        <ChartBarIcon className="w-7 h-7" />
                        <span className="">Order</span>
                    </Button>
                    <Button
                        variant="text"
                        size="xs"
                        className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                        onClick={() => window.location.href='/customers'}
                    >
                        <UserGroupIcon className="w-7 h-7" />
                        <span className="">Partner</span>
                    </Button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md z-50">
                <div className="bg-white p-4 m-2 rounded-2xl w-full h-2/3 overflow-auto">
                    <div className="block pl-4 pt-2 text-lg text-black font-bold">Menu</div>
                    <div className="grid grid-cols-4 gap-4 mt-4 overflow-x-hidden">
                    
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/products'}>
                            <ArchiveBoxIcon className="w-7 h-7" />
                            <span className="text-[10px]">Product</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/brand'}>
                            <TagIcon className="w-7 h-7" />
                            <span className="text-[10px]">Brands</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/purchases'}>
                            <ShoppingBagIcon className="w-7 h-7" />
                            <span className="text-[10px]">Purchases</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/sales'}>
                            <ShoppingCartIcon className="w-7 h-7" />
                            <span className="text-[10px]">Sales</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/balancesheet'}>
                            <ClipboardIcon className="w-7 h-7" />
                            <span className="text-[10px]">Reports</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/coa'}>
                            <CalculatorIcon className="w-7 h-7" />
                            <span className="text-[10px]">Accounting</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/customers'}>
                            <UserGroupIcon className="w-7 h-7" />
                            <span className="text-[10px]">Customer</span>
                        </Button>
                        <Button variant="text" className="inline-flex flex-col items-center" onClick={() => window.location.href='/settings'}>
                            <Cog6ToothIcon className="w-7 h-7" />
                            <span className="text-[10px]">Settings</span>
                        </Button>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleCloseModal} className="inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 rounded-none">
                            <div className="absolute bottom-5 p-4 border-4 rounded-full bg-ungukita shadow-md shadow-blue-gray-200">
                                <XMarkIcon className="w-7 h-7" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
)
}