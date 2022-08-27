const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  async login2(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json("Senha incorreta");
      }
      try {
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
          expiresIn: 300,
        });
        return res
          .status(200)
          .json({ LoggedIn: email, auth: true, token: token });
      } catch (e) {
        return res.status(400).json({ auth: false, reason: e });
      }
    } catch (e) {
      return res.json(e.message);
    }
  },

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
