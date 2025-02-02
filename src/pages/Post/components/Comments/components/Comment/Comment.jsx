import "./Comment.scss";

export const Comment = ({ id, author_login, content, published_at, onContextMenu }) => {
  return (
    <div className="comment" onContextMenu={(e) => onContextMenu(e, id)}>
      <div className="comment__content">{content}</div>
      <div className="comment__info">
        <span className="comment__author">{author_login}</span>
        <span className="comments_published-date">{published_at}</span>
      </div>
    </div>
  );
};
