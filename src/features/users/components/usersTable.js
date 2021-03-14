import { Table, Space } from "antd";
import { CheckCircleTwoTone, DeleteOutlined } from "@ant-design/icons";
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
        width="5%"
        title="actions"
        dataIndex="actions"
        key="actions"
        render={(_, data) => (
          <div className="actions-column">
            <Space size="small">
              <a href="#!" onClick={() => handleArchived(data)} role="button" tabIndex={0}>
                <DeleteOutlined />
              </a>
              <a href="#!" onClick={() => handleInactive(data)} role="button" tabIndex={0}>
                {data.state === 1 ? (
                  <CheckCircleTwoTone twoToneColor="#FF0A50" />
                ) : (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                )}
              </a>
            </Space>
          </div>
        )}
      />
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
            return "Inactive";
          }
          if (value === "1") {
            return "in Waiting";
          }
          if (value === "2") {
            return "Connected";
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
      <Table.Column title="Connections to have" dataIndex="people" key="people" sorter responsive={["lg"]} />
      <Table.Column
        title="Remaining Connections"
        dataIndex="connections"
        key="connections"
        sorter
        responsive={["lg"]}
      />
    </BaseTable>
  </>
);

export default withRouter(UsersTable);
