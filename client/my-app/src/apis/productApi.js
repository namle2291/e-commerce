import { httpRequest } from "../axios/custom-axios";

export const getProductCategory = (params) =>
  httpRequest({
    url: "/products",
    method: "get",
    params,
  });

export const getHighPriceProduct = (params) =>
  httpRequest({
    url: "/products",
    method: "get",
    params,
  });
