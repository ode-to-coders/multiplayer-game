import React from "react";

import { AuthForm } from "../../features/AuthForm";

import c from "./AuthPage.module.scss";

export const AuthPage = () => {
    return (
        <main className={c.wrapCont}>
            <AuthForm />
        </main>
    )
}
