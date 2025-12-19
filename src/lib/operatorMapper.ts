export const OPERATOR_TO_SYMBOL: Record<string, string> = {
  greater_than: ">",
  less_than: "<",
  greater_than_equal: ">=",
  less_than_equal: "<=",
  equals: "==",

  // safety (if symbols already)
  ">": ">",
  "<": "<",
  ">=": ">=",
  "<=": "<=",
  "==": "=="
};
