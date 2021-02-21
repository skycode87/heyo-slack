import { Table, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";

const AssistsTable = ({ assists, refetch, filters, setFilters, setPagination }) => (
  <>
    <BaseTable
      setPagination={setPagination}
      filters={filters}
      setFilters={setFilters}
      dataSource={assists}
      refetch={refetch}
    >
      <Table.Column width="40%" title="created" dataIndex="created" key="created" sorter />
      <Table.Column width="20%" title="location" dataIndex="location" key="location" sorter />
      <Table.Column width="20%" title="type" dataIndex="type" key="type" sorter />
      <Table.Column
        width="10%"
        title="Activo"
        dataIndex="active"
        key="active"
        sorter
        render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 14 }} />}
      />
      <Table.Column
        width="10%"
        title="Acciones"
        dataIndex="actions"
        key="actions"
        render={(_, user) => (
          <div className="actions-column">
            <Space size="small">
              {/* <a onClick={() => handleEdit(user)} onKeyDown={() => handleEdit(user)} role="button" tabIndex={0}>
                  "Editar"
          </a> */}
            </Space>
          </div>
        )}
      />
    </BaseTable>
  </>
);

export default withRouter(AssistsTable);
