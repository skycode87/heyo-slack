const fs = require("fs-extra");

fs.emptyDir("../src/main/webapp/js/react-app")
  .then(
    fs
      .copy("./build/static", "../src/main/webapp/js/react-app")
      .then(() => console.log("Folder Copied Successfully"))
      .catch((err) => console.log(err))
  )
  .catch((err) => console.log(err));
