import { useState } from "react";
import { Table, Space, Tag } from "antd";
import { CheckCircleTwoTone, RollbackOutlined, EditOutlined, DeleteOutlined, BarsOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import ActionUserTable from "./ActionsTransTable";

const PlansTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  transs,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleReverse,
  openDetailsTransModal,
  t,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={transs} refetch={refetch}>
      <Table.Column
        width="120px"
        title={t("actions")}
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
              <a href="#!" onClick={() => handleReverse(data)} role="button" tabIndex={0}>
                {data.type === "inbound" && <RollbackOutlined style={{ color: "#fa541c" }} />}
              </a>
              <a href="#!" onClick={() => handleDetails(data)} role="button" tabIndex={0}>
                <BarsOutlined />
              </a>
            </Space>
          </div>
        )}
      />
      <Table.Column align="center" width="10%" title="code" dataIndex="code" key="code" sorter />
      <Table.Column
        title={t("fullname")}
        dataIndex="fullname"
        key="fullname"
        sorter
        render={(text, row) => `${row.fullname} ${row.email}`}
      />{" "}
      <Table.Column
        title={t("description")}
        dataIndex="description"
        key="description"
        sorter
        render={(text, row) => `${row.description}`}
      />{" "}
      <Table.Column
        align="right"
        title={t("amount")}
        dataIndex="amount"
        key="amount"
        sorter
        render={(text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <Table.Column
        align="right"
        width="10%"
        title={t("pending")}
        dataIndex="pending"
        key="pending"
        sorter
        render={(text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <Table.Column
        align="right"
        width="10%"
        title={t("total")}
        dataIndex="total"
        key="total"
        sorter
        render={(text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <Table.Column
        align="center"
        title={t("description")}
        dataIndex="type"
        key="type"
        sorter
        render={(text) => {
          if (text === "inbound") {
            return (
              <Tag color="green" key="inbound">
                {t("incomeMoney")}
              </Tag>
            );
          }
          return (
            <Tag color="volcano" key="outbound">
              {t("out")}
            </Tag>
          );
        }}
      />
      <Table.Column
        title={t("status")}
        align="center"
        dataIndex="status"
        key="status"
        sorter
        render={(text) => {
          if (text === "Completada") {
            return (
              <Tag color="green" key={t("completed")}>
                {t("completed")}
              </Tag>
            );
          }
          return (
            <Tag color="volcano" key={t("pending")}>
              {t("pending")}
            </Tag>
          );
        }}
      />
    </BaseTable>
  </>
);

export default withRouter(PlansTable);
