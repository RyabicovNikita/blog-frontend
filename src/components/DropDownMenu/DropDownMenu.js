import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../services/store/selectors/selectors";
import { PROP_TYPES, ROLES } from "../../services";
import "./DropDownMenu.scss";
import PropTypes from "prop-types";
export const DropDownMenu = ({ setIsMenuOpen, animation }) => {
  const userLogin = useSelector(selectUserLogin);
  const userRoleID = useSelector(selectUserRole);
  const onItemClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="menu" style={animation}>
      <div className="menu__user">
        <span className="menu__userName">{userLogin ?? "Ghost"}</span>
        <div className="menu__userIcon"></div>
      </div>
      <ul className="menu__list-items">
        {userRoleID === ROLES.ADMIN && (
          <li className="menu__list-item">
            <Link onClick={onItemClick} to="/users">
              Users
            </Link>
          </li>
        )}
        {(userRoleID === ROLES.ADMIN || userRoleID === ROLES.MODERATOR) && (
          <li className="menu__list-item">
            <Link onClick={onItemClick} to={`/posts`}>
              New blog
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

DropDownMenu.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
  animation: PROP_TYPES.OBJECT_OR_UNDEFINED,
};
