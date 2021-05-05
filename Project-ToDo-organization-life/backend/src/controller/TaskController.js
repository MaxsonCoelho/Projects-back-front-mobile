const TaskModel = require('../model/TaskModel');

class TaskController{

    async create(req, res) {
        const task = new TaskModel(req.body);

        await task.save().then(response => {
                return res.status(200).json(response);
            })
            .catch(e => {return res.status(500).json(e)});
    }

}

module.exports = new TaskController();