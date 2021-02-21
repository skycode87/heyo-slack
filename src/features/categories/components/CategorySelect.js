import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import usePageData from "../../shared/hooks/usePageData";
import useTranslate from "../../shared/hooks/useTranslate";
import { parseStrToJSON } from "../../../utils/jsonUtils";

const CategorySelect = ({ defaultValue = 0, defaultLabel, onChange, width }) => {
  const { t } = useTranslate();
  const [kometCodesCategories, setKometCodesCategories] = useState([]);
  const { initialData } = usePageData();

  useEffect(() => {
    if (initialData?.categories) {
      setKometCodesCategories(parseStrToJSON(initialData.categories));
    }
  }, [initialData]);

  const handleChange = (values) => onChange(values);

  return (
    <Select
      style={{ width }}
      size="small"
      labelInValue
      onChange={handleChange}
      value={{ value: defaultValue, label: defaultLabel }}
    >
      <Select.Option value={0}>{t["common.select"]}</Select.Option>
      {kometCodesCategories.map((kometcodeCategory) => (
        <Select.Option key={kometcodeCategory.categoryId} value={kometcodeCategory.categoryId}>
          {kometcodeCategory.categoryName}
        </Select.Option>
      ))}
    </Select>
  );
};

CategorySelect.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultLabel: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.number,
};

CategorySelect.defaultProps = {
  width: 120,
};

export default CategorySelect;
