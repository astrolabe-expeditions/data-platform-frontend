import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { id, label, helperText, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-700 sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={ref} // Forwarding the ref to the input element
        className="border border-gray-300 rounded-lg text-gray-900 py-2 px-3 shadow-xs placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-300 "
        {...props}
      />
      {helperText ? (
        <p className="text-sm text-gray-600">{helperText}</p>
      ) : null}
    </div>
  )
})

export { Input }
