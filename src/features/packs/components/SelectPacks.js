import { useEffect, useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";

import { getPacks } from "../requests";

const { Option } = Select;

const SelectPacks = ({ defaultValue, returnData, currentValue, reload }) => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(currentValue);
  const { currentPack: PackRedux } = useSelector((store) => store.pack);

  useEffect(() => {
    getPacks({
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
    if (PackRedux?._id) {
      console.log("actualizando pack con redux");
      setValue(PackRedux._id);
    }
  }, [PackRedux]);

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
        Seleccione un paquete
      </Option>
      {data &&
        data?.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.name}
          </Option>
        ))}
    </Select>
  );
};

export default SelectPacks;
