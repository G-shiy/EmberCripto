const User = require("../models/User");
const emailvalidator = require("email-validator");
const Token = require("./TokenController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  async register(req, res) {
    const { username, email, password, confirm_password, phone, is_admin } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const phoneregex =
      /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(
        phone
      );

    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ error: "Email já cadastrado" });
    if (!emailvalidator.validate(req.body.email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    if ((await password) != confirm_password)
      return res.status(400).json({ error: "Senhas não coincidem" });

    if (phone != "" && phoneregex != true)
      res.status(401).json({ erro: "Invalid format try: (XX) XXXXX-XXXX" });

    await User.create({
      username: username,
      email: email,
      password: hash,
      phone: phone,
      is_admin: is_admin
    });

    let response = {
      usuario: username,
      email: email,
      phone: phone,
      token: Token.GenerateToken(email),
      refreshToken: Token.GenerateRefreshToken(email),
    };

    return res.status(201).json(response);
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const validPass = await bcrypt.compare(password, user.password);

    if (!user || !validPass)
      return res.status(400).json("Email ou senha inválido");

    try {
      let response = {
        auth: true,
        usuário: email,
        token: Token.GenerateToken(email),
        refreshToken: Token.GenerateRefreshToken(email),
      };
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({
        erro: e.message,
      });
    }
  },

  async token(req, res) {
    const data = req.body;
  },
};
