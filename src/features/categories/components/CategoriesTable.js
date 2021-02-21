import { useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { CheckCircleTwoTone, WarningTwoTone } from "@ant-design/icons";
import BaseTable from "../../shared/components/BaseTable";
import { getDivisionKeyByIndex } from "../../../helpers/productDivisionHelper";
import useModal from "../../shared/hooks/useModal";
import BaseModal from "../../shared/components/Modal";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import useTranslate from "../../shared/hooks/useTranslate";
import ManageCategoriesModal from "./ManageCategoriesModal";
import CategorySelect from "./CategorySelect";
import { processCategoryMapping, deleteCategory } from "../requests";

const CategoriesTable = ({ categories, refetch, initialValues, ...restProps }) => {
  const { t, translate } = useTranslate();
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [isOpenManageCategoriesModal, openManageCategoriesModal, closeManageCategoriesModal] = useModal();

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryId(category.id);
    openManageCategoriesModal();
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    openDeleteModal();
  };

  const processDelete = () => {
    const params = {
      action: "validateBeforeDeleteCategory",
      categoryId: selectedCategory.id,
    };

    deleteCategory(params, {
      onSuccess: ({ result }) => {
        if (result === "0") {
          showGlobalNotification("info", "Error", t["setup.product.category.no.remove"], 6);
        } else {
          showGlobalNotification("success", t["common.confirmation"], t["setup.product.category.successfully.deleted"]);
          refetch();
        }
      },
      onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
      onFinally: () => setSelectedCategory(null),
    });
  };

  const processMapping = (params) => {
    processCategoryMapping(params, {
      onSuccess: ({ message }) => {
        showGlobalNotification("success", t["common.success"], message);
        refetch();
      },
      onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
    });
  };

  const handleUnmap = (category) => {
    processMapping({
      categoryId: category.id,
      companyCategory: category.name,
      masterCompanyCategoryName: "",
      masterCompanyCategoryId: 0,
    });
  };

  const handleMap = ({ value, label }, category) => {
    processMapping({
      categoryId: category.id,
      companyCategory: category.name,
      masterCompanyCategoryName: value === 0 ? "" : label,
      masterCompanyCategoryId: value,
    });
  };

  return (
    <>
      <BaseTable {...restProps} dataSource={categories} refetch={refetch}>
        <Table.Column width="35%" title={t["common.category"]} dataIndex="name" key="name" sorter />
        <Table.Column
          width="22%"
          title={t["common.division"]}
          dataIndex="division"
          key="division"
          sorter
          render={(value) => t[getDivisionKeyByIndex(value)]}
        />
        <Table.Column
          width="24%"
          title={t["common.komet.code.mapping"]}
          dataIndex="kometCode"
          key="kometCode"
          sorter
          render={(_, category) => (
            <Space size="small">
              <CategorySelect
                width={200}
                key={category.id}
                defaultValue={category?.kometCodeId || 0}
                defaultLabel={category?.kometCode || t["common.select"]}
                onChange={(values) => handleMap(values, category)}
              />
              {!category?.kometCodeId && (
                <Tooltip title={t["setup.setting.category.not.mapped"]}>
                  <WarningTwoTone twoToneColor="#FEC624" style={{ fontSize: 20 }} />
                </Tooltip>
              )}
            </Space>
          )}
        />
        <Table.Column
          align="center"
          width="5%"
          title={t["common.active"]}
          dataIndex="active"
          key="active"
          sorter
          render={(value) => value && <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />}
        />
        <Table.Column
          width="20%"
          title={t["common.actions"]}
          dataIndex="actions"
          key="actions"
          render={(_, category) => (
            <div className="actions-column">
              <Space size="small">
                <a
                  onClick={() => handleEdit(category)}
                  onKeyDown={() => handleEdit(category)}
                  role="button"
                  tabIndex={0}
                >
                  {t["common.edit"]}
                </a>
                <a
                  onClick={() => handleDelete(category)}
                  onKeyDown={() => handleDelete(category)}
                  role="button"
                  tabIndex={0}
                >
                  {t["common.delete"]}
                </a>
                {category.kometCodeId && (
                  <a
                    onClick={() => handleUnmap(category)}
                    onKeyDown={() => handleUnmap(category)}
                    role="button"
                    tabIndex={0}
                  >
                    {t["common.unmap"]}
                  </a>
                )}
              </Space>
            </div>
          )}
        />
      </BaseTable>
      <BaseModal
        isOpenModal={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={processDelete}
        onCancel={closeDeleteModal}
        title={t["common.confirmation"]}
        confirmText={t["common.yes"]}
        cancelText={t["common.no"]}
        footer
      >
        {translate(t["setup.product.warning.delete.category"], [selectedCategory?.name])}
      </BaseModal>
      <ManageCategoriesModal
        refetch={refetch}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        closeModal={closeManageCategoriesModal}
        openModal={isOpenManageCategoriesModal}
        initialValues={initialValues}
        categories={categories}
        selectedCategory={selectedCategory}
        positionInitial={selectedCategory?.rowPosition}
      />
    </>
  );
};

export default CategoriesTable;
