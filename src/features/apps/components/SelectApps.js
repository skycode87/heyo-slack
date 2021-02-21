import { useEffect, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";

import { getApps } from "../requests";

const { Option } = Select;

const SelectApps = ({ defaultValue, returnData, currentValue, reload }) => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(currentValue);
  const { currentTrans: TransRedux } = useSelector((store) => store.trans);

  useEffect(() => {
    getApps({
      onSuccess: (res) => {
        setData(res.result);
      },
      onError: () => {},
    });
  }, []);

  useEffect(() => {
    setValue(null);
  }, [reload]);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (TransRedux?._id) {
      setValue(TransRedux._id);
    }
  }, [TransRedux]);

  const handleChange = (value__) => {
    setValue(value__);
    returnData(value__);
  };
  return (
    <Select
      showSearch
      onChange={handleChange}
      value={value}
      defaultValue={defaultValue}
      style={{ width: "100%" }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
    >
      <Option key="0" value={null}>
        Seleccione un Aplicacion
      </Option>
      {data &&
        data?.map((item) => (
          <Option key={item._id} value={item._id}>
            {` ${item.code}`}
          </Option>
        ))}
    </Select>
  );
};

export default SelectApps;
