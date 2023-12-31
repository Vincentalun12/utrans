import { Link } from '@inertiajs/react';


export default function Linkactive({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
        >
            {children}
        </Link>
    );
}
