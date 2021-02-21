const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@line-height-base": "1.15",
              "@btn-height-base": "32px",
              "@btn-default-color": "#FFFFFF",
              "@btn-default-bg": "#727176",
              "@border-radius-base": "5px",
              "@btn-primary-color": "#FFFFFF",
              "@btn-primary-bg": "#6BB21F",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
