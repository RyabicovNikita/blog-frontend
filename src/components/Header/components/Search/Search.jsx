import PropTypes from "prop-types";
import { useLocation } from "react-router";
import styled from "styled-components";

const SearchContainer = ({ className, value, onChange }) => {
  const location = useLocation();
  return (
    <input
      disabled={location.pathname !== "/"}
      className={className}
      value={value}
      onChange={onChange}
      placeholder="Search..."
    ></input>
  );
};
export const Search = styled(SearchContainer)`
  all: unset;
  border-radius: 25px;
  width: 45%;
  background-color: black;
  box-shadow: 1px -1px 15px 10px black;
  min-width: 20px;
  &::placeholder {
    color: #474545c2;
  }
`;

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
