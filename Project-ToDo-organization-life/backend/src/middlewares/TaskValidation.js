const { isPast } = require('date-fns');
const TaskModel = require('../model/TaskModel');

const TaskValidation = async (req, res, next) => {
    const { macaddress, type, title, description, when } = req.body;

    if(!macaddress)
    return res.status(400).json({ error: 'macaddress é obrigatório' });
    else if(!type)
    return res.status(400).json({ error: 'tipo é obrigatório' });
    else if(!title)
    return res.status(400).json({ error: 'título é obrigatório' });
    else if(!description)
    return res.status(400).json({ error: 'descrição é obrigatória' });
    else if(!when)
    return res.status(400).json({ error: 'data e hora são obrigatórios' });
    else if(isPast(new Date(when)))//valida, se a tarefa está no passado, retorna o erro
    return res.status(400).json({ error: 'escolha uma data e hora futura' });
    else {
        let exists;

        if(req.params.id){//se caso existir o id na req, é porque estou querendo atualizar
            exists = await TaskModel.findOne({// valida se já existe uma tarefa anquele horário
                '_id': {'$ne': req.params.id},//ignora as tarefas que tem no id
                'when': {'$eq': new Date(when)},//dia e hora
                'macaddress': {'$in': macaddress}//identificador
            });
        }else {
            exists = await TaskModel.findOne({// valida se já existe uma tarefa anquele horário
                'when': {'$eq': new Date(when)},//dia e hora
                'macaddress': {'$in': macaddress}//identificador
            });
        }

        if(exists){
            return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário! '});
        }

        next();
    }
    
}

module.exports = TaskValidation;