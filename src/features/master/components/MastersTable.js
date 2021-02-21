import { Table, Space } from "antd";
import { withRouter } from "react-router-dom";
import { DeleteOutlined, EditOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import BaseTable from "../../shared/components/BasicTable";

const MastersTable = ({
  selectedMaster,
  setSelectedMaster,
  setPage,
  history,
  masters,
  refetch,
  initialValues,
  handleAdd,
  handleDetails,
  handleEdit,
  masterId,
  handleArchived,
  handleActive,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={masters} refetch={refetch}>
      <Table.Column
        width="2%"
        title="Acciones"
        dataIndex="actions"
        key="actions"
        render={(_, data) => (
          <div className="actions-column">
            <Space size="small">
              <a href="#!" onClick={() => handleEdit(data)} role="button" tabIndex={0}>
                <EditOutlined />{" "}
              </a>
              <a href="#!" onClick={() => handleArchived(data)} role="button" tabIndex={0}>
                <DeleteOutlined />
              </a>
              <a href="#!" onClick={() => handleActive(data)} role="button" tabIndex={0}>
                {data.active ? (
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
        width="1%"
        title=""
        dataIndex="active"
        key="active"
        sorter
        render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 14 }} />}
      />
      <Table.Column width="40%" title="Nombre del Setting" dataIndex="name" key="name" sorter />
      <Table.Column width="10%" title="Valor" dataIndex="value" key="value" sorter />
    </BaseTable>
  </>
);

export default withRouter(MastersTable);
