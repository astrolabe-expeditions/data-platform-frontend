import Link from "next/link";

import { AuthForm } from "@/components/AuthForm";

export default function Login() {
    return (
        <div>
            <h1>Se connecter</h1>
            <AuthForm submitLabel="Se connecter" />
            <p>Vous n&apos;avez pas encore de compte ? <Link href="/auth/signup">Créer un compte</Link></p>
        </div>
    )
}