const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const validPass = await bcrypt.compare(password, user.password);

    if (!user || !validPass)
      return res.status(400).json("Email ou senha inválido");

    try {
      const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });
      const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      });
      let response = {
        auth: true,
        usuário: email,
        token: token,
        refreshToken: refreshToken,
      };
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        auth: false,
        erro: e,
      });
    }
  },
};
