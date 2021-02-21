import { useState } from "react";
import { Table, Space } from "antd";
import { CheckCircleTwoTone, EditOutlined, DeleteOutlined, BarsOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import ActionUserTable from "./ActionsPacksTable";

const PacksTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  packs,
  refetch,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleActive,
  t,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={packs} refetch={refetch}>
      <Table.Column
        width="5%"
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
              <a href="#!" onClick={() => handleActive(data)} role="button" tabIndex={0}>
                {data.active ? (
                  <CheckCircleTwoTone twoToneColor="#FF0A50" />
                ) : (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                )}
              </a>
              <a href="#!" onClick={() => handleDetails(data)} role="button" tabIndex={0}>
                <BarsOutlined />
              </a>
            </Space>
          </div>
        )}
      />
      <Table.Column
        width="2%"
        title=""
        dataIndex="active"
        key="active"
        sorter
        render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 14 }} />}
      />
      <Table.Column
        width="30%"
        title={t("pack")}
        dataIndex="name"
        key="name"
        sorter
        render={(text, row) => `${row.name}`}
      />
      <Table.Column width="10%" title={t("type")} dataIndex="type" key="type" sorter />
      <Table.Column width="10%" title={t("category")} dataIndex="category" key="category" sorter />
      <Table.Column
        width="10%"
        title={t("public")}
        dataIndex="public"
        key="public"
        sorter
        render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 14 }} />}
      />
      {/*  <Table.Column
        width="10%"
        title={t("avatar")}
        dataIndex="avatar"
        key="avatar"
        sorter
        render={(text, pack) =>
          pack.type === "IMAGE" ? (
            <img style={{ width: 40 }} alt="example" src={`http://localhost:2001/uploads/${text}`} />
          ) : (
            <></>
          )
        }
      /> */}
    </BaseTable>
  </>
);

export default withRouter(PacksTable);
