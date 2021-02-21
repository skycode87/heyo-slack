import { Table, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { EditOutlined, DeleteOutlined, BarsOutlined, CameraOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";
import { dateFormat, isFutureDate, isRangeDate, validateImage } from "../../../constants/globals";

const addTooltip = (text, row, handleAddImage) => {
  if (row.type === "TEXT") {
    return (
      <Tooltip placement="topLeft" title={row.url}>
        <code>{row.body}</code>
      </Tooltip>
    );
  }
  if (row.type === "IMAGE") {
    return (
      <Tooltip placement="topLeft" title={row.url}>
        <img alt={row.name} src={validateImage(row.avatar)} width="100px" />
      </Tooltip>
    );
  }

  return (
    <Tooltip placement="topLeft" title={row.url}>
      {text}
    </Tooltip>
  );
};

const PlansTable = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  plans,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleAddImage,
  t,
  handleActive,
  packData,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={plans} refetch={refetch}>
      <Table.Column
        width="10%"
        title={t("actions")}
        dataIndex="actions"
        key="actions"
        render={(_, data) => (
          <div className="actions-column">
            <Space size="small">
              <a href="#!" onClick={() => handleEdit(data)} role="button" tabIndex={0}>
                <EditOutlined />
              </a>
              <a href="#!" onClick={() => handleArchived(data)} role="button" tabIndex={0}>
                <DeleteOutlined />
              </a>
              {/*  <a href="#!" onClick={() => handleActive(data)} role="button" tabIndex={0}>
                {data.active ? (
                  <CheckCircleTwoTone twoToneColor="#FF0A50" />
                ) : (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                )}
                </a> */}
              <a href="#!" onClick={() => handleDetails(data)} role="button" tabIndex={0}>
                <BarsOutlined />
              </a>
            </Space>
          </div>
        )}
      />
      <Table.Column
        title="Nombre"
        dataIndex="name"
        key="name"
        sorter
        render={(text, row) => addTooltip(text, row, handleAddImage)}
      />
      {/*  <Table.Column
         dataIndex="name"
        key="name"
        sorter
        width="2%"
        render={(text, row) =>
          row?.public ? <EyeOutlined className="iconGreen" /> : <EyeInvisibleOutlined className="iconRed" />
        }
      /> */}
      <Table.Column
        width="10%"
        title="Active"
        dataIndex="active"
        key="active"
        sorter
        render={(value) => value && <h3 className="secondaryOption">Activo</h3>}
      />
      {!packData.unlimited && (
        <Table.Column
          width="10%"
          title="Desde"
          dataIndex="startdate"
          key="startdate"
          sorter
          render={(value, row) =>
            row.active && isRangeDate(row.startdate, row.closuredate) ? (
              <h3 className="primaryOption">{dateFormat(value)}</h3>
            ) : (
              dateFormat(value)
            )
          }
        />
      )}
      {!packData.unlimited && (
        <Table.Column
          width="10%"
          title="Hasta"
          dataIndex="closuredate"
          key="closuredate"
          sorter
          render={(value, row) =>
            row.active && isRangeDate(row.startdate, row.closuredate) ? (
              <h3 className="primaryOption">{dateFormat(value)}</h3>
            ) : (
              dateFormat(value)
            )
          }
        />
      )}

      <Table.Column title={t("user")} dataIndex="rootInfo" key="rootInfo" sorter />
      <Table.Column title={t("pack")} dataIndex="packInfo" key="packInfo" sorter />
    </BaseTable>
  </>
);

export default withRouter(PlansTable);
