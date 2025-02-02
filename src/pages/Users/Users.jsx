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
  const store = useStore();
  const accessRoles = [ROLES.ADMIN];
  const [accessError, setAccessError] = useState(null);
  useEffect(() => {
    /*через useSelector в данном случае будет работать некорректно, т.к
        1. Его нельзя использовать внутри useEffect, а если использовать снаружи придётся подвязывать useEffect на изменение
        2. Из за подвязывания промисы на получение данных будут срабатывать дважды: первый раз с отсутствующей сессией до получения её из JSON браузера, второй когда сессия будет получена
    Из за этого мало того что будут запросы по 2 раза отправляться, так и будет мелькать ошибка доступа перед появлением, здесь я получаю уже актуальное на момент вызова состояние
    */
    const storeUserSession = store.getState().user.session;
    Promise.all([getRoles(storeUserSession), getUsers(storeUserSession)]).then((responsibles) => {
      const errResponse = responsibles.find((response) => response.res === null);
      if (errResponse) {
        //500мс для того чтобы анимация появления блока успела отработать перед появлением данных
        setTimeout(() => setAccessError(errResponse.error), 500);
        return;
      }
      setTimeout(() => {
        setAccessError(null);
        responsibles.forEach((res) => dispatch(res));
      }, [500]);
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
              columns: [user.login, user.registed_at, <RoleWithSaveIcon user={user} />],
            })) ?? []
          }
        />
      </PrivateContainer>
    </ScrollableContainer>
  );
};
