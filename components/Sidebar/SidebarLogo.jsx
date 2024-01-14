import Image from 'next/image'

const SidebarLogo = ({ className, height }) => {
  return (
    <Image
      className={className}
      src="/logo-white.png"
      width={height * 2.32727272727}
      height={height}
      alt="Astrolabe expedition logo"
    />
  )
}

export { SidebarLogo }
