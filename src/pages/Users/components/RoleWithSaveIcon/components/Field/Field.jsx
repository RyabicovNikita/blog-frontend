import styled from "styled-components";
import { threeDots_icon } from "../../../../../../icons";
import CustomIcon from "../CustomIcon/CustomIcon";
import PropTypes from "prop-types";

const FieldContainer = ({ className, roleName, visitorLogin, userLogin, setIsMenuSelectOpen }) => (
  <div className={className}>
    <span style={{ marginLeft: "10px" }}>{roleName}</span>
    {visitorLogin !== userLogin && (
      <CustomIcon onClick={() => setIsMenuSelectOpen(true)} src={threeDots_icon} styles={"margin-right: 10px"} />
    )}
  </div>
);

export const Field = styled(FieldContainer)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 15px;
  gap: 15px;
`;

Field.propTypes = {
  roleName: PropTypes.string.isRequired,
  visitorLogin: PropTypes.string,
  userLogin: PropTypes.string.isRequired,
  setIsMenuSelectOpen: PropTypes.func.isRequired,
};
