import NextLink from "next/link";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";

export default function Login() {
    return (
        <>
            <Typography variant="title" alignCenter className="mb-3">Log in to your account</Typography>
            <Typography variant="subtitle" alignCenter className="mb-8">Welcome back! Please enter your details.</Typography>
            <form className="flex flex-col gap-3 w-full">
                <Input type="email" name="email" label="Email" />
                <Input type="password" name="password" label="Mot de passe" />
                <Button type="submit" label="Se connecter" />
            </form>
            <Typography variant="body2" color="textSecondary" className="mt-8" alignCenter>Vous n&apos;avez pas encore de compte ? <Link variant="body2" href="/auth/signup" as={NextLink}>Créer un compte</Link></Typography>
        </>
    )
}