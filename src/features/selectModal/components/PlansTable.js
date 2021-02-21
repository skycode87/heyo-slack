import { Table } from "antd";
import BaseTable from "../../shared/components/BasicTable";

const AppsTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  plans,
  refetch,
  initialValues,
  handleDetails,
  userId,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={plans} refetch={refetch}>
      <Table.Column title="Entidad" dataIndex="name" key="name" sorter render={(text, row) => `${row.name}`} />;
    </BaseTable>
  </>
);

export default AppsTable;
