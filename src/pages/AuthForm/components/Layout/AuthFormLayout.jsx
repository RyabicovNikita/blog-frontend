import { Error } from "../../../../components";
import { Input } from "../Input";
import "./AuthForm.scss";
export const AuthFormLayout = ({
  handleSubmit,
  onSubmit,
  handleClick,
  isRegister,
  register,
  resetServerError,
  formError,
  errorMessage,
}) => (
  <div className="auth">
    <div className="auth__auth-blur">
      <form onSubmit={handleSubmit(onSubmit)} className="auth__auth-form">
        <div className="auth__header-container">
          <div onClick={handleClick} className={`auth__header ${!isRegister ? "active" : ""}`}>
            SIGN IN
          </div>
          <div onClick={handleClick} className={`auth__header ${isRegister ? "active" : ""}`}>
            SIGN UP
          </div>
        </div>
        <div className="auth__input-fields">
          <Input
            type="text"
            placeholder="Username"
            name="login"
            {...register("login", {
              onChange: resetServerError,
            })}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              onChange: resetServerError,
            })}
          />
          {isRegister && (
            <Input
              name="repeat_password"
              type="password"
              placeholder="Repeat password"
              {...register("repeat_password", {
                onChange: resetServerError,
              })}
            />
          )}
        </div>
        <div className="auth__submit-error">
          <button disabled={!!formError} className="auth__submit" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
          {errorMessage && <Error styles={"width:100%;heigth:100%"}>{errorMessage}</Error>}
        </div>
      </form>
    </div>
  </div>
);
