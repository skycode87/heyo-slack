export const getFileName = (headers, defaultFileName) => {
  const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  let fileName = defaultFileName;

  if (headers) {
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of headers.entries()) {
      if (pair[0] === "content-disposition") {
        const matches = fileNameRegex.exec(pair[1]);

        if (matches !== null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, "");
          break;
        }
      }
    }
  }

  return fileName;
};

export const downloadFile = (blob, fileName) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
