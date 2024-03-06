const Card = ({ children, className }) => {
  return <div className={`rounded-lg border p-6 ${className}`}>{children}</div>
}

export { Card }
