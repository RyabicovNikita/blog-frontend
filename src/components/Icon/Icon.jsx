import PropTypes from "prop-types";
import styled from "styled-components";

const IconLayout = ({ className, onClick, disabled }) => (
  <i aria-hidden="true" className={className} onClick={onClick} disabled={disabled} />
);

export const Icon = styled(IconLayout)`
  ${({ styles }) => styles}
  cursor:pointer;
`;

Icon.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
