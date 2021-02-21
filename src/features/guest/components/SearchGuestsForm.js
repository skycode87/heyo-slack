import { Form, Row, Col, Select, Input, Button } from "antd";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import globalStyles from "../../shared/css/global.module.css";
import useSettings from "../../shared/hooks/useSettings";
import { parseBoolean } from "../../../utils/parseUtils";

const SearchUsuariosForm = ({ filters, setFilters, refetch }) => {
  const { globalSettings } = useSettings();
  const initialValues = { firstname: "", lastname: "", email: "", active: "", document: "", type: "" };
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
      layout="vertical"
      form={form}
      name="search-categories-form"
      initialValues={initialValues}
      onFinish={onFinishForm}
      onValuesChange={onValuesChange}
    >
      <Row gutter={24} style={{ marginBottom: -7 }}>
        <Col span={4}>
          <Form.Item name="firstname" label="Nombres">
            <Input type="text" defaultValue="" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="lastname" label="Apellidos">
            <Input type="text" defaultValue="" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="email" label="email">
            <Input type="text" defaultValue="" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="document" label="Documento">
            <Input type="text" defaultValue="" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="type" label="Tipo">
            <Select>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
              <Select.Option value="GYM">GYM</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="active" label="Activo">
            <Select>
              <Select.Option value="">Todos</Select.Option>
              <Select.Option value="true">Activos</Select.Option>
              <Select.Option value="false">Inactivos</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22} className={globalStyles["text-align-right"]}>
          <Button type="default" size="middle" htmlType="submit">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

SearchUsuariosForm.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

export default SearchUsuariosForm;
