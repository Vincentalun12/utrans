export default function ButtonLogin({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `class="block w-full select-none rounded-lg bg-gradient-to-tr bg-purple-800 to-purple-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-900/20 transition-all hover:shadow-lg hover:shadow-purple-900/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true" ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
