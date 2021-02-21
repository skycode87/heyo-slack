import { I18nTranslator } from "../../../helpers/I18nTranslator";

const useTranslate = () => ({ t: window?.localeManager || {}, translate: I18nTranslator });

export default useTranslate;
