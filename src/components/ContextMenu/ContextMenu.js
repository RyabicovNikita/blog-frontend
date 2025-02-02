import styled from "styled-components";
import "./ContextMenu.scss";
import PropTypes from "prop-types";

export const ContextMenu = ({ actions, top, left }) => {
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
        {actions.map(({ name, onClick }, index) => (
          <li className="contextMenu__action" key={index} onClick={onClick}>
            {name}
          </li>
        ))}
      </ul>
    </ContextMenuStyled>
  );
};

ContextMenu.propTypes = {
  actions: PropTypes.array.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
