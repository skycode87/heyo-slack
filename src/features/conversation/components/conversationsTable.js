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
    <BaseTable {...restProps} dataSource={conversations} refetch={refetch}>
      {/* <Table.Column
        width="10%"
        title="Actions"
        dataIndex="actions"
        key="actions"
        render={(_, data) => (
          <Space size="small">
            <a href="#!" onClick={() => details(data)} role="button" tabIndex={0}>
              More Info
            </a>
          </Space>
        )}
        /> */}
      <Table.Column
        title="User A"
        dataIndex="usera"
        key="usera"
        sorter
        responsive={["lg"]}
        render={(value) => (
          <small>
            <img width="40px" alt="" src={value.avatar} />
            &nbsp; &nbsp; {value.username}
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
            &nbsp; &nbsp; {value.username}
          </small>
        )}
      />
      <Table.Column
        title="Interactions"
        dataIndex="interactions"
        key="interactions"
        sorter
        responsive={["lg"]}
        render={(value) => <span className="interactions">{value}</span>}
      />
      <Table.Column
        title="Last Interaction"
        dataIndex="lastinteraction"
        key="lastinteraction"
        sorter
        responsive={["lg"]}
        render={(value) => dateFormat2(value)}
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
