import { Table, Typography } from "antd";
import PropTypes from "prop-types";
import "./BaseTable.css";

const { Text } = Typography;

const BaseTable = ({
  children,
  dataSource,
  pagination,
  setPagination,
  filters,
  setFilters,
  loading,
  refetch,
  details,
}) => {
  const handleTableChange = (paginationValues, _, sorter) => {
    setFilters({
      ...filters,
      sidx: sorter.columnKey || filters.sidx,
      sord: sorter.order === "ascend" ? "asc" : "desc",
    });
    setPagination({ ...pagination, current: paginationValues.current });

    if (typeof refetch === "function") {
      refetch();
    }
  };

  return (
    <>
      {loading || dataSource?.length > 0 ? (
        <Table
          rowClassName="row-table"
          showSorterTooltip={false}
          sortDirections={["ascend", "descend", "ascend"]}
          bordered
          size="small"
          rowKey={(record) => record._id}
          dataSource={dataSource}
          pagination={{
            ...pagination,
            size: "small",
            showTotal: (total, range) => `${range[0]} - ${range[1]} de ${total} registros`,
            position: ["bottomCenter"],
            showSizeChanger: false,
            pageSize: 100,
          }}
          onChange={handleTableChange}
          style={{ cursor: "pointer" }}
          loading={loading}
        >
          {children}
        </Table>
      ) : (
        <div className="no-results">
          <div className="content">
            <Text>No hay resultados</Text>
          </div>
        </div>
      )}
    </>
  );
};

BaseTable.propTypes = {
  children: PropTypes.node.isRequired,
  dataSource: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  setPagination: PropTypes.func,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  loading: PropTypes.bool,
  refetch: PropTypes.func,
  details: PropTypes.func,
};

BaseTable.defaultProps = {
  loading: false,
  details: (data) => data,
};

export default BaseTable;
