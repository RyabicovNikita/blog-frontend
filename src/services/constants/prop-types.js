import PropTypes from "prop-types";

export const PROP_TYPES = {
  CHILDREN: PropTypes.node,
  POST: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    commentsCount: PropTypes.number.isRequired,
  }),
  OBJECT_OR_UNDEFINED: PropTypes.oneOfType([PropTypes.object, PropTypes.exact(undefined)]),
  STRING_OR_NULL: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
