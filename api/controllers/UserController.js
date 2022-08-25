const emailvalidator = require("email-validator");
const User = require("../models/User");
const useBcrypt = require("sequelize-bcrypt");

module.exports = {

    async index(req, res) {
        const users = await User.findAll();
    
        return res.json(users);
      },
      
    async store(req, res){
        
        const { username, email, password, confirm_password } = req.body;

        if(await User.findOne({where: {email}})) return res.status(400).json({error: "Email já cadastrado"});
        if(!(emailvalidator.validate(req.body.email))) {return res.status(400).json({error: "Email inválido"})};
        if(await password != confirm_password) return res.status(400).json({error: "Senhas não coincidem"});
        useBcrypt(User)

        await User.create({ username, email, password })
        return res.status(201).json({username, email})
    },

    async userById(req, res){
        const { id } = req.;

    }
    

    /*async login(req, res){
        const body = req.body;
    }*/
};