import { Button, Col, Form, Input, Row, Select } from "antd";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { parseStrToJSON } from "../../../utils/jsonUtils";
import globalStyles from "../../shared/css/global.module.css";
import usePageData from "../../shared/hooks/usePageData";
import useTranslate from "../../shared/hooks/useTranslate";

const SearchProductsForm = ({ filters, setFilters, refetch }) => {
  const [categoriesCompany, setCategoriesCompany] = useState([]);
  const { t } = useTranslate();
  const { initialData } = usePageData();
  const initialValues = { kometCodeStatus: "", product: "", category: "", active: 1 };
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData.categories) {
      setCategoriesCompany(parseStrToJSON(initialData.categories));
    }
  }, [initialData]);

  const onFinishForm = (values) => {
    setFilters({ ...filters, ...values });
    refetch();
  };

  const onValuesChange = debounce((values) => {
    setFilters({ ...filters, ...values });
  }, 500);

  const buildCategoriesSelect = useCallback(
    () => (
      <Select>
        <Select.Option value="">{t["common.all.categories"]}</Select.Option>
        {categoriesCompany?.map((categoryCompany) => (
          <Select.Option key={categoryCompany.id} value={categoryCompany.id}>
            {categoryCompany.name}
          </Select.Option>
        ))}
      </Select>
    ),
    [categoriesCompany]
  );

  return (
    <Form
      size="small"
      layout="horizontal"
      form={form}
      name="search-products-form"
      initialValues={initialValues}
      onFinish={onFinishForm}
      onValuesChange={onValuesChange}
    >
      <Row gutter={24} style={{ marginBottom: -7 }}>
        <Col span={4}>
          <Form.Item className={globalStyles["text-align-right"]}>
            <b htmlFor="product">{t["common.product"]}:</b>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="product">
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item className={globalStyles["text-align-right"]}>
            <b htmlFor="category">{t["common.category"]}:</b>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="category">{buildCategoriesSelect()}</Form.Item>
        </Col>
        <Col span={2} className={globalStyles["text-align-right"]}>
          <Form.Item>
            <b htmlFor="active">{t["common.active"]}:</b>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="active">
            <Select>
              <Select.Option value="">{t["common.all"]}</Select.Option>
              <Select.Option value={1}>{t["common.yes"]}</Select.Option>
              <Select.Option value={0}>{t["common.no"]}</Select.Option>
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
        <Col span={5}>
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

SearchProductsForm.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
};

export default SearchProductsForm;
