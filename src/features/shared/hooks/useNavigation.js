import { useState } from "react";
import { withRouter } from "react-router-dom";

const useNavigation = (props) => {
  const [path, setPath] = useState("");

  const goTo = (url) => {
    setPath(url);
    props.history.push(path);
  };

  return [goTo];
};

export default withRouter(useNavigation);
