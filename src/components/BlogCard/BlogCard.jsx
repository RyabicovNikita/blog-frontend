import { Link } from "react-router-dom";
import { PROP_TYPES } from "../../services";
import "./BlogCard.scss";

export const BlogCard = ({ post, lastPostRef }) => {
  const { id, title, content, image_url, published_at, likes, comments } = post;
  return (
    <>
      <div className="blog-card spring-fever" ref={lastPostRef}>
        <img className="img2" alt="" src={require("./images/black-pin.png")} />
        <div className="img-container">
          <img className="img" alt="" src={image_url} />
        </div>
        <div className="content" style={{ backgroundColor: image_url ? "rgba(0, 0, 0, 0)" : "#474545c2" }}>
          <div className="title-content">
            <h3>
              <span href="#">{title}</span>
            </h3>
          </div>
          <div className="card-info">
            <span className="card-info__content">{content}</span>
            <Link className="card-info__post-link" to={`/posts/${id}`}>
              Read Article
              <span className="licon icon-arr icon-black" />
            </Link>
          </div>
          <div className="utility-info">
            <ul className="utility-list">
              <li>
                <span className="licon icon-like" />
                <span>{likes.length}</span>
                <span className="licon icon-com" />
                {<span>{comments.length}</span>}
              </li>
              <li>
                <span className="licon icon-dat" />
                {published_at}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

BlogCard.propTypes = {
  post: PROP_TYPES.POST,
  lastPostRef: PROP_TYPES.OBJECT_OR_UNDEFINED,
};
