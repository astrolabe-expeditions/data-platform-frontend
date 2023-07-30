import Image from 'next/image'
import { Account } from './Account'

const Navbar = () => {
    return (
        <nav className="">
            <div className="">
            <Image
            src="/logo.png"
            width={64}
            height={64}
            alt="Picture of the author" />
        <h1 className="text-2xl font-bold">
            Astrolabe Expeditions
        </h1>
            </div>
            <div className="ml-auto">
                <Account />
            </div>
        </nav>
    )
}

export { Navbar }