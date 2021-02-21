import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Tooltip, Switch, Space, Typography, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { saveCategory, getCategory } from "../requests";
import useTranslate from "../../shared/hooks/useTranslate";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import useOriginRegions from "../hooks/useOriginRegions";
import BaseModal from "../../shared/components/Modal/BaseModal";
import CategorySelect from "./CategorySelect";
import useArrowKeys from "../../shared/hooks/useArrowKeys";
import useSettings from "../../shared/hooks/useSettings";
import { parseBoolean } from "../../../utils/parseUtils";

const { Option } = Select;
const { Text, Title, Link } = Typography;

const ManageCategoriesModal = ({
  categoryId,
  openModal,
  closeModal,
  refetch,
  initialValues,
  categories,
  positionInitial,
  setCategoryId,
}) => {
  const { t, translate } = useTranslate();
  const { globalSettings } = useSettings();
  const { originRegions } = useOriginRegions();
  const [selectedCategory, setSelectedCategory] = useState(initialValues);
  const [form] = Form.useForm();
  const [requestData, setRequestData] = useState({});
  const [loaderForm, setLoaderForm] = useState(false);

  const { position: categoryPosition, setPosition } = useArrowKeys(positionInitial, categories?.length || 100) || null;

  useEffect(() => {
    if (categoryId) {
      setLoaderForm(true);
      getCategory(categoryId, {
        onSuccess: (response) => {
          setSelectedCategory(response);
          setLoaderForm(false);
        },
        onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
      });
    } else {
      setSelectedCategory(initialValues);
    }
  }, [categoryId]);

  useEffect(() => {
    if (requestData.message) {
      closeModal();
      showGlobalNotification("success", t["common.confirmation"], requestData.message);
      if (!categoryId) setSelectedCategory(initialValues);
      refetch();
    }
  }, [requestData]);

  useEffect(() => {
    form.setFieldsValue(selectedCategory);
  }, [form, selectedCategory]);

  useEffect(() => {
    setPosition(positionInitial);
  }, [positionInitial]);

  useEffect(() => {
    if (categories && categoryId) {
      setCategoryId(categories[categoryPosition]?.id);
    }
  }, [categoryPosition]);

  useEffect(() => {
    setPosition(positionInitial);
  }, [positionInitial]);

  const onFinish = (values) => {
    const originRegionIds = [];
    values.originRegionIds.map((item) => originRegionIds.push(item.value));

    const data = { ...selectedCategory, ...values };

    saveCategory(
      {
        ...data,
        isLastProduct: values.isLastProduct ? 1 : 0,
        isPhytosanitaryCertificate: values.isPhytosanitaryCertificate ? 1 : 0,
        action: "saveCategoryData",
        categoryId: categoryId || "",
        originRegionIds,
      },
      {
        onSuccess: (response) => setRequestData(response),
        onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
        onFinally: closeModal,
      }
    );
  };

  const resetColor = ({ name, color }) => {
    setSelectedCategory({ ...selectedCategory, [name]: color });
    form.setFieldsValue(selectedCategory);
  };

  const handleKometCodeChange = ({ value, label }) => {
    setSelectedCategory({
      ...selectedCategory,
      kometCode: value === 0 ? "" : label,
      kometCodeId: value === 0 ? null : value,
    });
    form.setFieldsValue(selectedCategory);
  };

  const optionRegions = () =>
    originRegions?.map((item) => (
      <Option key={item.originRegionId} value={item.originRegionId} label={item.originRegionName}>
        {item.originRegionName}
      </Option>
    ));

  const handleCloseModal = () => {
    setSelectedCategory(initialValues);
    setCategoryId(null);
    closeModal();
  };

  const onValuesChange = (values) => {
    setSelectedCategory({ ...selectedCategory, ...values });
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  return (
    <BaseModal
      isOpenModal={openModal}
      closeModal={handleCloseModal}
      onCancel={handleCloseModal}
      onConfirm={() => handleSubmit()}
      title={t["setup.product.add.category"]}
      width={990}
      confirmText={t["common.save"]}
      isCloseModal
      top={100}
    >
      <Form
        form={form}
        name="manage-category-form-modal"
        initialValues={initialValues}
        className="manage-modal"
        onFinish={onFinish}
        labelCol={{ span: 14 }}
        onValuesChange={onValuesChange}
      >
        <Row gutter={8}>
          <Col span={24}>
            <Title className="form-title" level={5}>
              {t["setup.product.category.information"]}
              {categoryId && (
                <Text className="arrow-navigation-message">
                  <InfoCircleOutlined /> {t["setup.product.category.navigation.categories"]}
                </Text>
              )}
            </Title>
          </Col>
        </Row>
        <div className="layout-form-modal">
          {loaderForm ? (
            <>
              <Spin tip={t["common.loading"]} />
            </>
          ) : (
            <>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="kometCode" label={t["common.komet.code"]}>
                    <CategorySelect
                      defaultValue={selectedCategory?.kometCodeId || 0}
                      defaultLabel={selectedCategory?.kometCode || t["common.select"]}
                      width={185}
                      onChange={handleKometCodeChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={t["common.name"]}
                    rules={[
                      { required: true, message: `${translate(t["error.input.is.required"], [t["common.name"]])}` },
                    ]}
                  >
                    <Input size="small" value={selectedCategory.name} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="isLastProduct"
                    label={t["setup.product.category.last.search"]}
                    valuePropName={selectedCategory.isLastProduct === "true" ? "checked" : null}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="division" label={t["common.division"]}>
                    <Select size="small" className="select-form-modal">
                      <Option value="0">{t["common.print.bol.product.default.description"]}</Option>
                      <Option value="1">{t["common.plants"]}</Option>
                      {parseBoolean(globalSettings.hardgoodEnabled) && (
                        <Select.Option value="2">{t["common.hard.good"]}</Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="usTariffCode" label={t["setup.product.category.us.tariff.code"]}>
                    <Input size="small" value={selectedCategory.usTariffCode} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="originRegionIds" label={t["common.region.origin"]}>
                    <Select
                      size="small"
                      mode="multiple"
                      labelInValue="true"
                      value={selectedCategory.originRegionIds}
                      allowClear
                      style={{ width: 185 }}
                      placeholder={t["common.add.new.region"]}
                    >
                      {originRegions && optionRegions()}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="canadaTariffCode" label={t["setup.product.category.canada.tariff.code"]}>
                    <Input size="small" value={selectedCategory.canadaTariffCode} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="accountingCode" label={t["common.accounting.code.sales"]}>
                    <Input size="small" value={selectedCategory.accountingCode} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="customsCode" label={t["setup.product.category.customs.code"]}>
                    <Input size="small" value={selectedCategory.customsCode} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="accountingProcurementCode" label={t["common.accounting.code.buying"]}>
                    <Input size="small" value={selectedCategory.accountingProcurementCode} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="weight" label={t["setup.product.category.weight"]}>
                    <Input
                      size="small"
                      type="number"
                      style={{ width: 133 }}
                      addonAfter={`${t["setup.product.category.weight.stem"]}`}
                      value={selectedCategory.weight}
                      min="0"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label={t["common.text.color"]}>
                    <Form.Item noStyle name="textColor">
                      <Input size="small" type="color" value={selectedCategory.textColor} />
                    </Form.Item>
                    <Link onClick={() => resetColor({ name: "textColor", color: "#000" })} href="#!">
                      {t["setup.product.remove.color"]}
                    </Link>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t["setup.product.category.box.charge"]}>
                    <Space size="small">
                      <Form.Item noStyle name="boxCharge">
                        <Input size="small" value={selectedCategory.boxCharge} className="input-form-modal-small" />
                      </Form.Item>
                      <Tooltip title={t["setup.product.category.box.charge.tipsy"]}>
                        <Link href="#!">{t["common.what.this"]}</Link>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label={t["common.background.color"]}>
                    <Form.Item noStyle name="backgroundColor">
                      <Input size="small" type="color" value={selectedCategory.backgroundColor} />
                    </Form.Item>
                    <Link onClick={() => resetColor({ name: "backgroundColor", color: "#fff" })} href="#!">
                      {t["setup.product.remove.color"]}
                    </Link>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t["setup.product.category.max.aging.days"]}>
                    <Space size="small">
                      <Form.Item noStyle name="maxAgingDays">
                        <Input
                          size="small"
                          type="number"
                          className="input-form-modal-small"
                          value={selectedCategory.maxAgingDays}
                          min="0"
                        />
                      </Form.Item>
                      {t["setup.product.product.local.after.days"]}
                      <Tooltip title={t["setup.product.category.max.aging.days.tipsy"]}>
                        <a href="#!">{t["common.what.this"]}</a>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label={t["common.you.will.see"]}>
                    <div
                      className="lbl-example"
                      style={{
                        background: `${selectedCategory.backgroundColor}`,
                        color: `${selectedCategory.textColor}`,
                      }}
                    >
                      {t["common.example"]}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t["setup.product.category.local.after"]}>
                    <Space size="small">
                      <Form.Item noStyle name="categoryLocalAfter">
                        <Input
                          type="number"
                          size="small"
                          value={selectedCategory.categoryLocalAfter}
                          className="input-form-modal-small"
                          placeholder="180"
                          min="0"
                        />
                      </Form.Item>
                      {t["setup.product.category.local.after.days"]}
                      <Tooltip title={t["setup.product.category.local.after.tipsy"]}>
                        <Link href="#!">{t["common.what.this"]}</Link>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label={t["setup.product.categoty.phytosanitary.certificate"]}>
                    <Space size="small">
                      <Form.Item
                        noStyle
                        name="isPhytosanitaryCertificate"
                        valuePropName={selectedCategory.isPhytosanitaryCertificate === "true" ? "checked" : null}
                      >
                        <Switch />
                      </Form.Item>
                      <Tooltip title={t["setup.product.categoty.phytosanitary.certificate.tipsy"]}>
                        <Link href="#!">{t["common.what.this"]}</Link>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="active"
                    label={t["common.active"]}
                    valuePropName={selectedCategory.active === "true" ? "checked" : null}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Form>
    </BaseModal>
  );
};

ManageCategoriesModal.defaultProps = {
  setCategoryId: () => {},
};

export default ManageCategoriesModal;
