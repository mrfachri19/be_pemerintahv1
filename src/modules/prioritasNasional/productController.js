const productModel = require("./productModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      let { sort, order, page, limit } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      sort = sort || "label";
      order = order || "asc";
      let offset = page * limit - limit;
      const totalData = await productModel.getCountProduct();
      const totalPage = Math.ceil(totalData / limit);
      if (page > totalPage) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await productModel.getAllProduct(
        sort,
        order,
        limit,
        offset
      );
      const newResult = result.map((item) => {
        const data = {
          ...item,
        };
        return data;
      });
      if (newResult.length < 1) {
        return helperWrapper.response(
          res,
          200,
          "Product not found",
          newResult,
          pageInfo
        );
      }

      return helperWrapper.response(
        res,
        200,
        "Success get product data",
        newResult,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productModel.getProductById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `Product by id ${id} not found !`,
          result
        );
      }

      return helperWrapper.response(
        res,
        200,
        "Success get product by id",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
