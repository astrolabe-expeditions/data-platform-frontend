import NextLink from "next/link";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";

export default function Signup() {
    return (
        <>
            <Typography variant="title" alignCenter className="mb-3">Create an account</Typography>
            <Typography variant="subtitle" alignCenter className="mb-8">To manage your expeditions</Typography>
            <form className="flex flex-col gap-3 w-full">
                <Input type="text" name="name" label="Name" />
                <Input type="email" name="email" label="Email" />
                <Input type="password" name="password" label="Mot de passe" />
                <Button type="submit" label="S'inscrire" />
            </form>
            <Typography variant="body2" color="textSecondary" className="mt-8" alignCenter>
                Déjà inscrit ? <Link variant="body2" href="/auth/login" as={NextLink}>Connectez-vous</Link></Typography>
        </>
    )
}