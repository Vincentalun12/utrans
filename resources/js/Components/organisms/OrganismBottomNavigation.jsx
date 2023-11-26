import {
    Button,
} from "@material-tailwind/react";

import {
    HomeIcon,
    ArchiveBoxIcon,
    ChartBarIcon,
    UserGroupIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/solid";

export function OrganismBottomNavigation() {
    return (
        <div className="fixed bottom-0 w-full lg:hidden inline-flex justify-between bg-white">
            <div className="grid grid-cols-5 items-center flex-grow">
                <Button
                    variant="text"
                    className="inline-flex flex-col items-center justify-center font-medium py-3 px-4 text-ungukita rounded-none"
                    href="#"
                >
                    <HomeIcon className="w-7 h-7" />
                    <span className="">Dashboard</span>
                </Button>
                <Button
                    variant="text"
                    size="xs"
                    className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                    href="#"
                >
                    <ArchiveBoxIcon className="w-7 h-7" />
                    <span className="">Inventory</span>
                </Button>
                <button className="inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 rounded-none">
                    <div className="absolute bottom-5 p-4 border-4 rounded-full bg-ungukita shadow-md shadow-blue-gray-200">
                        <Squares2X2Icon className="w-7 h-7" />
                    </div>
                </button>
                <Button
                    variant="text"
                    size="xs"
                    className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                    href="#"
                >
                    <ChartBarIcon className="w-7 h-7" />
                    <span className="">Customers</span>
                </Button>
                <Button
                    variant="text"
                    size="xs"
                    className="inline-flex flex-col items-center font-medium text-ungukita py-3 px-4 rounded-none"
                    href="#"
                >
                    <UserGroupIcon className="w-7 h-7" />
                    <span className="">Profile</span>
                </Button>
            </div>
        </div>
    )
}