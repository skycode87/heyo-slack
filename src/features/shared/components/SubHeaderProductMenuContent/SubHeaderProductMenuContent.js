import { useEffect, useState } from "react";
import { staticRoutes } from "../../../../constants/routes";
import { parseBoolean } from "../../../../utils/parseUtils";
import useSettings from "../../hooks/useSettings";
import useTranslate from "../../hooks/useTranslate";
import { menuOptions } from "./menuOptions";

const SubHeaderProductMenuContent = ({ menuSelected }) => {
  const { t, translate } = useTranslate();
  const { globalSettings } = useSettings();
  const [options, setOptions] = useState("");
  useEffect(() => {
    let messageKey = "setup.product.subtitle2";
    const messageProperties = [
      `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.COMPANY_PRODUCT}">`,
      `</b></a>`,
      `<b><a class="${menuOptions.CATEGORIES === menuSelected ? "muted" : "komet-submenu-link"}" href="${
        staticRoutes.SETUP.CATEGORIES
      }">`,
      `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.ORGANIZE_CATEGORIES}">`,
      `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.PRODUCT_PACK_REMINDER}">`,
      `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.PRODUCT_ALIAS}">`,
    ];

    if (parseBoolean(globalSettings?.hardGoodEnabled) && parseBoolean(globalSettings?.isGrowerCompanyMode)) {
      messageKey = "setup.product.subtitle3";
      messageProperties.push(
        `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.HARD_GOOD_PRODUCTS}">`,
        `<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.DATA_SHEET}">`
      );
    } else if (parseBoolean(globalSettings?.hardGoodEnabled)) {
      messageProperties.push(`<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.DATA_SHEET}">`);
      messageKey = "setup.product.subtitle1";
    } else if (parseBoolean(globalSettings?.isGrowerCompanyMode)) {
      messageProperties.push(`<b><a class="komet-submenu-link" href="${staticRoutes.SETUP.DATA_SHEET}">`);
      messageKey = "setup.product.subtitle4";
    }

    messageProperties.push(
      `<b><a class="${menuOptions.PRODUCTS === menuSelected ? "muted" : "komet-submenu-link"}" href="${
        staticRoutes.SETUP.PRODUCTS
      }">`
    );

    setOptions(translate(t[messageKey], messageProperties));
  }, [t, globalSettings]);

  // eslint-disable-next-line react/no-danger
  return <div style={{ fontSize: 12 }} dangerouslySetInnerHTML={{ __html: options }} />;
};

export default SubHeaderProductMenuContent;
