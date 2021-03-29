import { Table } from "antd";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import { dateFormat } from "../../../constants/globals";

const UsersTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  users,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  t,
  handleInactive,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={users} refetch={refetch}>
      <Table.Column
        title="Profile Picture"
        dataIndex="avatar"
        key="avatar"
        sorter
        render={(value) => <img width="40px" alt="" src={value} />}
      />
      <Table.Column title="Username" dataIndex="username" key="username" sorter />
      <Table.Column title="Title" dataIndex="title" key="title" sorter responsive={["lg"]} />
      <Table.Column
        title="State"
        dataIndex="state"
        key="state"
        sorter
        render={(value) => {
          if (value === "0") {
            return <span className="disconnected">Inactive</span>;
          }
          if (value === "1") {
            return <span className="waiting">In Waiting</span>;
          }
          if (value === "2") {
            return <span className="connected">Connected</span>;
          }
        }}
      />
      <Table.Column
        title="Last Connection"
        dataIndex="datelimit"
        key="datelimit"
        sorter
        responsive={["lg"]}
        render={(value) => dateFormat(value)}
      />
      <Table.Column
        title="Preferred number of connections per week"
        dataIndex="people"
        key="people"
        sorter
        responsive={["lg"]}
        render={(value, row) => <span className="interactions">{row.people}</span>}
      />
      <Table.Column
        title="Number of connections"
        dataIndex="connections"
        key="connections"
        sorter
        responsive={["lg"]}
        render={(value, row) => <span className="interactions">{row.people - row.connections}</span>}
      />
    </BaseTable>
  </>
);

export default withRouter(UsersTable);
