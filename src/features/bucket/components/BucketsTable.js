import { Table, Space, Tag } from "antd";
import { RollbackOutlined, EditOutlined, DeleteOutlined, BarsOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import ActionUserTable from "./ActionsBucketTable";

const PlansTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  buckets,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleReverse,
  openDetailsBucketModal,
  t,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={buckets} refetch={refetch}>
      <Table.Column
        width="120px"
        title={t("actions")}
        dataIndex="actions"
        key="actions"
        render={(_, data) => (
          <div className="actions-column">
            <Space size="small">
              <a href="#!" onClick={() => handleArchived(data)} role="button" tabIndex={0}>
                <DeleteOutlined />
              </a>
            </Space>
          </div>
        )}
      />
      <Table.Column align="center" title="Imagen" dataIndex="image" key="image" sorter />
      <Table.Column
        title={t("createdAt")}
        dataIndex="createdAt"
        key="createdAt"
        sorter
        render={(text, row) => `${row.createdAt}`}
      />{" "}
    </BaseTable>
  </>
);

export default withRouter(PlansTable);
