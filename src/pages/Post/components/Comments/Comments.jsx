import * as yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, selectPostID, selectUser } from "../../../../services/store/selectors/selectors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewComment, deleteComment } from "../../../../api";
import { POST_ACTION_TYPES } from "../../../../services/store/constants";
import { shapeObject } from "./constants";
import { CommentsLayout } from "./components/Layout";

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
      if (response?.error) {
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
    deleteComment(postId, deletedCommentID).then((res) => {
      if (res?.error) {
        setServerError(res.error);
        return;
      }
      dispatch({ type: POST_ACTION_TYPES.DELETE_COMMENT, payload: deletedCommentID });
    });
  };

  const commentError = errors?.comment?.message;
  useEffect(() => {
    const timerId = setTimeout(() => {
      reset();
    }, 5000);
    return () => clearTimeout(timerId);
  }, [commentError]);

  return (
    <CommentsLayout
      comments={comments}
      user={user}
      points={points}
      isContextMenuOpen={isContextMenuOpen}
      handleContextMenu={handleContextMenu}
      commentError={commentError}
      onDeleteCommentClick={onDeleteCommentClick}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      sendOnHoverClass={sendOnHoverClass}
      setSendOnHoverClass={setSendOnHoverClass}
      serverError={serverError}
      setServerError={setServerError}
    />
  );
};
