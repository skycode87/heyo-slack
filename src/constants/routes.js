const appPath = process.env.NODE_ENV === "development" ? process.env.REACT_APP_KOMET_PATH : process.env.PORT;
const backendPath = "https://culture-builder.herokuapp.com";

export const spaRoutes = Object.freeze({
  CATEGORIES: `${appPath}/spa/categories.do`,
  PRODUCTS: `${appPath}/spa/products.do`,
  LOGIN2: `/login`,
  LOGIN: `/login/:alias`,
  SIGNIN: `/signin/:alias`,
  HOME: `/home`,
  CLUUFWEB: `/cluufweb`,
});

export const staticRoutes = Object.freeze({
  SETUP: {
    COMPANY_PRODUCT: `${appPath}/companyProduct/admin.do`,
    CATEGORIES: `${appPath}/spa/categories.do`,
    ORGANIZE_CATEGORIES: `${appPath}/category/admin.do`,
    PRODUCT_PACK_REMINDER: `${appPath}/productPackReminder/admin.do`,
    PRODUCT_ALIAS: `${appPath}/companyProductAlias/admin.do`,
    HARD_GOOD_PRODUCTS: `${appPath}/hard-good/product/manage.do`,
    DATA_SHEET: `${appPath}/product-data-sheet/summary.do`,
    PRODUCTS: `${appPath}/spa/products.do`,
  },
});

export const apiRoutes = Object.freeze({
  CATEGORIES: {
    LOAD_GRID: `${appPath}/category/load-grid.do`,
    DOWNLOAD_EXCEL_FILE: `${appPath}/category/admin.do?action=exportToExcelCategory`,
    GET_DATA: `${appPath}/category/getCategoryData.do`,
    SAVE_DATA: `${appPath}/category/saveCategoryData.do`,
    GET_ORIGIN_REGIONS: `${appPath}/origin-region/autocomplete.do`,
    PROCESS_MAPPING: `${appPath}/category/process-mapping.do`,
    DELETE_CATEGORY: `${appPath}/category/validateBeforeDeleteCategory.do`,
  },
  PRODUCTS: {
    LOAD_GRID: `${appPath}/komet-codes/product/load-grid.do`,
    DOWNLOAD_EXCEL_FILE: `${appPath}/companyProduct/admin.do?action=exportToExcelProducts`,
    LOAD_KOMET_CODE_PRODUCTS_AUTOCOMPLETE: `${appPath}/komet-codes/product/autocomplete.do`,
    PROCESS_MAPPING: `${appPath}/komet-codes/product/process-mapping.do`,
  },
  LOGIN: {
    ROOT: `${backendPath}/rootLogin`,
    USER: `${backendPath}/userLogin`,
  },
  INSTANCE: {
    BY_ALIAS: `${backendPath}/instanceByAlias`,
    SAVE_DATA: `${backendPath}/instance`,
    GET_DATA: `${backendPath}/instance`,
  },
  USERS: {
    LOAD_GRID: `${backendPath}/slackUserLoadGrid`,
    GET_DATA: `${backendPath}/usuarioDetails`,
    SAVE_DATA: `${backendPath}/user`,
    ARCHIVED: `${backendPath}/userArchived`,
    ACTIVE: `${backendPath}/userActive`,
    VALIDATE: `${backendPath}/userValidate`,
    ALL: `${backendPath}/userAll`,
  },
  CONVERSATION: {
    LOAD_GRID: `${backendPath}/conversationLoadGrid`,
  },
  MESSAGES: {
    LOAD_GRID: `${backendPath}/messageLoadGrid`,
  },
  PROFILE: {
    GET_DATA: `${backendPath}/profile`,
    SAVE_DATA: `${backendPath}/profile`,
    SAVE_PASSWORD: `${backendPath}/profilePassword`,
  },
  GUESTS: {
    LOAD_GRID: `${backendPath}/guestLoadGrid`,
    GET_DATA: `${backendPath}/guestDetails`,
    SAVE_DATA: `${backendPath}/guest`,
    ARCHIVED: `${backendPath}/guestArchived`,
    ACTIVE: `${backendPath}/guestActive`,
    VALIDATE: `${backendPath}/guestValidate`,
  },
  PACKS: {
    LOAD_GRID: `${backendPath}/packLoadGrid`,
    ALL: `${backendPath}/packAll`,
    GET_DATA: `${backendPath}/pack`,
    SAVE_DATA: `${backendPath}/pack`,
    SAVE_DATA_CONTENT: `${backendPath}/packContent`,
    ARCHIVED: `${backendPath}/packArchived`,
    ACTIVE: `${backendPath}/packActive`,
  },
  APPS: {
    LOAD_GRID: `${backendPath}/appLoadGrid`,
    LOAD_GRID_BY_USER: `${backendPath}/appLoadGridByUser`,
    GET_DATA: `${backendPath}/app`,
    SAVE_DATA: `${backendPath}/app`,
    ARCHIVED: `${backendPath}/appArchived`,
    ACTIVE: `${backendPath}/appActive`,
    STATUS: `${backendPath}/appStatus`,
    ALL: `${backendPath}/appAll`,
  },
  CALENDARS: {
    LOAD_GRID: `${backendPath}/calendarLoadGrid`,
    LOAD_GRID_BY_USER: `${backendPath}/calendarLoadGridByUser`,
    GET_DATA: `${backendPath}/calendar`,
    SAVE_DATA: `${backendPath}/calendar`,
    ARCHIVED: `${backendPath}/calendarArchived`,
    ACTIVE: `${backendPath}/calendarActive`,
    STATUS: `${backendPath}/calendarStatus`,
    ALL: `${backendPath}/calendarAll`,
  },
  PLANS: {
    LOAD_GRID: `${backendPath}/planLoadGrid`,
    GET_DATA: `${backendPath}/plan`,
    SAVE_DATA: `${backendPath}/plan`,
    ARCHIVED: `${backendPath}/planArchived`,
    ACTIVE: `${backendPath}/planActive`,
    ALL: `${backendPath}/planAll`,
    SAVE_DATA_CONTENT: `${backendPath}/planContent`,
  },
  TRANS: {
    LOAD_GRID: `${backendPath}/transLoadGrid`,
    GET_DATA: `${backendPath}/trans`,
    SAVE_DATA: `${backendPath}/trans`,
    ARCHIVED: `${backendPath}/transArchived`,
    ACTIVE: `${backendPath}/transActive`,
  },
  BUCKET: {
    LOAD_GRID: `${backendPath}/bucketLoadGrid`,
    GET_DATA: `${backendPath}/bucket`,
    SAVE_DATA: `${backendPath}/bucket`,
    ARCHIVED: `${backendPath}/bucketArchived`,
    ACTIVE: `${backendPath}/bucketActive`,
  },
  ROOT: {
    VALIDATE: `${backendPath}/rootValidate`,
  },
  ASSIST: {
    LOAD_GRID: `${backendPath}/assistsByUser`,
    SAVE: `${backendPath}/assist`,
  },
  MASTER: {
    LOAD_GRID: `${backendPath}/masterLoadGrig`,
    SAVE: `${backendPath}/master`,
    GET_DATA: `${backendPath}/master`,
    ARCHIVED: `${backendPath}/masterArchived`,
    ACTIVE: `${backendPath}/masterActive`,
  },
});

export const setting = Object.freeze({
  LOCAL_STORAGE: `76543456789876545678UHGFR567UHBFR56`,
});
