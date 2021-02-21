import { Table, Typography } from "antd";
import PropTypes from "prop-types";
import useTranslate from "../../hooks/useTranslate";
import "./BaseTable.css";

const { Text } = Typography;

const BaseTable = ({ children, dataSource, pagination, setPagination, filters, setFilters, loading, refetch }) => {
  const { t } = useTranslate();
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
          rowKey={(record) => record.id}
          dataSource={dataSource}
          pagination={{
            ...pagination,
            size: "small",
            showTotal: (total, range) =>
              `${range[0]} - ${range[1]} ${t["common.showingrecords.of"]} ${total} ${t["common.showingrecords.records"]}`,
            position: ["bottomCenter"],
            showSizeChanger: false,
            pageSize: 100,
          }}
          onChange={handleTableChange}
          loading={loading}
        >
          {children}
        </Table>
      ) : (
        <div className="no-results">
          <div className="content">
            <Text>{t["common.no.records.found"]}</Text>
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
};

BaseTable.defaultProps = {
  loading: false,
};

export default BaseTable;
