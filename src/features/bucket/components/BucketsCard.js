import { Row, Col, Tag, Card, Skeleton } from "antd";
import { withRouter } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateImageBucket, dateFormat } from "../../../constants/globals";

const { Meta } = Card;

const BucketCards = ({
  selectedUser,
  setSelectedUser,
  setPage,
  history,
  buckets,
  refetch,
  initialValues,
  handleDetails,
  handleEdit,
  userId,
  handleArchived,
  handleReverse,
  openDetailsBucketModal,
  ...restProps
}) => {
  const { t, i18n } = useTranslation();

  const cartas = () =>
    buckets?.map((item) => (
      <Col className="gutter-row" span={5}>
        <Card
          hoverable
          style={{ width: 240, margin: 10 }}
          cover={<img alt="example" src={validateImageBucket(item.image, item.instanceId)} />}
        >
          <Meta
            title={
              <>
                {" "}
                <a href="#!" style={{ fontSize: 16 }} onClick={() => handleEdit(item)}>
                  <EditOutlined style={{ color: "#fa541c" }} />
                </a>{" "}
                <a href="#!" style={{ fontSize: 16 }} onClick={() => handleArchived(item)}>
                  <DeleteOutlined style={{ color: "#fa541c" }} />
                </a>{" "}
                {item.title}
                <p style={{ paddingTop: 10 }}>
                  {item.public ? <Tag color="green">{t("public")}</Tag> : <Tag color="red">{t("private")}</Tag>}
                  {item.type === "Avatar" && <Tag color="geekblue">{item.type}</Tag>}
                  {item.type === "Cover" && <Tag color="geekblue">{item.type}</Tag>}
                  {item.type === "Gallery" && <Tag color="geekblue">{item.type}</Tag>}
                </p>
              </>
            }
            description={<p>{dateFormat(item.createdAt)}</p>}
          />
        </Card>
      </Col>
    ));

  // cartas();

  return (
    <Row gutter={32}>
      {cartas()}
      {buckets.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 30, width: "100%" }}>No hay imagenes para mostrar </p>
      )}
    </Row>
  );
};

export default withRouter(BucketCards);
