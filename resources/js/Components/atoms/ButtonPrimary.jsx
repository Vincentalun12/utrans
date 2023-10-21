import { Button } from "@material-tailwind/react";

export function ButtonPrimary({ children, ...props }) {
    const fullWidth = props.isfullwidth ? "w-full" : "";

    return (
        <Button {...props} size="md" className={`rounded-lg bg-ungukita ${fullWidth}`}>
            {children}
        </Button>
    );
}