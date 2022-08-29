const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
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
