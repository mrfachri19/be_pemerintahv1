require("dotenv").config();
const authModel = require("./authModel");
const helperWrapper = require("../../helpers/wrapper");
const bcrypt = require("bcrypt");

const generateKey = () => {
  const res = Math.floor(100000 + Math.random() * 900000);
  return res;
};

const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, nama, role } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (email.length < 1 || password.length < 1 || nama.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }
      if (checkUser.length > 0) {
        return helperWrapper.response(res, 409, "Email already used", null);
      }
      if (password.length < 6) {
        return helperWrapper.response(
          res,
          400,
          "Password must be more than 6 character"
        );
      }
      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);
      const setData = {
        email,
        password: hashPassword,
        nama,
        role,
      };

      const result = await authModel.register(setData);
      return helperWrapper.response(
        res,
        200,
        "Success register user",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request, ${error.message}`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (email.length < 1 || password.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "All input must be filled",
          null
        );
      }
      if (checkUser.length < 1) {
        return helperWrapper.response(
          res,
          404,
          "Email is not registered",
          null
        );
      }

      const matchPassword = await bcryptjs.compare(
        password,
        checkUser[0].password
      );
      if (!matchPassword) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }
      const payload = checkUser[0];
      console.log(payload)
      delete payload.password;
      const token = jwt.sign({ ...payload }, process.env.SECRET_KEY, {
        expiresIn: "3h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        nama: payload.nama,
        role: payload.role
      });
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad Request ${error.message}`);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email, linkRedirect } = req.body;
      const keysChangePassword = generateKey();

      // CHECK USER BY EMAIL
      const checkUser = await authModel.getDataConditions({ email });
      if (checkUser.length < 1) {
        return helperWrapper.response(
          res,
          400,
          "Email / Account not registed",
          null
        );
      }
      // ======

      await authModel.updateDataUser(
        { keysChangePassword, updatedAt: new Date() },
        checkUser[0].id
      );

      // const setSendEmail = {
      //   to: email,
      //   subject: `Reset Password !`,
      //   template: "email-forgot-password",
      //   data: {
      //     name: checkUser[0].firstName || "my friend",
      //     buttonUrl: `${linkRedirect}/auth/forgot-password/${keysChangePassword}`,
      //   },
      // };

      // await sendMailForgot(setSendEmail);

      return helperWrapper.response(
        res,
        200,
        "Process success, please check your email !",
        email
      );
    } catch (err) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${err.message})`,
        null
      );
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, newPassword, confirmPassword } = req.body;

      const checkUser = await authModel.getDataConditions({
        email,
      });
      // if (checkUser.length < 1) {
      //   return helperWrapper.response(
      //     res,
      //     400,
      //     "Your keys is not valid, please repeat step forgot password",
      //     null
      //   );
      // }

      const { id, minuteDiff } = checkUser[0];
      // if (minuteDiff < -5) {
      //   await authModel.updateDataUser(
      //     { keysChangePassword: null, updatedAt: new Date() },
      //     id
      //   );
      //   return helperWrapper.response(
      //     res,
      //     400,
      //     "Your keys is expired, please repeat step forgot password",
      //     null
      //   );
      // }

      if (newPassword.length < 6) {
        return helperWrapper.response(
          res,
          400,
          "Password must be more than 6 character"
        );
      }

      if (newPassword !== confirmPassword) {
        return helperWrapper.response(res, 400, "Password not same", null);
      }

      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(newPassword, salt);

      await authModel.updateDataUser(
        {
          // keysChangePassword: null,
          password: encryptPassword,
          updatedAt: new Date(),
        },
        id
      );

      return helperWrapper.response(res, 200, "Success change password", {
        id,
      });
    } catch (err) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${err.message})`,
        null
      );
    }
  },
};
