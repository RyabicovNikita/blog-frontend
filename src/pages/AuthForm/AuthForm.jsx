import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../services/store/slice/authSlice";
import { SESSION_STORAGE_USER } from "../../services";
import { request } from "../../utils";
import { AuthFormLayout } from "./components";
import { shapeObject } from "./constants";

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
    const { error = "", user = null } = response;
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
    <AuthFormLayout
      handleClick={handleClick}
      handleSubmit={handleSubmit}
      formError={formError}
      isRegister={isRegister}
      errorMessage={errorMessage}
      onSubmit={onSubmit}
      register={register}
      resetServerError={resetServerError}
    />
  );
};
