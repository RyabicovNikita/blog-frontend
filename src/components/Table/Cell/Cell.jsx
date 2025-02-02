import styled from "styled-components";
import { PROP_TYPES } from "../../../services";
import PropTypes from "prop-types";

const CellLayout = ({ className, cellContent, onCellClick }) => (
  <div onClick={onCellClick} className={className}>
    {cellContent}
  </div>
);

export const Cell = styled(CellLayout)`
  ${({ styles }) => ({ ...styles })}
`;

Cell.propTypes = {
  cellContent: PROP_TYPES.CHILDREN.isRequired,
  onCellClick: PropTypes.func,
};
