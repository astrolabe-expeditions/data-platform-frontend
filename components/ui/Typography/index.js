import clsx from "clsx"

const Typography = ({ children, className, variant = 'body1', color = 'inherit', as, alignCenter, ...props }) => {
    const variants = {
        title: 'text-3xl font-semibold text-gray-900',
        subtitle: 'text-base font-normal text-gray-600',
        body1: 'text-base',
        body2: 'text-sm',
    }

    const variantMapping = {
        title: 'h2',
        subtitle: 'h2',
        body1: 'p',
        body2: 'p',
    }

    const colors = {
        'inherit': 'text-inherit',
        'primary': 'text-primary-600',
        'textPrimary': 'text-gray-900',
        'textSecondary': 'text-gray-600'
    }

    const Tag = as || variantMapping[variant];

    return <Tag className={clsx(
        className,
        variants[variant],
        colors[color],
        alignCenter ? 'text-center' : null
    )} {...props}>{children}</Tag>
}

export { Typography }