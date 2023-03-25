import React from "react";

import { RegForm } from "../../features/RegForm";

import c from "./RegPage.module.scss";

export const RegPage = () => {
    return (
        <main className={c.wrapCont}>
            <RegForm />
        </main>
    )
}
