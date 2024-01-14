'use client'

const Sidebar = ({ children }) => {
  return (
    <div className="fixed top-0 start-0 bottom-0 w-72 bg-primary-700 px-4 py-8 lg:block hidden">
      {children}
    </div>
  )
}

export { Sidebar }
