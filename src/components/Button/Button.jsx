import PropTypes from "prop-types";
import styled from "styled-components";
import { PROP_TYPES } from "../../services";

const ButtonContainer = ({ className, disabled, onClick, children }) => (
  <button className={className} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export const Button = styled(ButtonContainer)`
  ${({ styles }) => styles};
  :first-child {
    color: ${({ disabled }) => (disabled ? "gray" : "inherit")};
  }
`;

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PROP_TYPES.CHILDREN,
};
