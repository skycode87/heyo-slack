import { Form, Row, Col, Select, Input, Button } from "antd";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import globalStyles from "../../shared/css/global.module.css";
import useTranslate from "../../shared/hooks/useTranslate";
import useSettings from "../../shared/hooks/useSettings";
import { parseBoolean } from "../../../utils/parseUtils";

const SearchCategoriesForm = ({ filters, setFilters, refetch }) => {
  const { t } = useTranslate();
  const { globalSettings } = useSettings();
  const initialValues = { name: "", division: "", active: "", kometCodeStatus: "" };
  const [form] = Form.useForm();

  const onFinishForm = (values) => {
    setFilters({ ...filters, ...values });
    refetch();
  };

  const onValuesChange = debounce((values) => {
    setFilters({ ...filters, ...values });
  }, 500);

  return (
    <Form
      size="small"
      layout="horizontal"
      form={form}
      name="search-categories-form"
      initialValues={initialValues}
      onFinish={onFinishForm}
      onValuesChange={onValuesChange}
    >
      <Row gutter={24} style={{ marginBottom: -7 }}>
        <Col span={4}>
          <Form.Item className={globalStyles["text-align-right"]}>
            <b htmlFor="category">{t["common.category"]}:</b>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="name">
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className={globalStyles["text-align-right"]}>
            <b htmlFor="division">{t["common.division"]}:</b>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="division">
            <Select>
              <Select.Option value="">{t["common.all"]}</Select.Option>
              <Select.Option value="0">{t["common.print.bol.product.default.description"]}</Select.Option>
              <Select.Option value="1">{t["common.plants"]}</Select.Option>
              {parseBoolean(globalSettings?.hardGoodEnabled) && (
                <Select.Option value="2">{t["common.hard.good"]}</Select.Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3} className={globalStyles["text-align-right"]}>
          <Form.Item>
            <b htmlFor="active">{t["common.active"]}:</b>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="active">
            <Select>
              <Select.Option value="">{t["common.all"]}</Select.Option>
              <Select.Option value="true">{t["common.yes"]}</Select.Option>
              <Select.Option value="false">{t["common.no"]}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: -7 }}>
        <Col span={4}>
          <Form.Item className={globalStyles["text-align-right"]}>
            <b htmlFor="kometCodeStatus">{t["common.komet.code.status"]}:</b>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="kometCodeStatus">
            <Select>
              <Select.Option value="">{t["common.all"]}</Select.Option>
              <Select.Option value="1">{t["common.komet.code.status.mapped"]}</Select.Option>
              <Select.Option value="0">{t["common.komet.code.status.unmapped"]}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22} className={globalStyles["text-align-right"]}>
          <Button type="default" size="middle" htmlType="submit">
            {t["common.search"]}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

SearchCategoriesForm.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

export default SearchCategoriesForm;
