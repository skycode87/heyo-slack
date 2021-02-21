import { useState, useEffect, useRef } from "react";
import { Input, List, Spin } from "antd";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";

import "./AutocompleteKometCodes.css";

const AutocompleteKomeCodes = ({
  product,
  handleMap,
  loadKometCodeProductsAutocomplete,
  resetKometCode,
  showGlobalNotification,
  translate,
}) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(product.kometCode);
  const [value, setValue] = useState(product.kometCodeId);
  const [options, setOptions] = useState([]);

  const [isShowInSpecificCategory, setIsShowInSpecificCategory] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;
  const ContainerAutocomplete = useRef(null);

  useEffect(() => {
    if (resetKometCode === product.id) {
      setLabel("");
    }
  }, [resetKometCode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ContainerAutocomplete.current && !ContainerAutocomplete.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContainerAutocomplete]);

  const onChange = (e) => {
    const productDescription = e.target.value;
    setLabel(productDescription);
    if (productDescription.length >= 3) {
      setLoading(true);
      loadKometCodeProductsAutocomplete(
        {
          limit: 25,
          productDescription,
          formatExtraOptions: false,
          categoryId: isShowInSpecificCategory ? product.categoryId : "",
          allowedToFilterPerCategory: isShowInSpecificCategory ? product.categoryId : true,
          showInSpecificCategory: isShowInSpecificCategory,
        },
        setOptions
      )
        .then(() => setLoading(false), {
          onError: () => showGlobalNotification("error", "Error", ["error.request.server.failed"]),
        })
        .catch(() => setLoading(false));
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleNext = (item) => {
    if (item.value === -1) {
      setIsShowInSpecificCategory(false);
      setLoading(true);
      loadKometCodeProductsAutocomplete(
        {
          limit: 25,
          formatExtraOptions: false,
          productDescription: label,
          categoryId: "",
          allowedToFilterPerCategory: true,
          showInSpecificCategory: false,
        },
        setOptions
      )
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else if (item.value === -2) {
      setLoading(true);
      setIsShowInSpecificCategory(true);
      loadKometCodeProductsAutocomplete(
        {
          limit: 25,
          formatExtraOptions: false,
          categoryId: product.categoryId,
          allowedToFilterPerCategory: true,
          showInSpecificCategory: true,
          productDescription: label,
        },
        setOptions
      )
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLabel(item.label);
      setValue(item.value);
      handleMap(
        {
          productId: product.id,
          companyProduct: product.description,
          masterCompanyProductId: item.value,
          masterCompanyProductName: item.label,
        },
        {
          onFinally: () => {
            setLoading(false);
            setIsShowInSpecificCategory(true);
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <div ref={ContainerAutocomplete} className="autocomplete-ajax-list">
      <Input defaultValue={product.kometCode} type="text" onChange={onChange} value={label} className="input-search" />
      {loading && <Spin className="spin" indicator={loadingIcon} />}
      <br />
      {open && (
        <List
          size="small"
          bordered
          className="list-autocomplete"
          dataSource={options}
          renderItem={(item) => (
            <List.Item onClick={() => handleNext(item)} className="list-item">
              <a href="#!" className={item.value < 0 ? "link-special" : "link-normal"}>
                {item.label}
              </a>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

AutocompleteKomeCodes.propTypes = {
  product: PropTypes.object,
  handleMap: PropTypes.func.isRequired,
  loadKometCodeProductsAutocomplete: PropTypes.func.isRequired,
  resetKometCode: PropTypes.func.isRequired,
  showGlobalNotification: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};

export default AutocompleteKomeCodes;
