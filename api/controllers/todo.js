// get todos
const {sequelize, Sequelize} = require("./../../database/models");

exports.getTodos = async(req, res) => {
    const todos = await sequelize.models.Todo.findAll({
        attributes: ['id', 'title', 'description', 'done'],
        include: [
            {
                model: sequelize.models.User,
                attributes: ['username', 'firstName', 'lastName'],
            }
        ]
    });
    return res.json({todos});
};

// add todo
exports.addTodo = async(req, res) => {
    const {title, description, userId} = req.body;
    if (!userId) {
        return res.status(400).json({error: "Required field userId"});
    }
    // ensuring the user exists!
    const count = await sequelize.models.User.count({
        where: {
            id: userId,
        }
    });
    if (count != 1) {
        // the user does not exist
        return res.status(400).json({error: "User does not exist"});
    }
    const todo = await sequelize.models.Todo.create({
        title,
        description,
        userId,
    });
    return res.json({todo});
};

exports.markDone = async (req, res) => {
    // UPDATE `todo` SET `done` = 1 WHERE `id` = [id]
    const {id} = req.body;
    const [affected] = await sequelize.models.Todo.update({
        done: true,
    }, {
        where: {
            id,
        }
    });
    
    return res.json({affected});
    // const affected = value[0];
}

