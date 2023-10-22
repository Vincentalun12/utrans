import { Button } from "@material-tailwind/react";
import { twMerge } from 'tailwind-merge'

export function ButtonPrimary({ children, ...props }) {
    const fullWidth = props.isfullwidth ? "w-full" : "";

    return (
    //<Button {...props} size="md" className={`rounded-lg bg-ungukita ${fullWidth}`}>
        <Button {...props} size="md" className={twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')}>
            {children}
        </Button>
    );
}