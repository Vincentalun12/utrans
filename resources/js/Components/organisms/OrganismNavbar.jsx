import { ApplicationLogo2, MoleculesDropdown } from "@/Components";
import { Link } from "@inertiajs/react";
import {
    Typography,
    Breadcrumbs,
    Button,
    Tooltip,
    Menu,
    MenuHandler,
    MenuList,
} from "@material-tailwind/react";

import { UserCircleIcon } from "@heroicons/react/24/solid";

export function OrganismNavbar({ user }) {
    return (
        <nav className="w-full max-w-auto bg-white sticky sm:fixed top-0 z-20">
            <div className="mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between shrink-0 items-center">
                    <div className="mb-2 p-2 w-full flex justify-center lg:hidden">
                        <ApplicationLogo2 />
                    </div>
                    <div className="hidden lg:flex px-10">
                    </div>
                    <MoleculesDropdown>
                        <Tooltip
                            placement="left"
                            content={"Hello, " + user.name}
                        >
                            <Menu
                                placement="bottom-end"
                                animate={{ mount: { y: 0 }, unmount: { y: -5 }, }}>
                                <MenuHandler>
                                    <span className="inline-flex rounded-md">
                                        <Button
                                            variant="filled"
                                            className="lg:inline-flex items-center px-4 py-1.5 border border-transparent text-md font-medium rounded-2xl text-white bg-ungukita hidden"
                                        >
                                            <span>
                                                <UserCircleIcon className="h-7 w-7 mr-2" />
                                            </span>
                                            {user.name}
                                        </Button>
                                    </span>
                                </MenuHandler>
                                <MenuList>
                                    <button
                                        className="flex w-full px-4 py-2 bg-white shadow-none rounded-md duration-300 stroke-none align-left hover:bg-gray-100">
                                        <Link className="flex gap-2 items-center"
                                            href={route("profile.edit")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

                                            <Typography variant="small" className="font-bold text-gray-700" >
                                                Profile
                                            </Typography>
                                        </Link>
                                    </button>
                                    <button
                                        className="flex w-full px-4 py-2 bg-white shadow-none rounded-md duration-300 stroke-none align-left hover:bg-gray-100">
                                        <Link className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                                            <Typography variant="small" className="font-bold text-gray-700" >
                                                Help & Support
                                            </Typography>
                                        </Link>
                                    </button>
                                    <hr className="my-2 border-blue-gray-50" />
                                    <button
                                        className="flex w-full px-4 py-2 bg-red-500 shadow-none rounded-md duration-300 hover:bg-red-900 ">
                                        <Link className="flex items-center"
                                            href={"logout"}
                                            method="post"
                                            as="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                                            <Typography variant="small" className="mr- pl-2 font-bold text-white" >
                                                Log Out
                                            </Typography>
                                        </Link>
                                    </button>
                                </MenuList>
                            </Menu>
                        </Tooltip>
                    </MoleculesDropdown>
                </div>
            </div>
        </nav>
    )
}