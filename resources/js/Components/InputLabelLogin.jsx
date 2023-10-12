export default function InputLabelLogin({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-md text-black` + className}>
            {value ? value : children}
        </label>
    );
}