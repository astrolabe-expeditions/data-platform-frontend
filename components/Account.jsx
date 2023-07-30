'use client'

const { useSession, signIn } = require("next-auth/react")


const Account = () => {

    const { data:session } = useSession()

    if(session) {
        return (
            <p>{session.user.name}</p>
        )
    }

    return (
        <button onClick={() => signIn()}>Login</button>
    )
}

export { Account }