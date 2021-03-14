import { Table, Space } from "antd";
import { CheckCircleTwoTone, DeleteOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import { dateFormat2 } from "../../../constants/globals";

const ConversationsTable = ({
  selectedConversation,
  setSelectedConversation,
  setPage,
  history,
  conversations,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  t,
  handleInactive,
  details,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} details={details} dataSource={conversations} refetch={refetch}>
      <Table.Column
        width="5%"
        title="Actions"
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
        title="User A"
        dataIndex="usera"
        key="usera"
        sorter
        responsive={["lg"]}
        render={(value) => (
          <small>
            <img width="40px" alt="" src={value.avatar} />
            {value.username}
          </small>
        )}
      />
      <Table.Column
        title="User B"
        dataIndex="userb"
        key="userb"
        sorter
        responsive={["lg"]}
        render={(value) => (
          <small>
            <img width="40px" alt="" src={value.avatar} />
            {value.username}
          </small>
        )}
      />
      <Table.Column
        title="Created At"
        dataIndex="created"
        key="created"
        sorter
        responsive={["lg"]}
        render={(value) => dateFormat2(value)}
      />
    </BaseTable>
  </>
);

export default withRouter(ConversationsTable);
