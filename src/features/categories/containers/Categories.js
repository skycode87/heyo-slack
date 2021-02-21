import ActionBar from "../../shared/components/ActionBar";
import SubHeader from "../../shared/components/SubHeader";
import ActionsCategories from "../components/ActionsCategories";
import CategoriesTable from "../components/CategoriesTable";
import SearchCategoriesForm from "../components/SearchCategoriesForm";
import AddCategoryButton from "../components/AddCategoryButton";
import useCategories from "../hooks/useCategories";
import { menuOptions } from "../../shared/components/SubHeaderProductMenuContent/menuOptions";
import SubHeaderProductMenuContent from "../../shared/components/SubHeaderProductMenuContent";

const Categories = () => {
  const { categories, filters, setFilters, pagination, setPagination, loading, refetch } = useCategories();
  const commonProps = { filters, setFilters };
  const initialValues = {
    accountingCode: "",
    accountingProcurementCode: "",
    active: "true",
    backgroundColor: "",
    boxCharge: "",
    canadaTariffCode: "",
    categoryLocalAfter: "",
    customsCode: "",
    division: "0",
    id: "",
    isLastProduct: "",
    isPhytosanitaryCertificate: "",
    maxAgingDays: "",
    name: "",
    originRegionIds: [],
    textColor: "",
    usTariffCode: "",
    weight: "",
    categoryId: "",
    kometCode: "",
    kometCodeId: null,
  };

  return (
    <>
      <SubHeader {...commonProps} primaryAction={<AddCategoryButton refetch={refetch} initialValues={initialValues} />}>
        <SubHeaderProductMenuContent menuSelected={menuOptions.CATEGORIES} />
      </SubHeader>
      <ActionBar {...commonProps} options={{ actions: categories.length > 0 && ActionsCategories }}>
        <SearchCategoriesForm {...commonProps} refetch={refetch} />
      </ActionBar>
      <CategoriesTable
        {...commonProps}
        categories={categories}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        refetch={refetch}
        initialValues={initialValues}
      />
    </>
  );
};

export default Categories;
