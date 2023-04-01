import { AuthForm } from "features/AuthForm";

import s from "./index.module.scss";

export const Signin = () => {
  return (
    <div className={s.wrapCont}>
      <AuthForm />
    </div>
  )
}
