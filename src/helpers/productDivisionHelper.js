const divisionTypeEnum = Object.freeze({
  FRESH_CUT_FLOWERS: 0,
  PLANTS: 1,
  HARDGOODS: 2,
});

export const getDivisionKeyByIndex = (index) => {
  switch (index) {
    case divisionTypeEnum.FRESH_CUT_FLOWERS:
      return "common.print.bol.product.default.description";
    case divisionTypeEnum.PLANTS:
      return "common.plants";
    case divisionTypeEnum.HARDGOODS:
      return "common.hard.good";
    default:
      return "common.print.bol.product.default.description";
  }
};
