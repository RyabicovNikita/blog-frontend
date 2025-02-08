import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import { Input } from "./components/Input/Input";
import { Error } from "../../../src/components/Error/Error";

import "./AuthForm.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../services/store/slice/authSlice";
import { SESSION_STORAGE_USER } from "../../services";
import { request } from "../../utils";

const shapeObject = {
  login: yup
    .string()
    .required("Поле логин является обязательным для заполнения")
    .matches(/\w+$/, "Неверый формат логина. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Минимальный размер - 3 символа")
    .max(15, "Неверный логин. Максимальный размер - 15 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(/^[\w#$]+$/, "Неверно заполнен пароль. Допускаются только буквы, цифры и знакие #%")
    .min(6, "Неверный пародь. Минимальный размер - 6 символа")
    .max(30, "Неверный пароль. Максимальный размер - 30 символов"),
  repeat_password: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const authFormSchema = yup.object().shape(shapeObject);
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const resetServerError = () => {
    setServerError(null);
  };
  const formParams = isRegister
    ? {
        defaultValues: {
          login: "",
          password: "",
          repeat_password: "",
        },
        resolver: yupResolver(authFormSchema),
      }
    : {
        defaultValues: {
          login: "",
          password: "",
        },
        resolver: null,
      };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const onSubmit = async ({ login, password }) => {
    let response;
    if (isRegister) {
      response = await request("register", "POST", { login, password });
    } else {
      response = await request("login", "POST", { login, password });
    }
    const { error = "", user } = response;
    if (error) {
      setServerError(error);
      return;
    }
    sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user));
    dispatch(setUser(user));
    navigate(-1);
  };
  const handleClick = () => {
    setIsRegister((prevState) => !prevState);
    resetServerError();
    reset();
  };

  const formError = errors?.login?.message || errors?.password?.message || errors?.repeat_password?.message;
  const errorMessage = formError || serverError;
  return (
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
};
