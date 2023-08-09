import Link from "next/link";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";

export default function Login() {
    return (
        <div>
            <h1>Se connecter</h1>
            <form className="flex flex-col gap-3">
                <Input type="email" name="email" label="Email" />
                <Input type="password" name="password" label="Mot de passe" />
                <Button type="submit" label="Se connecter" />
            </form>
            <p>Vous n&apos;avez pas encore de compte ? <Link href="/auth/signup">Créer un compte</Link></p>
        </div>
    )
}