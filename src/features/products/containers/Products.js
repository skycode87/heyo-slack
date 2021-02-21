import SubHeaderProductMenuContent from "../../shared/components/SubHeaderProductMenuContent";
import ActionBar from "../../shared/components/ActionBar";
import SubHeader from "../../shared/components/SubHeader";
import useTranslate from "../../shared/hooks/useTranslate";
import ActionsProducts from "../components/ActionsProducts";
import SearchProductsForm from "../components/SearchProductsForm";
import useProducts from "../hooks/useProducts";
import { menuOptions } from "../../shared/components/SubHeaderProductMenuContent/menuOptions";
import ProductTable from "../components/ProductsTable";

const Products = () => {
  const { t } = useTranslate();
  const { products, filters, setFilters, pagination, setPagination, loading, refetch } = useProducts();
  const commonProps = { filters, setFilters, refetch };

  return (
    <>
      <SubHeader {...commonProps} title={t["common.komet.codes.for.products"]}>
        <SubHeaderProductMenuContent menuSelected={menuOptions.PRODUCTS} />
      </SubHeader>
      <ActionBar {...commonProps} options={{ actions: products.length > 0 && ActionsProducts }}>
        <SearchProductsForm {...commonProps} />
      </ActionBar>
      <ProductTable
        {...commonProps}
        products={products}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        refetch={refetch}
      />
    </>
  );
};

export default Products;
