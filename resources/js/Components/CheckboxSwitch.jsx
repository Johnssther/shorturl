import { forwardRef, useState } from 'react';

const CheckboxSwitch = forwardRef(function CheckboxSwitch({ className = '', ...props }, ref) {
    const [enabled, setEnabled] = useState(false);

    const toggleSwitch = () => {
        setEnabled(!enabled);
    };

    return (
        <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
            <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                onChange={toggleSwitch}
                ref={ref}
                {...props}
            />
            <div
                className={`w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-indigo-300 
                ${enabled ? 'bg-indigo-500' : 'bg-gray-300'} peer-checked:bg-indigo-500 transition-colors`}
            ></div>
            <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full border border-gray-300 
                transition-transform ${enabled ? 'translate-x-5' : ''} peer-checked:translate-x-5`}
            ></div>
        </label>
    );
});

export default CheckboxSwitch;
