const AuthForm = ({ submitLabel }) => {
    return (
        <>
            <button>Continuer avec Github</button>
            <hr />
            <form>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <button type="submit">{submitLabel}</button>
            </form>
        </>   
    )
}

export { AuthForm }