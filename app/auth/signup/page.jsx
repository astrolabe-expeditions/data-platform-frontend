import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input/Input";
import Link from "next/link";

export default function Signup() {
    return (
        <div>
            <button>Continuer avec Github</button>
            <hr />
            <form>
                <Input type="email" name="email" label="Email" />
                <Input type="password" name="password" label="Mot de passe" />
                <Button type="submit" label="S'inscrire"/>
            </form>
            <p>Déjà inscrit ? <Link href="/auth/login">Connectez-vous</Link></p>
        </div>
    )
}