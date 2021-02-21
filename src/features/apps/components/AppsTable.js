import { useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { CheckCircleTwoTone, EditOutlined, DeleteOutlined, BarsOutlined, DollarOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import ActionUserTable from "./ActionsAppsTable";
import SelectStatusApp from "./SelectStatusApp";

const AppsTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  apps,
  refetch,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleActive,
  handleAddTrans,
  t,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={apps} refetch={refetch}>
      <Table.Column
        title={t("actions")}
        dataIndex="actions"
        width="10%"
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
              <a href="#!" onClick={() => handleAddTrans(data)} role="button" tabIndex={0}>
                <DollarOutlined />
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
        title={t("plan")}
        dataIndex="planInfo"
        key="planInfo"
        sorter
        render={(value, row) => <>{value}</>}
      />
      <Table.Column width="20%" title="Cliente" dataIndex="userInfo" key="userInfo" sorter />
      <Table.Column
        align="right"
        width="10%"
        title="Monto"
        dataIndex="amount"
        key="amount"
        sorter
        render={(value, row) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      />
      <Table.Column
        width="120px"
        title={t("status")}
        dataIndex="status"
        key="status"
        sorter
        render={(value, row) => (
          <>
            <Tooltip title={row.statusObservation}>
              <SelectStatusApp row={row} defaultValue={value} />
            </Tooltip>
          </>
        )}
      />
      <Table.Column
        width="10%"
        title={t("actions")}
        dataIndex="actions"
        key="actions"
        render={(_, app) => (
          <div className="actions-column">
            <Space size="small">
              {/* <a onClick={() => handleEdit(user)} onKeyDown={() => handleEdit(user)} role="button" tabIndex={0}>
                  "Editar"
          </a> */}
              <ActionUserTable
                handleDetails={handleDetails}
                handleEdit={handleEdit}
                handleArchived={handleArchived}
                handleInactive={handleActive}
                appId={app}
              />
            </Space>
          </div>
        )}
      />
    </BaseTable>
  </>
);

export default withRouter(AppsTable);
