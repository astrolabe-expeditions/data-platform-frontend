import NextLink from "next/link";
import { useTranslations as getTranslations } from 'next-intl';

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";

export default function Login() {
    const t = getTranslations('Login')

    return (
        <>
            <Typography variant="title" alignCenter className="mb-3">{t('title')}</Typography>
            <Typography variant="subtitle" alignCenter className="mb-8">{t('subtitle')}</Typography>
            <form className="flex flex-col gap-3 w-full">
                <Input type="email" name="email" label={t('labels.email')} />
                <Input type="password" name="password" label={t('labels.password')} />
                <Button type="submit" label={t('login')} />
            </form>
            <Button variant="secondary" label={t('github')} className="mt-4" fullWidth />
            <Typography variant="body2" color="textSecondary" className="mt-8" alignCenter>
                {t('no_account')} <Link variant="body2" href="/auth/signup" as={NextLink}>{t('no_account_link')}</Link>
            </Typography>
        </>
    )
}