import { useEffect } from "react";
import { Table, Space } from "antd";
import { CheckCircleTwoTone, DeleteOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import { dateFormat2 } from "../../../constants/globals";
import useMessages from "../hooks/useMessage";

const MessageTable = ({
  setPage,
  history,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  t,
  handleInactive,
  details,
  conversationId,
  reload,
  ...restProps
}) => {
  const { messages, filters, setFilters, pagination, setPagination, loading, refetch } = useMessages();

  useEffect(() => {
    if (conversationId.lenght > 0) {
      setFilters({ ...filters, conversationId });
      refetch();
    }
  }, [reload]);

  return (
    <BaseTable {...restProps} details={details} dataSource={messages} refetch={refetch}>
      <Table.Column
        width="5%"
        title={t("actions")}
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
        title="User"
        dataIndex="user"
        key="user"
        sorter
        responsive={["lg"]}
        render={(value) => (
          <small>
            <img width="40px" alt="" src={value.avatar} />
            {value.username}
          </small>
        )}
      />
      <Table.Column title="Message" dataIndex="text" key="text" sorter responsive={["lg"]} />

      <Table.Column
        title="Created At"
        dataIndex="created"
        key="created"
        sorter
        responsive={["lg"]}
        render={(value) => dateFormat2(value)}
      />
    </BaseTable>
  );
};

export default withRouter(MessageTable);
