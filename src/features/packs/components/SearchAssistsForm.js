import { Form, Row, Col, Select, Input, Button } from "antd";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import globalStyles from "../../shared/css/global.module.css";

const SearchAssistsForm = ({ filters, setFilters, refetch }) => {
  const initialValues = { type: "", observation: "", location: "", active: "" };
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
        <Col span={6}>
          <Form.Item name="observation" label="Observacion">
            <Input type="text" defaultValue="" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="location" label="Locacion">
            <Select>
              <Select.Option value="envigado">envigado</Select.Option>
              <Select.Option value="medellin">medellin</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="type" label="Tipo">
            <Select>
              <Select.Option value="suscripcion">suscripcion</Select.Option>
              <Select.Option value="manager">manager</Select.Option>
              <Select.Option value="evento">evento</Select.Option>
              <Select.Option value="otro">otro</Select.Option>
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

SearchAssistsForm.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

export default SearchAssistsForm;
