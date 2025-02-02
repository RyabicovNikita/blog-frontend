import { useEffect, useState } from "react";
import { RecordSelectionMenu } from "../RecordSelectionMenu/RecordSelectionMenu";
import { useDispatch, useSelector } from "react-redux";

import { fetchDeleteUser, fetchPostUserRole } from "../../../../api";
import { selectRoles, selectUser } from "../../../../services/store/selectors/selectors";
import { Button, Icon } from "../../../../components";
import { Field } from "./components";
import styled from "styled-components";
import { PROP_TYPES } from "../../../../services";
import PropTypes from "prop-types";

const Container = ({ className, children }) => <div className={className}>{children}</div>;

const StyledContainer = styled(Container)`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  button {
    all: unset;
  }
`;

export const RoleWithSaveIcon = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [isMenuSelectOpen, setIsMenuSelectOpen] = useState(false);
  const roles = useSelector(selectRoles);
  const [selectedRole, setSelectedRole] = useState(roles?.find((role) => role.id === user.role_id));

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsMenuSelectOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      {isMenuSelectOpen && (
        <RecordSelectionMenu setIsMenuSelectOpen={setIsMenuSelectOpen} setSelectedRole={setSelectedRole} user={user} />
      )}
      <StyledContainer>
        <Field
          visitorLogin={currentUser?.login}
          userLogin={user?.login}
          roleName={selectedRole?.name}
          setIsMenuSelectOpen={setIsMenuSelectOpen}
        />
        <Button
          disabled={selectedRole?.id === user?.role_id}
          onClick={() => dispatch(fetchPostUserRole(user.id, selectedRole?.id))}
        >
          <Icon className="fa fa-floppy-o" />
        </Button>
        <Button disabled={currentUser.login === user.login} onClick={() => dispatch(fetchDeleteUser(user.id))}>
          <Icon className="fa fa-trash" />
        </Button>
      </StyledContainer>
    </>
  );
};

StyledContainer.propTypes = {
  children: PROP_TYPES.CHILDREN,
};

RoleWithSaveIcon.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    role_id: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
