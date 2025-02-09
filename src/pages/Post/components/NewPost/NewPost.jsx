import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./NewPost.scss";
import { MIN_HEIGTH_POST, ROLES } from "../../../../services";
import { createNewPost } from "../../../../services/store/actions";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Error } from "../../../../components/Error/Error";
import { getPostFormParams } from "../../validates";
import { Icon, PrivateContainer } from "../../../../components";
import { useSelector } from "react-redux";
import { selectUserRole, selectUserSession } from "../../../../services/store/selectors/selectors";

export const NewPost = () => {
  const userSession = useSelector(selectUserSession);
  const userRole = useSelector(selectUserRole);
  const accessRoles = [ROLES.ADMIN];
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [serverError, setServerError] = useState(null);
  const deleteServerErrorIfNeed = () => {
    if (serverError !== null) setServerError(null);
  };
  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm(getPostFormParams({ image_url: "" }));

  const registerInputs = (isInit = true) => {
    if (isInit) {
      register("title", { value: "" });
      register("content", { value: "" });
    } else {
      unregister("title");
      unregister("content");
    }
  };
  useEffect(() => {
    if (!accessRoles.includes(userRole)) navigate("/auth");
  }, [userRole]);

  useEffect(() => {
    registerInputs(true);
    return () => registerInputs(false);
  }, []);

  const postValue = getValues();

  useLayoutEffect(() => {
    if (postValue.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.max(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [postValue.content]);

  const handleSave = () => {
    try {
      createNewPost(postValue).then((response) => {
        if (response.error) {
          setServerError(response.error);
          return;
        }
        const { id } = response.body;
        navigate(`/posts/${id}`);
      });
    } catch (error) {
      setServerError(error);
    }
  };

  const titleError = errors?.title?.message;
  const contentError = errors?.content?.message;

  const onValidateChange = ({ target }) => {
    deleteServerErrorIfNeed();
    setValue(target.name, target.value, { shouldDirty: false, shouldValidate: true });
  };

  return (
    <PrivateContainer error={serverError} access={accessRoles}>
      <form onSubmit={handleSubmit(handleSave)} className="blog">
        <section className="blog__top-content">
          <img alt="" className="blog__main-image" src={postValue.image_url}></img>
          <input
            name="image_url"
            className="blog__input-url"
            placeholder="Введите URL картинки"
            value={postValue.image_url}
            onChange={onValidateChange}
          ></input>
          <input
            name="title"
            placeholder="Введите  заголовок статьи"
            className="blog__title-input edit"
            style={{ borderColor: titleError ? "red" : "white" }}
            value={postValue.title}
            onChange={onValidateChange}
          ></input>
          {(titleError || serverError) && <Error>{titleError || serverError}</Error>}
        </section>

        <div className="blog__actions">
          <button className="blog__action-container" type="submit">
            <Icon className="fa fa-floppy-o" />
          </button>
          {/* {errorMessage && <Error className={"blog__create-error"}>{errorMessage}</Error>} */}
        </div>

        <section className="blog__main-content">
          <textarea
            name="content"
            placeholder="Введите содержание статьи"
            className="blog__edit-content edit"
            ref={contentRef}
            style={{ borderColor: contentError ? "red" : "white" }}
            value={postValue.content}
            onChange={onValidateChange}
          />
          {contentError && <Error>{contentError}</Error>}
        </section>
      </form>
    </PrivateContainer>
  );
};
