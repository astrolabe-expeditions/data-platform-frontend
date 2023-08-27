import Image from 'next/image'

const SidebarLogo = () => {
  return (
    <>
      <Image
        className="px-3 pb-6"
        src="/logo-white.png"
        width={256}
        height={110}
        alt="Picture of the author"
      />
    </>
  )
}

export { SidebarLogo }
