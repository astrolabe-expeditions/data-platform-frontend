import clsx from 'clsx'

function Drawer({ children, isOpen, onClose }) {
  return (
    <main
      className={clsx(
        'fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out',
        isOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 -translate-x-full',
      )}>
      <section
        className={clsx(
          'w-72 left-0 absolute bg-primary-700 px-4 py-8 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}>
        {children}
      </section>
      <section
        className="w-screen h-full cursor-pointer "
        onClick={onClose}></section>
    </main>
  )
}

export { Drawer }
