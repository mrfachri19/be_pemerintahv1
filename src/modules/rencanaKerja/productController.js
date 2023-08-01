const { v4: uuidv4 } = require("uuid");
const productModel = require("./productModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/deleteFile");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      let { search, sort, order, page, limit } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 20;
      search = search || "";
      sort = sort || "nama";
      order = order || "asc";
      let offset = page * limit - limit;
      const totalData = await productModel.getCountProduct(search);
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
        search,
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
  postProduct: async (req, res) => {
    try {
      const {
        nama,
        unitKerja,
        idSekretariatDeputi,
        nomenklatur,
        anggaranAwal,
        prioritas,
        prioritasNasional,
        prioritasProgram,
        prioritasKegiatan,
        janjiPresiden,
        majorProject,
        mean,
        status,
        // totalAnggaranTambahan: "",
        totalAnggaranKomponen,
      } = req.body;
      const setData = {
        nama,
        unitKerja,
        idSekretariatDeputi,
        nomenklatur,
        anggaranAwal,
        prioritas,
        prioritasNasional,
        prioritasProgram,
        prioritasKegiatan,
        janjiPresiden,
        majorProject,
        mean,
        status,
        // totalAnggaranTambahan: "",
        totalAnggaranKomponen,
      };
      if (nama.length < 1 || unitKerja.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }
      const result = await productModel.postProduct(setData);
      return helperWrapper.response(res, 200, "Success post product", result);
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
