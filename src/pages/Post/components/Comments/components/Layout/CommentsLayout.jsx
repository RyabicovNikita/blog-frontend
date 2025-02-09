import { ContextMenu, Error, Icon } from "../../../../../../components";
import { ROLES } from "../../../../../../services";
import { Comment } from "../Comment/Comment";
import "./Comments.scss";
export const CommentsLayout = ({
  user,
  handleSubmit,
  onSubmit,
  commentError,
  serverError,
  register,
  setServerError,
  setSendOnHoverClass,
  sendOnHoverClass,
  isContextMenuOpen,
  points,
  onDeleteCommentClick,
  comments,
  handleContextMenu,
}) => (
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
