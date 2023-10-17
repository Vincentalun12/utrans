import { Link } from '@inertiajs/react';

export default function Linkactive({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'text-black font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group' +
                (active
                    ? ' bg-ungukita text-white'
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
