import { useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import BaseTable from "../../shared/components/BaseTable";
import useTranslate from "../../shared/hooks/useTranslate";
import Autocomplete from "./Autocomplete";
import showGlobalNotification from "../../../helpers/showGlobalNotification";
import { processProductMapping, loadKometCodeProductsAutocomplete } from "../requests";

const ProductsTable = ({ products, refetch, initialValues, ...restProps }) => {
  const { t } = useTranslate();
  const [resetKometCode, setResetKometCode] = useState(false);
  const processMapping = (params, { onFinally }) => {
    processProductMapping(params, {
      onSuccess: ({ message }) => {
        showGlobalNotification("success", t["common.success"], message);
        if (params.masterCompanyProductId < 1) {
          setResetKometCode(params.productId);
        }
        refetch();
      },
      onError: () => showGlobalNotification("error", "Error", t["error.request.server.failed"]),
      onFinally,
    });
  };

  const handleUnmap = ({ id, description }) => {
    processMapping({
      productId: id,
      companyProduct: description,
      masterCompanyProductId: "0",
      masterCompanyProductName: "",
    });
  };

  const handleMap = (
    { productId, companyProduct, masterCompanyProductId, masterCompanyProductName },
    { onFinally }
  ) => {
    processMapping(
      {
        productId,
        companyProduct,
        masterCompanyProductId,
        masterCompanyProductName,
      },
      { onFinally }
    );
  };

  return (
    <>
      <BaseTable {...restProps} dataSource={products} refetch={refetch}>
        <Table.Column
          width="40%"
          title={t["common.product.description"]}
          dataIndex="description"
          key="description"
          sorter
        />
        <Table.Column
          width="40%"
          title={t["common.komet.code.mapping"]}
          dataIndex="kometCode"
          key="kometCode"
          sorter
          render={(_, product) => (
            <Space size="small">
              <Autocomplete
                product={product}
                initialLabel={product?.kometCode}
                initialValue={product?.kometCodeId}
                refetch={refetch}
                handleMap={handleMap}
                loadKometCodeProductsAutocomplete={loadKometCodeProductsAutocomplete}
                resetKometCode={resetKometCode}
                showGlobalNotification={showGlobalNotification}
                translate={t}
              />
              {!product?.kometCodeId && (
                <Tooltip title={t["setup.product.company.not.mapped"]}>
                  <WarningTwoTone twoToneColor="#FEC624" style={{ fontSize: 20 }} />
                </Tooltip>
              )}
            </Space>
          )}
        />
        <Table.Column
          width="20%"
          title={t["common.actions"]}
          dataIndex="actions"
          key="actions"
          render={(_, product) => (
            <div className="actions-column">
              <Space size="small">
                {!product?.kometCodeId && (
                  <a onClick={() => {}} onKeyDown={() => {}} role="button" tabIndex={0}>
                    {t["common.request.new.item"]}
                  </a>
                )}
                {product?.kometCodeId && (
                  <a
                    onClick={() => handleUnmap(product)}
                    onKeyDown={() => handleUnmap(product)}
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
    </>
  );
};

export default ProductsTable;
