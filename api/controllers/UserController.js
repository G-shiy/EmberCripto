const emailvalidator = require("email-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { username, email, password, confirm_password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ error: "Email já cadastrado" });
    if (!emailvalidator.validate(req.body.email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    if ((await password) != confirm_password)
      return res.status(400).json({ error: "Senhas não coincidem" });

    await User.create({ username: username, email: email, password: hash });
    return res.status(201).json({ username, email });
  },

  async userById(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json("Id não encontrado");
    return res.status(200).json(user);
  },

  // FAZER COM SMTP UM ESQUECI A SENHA
  async forgetPassword(req, res) {
    const { email } = req.body;
  },
};
