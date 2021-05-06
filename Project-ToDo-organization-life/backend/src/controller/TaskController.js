const { startOfDay, endOfDay, startOfWeek, endOfWeek } = require('date-fns');
const TaskModel = require('../model/TaskModel');

const current = new Date();

class TaskController{

    async create(req, res) {
        const task = new TaskModel(req.body);

        await task.save().then(response => {
                return res.status(200).json(response);
            })
            .catch(e => {return res.status(500).json(e)});
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async all(req, res) {
        await TaskModel.find({macaddress: { '$in': req.body.macaddress }})
        .sort('when')//filtra por data e hora
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async show(req, res) {
        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response);
            else
                return res.status(404).json({error: 'tarefa não encontrada'});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async delete(req, res) {
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async done(req,res) {
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {return res.status(500).json(error)});
    }

    async late(req, res) {
        await TaskModel.find({
            'when': {'$lt': current}, //filtrar pela menor data atual
            'macaddress': {'$in': req.body.macaddress}//para saber as minhas tarefas pelo meu endereço mac
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => { return res.status(500).json(error)});
    }

    async today(req, res) {
        await TaskModel.find({
            'macaddress': {'$in': req.body.macaddress},//busca por dispositivo
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}//busca por tarefas do começo do dia até o fim do dia
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {return res.status(500).json(error)});
    }

    async week(req, res) {
        await TaskModel.find({
            'macaddress': {'$in': req.body.macaddress},//busca por dispositivo
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}//busca por tarefas do começo da semana até o fim da semana
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {return res.status(500).json(error)});
    }

}



module.exports = new TaskController();