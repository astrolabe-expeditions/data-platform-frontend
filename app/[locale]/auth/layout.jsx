import Image from 'next/image'

export default function AuthLayout({ children }) {
  return (
    <main className="max-w-sm mx-auto mt-24 flex flex-col items-center px-4">
      <Image
        src="/logo.png"
        width={64}
        height={64}
        alt="Astrolabe Expeditions"
        className="pb-6"
      />
      {children}
    </main>
  )
}
