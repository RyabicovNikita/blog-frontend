import styled from "styled-components";
import { PROP_TYPES } from "../../../../services";

const UsersScrollableLayout = ({ className, children }) => <div className={className}>{children}</div>;

const UsersScrollable = styled(UsersScrollableLayout)`
  min-width: 975px;
  transition: 1s;
  max-width: 70vw;
  background-color: black;
  height: 75vh;
  overflow: scroll;
  box-shadow: 0px 15px 30px 30px black;
  animation: table-open forwards 0.5s;
  @keyframes table-open {
    0% {
      width: 7px;
    }
    100% {
      width: 75vw;
    }
  }
`;

const UsersLayout = ({ className, children }) => (
  <div className={className}>{<UsersScrollable>{children}</UsersScrollable>}</div>
);

export const ScrollableContainer = styled(UsersLayout)`
  width: 100%;
  height: 100%;
  background-image: url("../../images/content-background.png");
  background-size: cover;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: blur-test reverse;
  animation-duration: 1s;
`;

UsersScrollable.propTypes = {
  children: PROP_TYPES.CHILDREN,
};

ScrollableContainer.propTypes = {
  children: PROP_TYPES.CHILDREN,
};
