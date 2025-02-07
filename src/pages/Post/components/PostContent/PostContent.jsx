import { useDispatch, useSelector } from "react-redux";
import "./PostContent.scss";
import { selectLikedUsers, selectPost, selectUser } from "../../../../services/store/selectors/selectors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchSavePost } from "../../../../api";
import { addLike, deleteLike, POST_ACTION_TYPES } from "../../../../services/store/actions";
import { MIN_HEIGTH_POST, ROLES } from "../../../../services";
import { useForm } from "react-hook-form";
import { Error } from "../../../../components/Error/Error";
import { getPostFormParams } from "../../validates";
import { Icon } from "../../../../components";
import PropTypes from "prop-types";
import { request } from "../../../../utils";

const FIELD_NAME = {
  title: "title",
  content: "content",
  image_url: "image_url",
};

export const PostContent = ({ setIsModalOpen }) => {
  const [serverError, setServerError] = useState(null);
  const deleteServerErrorIfNeed = () => {
    if (serverError !== null) setServerError(null);
  };
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  console.log(post);
  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm(getPostFormParams({ image_url: "" }));

  const { id: userId, role_id: user_role_id } = useSelector(selectUser);

  const { id: postId, image_url, published_at, content, title, likes } = post;

  const isUserPutLike = !!likes.find((id) => id === userId);

  const [isEditPost, setIsEditPost] = useState(false);

  const registerInputs = (isInit = true) => {
    if (isInit) {
      Object.values(FIELD_NAME).forEach((fieldName) => register(fieldName));
      setValue(FIELD_NAME.title, title, { shouldValidate: true });
      setValue(FIELD_NAME.content, content, { shouldValidate: true });
      setValue(FIELD_NAME.image_url, image_url, { shouldValidate: true });
    } else Object.values(FIELD_NAME).forEach((fieldName) => unregister(fieldName));
  };

  const postValue = getValues();

  useEffect(() => {
    if (post?.content?.length > 0 && post?.title?.length > 0) {
      registerInputs(true);
    }
    return () => registerInputs(false);
  }, [post.content, post.title]);

  useLayoutEffect(() => {
    if (postValue.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.max(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [postValue.content]);

  const handleDelete = () => {
    setIsModalOpen(true);
    deleteServerErrorIfNeed();
  };

  const onSubmit = () => {
    if (isEditPost === false) setIsEditPost(true);
    else if (
      post.content !== postValue.content ||
      post.title !== postValue.title ||
      post.image_url !== postValue.image_url
    ) {
      try {
        request(`/posts/${post.id}`, "PATCH", postValue).then(({ body }) => {
          if (body.error) {
            setIsEditPost(false);
            setServerError(body.error);
            return;
          }
          dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: body });
          setIsEditPost(false);
          deleteServerErrorIfNeed();
        });
      } catch (error) {
        setServerError(error);
      }
    } else {
      setIsEditPost(false);
    }
  };

  const titleError = errors?.title?.message;
  const contentError = errors?.content?.message;

  const onValidateChange = ({ target }) => {
    deleteServerErrorIfNeed();
    setValue(target.name, target.value, { shouldDirty: false, shouldValidate: true });
  };

  const onLikeClick = () => {
    addLike(postId, userId).then(({ body }) => dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: body }));
  };

  const onDislikeClick = () => {
    deleteLike(postId, userId).then(({ body }) => dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: body }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="blog__top-content">
        <img alt="" className="blog__main-image" src={postValue.image_url}></img>
        {<Error>{serverError}</Error>}
        {isEditPost && (
          <input
            name={FIELD_NAME.image_url}
            className="blog__input-url"
            placeholder="Введите URL картинки"
            value={postValue.image_url}
            onChange={onValidateChange}
          />
        )}
        <div
          className={isEditPost ? "blog__title edit" : "blog__title"}
          style={{ borderColor: titleError ? "red" : "white" }}
        >
          <input
            name={FIELD_NAME.title}
            className="blog__text-title"
            value={postValue.title}
            disabled={!isEditPost}
            onChange={onValidateChange}
          />
          <div className="blog__date-container">
            <span className="blog__date">{published_at}</span>
          </div>
        </div>
        {titleError && <Error>{titleError}</Error>}
      </section>
      {user_role_id !== ROLES.GHOST && (
        <div className="blog__blog-content">
          <div className="blog__actions" style={{ position: "relative" }}>
            <div className="blog__actions-container">
              <Icon className="fa fa-trash" onClick={handleDelete} />
              <button className="blog__post-submit" type="submit">
                <Icon className="fa fa-pencil-square-o" />
              </button>
              <Icon
                className={isUserPutLike ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"}
                onClick={isUserPutLike ? onDislikeClick : onLikeClick}
              />
            </div>
          </div>
        </div>
      )}
      <section className="blog__main-content">
        {contentError && <Error>{contentError}</Error>}
        <textarea
          name={FIELD_NAME.content}
          className={isEditPost ? "blog__edit-content edit" : "blog__content"}
          style={{ borderColor: contentError ? "red" : "white" }}
          ref={contentRef}
          disabled={!isEditPost}
          value={postValue.content}
          onChange={onValidateChange}
        />
      </section>
    </form>
  );
};

PostContent.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
