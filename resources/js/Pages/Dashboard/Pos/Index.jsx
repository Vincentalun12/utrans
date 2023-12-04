import NavigationLayout from "@/Layouts/NavigationLayout";
import Linkactive from "@/Components/Linkactive";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    Input,
    Button,
    Breadcrumbs,
    IconButton,
    Tooltip,
    Chip,
} from "@material-tailwind/react";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    ChevronUpDownIcon,
    InformationCircleIcon,
    PencilIcon,
    UserPlusIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/solid";

import { ButtonPrimary } from "@/Components";

import { twMerge } from 'tailwind-merge'

export default function Pos({ auth }) {
    return (
        <NavigationLayout user={auth.user}>
            <Head title="Point of sale"/>
        </NavigationLayout>
    );
}
