import "./Loading.css";
import KometLogo from "../KometLogo";
import useTranslate from "../../hooks/useTranslate";

const Loading = ({ mode }) => {
  const { t } = useTranslate();
  return (
    <div className="container">
      <div className="loader">
        <KometLogo width="810px" height="107px" stroke="#138ab2" />
        <h2>{t["common.loading"]}</h2>
        <div className="loaderXS">
          <div className={`loader__element_${mode}`} />
        </div>
      </div>
    </div>
  );
};
export default Loading;
