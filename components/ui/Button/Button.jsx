import clsx from "clsx"

const Button = ({ label, size = 'md', variant = 'primary', disabled = false, fullWidth, className, ...props }) => {



    const variants = {
        'primary': [
            'text-white',
            'border-primary-600',
            'bg-primary-600',
            'hover:border-primary-700',
            'hover:bg-primary-700',
            'focus:border-primary-600',
            'focus:bg-primary-600',
            'focus:ring-4',
            'focus:ring-primary-100',
            'disabled:border-primary-200',
            'disabled:bg-primary-200',
        ],
        'secondary': [
            'text-gray-800',
            'border-gray-300',
            'hover:bg-gray-50',
            'focus:ring-4',
            'focus:ring-gray-100',
            'disabled:text-gray-300',
            'disabled:border-gray-200',
            'disabled:bg-white'
        ]
    }

    const sizes = {
        'sm': 'py-2 px-3.5 text-sm',
        'md': 'py-2.5 px-4 text-sm ',
        'lg': 'py-2.5 px-4 text-base',
        'xl': 'py-3 px-5 text-base',
        '2xl': 'py-4 px-7 text-lg'
    }

    return <button className={clsx(
        className,
        'rounded-lg border shadow-xs font-semibold focus:outline-none',
        fullWidth ? 'w-full' : null,
        variants[variant],
        sizes[size],
    )} disabled={disabled} {...props}>{label}</button>
}

export { Button }