import * as yup from "yup";
import { useEffect, useState } from "react";
import { Comment } from "./components/Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, selectPostID, selectUser } from "../../../../services/store/selectors/selectors";

import { addNewComment, deleteComment, POST_ACTION_TYPES } from "../../../../services/store/actions";
import { ContextMenu, Error, Icon } from "../../../../components";

import "./Comments.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROLES } from "../../../../services";
const shapeObject = {
  comment: yup
    .string()
    .min(10, "Минимальный размер комментария - 10 символов.")
    .max(1000, "Длина символов в комментарии не может превышать 1000 символов."),
};

export const Comments = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [deletedCommentID, setDeletedCommentID] = useState(null);
  const [sendOnHoverClass, setSendOnHoverClass] = useState("-o");
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const authFormSchema = yup.object().shape(shapeObject);
  const formParams = {
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(authFormSchema),
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const [serverError, setServerError] = useState(null);
  const postId = useSelector(selectPostID);
  const user = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const onSubmit = ({ comment }) => {
    addNewComment(postId, comment).then((response) => {
      if (response.error) {
        setServerError(response.error);
        return;
      }
      dispatch({
        type: POST_ACTION_TYPES.ADD_COMMENT,
        payload: response.body,
      });
    });
    reset();
  };

  useEffect(() => {
    const handleClick = () => setIsContextMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContextMenu = (e, commentID) => {
    const isAuthor = !!comments.find((comment) => comment.id === commentID && comment.author_login === user.login);
    if (!isAuthor) return;
    setDeletedCommentID(commentID);
    e.preventDefault();
    setIsContextMenuOpen(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const onDeleteCommentClick = () => {
    dispatch(deleteComment(postId, deletedCommentID));
  };

  const commentError = errors?.comment?.message;
  useEffect(() => {
    const timerId = setTimeout(() => {
      reset();
    }, 5000);
    return () => clearTimeout(timerId);
  }, [commentError]);

  return (
    <div className="comments">
      {user.role_id !== ROLES.GHOST && (
        <form onSubmit={handleSubmit(onSubmit)} className="comments__new-comment">
          <div className="comments__input-container">
            <textarea
              className="comments__comment edit"
              style={{ borderColor: commentError || serverError ? "red" : "white" }}
              type="text"
              name="input-comment"
              placeholder="Комментарий..."
              {...register("comment", {
                onChange: () => setServerError(null),
              })}
            ></textarea>
            <button
              className="comments__add-comment"
              onMouseOver={() => setSendOnHoverClass("")}
              onMouseOut={() => setSendOnHoverClass("-o")}
            >
              <Icon className={`fa fa-paper-plane${sendOnHoverClass}`} />
            </button>
          </div>
          {(serverError || commentError) && (
            <div className="comments__error-window">
              <Error>{serverError || commentError}</Error>
            </div>
          )}
        </form>
      )}
      <div className="comments__container">
        {isContextMenuOpen && <ContextMenu top={points.y} left={points.x} onClick={onDeleteCommentClick} />}
        {comments &&
          comments.map(({ id, author_login, content, published_at }) => (
            <Comment
              onContextMenu={handleContextMenu}
              key={id}
              id={id}
              author_login={author_login}
              content={content}
              published_at={published_at}
            />
          ))}
      </div>
    </div>
  );
};
