import styled from "styled-components";
import PropTypes from "prop-types";
import "./ContextMenu.scss";

export const ContextMenu = ({ onClick, top, left }) => {
  const ContextMenuStyled = styled.div`
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    background-color: gray;
    border-radius: 15px;
    padding: 5px;
    color: black;
    font-size: 20px;
  `;

  return (
    <ContextMenuStyled>
      <ul className="contextMenu__action-list">
        <li className="contextMenu__action" onClick={onClick}>
          Удалить комментарий
        </li>
      </ul>
    </ContextMenuStyled>
  );
};

ContextMenu.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
