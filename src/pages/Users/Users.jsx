import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getRoles, getUsers, ROLES_ACTION_TYPES, USERS_ACTION_TYPES } from "../../services/store/actions";
import { PrivateContainer } from "../../components";
import { Table } from "../../components/Table/Table";
import { RoleWithSaveIcon } from "./components/RoleWithSaveIcon/RoleWithSaveIcon";
import { selectUserRole, selectUsers } from "../../services/store/selectors/selectors";
import { ScrollableContainer } from "./components";
import { ROLES } from "../../services";
import { useNavigate } from "react-router";
import { request } from "../../utils";
import { DateTime } from "luxon";

const tableStyleProps = {
  table: {
    padding: "20px",
  },
  row: {
    "grid-column-gap": "1px",
    "border-bottom": "1px solid white",
    "background-color": "white",
  },
  cell: {
    "background-color": "black",
    height: "fit-content",
    padding: "15px",
  },
};

export const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userRole = useSelector(selectUserRole);
  const accessRoles = [ROLES.ADMIN];
  const [accessError, setAccessError] = useState(null);
  useEffect(() => {
    getUsers().then((res) => {
      if (res.error) {
        setAccessError(res.error);
        return;
      }
      const { body } = res;
      dispatch({ type: USERS_ACTION_TYPES.GET_USERS, payload: body.users });
      dispatch({ type: ROLES_ACTION_TYPES.GET_ROLES, payload: body.roles });
    });
    return () => {
      dispatch({ type: USERS_ACTION_TYPES.CLEAR_USERS });
      dispatch({ type: ROLES_ACTION_TYPES.CLEAR_ROLES });
    };
  }, []);

  useEffect(() => {
    if (!accessRoles.includes(userRole)) navigate("/auth");
  }, [userRole]);
  return (
    <ScrollableContainer>
      <PrivateContainer error={accessError}>
        <Table
          styles={tableStyleProps}
          data={
            users?.map((user) => ({
              columns: [
                user.login,
                DateTime.fromISO(user.registed_at).toFormat("dd.MM.yyyy"),
                <RoleWithSaveIcon user={user} />,
              ],
            })) ?? []
          }
        />
      </PrivateContainer>
    </ScrollableContainer>
  );
};
