import { useEffect, useState } from "react";
import { Select } from "antd";

import { getCalendars } from "../requests";

const { Option } = Select;

const SelectCalendars = ({ defaultValue, returnData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCalendars({
      onSuccess: (res) => {
        setData(res.result);
      },
      onError: () => {},
    });
  }, []);

  const handleChange = (value) => {
    returnData(value);
  };

  return (
    <Select
      showSearch
      onChange={handleChange}
      defaultValue="0"
      style={{ width: "100%" }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
    >
      <Option key="0" value="0">
        Seleccione un paquete
      </Option>

      {data &&
        data?.map((item) => (
          <Option key={item._id} value={item._id}>
            {` ${item.code}  ${item.planId.name}  ${item.planId.duration}`}
          </Option>
        ))}
    </Select>
  );
};

export default SelectCalendars;
