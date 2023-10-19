import { Link } from '@inertiajs/react';

export default function Linkactive({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={

                (active
                    ? ' bg-ungukita text-white rounded-md'
                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900') 
            }
        >
            {children}
        </Link>
    );
}
