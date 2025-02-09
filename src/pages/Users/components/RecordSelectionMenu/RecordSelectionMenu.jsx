import { Table } from "../../../../components/Table/Table";
import { selectRoles } from "../../../../services/store/selectors/selectors";
import { useSelector } from "react-redux";
import { ROLES } from "../../../../services";
import { Modal } from "../../../../components/Modal/Modal";
import PropTypes from "prop-types";

const tableStyleProps = {
  table: {
    padding: "20px",
  },
  row: {
    "grid-column-gap": "1px",
    "border-bottom": "1px solid black",
  },
  cell: {
    cursor: "pointer",
    height: "fit-content",
    padding: "15px",
  },
};
export const RecordSelectionMenu = ({ setSelectedRole, setIsMenuSelectOpen }) => {
  const roles = useSelector(selectRoles);

  const handleCellClick = (role) => {
    setIsMenuSelectOpen(false);
    setSelectedRole(role);
  };

  return (
    <Modal>
      {roles && (
        <Table
          styles={tableStyleProps}
          data={
            roles &&
            roles
              .filter((role) => role.id !== ROLES.GHOST)
              .map((role) => ({
                columns: [role.name],
                onCellClick: () => handleCellClick(role),
              }))
          }
        />
      )}
    </Modal>
  );
};

RecordSelectionMenu.propTypes = {
  setSelectedRole: PropTypes.func.isRequired,
  setIsMenuSelectOpen: PropTypes.func.isRequired,
};
