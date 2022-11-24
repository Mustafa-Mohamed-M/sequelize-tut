const {sequelize, Sequelize} = require("./../../database/models");
const bcrypt = require("bcrypt");

// adding a user
exports.addUser = async(req, res) => {
    const {firstName, lastName=null, username, password} = req.body;
    // validation
    if (firstName && username && password) {
        const saltRounds = parseFloat(process.env.SALT_ROUNDS || 10);
        const hashed = await bcrypt.hash(password, saltRounds);
        const user = await sequelize.models.User.create({
            firstName,
            lastName,
            username,
            password: hashed,
        });
        return res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        });
    }
    else {
        return res.status(400).json({error: "Required fields firstName, username and password"});
    }
};

//getting users
exports.getUsers = async(req, res) => {
    const users = await sequelize.models.User.findAll();
    res.json({users: users.map(user => {
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    })})
}

// updating, deleting and selecting a particular user