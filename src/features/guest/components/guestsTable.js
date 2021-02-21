import { Table, Space } from "antd";
import { CheckCircleTwoTone, EditOutlined, DeleteOutlined, userOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import BaseTable from "../../shared/components/BasicTable";

const moment = require("moment");

const GuestsTable = ({
  selectedGuest,
  setSelectedGuest,
  setPage,
  history,
  guests,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  guestId,
  handleArchived,
  handleActive,
  t,
  ...restProps
}) => (
  <>
    <BaseTable {...restProps} dataSource={guests} refetch={refetch}>
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
                <userOutlined />
              </a>
            </Space>
          </div>
        )}
      />
      <Table.Column
        width="15%"
        title={t("fullname")}
        dataIndex="lastname"
        key="lastname"
        sorter
        render={(text, row) => `${row.firstname} ${row.lastname}`}
      />
      ;
      <Table.Column width="25%" title="Email" dataIndex="email" key="email" sorter />
      <Table.Column
        width="10%"
        title="Invitado por"
        dataIndex="userId"
        key="userId"
        render={(value, row) => `${row.userId.firstname} ${row.userId.lastname}`}
        sorter
      />
      <Table.Column
        width="10%"
        title={t("date")}
        dataIndex="startdate"
        key="startdate"
        render={(value, row) => `${moment(row.startdate).format("L")} ||| ${moment(row.closuredate).format("L")}`}
        sorter
      />
      <Table.Column width="10%" title="Identificación" dataIndex="document" key="document" sorter />
      <Table.Column
        width="10%"
        title={t("active")}
        dataIndex="active"
        key="active"
        sorter
        render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 14 }} />}
      />
      {/* <Table.Column
        width="20%"
        title="Acciones"
        dataIndex="actions"
        key="actions"
        render={(_, guest) => (
          <div className="actions-column">
            <Space size="small">
              <ActionGuestTable
                handleDetails={handleDetails}
                handleEdit={handleEdit}
                handleArchived={handleArchived}
                handleInactive={handleInactive}
                guestId={guest}
              />
            </Space>
          </div>
        )}
        /> */}
    </BaseTable>
  </>
);

export default withRouter(GuestsTable);
