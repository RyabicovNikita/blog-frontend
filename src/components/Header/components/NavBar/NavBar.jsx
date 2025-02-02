import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../../..";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin, selectUserSession } from "../../../../services/store/selectors/selectors";
import { logout } from "../../../../services/store/slice/authSlice";
import { debounce, SESSION_STORAGE_USER } from "../../../../services";
import { useContext, useEffect, useMemo } from "react";
import { SearchContext } from "../../../../services/context/context";
import { Search } from "../Search/Search";
import PropTypes from "prop-types";
import { server } from "../../../../bff/server";

const NavBar = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
`;

const AuthLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  border-radius: 55px;
  display: flex;
  font-size: 45px;
  width: 150px;
  background-color: black;
  box-shadow: 1px -1px 15px 10px black;
  &:hover {
    color: gray;
    transition: 0.6s;
  }
`;

export const NavBarContainer = ({ isMenuOpen, setIsMenuOpen, setContextMenuAnimation }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(selectUserLogin);
  const userSession = useSelector(selectUserSession);
  const { searchPhrase, setSearchPhrase, isSearch, setIsSearch } = useContext(SearchContext);

  useEffect(() => {
    if (location.pathname !== "/" && searchPhrase !== "") setSearchPhrase("");
  }, [location.pathname]);

  const onMenuClick = () => {
    const animationOptions = {
      animation: isMenuOpen ? "close-menu 1s" : "open-menu 1s",
      "animation-fill-mode": "forwards",
    };
    if (isMenuOpen) {
      setTimeout(() => setIsMenuOpen(false), 1000);
    } else {
      setIsMenuOpen(true);
      setTimeout(() => {
        setContextMenuAnimation({ ...animationOptions, animation: "close-menu 1s" });
        setTimeout(() => setIsMenuOpen(false), 1000);
      }, 15000);
    }
    setContextMenuAnimation(animationOptions);
  };
  const handleLogout = () => {
    if (!userLogin) return;
    server.logout(userSession).then(() => {
      dispatch(logout());
      const currentUserDataJSON = sessionStorage.getItem(SESSION_STORAGE_USER);
      if (!currentUserDataJSON) return;
      sessionStorage.removeItem(SESSION_STORAGE_USER);
    });
  };

  const startDelayedSearch = useMemo(() => debounce(setIsSearch, 2000), []);

  const handleSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!isSearch);
  };
  return (
    <NavBar>
      <Search value={searchPhrase} onChange={handleSearch} />
      <Icon
        className="fa fa-reply"
        styles={"&:hover {color: gray;transition: 0.6s;cursor: pointer;}"}
        onClick={() => navigate(-1)}
      />
      <AuthLink to={!userLogin && "/auth"} onClick={handleLogout}>
        {userLogin ? "Logout" : "Login"}
      </AuthLink>
      <Icon className="fa fa-bars" onClick={onMenuClick} />
    </NavBar>
  );
};

NavBarContainer.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  setContextMenuAnimation: PropTypes.func.isRequired,
};
