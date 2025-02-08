import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../../..";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserLogin } from "../../../../services/store/selectors/selectors";
import { logout } from "../../../../services/store/slice/authSlice";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../../../services/context/context";
import { Search } from "../Search/Search";
import PropTypes from "prop-types";

import { request } from "../../../../utils";
import { SESSION_STORAGE_USER } from "../../../../services";

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
  const user = useSelector(selectUser);
  const { searchPhrase, setSearchPhrase, setIsSearch } = useContext(SearchContext);

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
    if (!user?.id) return;
    request("logout", "POST").then(() => {
      sessionStorage.removeItem(SESSION_STORAGE_USER);
      dispatch(logout());
    });
  };

  //const startDelayedSearch = useMemo(() => debounce(() => setIsSearch((prevState) => !prevState), 2000), []);
  const handleSearch = ({ target }) => {
    setSearchPhrase(target.value);

    //  startDelayedSearch();
  };
  return (
    <NavBar>
      <Search value={searchPhrase} onChange={handleSearch} />
      <Icon
        className="fa fa-reply"
        styles={"&:hover {color: gray;transition: 0.6s;cursor: pointer;}"}
        onClick={() => navigate(-1)}
      />
      <AuthLink to={!user?.id && "/auth"} onClick={handleLogout}>
        {user?.id ? "Logout" : "Login"}
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
