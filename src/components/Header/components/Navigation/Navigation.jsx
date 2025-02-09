import styled from "styled-components";
import { ROLES } from "../../../../services";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../services/store/selectors/selectors";
import PropTypes from "prop-types";

const Navigate = styled.nav`
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #474545c2;
`;

const NavLink = styled(Link)`
  color: ${({ location, to }) => (location === to ? "white" : "black")};
  font-family: "Elite";
  text-decoration: none;
`;

export const Navigation = () => {
  const location = useLocation();
  const roleId = useSelector(selectUserRole);
  return (
    <Navigate>
      <NavLink to="/" location={location.pathname}>
        Main
      </NavLink>
      {roleId === ROLES.ADMIN && (
        <NavLink to="/posts" location={location.pathname}>
          New Blog
        </NavLink>
      )}
    </Navigate>
  );
};

NavLink.propTypes = {
  location: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
