export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-ungukita text-ungukita shadow-sm focus:ring-ungukita ' +
                className
            }
        />
    );
}
