import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInputLogin({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-900 focus:border-ungukita focus:ring-ungukita rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
